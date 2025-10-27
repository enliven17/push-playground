# Push Playground Architecture

## System Overview

```mermaid
graph TB
    A[User Interface] --> B[Code Editor]
    A --> C[Contract Panel]
    A --> D[AI Assistant]
    A --> E[Push Universal Wallet]
    
    B --> F[Monaco Editor]
    B --> G[File Management]
    
    C --> H[Compile Tab]
    C --> I[Deploy Tab]
    C --> J[Interact Tab]
    
    E --> K[Email Login]
    E --> L[Google Login]
    E --> M[Web3 Wallets]
    E --> N[Manual Private Key]
    
    H --> O["API: /compile"]
    I --> P[Push Chain Client]
    J --> Q[Contract Functions]
    
    D --> R["API: /ai-assistant"]
    R --> S[Groq API]
    R --> T[Rule-based Fallback]
    
    O --> U[Solidity Compiler]
    P --> V[Push Chain Donut Testnet]
    
    V --> W["Chain ID: 42101"]
    V --> X[Block Explorer]
    
    style E fill:#10b981
    style K fill:#34d399
    style L fill:#34d399
    style M fill:#34d399
    style N fill:#34d399
```

## Component Structure

```mermaid
graph TB
    A[RootLayout] --> B[PushUniversalWalletProvider]
    B --> C[ToastProvider]
    C --> D[App]
    
    D --> E[Header]
    D --> F[Explorer Panel]
    D --> G[CodeEditor]
    D --> H[ContractPanel]
    D --> I[Terminal]
    D --> J[AIAssistant]
    
    F --> K[File List]
    F --> L[New File Modal]
    
    G --> M[Monaco Editor]
    G --> N[File Tabs]
    
    H --> O[PushWalletButton]
    H --> P[WalletInput]
    H --> Q[Compile]
    H --> R[Deploy]
    H --> S[Interact]
    
    O --> T[usePushWalletContext]
    O --> U[usePushChainClient]
    
    J --> V[Chat Interface]
    J --> W[Quick Actions]
    
    style B fill:#10b981
    style O fill:#34d399
    style T fill:#6ee7b7
    style U fill:#6ee7b7
```

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Editor**: Monaco Editor (VS Code engine)
- **Styling**: Tailwind CSS
- **Wallet**: Push Universal Wallet (@pushchain/ui-kit)
- **Blockchain**: Push Chain Donut Testnet (EVM-compatible)
- **Web3**: Ethers.js v6, Push Chain Client
- **AI**: Groq API with Llama 3.1
- **Deployment**: Vercel

## Push Chain Integration

```mermaid
graph TB
    A[Push Playground Frontend] --> B[Push Universal Wallet]
    B --> C[Authentication Layer]
    
    C --> D[Email/Google Auth]
    C --> E[Web3 Wallet Connect]
    C --> F[Manual Private Key]
    
    B --> G[Push Chain Client]
    G --> H[Universal Executor Account]
    
    H --> I[Push Chain Donut Testnet]
    
    I --> J[Chain ID: 42101]
    I --> K[RPC: evm.rpc-testnet-donut-node2.push.org]
    I --> L[Explorer: donut.push.network]
    I --> M[Currency: PC Token]
    
    A --> N[Contract Compilation]
    A --> O[Contract Deployment]
    A --> P[Transaction Monitoring]
    
    N --> Q[Solidity Compiler]
    O --> R[Contract Factory]
    O --> G
    P --> S[Block Explorer API]
    
    style B fill:#10b981
    style C fill:#34d399
    style G fill:#34d399
    style H fill:#6ee7b7
    style I fill:#9333ea
    style J fill:#a855f7
    style K fill:#a855f7
    style L fill:#a855f7
    style M fill:#a855f7
```

## Wallet Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant UI as Push Playground UI
    participant PW as Push Universal Wallet
    participant PC as Push Chain Client
    participant BC as Push Chain Testnet
    
    U->>UI: Click Connect Wallet
    UI->>PW: Open Wallet Modal
    PW->>U: Show Login Options
    
    alt Email/Google Login
        U->>PW: Select Email/Google
        PW->>PW: Authenticate User
        PW->>PC: Create Universal Account
    else Web3 Wallet
        U->>PW: Select Web3 Wallet
        PW->>U: Request Wallet Connection
        U->>PW: Approve Connection
        PW->>PC: Link Wallet to Universal Account
    else Manual Private Key
        U->>UI: Enter Private Key
        UI->>PC: Create Wallet Instance
    end
    
    PC->>BC: Connect to Network
    BC->>PC: Return Account Info
    PC->>UI: Wallet Connected
    UI->>U: Show Connected State
```

## Deployment Flow with Push Universal Wallet

```mermaid
sequenceDiagram
    participant U as User
    participant UI as Push Playground
    participant PC as Push Chain Client
    participant BC as Push Chain Testnet
    participant EX as Block Explorer
    
    U->>UI: Click Deploy
    UI->>UI: Check Wallet Connection
    
    alt Using Push Universal Wallet
        UI->>PC: Get Universal Executor
        UI->>PC: Deploy Contract via Universal Account
        PC->>BC: Send Deploy Transaction
        BC->>PC: Return Transaction Hash
        PC->>UI: Deployment Success
    else Using Manual Private Key
        UI->>UI: Create Ethers Wallet
        UI->>BC: Deploy via API
        BC->>UI: Return Transaction Hash
    end
    
    UI->>EX: Get Explorer URL
    UI->>U: Show Contract Address & Explorer Link
```