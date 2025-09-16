import { useWriteContract, useReadContract, useAccount } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { GOLD_VAULT_ABI, CONTRACT_ADDRESSES } from '@/lib/contracts';
import { sepolia } from 'wagmi/chains';

export const useGoldVault = () => {
  const { address } = useAccount();
  const { writeContract, isPending, error } = useWriteContract();

  // Contract address for Sepolia (will be updated after deployment)
  const contractAddress = CONTRACT_ADDRESSES[sepolia.id]?.goldVault || '0x0000000000000000000000000000000000000000';

  // Read user balance
  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: contractAddress,
    abi: GOLD_VAULT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    chainId: sepolia.id,
  });

  // Read total supply
  const { data: totalSupply } = useReadContract({
    address: contractAddress,
    abi: GOLD_VAULT_ABI,
    functionName: 'totalSupply',
    chainId: sepolia.id,
  });

  // Read current gold price
  const { data: goldPrice } = useReadContract({
    address: contractAddress,
    abi: GOLD_VAULT_ABI,
    functionName: 'getCurrentGoldPrice',
    chainId: sepolia.id,
  });

  // Deposit gold
  const depositGold = async (amount: string) => {
    if (!address) throw new Error('Wallet not connected');
    
    try {
      // Convert amount to wei
      const amountWei = parseEther(amount);
      
      // Call contract
      await writeContract({
        address: contractAddress,
        abi: GOLD_VAULT_ABI,
        functionName: 'depositGold',
        args: [amountWei],
        value: amountWei,
        chainId: sepolia.id,
      });
      
      // Refetch balance after successful transaction
      setTimeout(() => refetchBalance(), 2000);
    } catch (err) {
      console.error('Deposit failed:', err);
      throw err;
    }
  };

  // Withdraw gold
  const withdrawGold = async (amount: string) => {
    if (!address) throw new Error('Wallet not connected');
    
    try {
      const amountWei = parseEther(amount);
      
      await writeContract({
        address: contractAddress,
        abi: GOLD_VAULT_ABI,
        functionName: 'withdrawGold',
        args: [amountWei],
        chainId: sepolia.id,
      });
      
      // Refetch balance after successful transaction
      setTimeout(() => refetchBalance(), 2000);
    } catch (err) {
      console.error('Withdrawal failed:', err);
      throw err;
    }
  };

  // Create gold token
  const createGoldToken = async (goldAmount: string) => {
    if (!address) throw new Error('Wallet not connected');
    
    try {
      const amountWei = parseEther(goldAmount);
      
      await writeContract({
        address: contractAddress,
        abi: GOLD_VAULT_ABI,
        functionName: 'createGoldToken',
        args: [amountWei],
        chainId: sepolia.id,
      });
    } catch (err) {
      console.error('Token creation failed:', err);
      throw err;
    }
  };

  // Create trade order
  const createTradeOrder = async (
    tokenId: number,
    amount: string,
    price: string,
    isBuyOrder: boolean,
    duration: number
  ) => {
    if (!address) throw new Error('Wallet not connected');
    
    try {
      const amountWei = parseEther(amount);
      const priceWei = parseEther(price);
      
      await writeContract({
        address: contractAddress,
        abi: GOLD_VAULT_ABI,
        functionName: 'createTradeOrder',
        args: [tokenId, amountWei, priceWei, isBuyOrder, duration],
        chainId: sepolia.id,
      });
    } catch (err) {
      console.error('Order creation failed:', err);
      throw err;
    }
  };

  // Execute trade
  const executeTrade = async (orderId: number, matchingOrderId: number) => {
    if (!address) throw new Error('Wallet not connected');
    
    try {
      await writeContract({
        address: contractAddress,
        abi: GOLD_VAULT_ABI,
        functionName: 'executeTrade',
        args: [orderId, matchingOrderId],
        chainId: sepolia.id,
      });
    } catch (err) {
      console.error('Trade execution failed:', err);
      throw err;
    }
  };

  return {
    // Data
    balance: balance ? formatEther(balance) : '0',
    totalSupply: totalSupply ? formatEther(totalSupply) : '0',
    goldPrice: goldPrice ? formatEther(goldPrice) : '0',
    
    // Actions
    depositGold,
    withdrawGold,
    createGoldToken,
    createTradeOrder,
    executeTrade,
    
    // State
    isPending,
    error,
    address,
    contractAddress,
  };
};
