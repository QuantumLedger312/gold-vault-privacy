# Gold Vault 💰

> **Trade Tokenized Gold on the Blockchain**

A modern decentralized platform for trading tokenized gold with transparent, secure transactions. Buy, sell, and trade gold-backed tokens with real-time pricing and instant settlement.

## 🚀 Why Gold Vault?

Traditional gold trading is limited by location, time zones, and intermediaries. We bring gold trading to the blockchain.

### 💎 Real Gold Backing
- **1:1 Gold Ratio**: Every token backed by real gold
- **Insured Vaults**: Physical gold stored in secure facilities
- **Real-time Pricing**: Live gold price oracles
- **Transparent Audits**: Regular third-party verification

### 🔗 Blockchain Benefits
- **24/7 Trading**: Trade gold anytime, anywhere
- **Instant Settlement**: No waiting for bank transfers
- **Global Access**: Trade from any location
- **Transparent Transactions**: All trades recorded on-chain

## 🎯 Core Features

### 🏦 Multi-Wallet Support
- **RainbowKit 2.2.8**: Latest wallet connection technology
- **100+ Wallet Support**: MetaMask, WalletConnect, Coinbase, and more
- **Hardware Security**: Ledger, Trezor compatibility
- **Mobile Ready**: iOS and Android wallet support

### 📈 Trading Engine
- **Limit Orders**: Set buy/sell orders at your desired price
- **Real-time Matching**: Instant trade execution
- **Portfolio Analytics**: Track your gold holdings and performance
- **Market Data**: Live gold prices and market information

### 🔐 Security Features
- **Smart Contracts**: Secure, audited smart contract infrastructure
- **Multi-sig Support**: Enhanced security for large transactions
- **Audit Trail**: Immutable transaction records
- **Insurance**: Vault insurance for physical gold storage

## ⚡ Get Started in 5 Minutes

### 🛠️ Prerequisites
- **Node.js 18+** (Latest LTS recommended)
- **MetaMask** or compatible Web3 wallet
- **Sepolia ETH** for testing (get from [faucet](https://sepoliafaucet.com/))

### 🚀 Installation

```bash
# 1. Clone the repository
git clone https://github.com/QuantumLedger312/gold-vault-privacy.git
cd gold-vault-privacy

# 2. Install dependencies
npm install

# 3. Configure environment
cp env.example .env.local
# Edit .env.local with your settings

# 4. Start development server
npm run dev

# 5. Open http://localhost:8080
```

### 🔧 Environment Setup

```bash
# Required Environment Variables
VITE_CHAIN_ID=11155111                    # Sepolia Testnet
VITE_RPC_URL=https://sepolia.infura.io/... # Your RPC endpoint
VITE_WALLET_CONNECT_PROJECT_ID=your_id    # WalletConnect project ID
VITE_GOLD_VAULT_CONTRACT=0x...            # Contract address (after deployment)
```

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