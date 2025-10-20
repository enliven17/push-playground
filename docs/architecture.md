# Push Playground Architecture

## System Overview

```mermaid
graph TB
    A[User Interface] --> B[Code Editor]
    A --> C[Contract Panel]
    A --> D[AI Assistant]
    
    B --> E[Monaco Editor]
    B --> F[File Management]
    
    C --> G[Compile Tab]
    C --> H[Deploy Tab]
    C --> I[Interact Tab]
    
    G --> J["API: /compile"]
    H --> K["API: /deploy"]
    I --> L[Contract Functions]
    
    D --> M["API: /ai-assistant"]
    M --> N[Groq API]
    M --> O[Rule-based Fallback]
    
    J --> P[Solidity Compiler]
    K --> Q[Push Chain Donut Testnet]
    
    Q --> R["Chain ID: 42101"]
    Q --> S[Block Explorer]
```

## Component Structure

```mermaid
graph LR
    A[App] --> B[Header]
    A --> C[CodeEditor]
    A --> D[ContractPanel]
    A --> E[AIAssistant]
    A --> F[WalletInput]
    
    C --> G[Monaco Editor]
    C --> H[File Tabs]
    
    D --> I[Compile]
    D --> J[Deploy]
    D --> K[Interact]
    
    E --> L[Chat Interface]
    E --> M[Quick Actions]
```

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Editor**: Monaco Editor (VS Code engine)
- **Styling**: Tailwind CSS
- **Blockchain**: Push Chain Donut Testnet (EVM-compatible)
- **AI**: Groq API with Llama 3.1
- **Deployment**: Vercel

## Push Chain Integration

```mermaid
graph TB
    A[Push Playground Frontend] --> B[API Layer]
    B --> C[Ethers.js Provider]
    C --> D[Push Chain Donut Testnet]
    
    D --> E[Chain ID: 42101]
    D --> F[RPC: evm.rpc-testnet-donut-node2.push.org]
    D --> G[Explorer: donut.push.network]
    D --> H[Currency: PC Token]
    
    B --> I[Contract Compilation]
    B --> J[Contract Deployment]
    B --> K[Transaction Monitoring]
    
    I --> L[Solidity Compiler]
    J --> M[Contract Factory]
    K --> N[Block Explorer API]
    
    style D fill:#9333ea
    style E fill:#a855f7
    style F fill:#a855f7
    style G fill:#a855f7
    style H fill:#a855f7
```