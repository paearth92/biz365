import { Link } from "react-router-dom";
import { Home, ShoppingBag, Info } from "lucide-react";

export function MobileDock() {
  return (
    <nav className="mobile-dock" aria-label="Mobile dock">
      <Link to="/">
        <Home size={20} /> Home
      </Link>
      <Link to="/shop" className="shop-link">
        <ShoppingBag size={18} /> Shop
      </Link>
      <Link to="/how-it-works">
        <Info size={20} /> How
      </Link>
    </nav>
  );
}
