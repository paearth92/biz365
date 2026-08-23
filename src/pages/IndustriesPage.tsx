import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { AnnouncementBar } from "../components/AnnouncementBar";
import { SiteFooter } from "../components/SiteFooter";
import { industries } from "../lib/industries";
import { ProductCard } from "../components/ProductCard";
import { getProduct } from "../lib/catalog";

export function IndustriesPage() {
  useEffect(() => {
    document.title = "NFC Review Products by Industry | NFCPlate";
  }, []);

  return (
    <main>
      <AnnouncementBar link="/shop" label="Shop now" />
      <SiteHeader />
      <section style={{ padding: "50px 0 80px" }}>
        <div className="shell">
          <nav className="breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <strong>For businesses</strong>
          </nav>
          <p className="commerce-kicker" style={{ marginTop: "20px" }}>
            FOR BUSINESSES
          </p>
          <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.045em", margin: "0 0 12px" }}>
            NFC review products for every industry.
          </h1>
          <p style={{ color: "#536177", fontSize: 16, lineHeight: 1.6, maxWidth: 600, margin: "0 0 40px" }}>
            From restaurants to real estate, NFCPlate products help businesses collect more genuine
            reviews from happy customers.
          </p>
          <div className="industry-grid">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <div key={industry.slug} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div className="industry-card">
                    <span className="industry-card-icon">
                      <Icon />
                    </span>
                    <div>
                      <strong>{industry.name}</strong>
                      <p>{industry.description}</p>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
                    {industry.products.slice(0, 2).map((slug) => {
                      const p = getProduct(slug);
                      return p ? <ProductCard key={p.id} product={p} /> : null;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
