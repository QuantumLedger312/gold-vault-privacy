import { ConnectButton } from '@rainbow-me/rainbowkit';
import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-background" />
          </div>
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Gold Vault
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/trading" className="text-foreground/80 hover:text-gold-primary transition-colors">
            Trading
          </Link>
          <Link to="/portfolio" className="text-foreground/80 hover:text-gold-primary transition-colors">
            Portfolio
          </Link>
          <Link to="/about" className="text-foreground/80 hover:text-gold-primary transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;