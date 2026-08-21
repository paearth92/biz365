import Link from "next/link";
import { PhoneIncoming as HomeIcon, Nfc, ShoppingBag, Sparkles } from "lucide-react";
import { QrCode } from "../qr-icon";

export function MobileDock() {
  return (
    <nav className="mobile-home-dock" aria-label="Mobile quick navigation">
      <Link className="active" href="/">
        <HomeIcon />
        <span>Home</span>
      </Link>
      <Link href="/shop">
        <Sparkles />
        <span>Shop</span>
      </Link>
      <Link className="dock-primary" href="/products/google-review-stand">
        <Nfc />
        <span>Tap + Scan</span>
      </Link>
      <Link href="/how-it-works">
        <QrCode />
        <span>How it works</span>
      </Link>
      <Link href="/cart">
        <ShoppingBag />
        <span>Cart</span>
      </Link>
    </nav>
  );
}
