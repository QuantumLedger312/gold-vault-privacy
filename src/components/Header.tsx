import { ConnectButton } from '@rainbow-me/rainbowkit';
import { TrendingUp } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-background" />
          </div>
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Gold Vault
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="/trading" className="text-foreground/80 hover:text-gold-primary transition-colors">
            Trading
          </a>
          <a href="/portfolio" className="text-foreground/80 hover:text-gold-primary transition-colors">
            Portfolio
          </a>
          <a href="/about" className="text-foreground/80 hover:text-gold-primary transition-colors">
            About
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;