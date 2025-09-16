import Header from "@/components/Header";
import { GoldTrading } from "@/components/GoldTrading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Coins, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center py-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Gold Vault
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Trade tokenized gold on the blockchain with secure, transparent transactions
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
              <TrendingUp className="w-5 h-5 text-gold-primary" />
              <span>Live Trading</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
              <Coins className="w-5 h-5 text-gold-primary" />
              <span>Real Gold Backing</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
              <Shield className="w-5 h-5 text-gold-primary" />
              <span>Secure Platform</span>
            </div>
          </div>
        </section>

        {/* Trading Section */}
        <section>
          <GoldTrading />
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gold-primary" />
                Real-time Trading
              </CardTitle>
              <CardDescription>
                Trade gold tokens with live market prices and instant execution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Access global gold markets 24/7 with transparent pricing and secure transactions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-gold-primary" />
                Gold Backing
              </CardTitle>
              <CardDescription>
                Every token is backed by real gold stored in secure vaults
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Physical gold stored in insured facilities with regular audits and verification.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-gold-primary" />
                Secure Platform
              </CardTitle>
              <CardDescription>
                Built on blockchain technology for maximum security and transparency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Smart contracts ensure secure transactions with full transparency and immutability.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Index;
