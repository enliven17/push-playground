# Push Playground

A smart contract playground developed for Push Chain Testnet. Users can write, compile, and deploy smart contracts to Push Chain testnet with seamless wallet integration.

## Features

- 🔧 **Smart Contract Editor**: Solidity syntax highlighting with Monaco Editor
- 🔐 **Push Universal Wallet**: Seamless cross-chain wallet integration with email, Google, and Web3 wallet support
- ⚡ **Fast Compilation**: Automatic contract compilation with Hardhat
- 🚀 **Testnet Deploy**: One-click deployment to Push Chain testnet
- 🔍 **Explorer Integration**: View deployed contracts in the explorer
- 📱 **Responsive Design**: Mobile and desktop compatible interface
- 🎨 **VS Code-like Interface**: Familiar IDE experience for developers

## Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd push-playground
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create environment file (optional):**
```bash
cp .env.example .env.local
```

## Wallet Connection

Push Playground uses **Push Universal Wallet** for seamless authentication. You can connect using:

- **Email**: Sign in with your email address
- **Google**: Connect with your Google account
- **Web3 Wallets**: MetaMask, WalletConnect, and other EVM wallets
- **Manual Private Key**: Advanced option for direct private key input (testnet only)

No additional wallet setup required - the Push Universal Wallet handles everything automatically!

### Getting Test Tokens

To get Push Chain testnet tokens:
1. Connect your wallet in the app
2. Copy your wallet address
3. Visit the Push Chain Donut Testnet faucet
4. Request test PC tokens
5. Check the [official documentation](https://pushchain.github.io/push-chain-website/pr-preview/pr-1067/docs) for more info

## Usage

1. **Start the development server:**
```bash
npm run dev
```

2. **Open in browser:**
http://localhost:3000

3. **Connect Wallet:**
- Click the "Connect Wallet" button in the right panel
- Choose your preferred login method (Email, Google, or Web3 Wallet)
- Authorize the connection

4. **Write Smart Contract:**
- Write your contract code in the editor
- Use the file explorer to manage multiple contracts
- Example templates are available

5. **Compile:**
- Click the "Compile" button
- Check compilation results in the terminal

6. **Deploy:**
- Switch to the "Deploy" tab
- Click the "Deploy" button
- Confirm the transaction in your wallet
- Get the contract address and transaction hash

## Example Contracts

### Simple Token Contract
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SimpleToken {
    string public name = "My Token";
    string public symbol = "MTK";
    uint256 public totalSupply = 1000000;
    
    mapping(address => uint256) public balanceOf;
    
    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }
    
    function transfer(address to, uint256 amount) public returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        return true;
    }
}
```

### Push Notification Contract
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PushNotification {
    mapping(address => string[]) public notifications;
    address public owner;
    
    event NotificationSent(address indexed user, string message);
    
    constructor() {
        owner = msg.sender;
    }
    
    function sendNotification(address user, string memory message) public {
        require(msg.sender == owner, "Only owner");
        notifications[user].push(message);
        emit NotificationSent(user, message);
    }
    
    function getNotifications(address user) public view returns (string[] memory) {
        return notifications[user];
    }
}
```

## API Endpoints

### POST /api/compile
Contract kodunu derler.

**Request:**
```json
{
  "code": "contract MyContract { ... }"
}
```

**Response:**
```json
{
  "success": true,
  "abi": [...],
  "bytecode": "0x...",
  "output": "compilation output"
}
```

### POST /api/deploy
Derlenmiş contractı deploy eder.

**Request:**
```json
{
  "bytecode": "0x...",
  "abi": [...]
}
```

**Response:**
```json
{
  "success": true,
  "contractAddress": "0x...",
  "transactionHash": "0x...",
  "networkInfo": {
    "chainId": 42101,
    "explorerUrl": "https://donut.push.network/address/0x..."
  }
}
```

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Editor**: Monaco Editor
- **Wallet**: Push Universal Wallet (@pushchain/ui-kit)
- **Blockchain**: Ethers.js v6, Push Chain Client
- **Smart Contracts**: Hardhat, Solidity 0.8.19
- **Network**: Push Chain Donut Testnet (Chain ID: 42101)

## Development

### Local Development
```bash
# Development server
npm run dev

# Contract compilation
npm run compile

# Contract deploy (testnet)
npm run deploy

# Linting
npm run lint
```

### Adding New Features

1. Create new components in `src/components/`
2. Add new API endpoints in `src/app/api/`
3. Update type definitions in `src/types/`

## Troubleshooting

### Compilation Error
- Check Solidity syntax
- Ensure pragma version is correct
- Check import paths

### Deployment Error
- Ensure wallet is connected
- Check that wallet has sufficient PC tokens
- Verify network connection
- Try reconnecting your wallet

### Wallet Connection Issue
- Clear browser cache and try again
- Check internet connection
- Try a different login method
- Ensure popup blockers are disabled

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Push Universal Wallet Integration

This project uses Push Universal Wallet for seamless authentication and wallet management. Key features:

- **Cross-chain Support**: Works with EVM chains, Solana, and more
- **Multiple Login Methods**: Email, Google, and Web3 wallets
- **Universal Executor Account (UEA)**: Single account across all chains
- **Built-in UI Components**: Pre-styled connect buttons and modals

For more information, check the [Push UI Kit Documentation](https://pushchain.github.io/push-chain-website/pr-preview/pr-1067/docs/chain/ui-kit/integrate-push-universal-wallet/).

## Links

- [Push Chain Official Website](https://pushchain.github.io/)
- [Push Chain Documentation](https://pushchain.github.io/push-chain-website/pr-preview/pr-1067/docs)
- [Push UI Kit Docs](https://pushchain.github.io/push-chain-website/pr-preview/pr-1067/docs/chain/ui-kit/integrate-push-universal-wallet/)
- [Push Chain Explorer](https://donut.push.network/)
- [Push Chain GitHub](https://github.com/pushchain)

## Support

For questions:
- Open GitHub Issues
- Check Push Chain documentation
- Visit Push Chain community channels