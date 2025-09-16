import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useGoldVault } from '@/hooks/useGoldVault';
import { TrendingUp, Wallet, Coins } from 'lucide-react';
import { toast } from 'sonner';

export const GoldTrading = () => {
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [tokenId, setTokenId] = useState('');

  const {
    balance,
    goldPrice,
    depositGold,
    withdrawGold,
    createGoldToken,
    createTradeOrder,
    executeTrade,
    isPending,
    error,
    address,
  } = useGoldVault();

  const handleDeposit = async () => {
    if (!amount) {
      toast.error('Please enter an amount');
      return;
    }

    try {
      await depositGold(amount);
      toast.success('Gold deposited successfully');
    } catch (err) {
      toast.error('Deposit failed');
      console.error(err);
    }
  };

  const handleWithdraw = async () => {
    if (!amount) {
      toast.error('Please enter an amount');
      return;
    }

    try {
      await withdrawGold(amount);
      toast.success('Gold withdrawn successfully');
    } catch (err) {
      toast.error('Withdrawal failed');
      console.error(err);
    }
  };

  const handleCreateToken = async () => {
    if (!amount) {
      toast.error('Please enter an amount');
      return;
    }

    try {
      await createGoldToken(amount);
      toast.success('Gold token created successfully');
    } catch (err) {
      toast.error('Token creation failed');
      console.error(err);
    }
  };

  const handleCreateOrder = async () => {
    if (!amount || !price || !tokenId) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      await createTradeOrder(
        parseInt(tokenId),
        amount,
        price,
        true, // isBuyOrder
        3600 // 1 hour duration
      );
      toast.success('Trade order created successfully');
    } catch (err) {
      toast.error('Order creation failed');
      console.error(err);
    }
  };

  if (!address) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Gold Trading
          </CardTitle>
          <CardDescription>
            Connect your wallet to start trading gold tokens
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <TrendingUp className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Connect your wallet to access gold trading features
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Portfolio Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Portfolio Overview
          </CardTitle>
          <CardDescription>
            Your gold holdings and trading information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-primary">
                {balance} ETH
              </div>
              <div className="text-sm text-muted-foreground">Gold Balance</div>
              <Badge variant="secondary" className="mt-1">
                <Coins className="w-3 h-3 mr-1" />
                Tokenized Gold
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-primary">
                {goldPrice} ETH
              </div>
              <div className="text-sm text-muted-foreground">Gold Price</div>
              <Badge variant="secondary" className="mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                Live Price
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-primary">
                0
              </div>
              <div className="text-sm text-muted-foreground">Active Orders</div>
              <Badge variant="secondary" className="mt-1">
                <Wallet className="w-3 h-3 mr-1" />
                Trading
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trading Interface */}
      <Card>
        <CardHeader>
          <CardTitle>Gold Trading</CardTitle>
          <CardDescription>
            Trade gold tokens on the blockchain
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="deposit" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="deposit">Deposit</TabsTrigger>
              <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
              <TabsTrigger value="create">Create Token</TabsTrigger>
              <TabsTrigger value="trade">Trade</TabsTrigger>
            </TabsList>

            <TabsContent value="deposit" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Amount (ETH)</label>
                  <Input
                    type="number"
                    placeholder="0.1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleDeposit}
                  disabled={!amount || isPending}
                  className="w-full"
                >
                  {isPending ? 'Processing...' : 'Deposit Gold'}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="withdraw" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Amount (ETH)</label>
                  <Input
                    type="number"
                    placeholder="0.1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleWithdraw}
                  disabled={!amount || isPending}
                  className="w-full"
                  variant="destructive"
                >
                  {isPending ? 'Processing...' : 'Withdraw Gold'}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="create" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Gold Amount (grams)</label>
                  <Input
                    type="number"
                    placeholder="10"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleCreateToken}
                  disabled={!amount || isPending}
                  className="w-full"
                  variant="secondary"
                >
                  {isPending ? 'Processing...' : 'Create Gold Token'}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="trade" className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Token ID</label>
                    <Input
                      type="number"
                      placeholder="1"
                      value={tokenId}
                      onChange={(e) => setTokenId(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Amount (grams)</label>
                    <Input
                      type="number"
                      placeholder="5"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Price (ETH per gram)</label>
                  <Input
                    type="number"
                    placeholder="0.05"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleCreateOrder}
                  disabled={!amount || !price || !tokenId || isPending}
                  className="w-full"
                  variant="outline"
                >
                  {isPending ? 'Processing...' : 'Create Trade Order'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="text-destructive text-sm">
              Error: {error.message}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
