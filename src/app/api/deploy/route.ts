import { NextRequest, NextResponse } from 'next/server'
import { ethers } from 'ethers'

export async function POST(request: NextRequest) {
  try {
    const { bytecode, abi, privateKey } = await request.json()

    if (!bytecode || !abi) {
      return NextResponse.json(
        { success: false, error: 'Missing bytecode or ABI' },
        { status: 400 }
      )
    }

    if (!privateKey) {
      return NextResponse.json({
        success: false,
        error: 'Private key is required for deployment'
      })
    }

    // Validate private key format
    if (!privateKey.startsWith('0x') || privateKey.length !== 66) {
      return NextResponse.json({
        success: false,
        error: 'Invalid private key format'
      })
    }

    // Connect to Push Chain testnet - trying multiple endpoints
    let provider;
    const rpcUrls = [
      'https://rpc-testnet.push0.org',
      'https://testnet.push0.org/rpc',
      'https://push-testnet.rpc.thirdweb.com',
      'https://rpc.testnet.pushchain.org'
    ];
    
    // Try different RPC URLs
    for (const rpcUrl of rpcUrls) {
      try {
        provider = new ethers.JsonRpcProvider(rpcUrl);
        // Test the connection
        await provider.getNetwork();
        console.log(`Connected to Push Chain testnet via: ${rpcUrl}`);
        break;
      } catch (error) {
        console.log(`Failed to connect to ${rpcUrl}:`, error.message);
        continue;
      }
    }
    
    if (!provider) {
      return NextResponse.json({
        success: false,
        error: 'Unable to connect to Push Chain testnet. Please check network configuration.'
      });
    }
    const wallet = new ethers.Wallet(privateKey, provider)

    // Check wallet balance
    const balance = await provider.getBalance(wallet.address)
    if (balance === BigInt(0)) {
      return NextResponse.json({
        success: false,
        error: `Insufficient balance. Please fund your wallet: ${wallet.address}`
      })
    }

    // Create contract factory
    const contractFactory = new ethers.ContractFactory(abi, bytecode, wallet)

    // Deploy contract
    const contract = await contractFactory.deploy({
      gasLimit: 3000000,
      gasPrice: ethers.parseUnits('20', 'gwei')
    })

    // Wait for deployment
    await contract.waitForDeployment()
    const contractAddress = await contract.getAddress()

    return NextResponse.json({
      success: true,
      contractAddress,
      transactionHash: contract.deploymentTransaction()?.hash,
      deployerAddress: wallet.address,
      networkInfo: {
        chainId: 1998,
        networkName: 'Push Testnet',
        explorerUrl: `https://explorer-testnet.push0.org/address/${contractAddress}`,
        txExplorerUrl: `https://explorer-testnet.push0.org/tx/${contract.deploymentTransaction()?.hash}`
      }
    })

  } catch (error: any) {
    console.error('Deployment error:', error)

    let errorMessage = 'Deployment failed'

    if (error.code === 'INSUFFICIENT_FUNDS') {
      errorMessage = 'Insufficient funds for deployment'
    } else if (error.code === 'NETWORK_ERROR') {
      errorMessage = 'Network connection error'
    } else if (error.message) {
      errorMessage = error.message
    }

    return NextResponse.json({
      success: false,
      error: errorMessage
    })
  }
}