import { NextRequest, NextResponse } from 'next/server'

const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

// Push Chain dokümantasyon bilgileri
const PUSH_CHAIN_DOCS = {
    overview: `
Push Chain is a next-generation blockchain platform designed for decentralized communication and Web3 applications. 
It features EVM compatibility and supports smart contracts for various decentralized applications.

Key Features:
- EVM-compatible blockchain
- Donut Testnet Chain ID: 42101
- Native token: PC (Push Chain)
- Gas price: typically 20 gwei
- Fast block times and low fees
- Built for Web3 communication protocols
`,

    smartContracts: `
Smart Contract Development on Push Chain:

1. Language: Solidity (same as Ethereum)
2. Compiler: Use Solidity 0.8.19 or later
3. Development tools: Remix, Hardhat, Truffle
4. Testnet RPC: https://evm.rpc-testnet-donut-node2.push.org/
5. Alternative RPC: https://evm.rpc-testnet-donut-node1.push.org/
6. Explorer: https://donut.push.network

Best Practices:
- Always use SPDX license identifier
- Implement proper access controls
- Use events for important state changes
- Consider gas optimization
- Test thoroughly on Donut testnet
- Leverage Push Chain's communication features
`,

    deployment: `
Deploying Smart Contracts on Push Chain Donut Testnet:

1. Configure your wallet with Push Chain Donut testnet
2. Get testnet PC tokens from faucet
3. Compile your contract
4. Deploy using web3 tools or IDE
5. Verify contract on block explorer

Network Configuration:
- Network Name: Push Chain Donut Testnet
- RPC URL: https://evm.rpc-testnet-donut-node2.push.org/
- Chain ID: 42101
- Currency Symbol: PC
- Block Explorer: https://donut.push.network
`,

    gasOptimization: `
Gas Optimization Tips for Push Chain:

1. Use appropriate data types (uint256 vs uint8)
2. Pack struct variables efficiently
3. Use events instead of storing data when possible
4. Minimize external calls
5. Use view/pure functions when possible
6. Consider using libraries for common functions
7. Batch operations when possible
8. Use mapping instead of arrays for lookups
9. Leverage Push Chain's efficient architecture
`,

    security: `
Security Best Practices:

1. Access Control:
   - Use OpenZeppelin's Ownable or AccessControl
   - Implement proper role-based permissions
   - Validate all inputs

2. Reentrancy Protection:
   - Use ReentrancyGuard
   - Follow checks-effects-interactions pattern
   - Be careful with external calls

3. Integer Overflow/Underflow:
   - Use SafeMath (or Solidity 0.8+ built-in protection)
   - Validate arithmetic operations

4. Common Vulnerabilities:
   - Avoid tx.origin for authorization
   - Be careful with delegatecall
   - Validate external contract calls
   - Use pull over push for payments
`,

    pushFeatures: `
Push Chain Specific Features:

1. Communication Protocols:
   - Built-in notification systems
   - Decentralized messaging capabilities
   - Cross-chain communication support

2. Web3 Integration:
   - Native support for dApps
   - Enhanced user experience features
   - Seamless wallet integration

3. Developer Tools:
   - Push Chain SDK
   - Notification APIs
   - Communication libraries

4. Use Cases:
   - Decentralized notifications
   - Real-time messaging dApps
   - Cross-chain applications
   - Web3 communication protocols
`
}

function getRelevantDocs(message: string): string {
    const lowerMessage = message.toLowerCase()
    let relevantInfo = PUSH_CHAIN_DOCS.overview

    if (lowerMessage.includes('deploy') || lowerMessage.includes('deployment')) {
        relevantInfo += '\n\n' + PUSH_CHAIN_DOCS.deployment
    }

    if (lowerMessage.includes('gas') || lowerMessage.includes('optimization')) {
        relevantInfo += '\n\n' + PUSH_CHAIN_DOCS.gasOptimization
    }

    if (lowerMessage.includes('security') || lowerMessage.includes('safe')) {
        relevantInfo += '\n\n' + PUSH_CHAIN_DOCS.security
    }

    if (lowerMessage.includes('contract') || lowerMessage.includes('solidity')) {
        relevantInfo += '\n\n' + PUSH_CHAIN_DOCS.smartContracts
    }

    if (lowerMessage.includes('push') || lowerMessage.includes('notification') || lowerMessage.includes('communication')) {
        relevantInfo += '\n\n' + PUSH_CHAIN_DOCS.pushFeatures
    }

    return relevantInfo
}

