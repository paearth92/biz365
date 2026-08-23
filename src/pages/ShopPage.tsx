import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Nfc } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { AnnouncementBar } from "../components/AnnouncementBar";
import { SiteFooter } from "../components/SiteFooter";
import { ProductBrowser } from "../components/ProductBrowser";
import { BrandLogo } from "../components/BrandLogo";
import { QrCode } from "../components/QrIcon";
import { products, collections } from "../lib/catalog";

export function ShopPage() {
  useEffect(() => {
    document.title = "Shop NFC + QR Business Products | NFCPlate";
  }, []);

  return (
    <main>
      <AnnouncementBar link="/how-it-works" label="How it works" />
      <SiteHeader />

      <section className="shop-hero">
        <div className="shell">
          <div className="shop-hero__copy">
            <nav className="breadcrumbs">
              <Link to="/">Home</Link>
              <span>/</span>
              <strong>Shop</strong>
            </nav>
            <span className="commerce-kicker">NFCPLATE SHOP</span>
            <h1>Smart tools for stronger customer connections.</h1>
            <p>
              Professional products that put your business destination one NFC tap or QR scan away.
            </p>
          </div>
          <div className="shop-hero__art">
            <div className="shop-art-card">
              <BrandLogo markOnly />
              <strong>Tap</strong>
              <small>or scan</small>
              <Nfc size={28} />
              <QrCode />
            </div>
            <div className="shop-art-ring ring-one" />
            <div className="shop-art-ring ring-two" />
          </div>
        </div>
      </section>

      <nav className="category-nav shell" aria-label="Shop categories">
        <Link to="/shop" className="active">
          Shop all
        </Link>
        {Object.entries(collections).map(([slug, c]) => (
          <Link to={`/collections/${slug}`} key={slug}>
            {c.name}
          </Link>
        ))}
      </nav>

      <section className="shop-content shell">
        <ProductBrowser products={products} />
      </section>

      <section className="shop-confidence">
        <div className="shell">
          <span>
            <Nfc size={18} /> Tap with NFC
          </span>
          <span>
            <QrCode /> Scan the QR
          </span>
          <strong>Two simple ways to connect.</strong>
          <Link to="/how-it-works">
            See how it works <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
