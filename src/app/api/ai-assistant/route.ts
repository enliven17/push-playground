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
Deploying Smart Contracts using Push Playground:

PLAYGROUND DEPLOYMENT PROCESS:
1. Write contract in the code editor (left panel)
2. Click "Compile" tab → "Compile" button
3. Configure wallet by entering private key in wallet section
4. Click "Deploy" tab → "Deploy" button
5. Check results in terminal and explorer link

PLAYGROUND FEATURES:
- Built-in Solidity compiler
- Automatic network connection to Push Chain Donut Testnet
- No MetaMask configuration needed
- Real-time compilation and deployment feedback
- Integrated block explorer links

Network Details (handled automatically):
- Network Name: Push Chain Donut Testnet
- RPC URL: https://evm.rpc-testnet-donut-node2.push.org/
- Chain ID: 42101
- Currency Symbol: PC
- Block Explorer: https://donut.push.network
`,

    gasOptimization: `
Gas Optimization Tips for Push Chain:

1. Data Types: Use smaller data types (uint8, uint16) when possible instead of uint256
2. Struct Packing: Order struct variables by size to pack them into fewer storage slots
3. Storage vs Memory: Use memory for temporary data, storage only for persistent data
4. Events: Use events for logging instead of storing non-critical data
5. External Calls: Minimize calls to other contracts, batch when possible
6. View/Pure Functions: Use these modifiers when functions don't modify state
7. Libraries: Use proven libraries like OpenZeppelin for common functionality
8. Mappings: Prefer mappings over arrays for key-value lookups
9. Push Chain Benefits: Lower base gas costs and faster finality
10. Batch Operations: Group multiple operations in single transaction when possible

IMPORTANT: Push Chain is EVM-compatible, so standard Solidity optimization techniques apply.
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

1. Network Benefits:
   - Lower gas costs compared to Ethereum mainnet
   - Faster block times and transaction finality
   - EVM-compatible (use existing Solidity knowledge)
   - Stable testnet environment for development

2. Development Experience:
   - Standard Ethereum tooling works (Hardhat, Remix, etc.)
   - Same Solidity compiler and syntax
   - Familiar MetaMask integration
   - Block explorer for transaction verification

3. Testnet Advantages:
   - Free testnet tokens for development
   - Reliable RPC endpoints
   - Active development community
   - Regular network updates

4. Use Cases:
   - DeFi applications with lower fees
   - NFT marketplaces with faster transactions
   - Gaming dApps with quick interactions
   - Any EVM-compatible smart contract
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
• Send notifications directly from smart contracts
• Cross-chain notification support
• Real-time messaging capabilities

💬 Communication Protocols:
• Built-in messaging systems
• Secure peer-to-peer communication
• Web3 native communication

🔧 Developer Tools:
• Push Chain SDK for notifications
• Communication APIs
• Integration libraries

📋 Example Use Cases:
• DeFi protocol notifications
• Gaming event alerts
• Social media dApps
• Cross-chain messaging

Want to see an example notification contract?`
    }

    // Deployment help
    if (lowerMessage.includes('deploy')) {
        return `To deploy your contract using Push Playground:

📝 **Step 1: Write Your Contract**
• Use the code editor on the left to write your Solidity contract
• Choose from templates or write from scratch

🔧 **Step 2: Compile**
• Click the "Compile" tab in the right panel
• Click the "Compile" button
• Wait for successful compilation (green checkmark)

🔑 **Step 3: Configure Wallet**
• Scroll down to "Wallet Configuration" section
• Enter your private key (testnet wallet only!)
• The playground will show your wallet address

🚀 **Step 4: Deploy**
• Click the "Deploy" tab in the right panel
• Make sure compilation was successful
• Click the "Deploy" button
• Wait for deployment confirmation

✅ **Step 5: Verify**
• Check the deployment result in the terminal
• Click the explorer link to view your contract
• Contract address will be shown in the results

💡 **Push Playground Features:**
• No need to configure MetaMask manually
• Automatic network connection to Push Chain Donut Testnet
• Built-in compiler and deployment tools
• Real-time terminal feedback

⚠️ **Important:** Only use testnet private keys, never mainnet keys!

Need help with any specific step?`
    }

    // Gas optimization
    if (lowerMessage.includes('gas') || lowerMessage.includes('optimization')) {
        return `Here are key gas optimization tips for Push Chain:

🔧 Storage Optimization:
• Use smaller data types when possible (uint8 vs uint256)
• Order struct variables by size for automatic packing
• Use mappings instead of arrays for lookups
• Delete unused storage variables with 'delete' keyword