function generateResponse(message: string, contractCode?: string): string {
    const lowerMessage = message.toLowerCase()

    // Contract analysis
    if (lowerMessage.includes('explain') && contractCode) {
        return analyzeContract(contractCode)
    }

    // Push Chain specific features
    if (lowerMessage.includes('push') || lowerMessage.includes('notification') || lowerMessage.includes('communication')) {
        return `🚀 Push Chain Communication Features:

📢 Decentralized Notifications:
- Send notifications directly from smart contracts
- Cross-chain notification support
- Real-time messaging capabilities

💬 Communication Protocols:
- Built-in messaging systems
- Secure peer-to-peer communication
- Web3 native communication

🔧 Developer Tools:
- Push Chain SDK for notifications
- Communication APIs
- Integration libraries

📋 Example Use Cases:
- DeFi protocol notifications
- Gaming event alerts
- Social media dApps
- Cross-chain messaging

Want to see an example notification contract?`
    }

    // Deployment help
    if (lowerMessage.includes('deploy')) {
        return `To deploy your contract on Push Chain Donut Testnet:

1. Configure Network: Add Push Chain Donut testnet to your wallet
   - RPC: https://evm.rpc-testnet-donut-node2.push.org/
   - Chain ID: 42101

2. Get Test Tokens: Get testnet PC tokens from Push Chain faucet

3. Compile: Make sure your contract compiles without errors

4. Deploy: Use the Deploy tab in this playground or your preferred tool

5. Verify: Check your contract on https://donut.push.network

🚀 Push Chain Benefits:
- Fast transactions and low fees
- EVM compatibility
- Built-in communication features

Need help with any specific step?`
    }

    // Gas optimization
    if (lowerMessage.includes('gas') || lowerMessage.includes('optimization')) {
        return `Here are key gas optimization tips for Push Chain:

🔧 Storage Optimization:
- Pack struct variables (use uint128 instead of uint256 when possible)
- Use mapping instead of arrays for lookups
- Delete unused storage variables

⚡ Code Optimization:
- Use view/pure functions when possible
- Minimize external calls
- Batch operations together
- Use events instead of storing data

💡 Push Chain Advantages:
- Efficient architecture for lower gas costs
- Fast block times reduce wait times
- Optimized for communication protocols

🎯 Best Practices:
- Test gas usage on Donut testnet first
- Use Solidity optimizer
- Consider using libraries for common functions

Current gas price on Push Chain Donut testnet is around 20 gwei.`
    }

    // Security advice
    if (lowerMessage.includes('security') || lowerMessage.includes('safe')) {
        return `🛡️ Security Best Practices for Push Chain:

Access Control:
- Use OpenZeppelin's Ownable or AccessControl
- Implement proper role-based permissions
- Always validate inputs

Reentrancy Protection:
- Use ReentrancyGuard modifier
- Follow checks-effects-interactions pattern
- Be careful with external calls

Push Chain Specific:
- Secure communication protocols
- Validate notification data
- Protect against spam attacks

Common Vulnerabilities:
- Never use tx.origin for authorization
- Validate all external contract calls
- Use pull over push for payments
- Be careful with delegatecall

Testing:
- Test thoroughly on Donut testnet
- Use static analysis tools
- Consider formal verification for critical contracts

Would you like me to review your current contract for security issues?`
    }

    // General help
    return `I'm here to help with Push Chain development! I can assist with:

📚 Documentation & Guides
- Smart contract development
- Deployment procedures
- Network configuration
- Push Chain communication features

🔧 Code Analysis
- Contract review and explanation
- Gas optimization suggestions
- Security best practices

🚀 Push Chain Features
- Decentralized notifications
- Communication protocols
- Web3 integration

💡 Quick Tips
- Push Chain uses EVM, so Ethereum tools work
- Donut Testnet Chain ID: 42101
- Block explorer: donut.push.network
- Built for Web3 communication

What specific topic would you like help with?`
}

