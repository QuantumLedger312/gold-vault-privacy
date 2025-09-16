import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Lock } from "lucide-react";
import { useGoldVault } from "@/hooks/useGoldVault";
import { useAccount } from "wagmi";

const Trading = () => {
  const { address } = useAccount();
  const { depositGold, withdrawGold, createTradeOrder, executeTrade } = useGoldVault();
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [tradeAmount, setTradeAmount] = useState("");
  const [tradePrice, setTradePrice] = useState("");

  const handleDeposit = async () => {
    if (!depositAmount) return;
    try {
      await depositGold(parseFloat(depositAmount));
      setDepositAmount("");
    } catch (error) {
      console.error("Deposit failed:", error);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount) return;
    try {
      await withdrawGold(parseFloat(withdrawAmount));
      setWithdrawAmount("");
    } catch (error) {
      console.error("Withdraw failed:", error);
    }
  };

  const handleCreateOrder = async () => {
    if (!tradeAmount || !tradePrice) return;
    try {
      await createTradeOrder(parseFloat(tradeAmount), parseFloat(tradePrice));
      setTradeAmount("");
      setTradePrice("");
    } catch (error) {
      console.error("Create order failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-gold-50/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Gold Trading Platform
          </h1>
          <p className="text-foreground/70 text-lg">
            Trade gold tokens with FHE-encrypted privacy protection
          </p>
        </div>

        {!address && (
          <Card className="mb-8 border-gold-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <Lock className="w-12 h-12 text-gold-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
                <p className="text-foreground/70">
                  Please connect your wallet to start trading gold tokens
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {address && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Trading Actions */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="deposit" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="deposit">Deposit</TabsTrigger>
                  <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
                  <TabsTrigger value="trade">Trade</TabsTrigger>
                </TabsList>
                
                <TabsContent value="deposit" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        Deposit Gold
                      </CardTitle>
                      <CardDescription>
                        Deposit gold tokens to your vault with FHE encryption
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="deposit-amount">Amount (Gold Tokens)</Label>
                        <Input
                          id="deposit-amount"
                          type="number"
                          placeholder="0.00"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                        />
                      </div>
                      <Button onClick={handleDeposit} className="w-full">
                        Deposit Gold
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="withdraw" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingDown className="w-5 h-5 text-red-500" />
                        Withdraw Gold
                      </CardTitle>
                      <CardDescription>
                        Withdraw gold tokens from your vault
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="withdraw-amount">Amount (Gold Tokens)</Label>
                        <Input
                          id="withdraw-amount"
                          type="number"
                          placeholder="0.00"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                        />
                      </div>
                      <Button onClick={handleWithdraw} variant="outline" className="w-full">
                        Withdraw Gold
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="trade" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-500" />
                        Create Trade Order
                      </CardTitle>
                      <CardDescription>
                        Create a new trade order with encrypted parameters
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="trade-amount">Amount</Label>
                          <Input
                            id="trade-amount"
                            type="number"
                            placeholder="0.00"
                            value={tradeAmount}
                            onChange={(e) => setTradeAmount(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="trade-price">Price (ETH)</Label>
                          <Input
                            id="trade-price"
                            type="number"
                            placeholder="0.00"
                            value={tradePrice}
                            onChange={(e) => setTradePrice(e.target.value)}
                          />
                        </div>
                      </div>
                      <Button onClick={handleCreateOrder} className="w-full">
                        Create Order
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Market Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-gold-500" />
                    Market Price
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/70">Gold Token</span>
                      <Badge variant="secondary">$1,850.50</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/70">24h Change</span>
                      <Badge variant="default" className="bg-green-500">
                        +2.5%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground/70">Volume</span>
                      <span className="text-sm">$2.4M</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Trades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { amount: "10.5", price: "1,850.50", time: "2m ago" },
                      { amount: "25.0", price: "1,849.75", time: "5m ago" },
                      { amount: "5.2", price: "1,851.00", time: "8m ago" },
                    ].map((trade, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <div>
                          <span className="font-medium">{trade.amount} GT</span>
                          <span className="text-foreground/70 ml-2">{trade.time}</span>
                        </div>
                        <span className="text-gold-600">${trade.price}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trading;
