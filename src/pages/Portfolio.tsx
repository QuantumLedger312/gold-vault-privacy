import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  Lock,
  Eye,
  EyeOff
} from "lucide-react";
import { useAccount } from "wagmi";
import { useState } from "react";

const Portfolio = () => {
  const { address } = useAccount();
  const [showPrivateData, setShowPrivateData] = useState(false);

  // Mock portfolio data - in real implementation, this would come from contract
  const portfolioData = {
    totalValue: 125000,
    goldTokens: 67.5,
    goldValue: 125000,
    pnl: 12500,
    pnlPercentage: 11.1,
    assets: [
      { name: "Gold Token", symbol: "GT", amount: 67.5, value: 125000, change: 11.1 },
      { name: "ETH", symbol: "ETH", amount: 2.5, value: 8500, change: -2.3 },
    ],
    recentTransactions: [
      { type: "Deposit", amount: "10.0 GT", value: "$18,500", time: "2 hours ago", status: "Completed" },
      { type: "Trade", amount: "5.5 GT", value: "$10,175", time: "1 day ago", status: "Completed" },
      { type: "Withdraw", amount: "2.0 GT", value: "$3,700", time: "3 days ago", status: "Completed" },
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-gold-50/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Portfolio Overview
          </h1>
          <p className="text-foreground/70 text-lg">
            Manage your gold token holdings with FHE-encrypted privacy
          </p>
        </div>

        {!address && (
          <Card className="mb-8 border-gold-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <Lock className="w-12 h-12 text-gold-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
                <p className="text-foreground/70">
                  Please connect your wallet to view your portfolio
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {address && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Portfolio Summary */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-foreground/70">
                      Total Portfolio Value
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {showPrivateData ? `$${portfolioData.totalValue.toLocaleString()}` : "***"}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      {portfolioData.pnl > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={portfolioData.pnl > 0 ? "text-green-500" : "text-red-500"}>
                        {showPrivateData ? `${portfolioData.pnlPercentage > 0 ? '+' : ''}${portfolioData.pnlPercentage}%` : "***"}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-foreground/70">
                      Gold Tokens
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {showPrivateData ? `${portfolioData.goldTokens} GT` : "***"}
                    </div>
                    <div className="text-sm text-foreground/70">
                      {showPrivateData ? `$${portfolioData.goldValue.toLocaleString()}` : "***"}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-foreground/70">
                      P&L (24h)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {showPrivateData ? `$${portfolioData.pnl.toLocaleString()}` : "***"}
                    </div>
                    <div className="text-sm text-foreground/70">
                      {showPrivateData ? `${portfolioData.pnlPercentage > 0 ? '+' : ''}${portfolioData.pnlPercentage}%` : "***"}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Privacy Toggle */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Privacy Controls</span>
                    <button
                      onClick={() => setShowPrivateData(!showPrivateData)}
                      className="flex items-center gap-2 text-sm"
                    >
                      {showPrivateData ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      {showPrivateData ? "Hide Data" : "Show Data"}
                    </button>
                  </CardTitle>
                  <CardDescription>
                    Your portfolio data is encrypted with FHE. Toggle visibility as needed.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-gold-500" />
                    <span className="text-sm text-foreground/70">
                      All data is encrypted on-chain using Fully Homomorphic Encryption
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Asset Allocation */}
              <Card>
                <CardHeader>
                  <CardTitle>Asset Allocation</CardTitle>
                  <CardDescription>
                    Your current asset distribution
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {portfolioData.assets.map((asset, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{asset.name}</span>
                          <Badge variant="outline">{asset.symbol}</Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {showPrivateData ? `${asset.amount} ${asset.symbol}` : "***"}
                          </div>
                          <div className="text-sm text-foreground/70">
                            {showPrivateData ? `$${asset.value.toLocaleString()}` : "***"}
                          </div>
                        </div>
                      </div>
                      <Progress 
                        value={showPrivateData ? (asset.value / portfolioData.totalValue) * 100 : 0} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>
                    Your latest trading activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolioData.recentTransactions.map((tx, index) => (
                      <div key={index} className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="font-medium">{tx.type}</div>
                          <div className="text-sm text-foreground/70">
                            {showPrivateData ? tx.amount : "***"}
                          </div>
                          <div className="text-xs text-foreground/50">{tx.time}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {showPrivateData ? tx.value : "***"}
                          </div>
                          <Badge 
                            variant={tx.status === "Completed" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {tx.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-gold-500" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-foreground/70">7d Performance</span>
                      <span className="text-sm font-medium text-green-500">+8.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-foreground/70">30d Performance</span>
                      <span className="text-sm font-medium text-green-500">+15.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-foreground/70">All Time</span>
                      <span className="text-sm font-medium text-green-500">+23.4%</span>
                    </div>
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

export default Portfolio;
