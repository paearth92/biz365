import { Link } from "react-router-dom";
import { BrandLogo } from "./BrandLogo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <BrandLogo />
            <p>
              Premium NFC and QR products that make it effortless for customers to leave genuine
              reviews and connect with your business.
            </p>
            <div className="footer-pills">
              <span>NFC TAP</span>
              <span>QR SCAN</span>
              <span>NO APP</span>
            </div>
          </div>
          <div>
            <strong>Shop</strong>
            <Link to="/shop">All products</Link>
            <Link to="/collections/review-stands">Review stands</Link>
            <Link to="/collections/review-cards">Review cards</Link>
            <Link to="/collections/bundles">Bundles</Link>
          </div>
          <div>
            <strong>Company</strong>
            <Link to="/how-it-works">How it works</Link>
            <Link to="/industries">For businesses</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
          <div>
            <strong>Support</strong>
            <Link to="/shop">Shipping</Link>
            <Link to="/shop">Returns</Link>
            <Link to="/shop">Contact</Link>
          </div>
          <div>
            <strong>Stay updated</strong>
            <p style={{ fontSize: "10px", lineHeight: 1.6, margin: "0 0 12px" }}>
              Get product updates and review tips.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} NFCPlate. All rights reserved.</span>
          <div>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