function analyzeContract(contractCode: string): string {
    const analysis = []

    // Basic contract analysis
    if (contractCode.includes('contract ')) {
        const contractMatch = contractCode.match(/contract\s+(\w+)/)
        if (contractMatch) {
            analysis.push(`📋 Contract: ${contractMatch[1]}`)
        }
    }

    // Check for functions
    const functions = contractCode.match(/function\s+\w+/g)
    if (functions) {
        analysis.push(`🔧 Functions: Found ${functions.length} function(s)`)
    }

    // Check for events
    const events = contractCode.match(/event\s+\w+/g)
    if (events) {
        analysis.push(`📢 Events: Found ${events.length} event(s)`)
    }

    // Security checks
    const securityIssues = []
    if (!contractCode.includes('onlyOwner') && contractCode.includes('owner')) {
        securityIssues.push('Consider using access control modifiers')
    }
    if (contractCode.includes('transfer') && !contractCode.includes('ReentrancyGuard')) {
        securityIssues.push('Consider reentrancy protection for transfers')
    }

    let result = `🔍 Contract Analysis:\n\n${analysis.join('\n')}`

    if (securityIssues.length > 0) {
        result += `\n\n⚠️ Security Suggestions:\n${securityIssues.map(issue => `- ${issue}`).join('\n')}`
    }

    result += '\n\nWould you like me to explain any specific part of your contract?'

    return result
}

async function callGroqAPI(message: string, contractCode?: string, conversationHistory?: any[]): Promise<string> {
    if (!GROQ_API_KEY) {
        console.log('No Groq API key found, using fallback')
        return generateResponse(message, contractCode)
    }

    console.log('Using Groq API with key:', GROQ_API_KEY?.substring(0, 10) + '...')
  console.log('Environment:', process.env.NODE_ENV)
  console.log('All env keys:', Object.keys(process.env).filter(key => key.includes('GROQ')))

    try {
        const systemPrompt = `You are a Push Chain AI Assistant, an expert in blockchain development and smart contracts specifically for the Push Chain platform. 

PUSH CHAIN PLATFORM INFO:
${Object.values(PUSH_CHAIN_DOCS).join('\n\n')}

Your role:
- Help developers with Push Chain smart contract development
- Provide accurate information about Push Chain Donut Testnet
- Analyze smart contracts for security and optimization
- Give practical, actionable advice about Push Chain features
- Be concise but thorough
- Always mention Push Chain-specific details when relevant
- Highlight Push Chain's communication and Web3 capabilities

Current context:
- User is working in Push Chain Playground IDE
- Donut Testnet Chain ID: 42101
- Primary RPC: https://evm.rpc-testnet-donut-node2.push.org/
- Alternative RPC: https://evm.rpc-testnet-donut-node1.push.org/
- Explorer: https://donut.push.network
- Documentation: https://pushchain.github.io/push-chain-website/pr-preview/pr-1067/docs

${contractCode ? `\nCurrent contract code:\n\`\`\`solidity\n${contractCode}\n\`\`\`` : ''}`

        const messages = [
            { role: 'system', content: systemPrompt },
            ...(conversationHistory || []).slice(-4).map((msg: any) => ({
                role: msg.type === 'user' ? 'user' : 'assistant',
                content: msg.content
            })),
            { role: 'user', content: message }
        ]

        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages,
                temperature: 0.7,
                max_tokens: 1000,
                top_p: 1,
                stream: false
            }),
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.error(`Groq API error ${response.status}:`, errorText)
            throw new Error(`Groq API error: ${response.status} - ${errorText}`)
        }

        const data = await response.json()
        console.log('Groq API response:', data)
        return data.choices[0]?.message?.content || 'Sorry, I could not generate a response.'

    } catch (error) {
        console.error('Groq API error:', error)
        return generateResponse(message, contractCode) // Fallback to rule-based
    }
}

export async function POST(request: NextRequest) {
    try {
        const { message, contractCode, conversationHistory } = await request.json()

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 })
        }

        // Use Groq API for intelligent responses
        const response = await callGroqAPI(message, contractCode, conversationHistory)

        return NextResponse.json({ response })

    } catch (error) {
        console.error('AI Assistant error:', error)
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        )
    }
}