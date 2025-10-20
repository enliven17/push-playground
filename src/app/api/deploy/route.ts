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

    // Connect to Push Chain Donut Testnet with fallback
    let provider;
    const rpcUrls = [
      'https://evm.rpc-testnet-donut-node2.push.org/',
      'https://evm.rpc-testnet-donut-node1.push.org/',
      // Fallback to local hardhat if testnet is down
      'http://127.0.0.1:8545'
    ];
    
    let lastError;
    let isLocalNetwork = false;
    
    for (const rpcUrl of rpcUrls) {
      try {
        console.log(`Attempting to connect to: ${rpcUrl}`);
        
        if (rpcUrl.includes('127.0.0.1')) {
          isLocalNetwork = true;
          provider = new ethers.JsonRpcProvider(rpcUrl, {
            chainId: 1337,
            name: 'hardhat-local'
          });
        } else {
          provider = new ethers.JsonRpcProvider(rpcUrl, {
            chainId: 42101,
            name: 'push-donut-testnet'
          });
        }
        
        // Test connection with shorter timeout
        const networkPromise = provider.getNetwork();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Connection timeout')), 5000)
        );
        
        await Promise.race([networkPromise, timeoutPromise]);
        console.log(`Successfully connected to: ${rpcUrl}`);
        break;
      } catch (error) {
        console.log(`Failed to connect to ${rpcUrl}:`, error instanceof Error ? error.message : String(error));
        lastError = error;
        provider = null;
        isLocalNetwork = false;
        continue;
      }
    }
    
    if (!provider) {
      return NextResponse.json({
        success: false,
        error: `Unable to connect to any network. Push Chain Donut Testnet may be down. Try starting local Hardhat network with 'npx hardhat node'. Last error: ${lastError?.message || 'Unknown error'}`
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
        chainId: isLocalNetwork ? 1337 : 42101,
        networkName: isLocalNetwork ? 'Local Hardhat Network' : 'Push Chain Donut Testnet',
        explorerUrl: isLocalNetwork 
          ? `Local deployment - Contract: ${contractAddress}`
          : `https://donut.push.network/address/${contractAddress}`,
        txExplorerUrl: isLocalNetwork
          ? `Local transaction: ${contract.deploymentTransaction()?.hash}`
          : `https://donut.push.network/tx/${contract.deploymentTransaction()?.hash}`
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