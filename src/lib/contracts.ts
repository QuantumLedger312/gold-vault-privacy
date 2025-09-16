import { sepolia } from 'wagmi/chains';

// Contract addresses for Sepolia testnet
export const CONTRACT_ADDRESSES = {
  [sepolia.id]: {
    goldVault: '0x0000000000000000000000000000000000000000', // Will be deployed
    fheToken: '0x0000000000000000000000000000000000000000', // Will be deployed
  },
} as const;

// Contract ABIs will be added after deployment
export const GOLD_VAULT_ABI = [
  // Basic ERC20 functions
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  
  // FHE specific functions
  'function depositGold(uint256 amount) payable',
  'function withdrawGold(uint256 amount)',
  'function getEncryptedBalance(address user) view returns (bytes)',
  'function tradeGold(uint256 amount, address to)',
  
  // Events
  'event GoldDeposited(address indexed user, uint256 amount)',
  'event GoldWithdrawn(address indexed user, uint256 amount)',
  'event GoldTraded(address indexed from, address indexed to, uint256 amount)',
] as const;
