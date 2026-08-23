import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "../lib/cart-context";
import { BrandLogo } from "./BrandLogo";
import { collectionLinks } from "../lib/routes";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();
  const location = useLocation();

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link to="/" aria-label="NFCPlate home">
          <BrandLogo header />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <div className="nav-group">
            <button>
              Shop <ChevronDown size={14} />
            </button>
            <div className="dropdown">
              <p>Shop tap-or-scan products</p>
              {collectionLinks.map((item) => (
                <Link to={item.href} key={item.href}>
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.copy}</small>
                  </span>
                  <em>→</em>
                </Link>
              ))}
              <Link to="/shop" style={{ marginTop: "8px", display: "block" }}>
                <span>
                  <strong>Shop all products</strong>
                  <small>Explore the complete collection</small>
                </span>
                <em>→</em>
              </Link>
            </div>
          </div>
          <Link to="/how-it-works">How it works</Link>
          <Link to="/industries">For businesses</Link>
        </nav>
        <div className="header-actions">
          <Link to="/shop" className="header-shop-link">
            Shop products
          </Link>
          <button
            aria-label={`Open cart with ${count} items`}
            className="cart-icon"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag size={18} />
            <span>{count}</span>
          </button>
          <button
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <Link to="/shop" onClick={() => setOpen(false)}>
            Shop all products <span>→</span>
          </Link>
          <details>
            <summary>
              Products <ChevronDown size={16} />
            </summary>
            {collectionLinks.map((item) => (
              <Link to={item.href} key={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </details>
          <Link to="/how-it-works" onClick={() => setOpen(false)}>
            How it works
          </Link>
          <Link to="/industries" onClick={() => setOpen(false)}>
            For businesses
          </Link>
          <Link to="/cart" onClick={() => setOpen(false)}>
            View cart ({count})
          </Link>
        </nav>
      )}
      {/* Close mobile menu on route change */}
      {open && location.key && null}
    </header>
  );
}
