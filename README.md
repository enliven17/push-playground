# Push Playground

A smart contract playground developed for Push Chain Testnet. Users can write, compile, and deploy smart contracts to Push Chain testnet.

## Features

- 🔧 **Smart Contract Editor**: Solidity syntax highlighting with Monaco Editor
- ⚡ **Fast Compilation**: Automatic contract compilation with Hardhat
- 🚀 **Testnet Deploy**: One-click deployment to Push Chain testnet
- 🔍 **Explorer Integration**: View deployed contracts in the explorer
- 📱 **Responsive Design**: Mobile and desktop compatible interface

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

3. **Create environment file:**
```bash
cp .env.example .env.local
```

4. **Add your private key:**
Replace the `PRIVATE_KEY` variable in `.env.local` with your own private key.

⚠️ **Security Warning**: Only use a private key from a wallet intended for testnet use!

## Push Chain Testnet Setup

### Adding Push Chain Testnet to MetaMask

1. Open MetaMask
2. Select "Add Network" from the network dropdown
3. Enter the following information:

```
Network Name: Push Chain Donut Testnet
RPC URL: https://evm.rpc-testnet-donut-node2.push.org/
Chain ID: 42101
Currency Symbol: PC
Block Explorer: https://donut.push.network
```

**Alternative RPC URLs:**
- Primary: https://evm.rpc-testnet-donut-node2.push.org/
- Secondary: https://evm.rpc-testnet-donut-node1.push.org/

### Getting Test Tokens

To get Push Chain testnet tokens:
1. Visit the Push Chain Donut Testnet faucet
2. Enter your wallet address
3. Request test PC tokens
4. Or check the [official documentation](https://pushchain.github.io/push-chain-website/pr-preview/pr-1067/docs)

## Usage

1. **Start the development server:**
```bash
npm run dev
```

2. **Open in browser:**
http://localhost:3000

3. **Write Smart Contract:**
- Write your contract code in the left panel
- Example templates are available

4. **Compile:**
- Click the "Compile" button
- Check for errors

5. **Deploy:**
- Switch to the "Deploy" tab
- Click the "Deploy" button
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

## Teknoloji Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Editor**: Monaco Editor
- **Blockchain**: Ethers.js v6
- **Smart Contracts**: Hardhat, Solidity 0.8.19
- **Network**: Push Chain Donut Testnet

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
- Ensure private key is correct
- Check that wallet has sufficient PC tokens
- Check network connection

### MetaMask Connection Issue
- Check network settings
- Ensure Chain ID is 42101
- Verify RPC URL is correct

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Links

- [Push Chain Official Website](https://pushchain.github.io/)
- [Push Chain Documentation](https://pushchain.github.io/push-chain-website/pr-preview/pr-1067/docs)
- [Push Chain Explorer](https://donut.push.network/)
- [Push Chain GitHub](https://github.com/pushchain)

## Support

For questions:
- Open GitHub Issues
- Check Push Chain documentation
- Visit Push Chain community channels