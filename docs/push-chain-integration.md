# Push Chain Donut Testnet Integration

## Network Architecture

```mermaid
graph TB
    A[Push Playground] --> B[Push Chain Donut Testnet]
    B --> C[Chain ID: 42101]
    B --> D[RPC Endpoints]
    B --> E[Block Explorer]
    
    D --> F[Primary: evm.rpc-testnet-donut-node2.push.org]
    D --> G[Secondary: evm.rpc-testnet-donut-node1.push.org]
    
    E --> H[donut.push.network]
    
    A --> I[Smart Contract Deployment]
    I --> J[Ethers.js Provider]
    J --> B
    
    A --> K[Contract Interaction]
    K --> L[Web3 Interface]
    L --> B
```

## Deployment Flow

```mermaid
sequenceDiagram
    participant U as User
    participant P as Playground
    participant R as RPC Provider
    participant N as Push Chain Donut Testnet
    participant E as Explorer
    
    U->>P: Deploy Contract
    P->>R: Connect to RPC
    R->>N: Network Connection
    N-->>R: Network Info (Chain ID: 42101)
    R-->>P: Connection Established
    
    P->>N: Send Deploy Transaction
    N->>N: Process Transaction
    N-->>P: Transaction Hash
    P->>E: Verify on Explorer
    E-->>P: Contract Address
    P-->>U: Deployment Success
```

## Network Configuration

```mermaid
graph LR
    A[MetaMask Setup] --> B[Network Name: Push Chain Donut Testnet]
    A --> C[RPC URL: https://evm.rpc-testnet-donut-node2.push.org/]
    A --> D[Chain ID: 42101]
    A --> E[Currency Symbol: PC]
    A --> F[Block Explorer: https://donut.push.network]
    
    G[Playground Config] --> H[Hardhat Network]
    G --> I[Ethers Provider]
    G --> J[Contract Factory]
    
    H --> C
    I --> C
    J --> D
```

## Token Economics

- **Native Token**: PC (Push Chain)
- **Gas Token**: PC
- **Decimals**: 18
- **Network Type**: EVM-Compatible Testnet

## Key Features

- ✅ EVM Compatibility
- ✅ Solidity Smart Contracts
- ✅ Web3 Integration
- ✅ Block Explorer
- ✅ Testnet Faucet
- ✅ Fast Block Times
- ✅ Low Gas Fees