⚡ Code Optimization:
• Use view/pure functions when possible (no gas for reads)
• Minimize external contract calls
• Batch multiple operations in single transaction
• Use events for logging (cheaper than storage)

💡 Push Chain Advantages:
• EVM-compatible with standard Solidity optimizations
• Lower base gas costs compared to Ethereum
• Fast block times reduce transaction wait times

🎯 Best Practices:
• Enable Solidity optimizer in compiler settings
• Test gas usage on Donut testnet first
• Use OpenZeppelin libraries for security and efficiency
• Avoid loops with unbounded iterations

Current gas price on Push Chain Donut testnet is typically around 20 gwei.`
    }

    // Security advice
    if (lowerMessage.includes('security') || lowerMessage.includes('safe')) {
        return `🛡️ Security Best Practices for Push Chain:

Access Control:
• Use OpenZeppelin's Ownable or AccessControl
• Implement proper role-based permissions
• Always validate inputs

Reentrancy Protection:
• Use ReentrancyGuard modifier
• Follow checks-effects-interactions pattern
• Be careful with external calls

Push Chain Specific:
• Secure communication protocols
• Validate notification data
• Protect against spam attacks

Common Vulnerabilities:
• Never use tx.origin for authorization
• Validate all external contract calls
• Use pull over push for payments
• Be careful with delegatecall

Testing:
• Test thoroughly on Donut testnet
• Use static analysis tools
• Consider formal verification for critical contracts

Would you like me to review your current contract for security issues?`
    }

    // General help
    return `I'm here to help with Push Chain development! I can assist with:

📚 Documentation & Guides
• Smart contract development
• Deployment procedures
• Network configuration
• Push Chain communication features

🔧 Code Analysis
• Contract review and explanation
• Gas optimization suggestions
• Security best practices

🚀 Push Chain Features
• Decentralized notifications
• Communication protocols
• Web3 integration

💡 Quick Tips
• Push Chain uses EVM, so Ethereum tools work
• Donut Testnet Chain ID: 42101
• Block explorer: donut.push.network
• Built for Web3 communication

What specific topic would you like help with?`
}

function analyzeContract(contractCode: string): string {
    const contractMatch = contractCode.match(/contract\s+(\w+)/)
    const contractName = contractMatch ? contractMatch[1] : 'Contract'
    
    const functions = contractCode.match(/function\s+(\w+)/g) || []
    const hasOwner = contractCode.includes('owner')
    const hasEvents = contractCode.includes('event')
    const hasRequire = contractCode.includes('require')

    let purpose = 'Basic contract'
    if (contractCode.includes('message')) purpose = 'Message storage'
    if (contractCode.includes('token') || contractCode.includes('balance')) purpose = 'Token contract'
    if (contractCode.includes('vote') || contractCode.includes('proposal')) purpose = 'Voting system'

    return `🔍 **${contractName}** - ${purpose}

🔧 **Key Features:**
• ${functions.length} functions: ${functions.slice(0, 3).map(f => f.replace('function ', '')).join(', ')}
• ${hasOwner ? '✅ Owner access control' : '⚠️ No access control'}
• ${hasEvents ? '📢 Event logging' : '📝 No events'}
• ${hasRequire ? '🛡️ Input validation' : '⚠️ No validation'}

💡 ${hasOwner && hasRequire ? 'Well-structured contract!' : 'Consider adding access control and validation.'}`
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
        const systemPrompt = `You are a Push Chain AI Assistant. Be CONCISE and helpful.

CRITICAL RULES:
- NEVER repeat user's contract code in your response
- Keep explanations SHORT (max 5-6 lines)
- Use bullet points and emojis for readability
- Focus on key insights, not obvious details
- Don't explain basic Solidity syntax

PUSH CHAIN INFO:
- EVM-compatible blockchain with lower costs and faster finality
- Donut Testnet Chain ID: 42101
- User is in Push Playground IDE with built-in tools

CONTRACT ANALYSIS FORMAT:
🔍 **Quick Analysis:**
• [Contract name] - [brief purpose]
• Key features: [2-3 main functions]
• Security: [any notable security features]
• Gas efficiency: [any optimizations]

DEPLOYMENT HELP FORMAT:
📝 **Push Playground Steps:**
1. Write code → 2. Compile → 3. Add wallet → 4. Deploy

Keep responses under 100 words when possible.

${contractCode ? `\nUser's contract is visible to them - don't repeat it.` : ''}`

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