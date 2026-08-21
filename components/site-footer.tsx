import Link from "next/link";
import { Nfc } from "lucide-react";
import { BrandLogo } from "./brand-logo";
import { QrCode } from "./qr-icon";

export function SiteFooter() {
  return (
    <footer className="footer premium-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link className="logo logo--light" href="/">
            <BrandLogo />
          </Link>
          <p>Premium NFC and QR products designed for better customer connections.</p>
        </div>
        <div>
          <strong>Shop</strong>
          <Link href="/collections/review-stands">Review stands</Link>
          <Link href="/collections/review-cards">Review cards</Link>
          <Link href="/collections/review-stickers">Stickers & plates</Link>
          <Link href="/collections/bundles">Bundles</Link>
        </div>
        <div>
          <strong>Learn</strong>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/industries">For businesses</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/faq">FAQs</Link>
        </div>
        <div>
          <strong>Support</strong>
          <Link href="/setup">Product setup</Link>
          <Link href="/nfc-compatibility">Compatibility</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/cart">Your cart</Link>
        </div>
        <div className="footer-promise">
          <strong>Tap or scan.</strong>
          <p>Two simple ways to reach the same intended destination.</p>
          <div>
            <Nfc />
            <QrCode />
          </div>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 NFCPlate</span>
        <span>Not affiliated with or endorsed by Google.</span>
        <div>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
