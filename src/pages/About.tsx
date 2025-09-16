import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Lock, 
  TrendingUp, 
  Users, 
  Globe, 
  Zap,
  CheckCircle,
  Star,
  ArrowRight
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: "FHE Encryption",
      description: "Fully Homomorphic Encryption ensures your trading data remains private while enabling computations on encrypted data."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Trading",
      description: "Advanced cryptographic protocols protect your gold token transactions and portfolio data."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Real-time Trading",
      description: "Execute trades instantly with our high-performance trading engine and real-time market data."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Multi-wallet Support",
      description: "Connect with popular wallets including MetaMask, WalletConnect, and Rainbow for seamless trading."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Decentralized",
      description: "Built on blockchain technology with smart contracts ensuring transparency and immutability."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast & Efficient",
      description: "Optimized for speed and efficiency with minimal gas fees and instant settlement."
    }
  ];

  const team = [
    {
      name: "QuantumLedger Team",
      role: "Core Development",
      description: "Leading experts in blockchain technology and cryptographic systems."
    },
    {
      name: "FHE Research Lab",
      role: "Cryptography Research",
      description: "Pioneers in Fully Homomorphic Encryption and privacy-preserving technologies."
    },
    {
      name: "Gold Trading Experts",
      role: "Market Specialists",
      description: "Experienced professionals in precious metals trading and market analysis."
    }
  ];

  const stats = [
    { label: "Total Volume Traded", value: "$2.4M+", icon: <TrendingUp className="w-5 h-5" /> },
    { label: "Active Users", value: "1,200+", icon: <Users className="w-5 h-5" /> },
    { label: "Gold Tokens Minted", value: "50K+", icon: <Star className="w-5 h-5" /> },
    { label: "Successful Trades", value: "15K+", icon: <CheckCircle className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-gold-50/20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
            About Gold Vault
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
            The world's first gold token trading platform powered by Fully Homomorphic Encryption (FHE), 
            enabling private and secure precious metals trading on the blockchain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2">
              <Lock className="w-4 h-4 mr-2" />
              FHE Encrypted
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Privacy First
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Globe className="w-4 h-4 mr-2" />
              Decentralized
            </Badge>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4 text-gold-500">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-foreground/70">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Gold Vault?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-gold-500">{feature.icon}</div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Section */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-4">
                Revolutionary Technology
              </CardTitle>
              <CardDescription className="text-center text-lg">
                Powered by cutting-edge cryptographic innovations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-gold-500" />
                    Fully Homomorphic Encryption
                  </h3>
                  <p className="text-foreground/70 mb-4">
                    Our platform uses FHE to enable computations on encrypted data without ever decrypting it. 
                    This means your trading amounts, portfolio values, and transaction history remain completely private 
                    while still allowing the smart contracts to function properly.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Private trading amounts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Encrypted portfolio data</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Secure order matching</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-gold-500" />
                    Smart Contract Security
                  </h3>
                  <p className="text-foreground/70 mb-4">
                    Built on Ethereum with audited smart contracts that handle gold token minting, 
                    trading, and settlement. All operations are transparent and verifiable on-chain 
                    while maintaining privacy through FHE encryption.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Audited smart contracts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Multi-signature security</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Emergency pause mechanisms</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <Badge variant="outline">{member.role}</Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {member.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl mb-4">
              Ready to Start Trading?
            </CardTitle>
            <CardDescription className="text-lg">
              Join thousands of users who trust Gold Vault for secure, private gold token trading.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/trading" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-background rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Start Trading
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="/portfolio" 
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
              >
                View Portfolio
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
