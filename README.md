# Aurum Trade - FHE-Encrypted Gold Trading Platform

A revolutionary decentralized platform for trading tokenized gold with **Fully Homomorphic Encryption (FHE)** technology, ensuring complete privacy of transaction amounts and portfolio values.

## 🔐 Privacy-First Gold Trading

Aurum Trade leverages cutting-edge FHE technology to enable private gold trading where:
- **Transaction amounts are encrypted** - Only you know how much gold you're trading
- **Portfolio values remain private** - Your total holdings are never exposed
- **Zero-knowledge trading** - Trade with complete anonymity
- **Regulatory compliance** - Maintain privacy while meeting compliance requirements

## ✨ Key Features

### 🛡️ FHE-Encrypted Trading
- All gold amounts and prices are encrypted using Zama's FHE technology
- Private order matching and execution
- Encrypted portfolio management
- Zero-knowledge proof verification

### 💰 Gold Tokenization
- Real gold-backed tokens (1 token = 1 gram of gold)
- Secure vault storage with insurance
- Real-time gold price oracles
- Transparent audit trails

### 🔗 Multi-Wallet Support
- **RainbowKit** integration with latest versions
- Support for MetaMask, WalletConnect, Coinbase Wallet
- Hardware wallet compatibility
- Mobile wallet support

### 📊 Advanced Trading Features
- Limit orders with encrypted amounts
- Portfolio analytics (encrypted)
- Reputation system
- Trade history (privacy-preserving)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MetaMask or compatible wallet
- Sepolia testnet ETH

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/QuantumLedger312/gold-vault-privacy.git
cd gold-vault-privacy
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp env.example .env.local
# Edit .env.local with your configuration
```

4. **Start development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to `http://localhost:8080`

## 🔧 Configuration

### Environment Variables

```bash
# Chain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect
VITE_WALLET_CONNECT_PROJECT_ID=your_project_id

# Contract Addresses (after deployment)
VITE_GOLD_VAULT_CONTRACT=0x...
VITE_FHE_TOKEN_CONTRACT=0x...

# FHE Configuration
VITE_FHE_NETWORK_URL=https://api.zama.ai
VITE_FHE_APP_ID=your_fhe_app_id
```

### Network Configuration

Currently configured for **Sepolia Testnet**:
- Chain ID: 11155111
- RPC: https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
- Wallet Connect Project ID: 2ec9743d0d0cd7fb94dee1a7e6d33475

## 🏗️ Smart Contract Architecture

### GoldVault.sol
The main smart contract implementing FHE-encrypted gold trading:

```solidity
// Key functions
function createGoldToken(externalEuint32 goldAmount, bytes calldata inputProof)
function createTradeOrder(uint256 tokenId, externalEuint32 amount, externalEuint32 price, bool isBuyOrder)
function executeTrade(uint256 orderId, uint256 matchingOrderId)
function depositGold(externalEuint32 amount, bytes calldata inputProof)
function withdrawGold(externalEuint32 amount, bytes calldata inputProof)
```

### FHE Integration
- Uses Zama's FHE library for encryption
- External encrypted inputs for privacy
- Zero-knowledge proof verification
- Encrypted state management

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Dark/Light Mode**: Automatic theme switching
- **Responsive**: Mobile-first design
- **Accessibility**: WCAG 2.1 compliant
- **Performance**: Optimized for speed

## 🔒 Security Features

- **FHE Encryption**: All sensitive data encrypted
- **Multi-sig Support**: Enhanced security for large trades
- **Audit Trail**: Immutable transaction records
- **Insurance**: Vault insurance for physical gold
- **Compliance**: Built-in regulatory compliance tools

## 📱 Supported Wallets

- MetaMask
- WalletConnect
- Coinbase Wallet
- Rainbow Wallet
- Trust Wallet
- And 100+ more via WalletConnect

## 🌐 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   - Import project from GitHub
   - Configure environment variables
   - Deploy automatically

2. **Environment Setup**
   ```bash
   VITE_CHAIN_ID=11155111
   VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
   VITE_WALLET_CONNECT_PROJECT_ID=your_project_id
   ```

3. **Custom Domain** (Optional)
   - Add your domain in Vercel dashboard
   - Configure DNS settings
   - Enable SSL automatically

### Manual Deployment

```bash
npm run build
# Deploy dist/ folder to your hosting provider
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

## 📈 Roadmap

### Phase 1 (Current)
- ✅ FHE-encrypted gold trading
- ✅ Multi-wallet integration
- ✅ Basic portfolio management
- ✅ Sepolia testnet deployment

### Phase 2 (Q2 2024)
- 🔄 Mainnet deployment
- 🔄 Advanced order types
- 🔄 Cross-chain support
- 🔄 Mobile app

### Phase 3 (Q3 2024)
- 📋 Institutional features
- 📋 Advanced analytics
- 📋 API for third-party integration
- 📋 Governance token

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.aurumtrade.com](https://docs.aurumtrade.com)
- **Discord**: [discord.gg/aurumtrade](https://discord.gg/aurumtrade)
- **Twitter**: [@AurumTrade](https://twitter.com/aurumtrade)
- **Email**: support@aurumtrade.com

## 🙏 Acknowledgments

- **Zama** for FHE technology
- **RainbowKit** for wallet integration
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React** for the UI framework

---

**Built with ❤️ for privacy-first gold trading**

*Trade gold privately. Trade gold securely. Trade gold with Aurum Trade.*