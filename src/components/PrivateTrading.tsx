import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useGoldVault } from '@/hooks/useGoldVault';
import { encryptAmount, encryptTradeData } from '@/lib/fhe';
import { Lock, TrendingUp, Shield, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export const PrivateTrading = () => {
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [isEncrypted, setIsEncrypted] = useState(true);
  const [showEncryptedData, setShowEncryptedData] = useState(false);
  const [encryptedData, setEncryptedData] = useState<string>('');
  const [proof, setProof] = useState<string>('');

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

  const handleEncryptData = async () => {
    if (!amount) {
      toast.error('Please enter an amount');
      return;
    }

    try {
      const { encryptedData: encData, proof: proofData } = await encryptAmount(amount);
      setEncryptedData(encData);
      setProof(proofData);
      toast.success('Data encrypted successfully');
    } catch (err) {
      toast.error('Encryption failed');
      console.error(err);
    }
  };

  const handleDeposit = async () => {
    if (!amount || !encryptedData || !proof) {
      toast.error('Please encrypt data first');
      return;
    }

    try {
      await depositGold(amount, encryptedData, proof);
      toast.success('Gold deposited with FHE encryption');
    } catch (err) {
      toast.error('Deposit failed');
      console.error(err);
    }
  };

  const handleWithdraw = async () => {
    if (!amount || !encryptedData || !proof) {
      toast.error('Please encrypt data first');
      return;
    }

    try {
      await withdrawGold(amount, encryptedData, proof);
      toast.success('Gold withdrawn with FHE encryption');
    } catch (err) {
      toast.error('Withdrawal failed');
      console.error(err);
    }
  };

  const handleCreateToken = async () => {
    if (!amount || !encryptedData || !proof) {
      toast.error('Please encrypt data first');
      return;
    }

    try {
      await createGoldToken(amount, encryptedData, proof);
      toast.success('Gold token created with FHE encryption');
    } catch (err) {
      toast.error('Token creation failed');
      console.error(err);
    }
  };

  const handleCreateOrder = async () => {
    if (!amount || !price || !tokenId || !encryptedData || !proof) {
      toast.error('Please fill all fields and encrypt data');
      return;
    }

    try {
      const { encryptedData: tradeEncData, proof: tradeProof } = await encryptTradeData(
        amount,
        price,
        parseInt(tokenId)
      );
      
      await createTradeOrder(
        parseInt(tokenId),
        amount,
        price,
        true, // isBuyOrder
        3600, // 1 hour duration
        tradeEncData,
        tradeProof
      );
      toast.success('Private trade order created');
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
            <Lock className="w-5 h-5" />
            Private Trading
          </CardTitle>
          <CardDescription>
            Connect your wallet to access FHE-encrypted gold trading
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Shield className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Your wallet connection is required to access private trading features
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
            Private Portfolio
          </CardTitle>
          <CardDescription>
            Your encrypted gold holdings and trading data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-primary">
                {isEncrypted ? '***.**' : balance}
              </div>
              <div className="text-sm text-muted-foreground">Gold Balance</div>
              <Badge variant="secondary" className="mt-1">
                <Lock className="w-3 h-3 mr-1" />
                FHE Encrypted
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-primary">
                {isEncrypted ? '***.**' : goldPrice}
              </div>
              <div className="text-sm text-muted-foreground">Gold Price (ETH)</div>
              <Badge variant="secondary" className="mt-1">
                <Shield className="w-3 h-3 mr-1" />
                Private
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold-primary">
                {isEncrypted ? '***' : '0'}
              </div>
              <div className="text-sm text-muted-foreground">Active Orders</div>
              <Badge variant="secondary" className="mt-1">
                <Eye className="w-3 h-3 mr-1" />
                Hidden
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trading Interface */}
      <Card>
        <CardHeader>
          <CardTitle>FHE-Encrypted Trading</CardTitle>
          <CardDescription>
            Trade gold with complete privacy using Fully Homomorphic Encryption
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
                  onClick={handleEncryptData}
                  disabled={!amount || isPending}
                  className="w-full"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Encrypt Data with FHE
                </Button>
                <Button
                  onClick={handleDeposit}
                  disabled={!encryptedData || isPending}
                  className="w-full"
                  variant="default"
                >
                  {isPending ? 'Processing...' : 'Deposit Gold (Encrypted)'}
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
                  onClick={handleEncryptData}
                  disabled={!amount || isPending}
                  className="w-full"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Encrypt Data with FHE
                </Button>
                <Button
                  onClick={handleWithdraw}
                  disabled={!encryptedData || isPending}
                  className="w-full"
                  variant="destructive"
                >
                  {isPending ? 'Processing...' : 'Withdraw Gold (Encrypted)'}
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
                  onClick={handleEncryptData}
                  disabled={!amount || isPending}
                  className="w-full"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Encrypt Data with FHE
                </Button>
                <Button
                  onClick={handleCreateToken}
                  disabled={!encryptedData || isPending}
                  className="w-full"
                  variant="secondary"
                >
                  {isPending ? 'Processing...' : 'Create Gold Token (Encrypted)'}
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
                  {isPending ? 'Processing...' : 'Create Private Trade Order'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Encrypted Data Display */}
      {encryptedData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Encrypted Data
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEncryptedData(!showEncryptedData)}
              >
                {showEncryptedData ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </CardTitle>
            <CardDescription>
              Your data is encrypted using FHE and stored privately on-chain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <label className="text-sm font-medium">Encrypted Data:</label>
                <div className="p-3 bg-muted rounded-md font-mono text-xs break-all">
                  {showEncryptedData ? encryptedData : '••••••••••••••••••••••••••••••••'}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Zero-Knowledge Proof:</label>
                <div className="p-3 bg-muted rounded-md font-mono text-xs break-all">
                  {showEncryptedData ? proof : '••••••••••••••••••••••••••••••••'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
