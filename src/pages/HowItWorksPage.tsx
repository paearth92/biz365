import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Nfc, QrCode, Star, ArrowRight } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { AnnouncementBar } from "../components/AnnouncementBar";
import { SiteFooter } from "../components/SiteFooter";

export function HowItWorksPage() {
  useEffect(() => {
    document.title = "How It Works | NFCPlate";
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
            <strong>How it works</strong>
          </nav>
          <p className="commerce-kicker" style={{ marginTop: "20px" }}>
            HOW IT WORKS
          </p>
          <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-0.045em", margin: "0 0 16px", maxWidth: 600 }}>
            One tap. One scan. One review.
          </h1>
          <p style={{ color: "#536177", fontSize: 18, lineHeight: 1.65, maxWidth: 520, margin: "0 0 50px" }}>
            NFCPlate products make it effortless for customers to leave reviews. No apps, no typing,
            no friction. Just tap or scan.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px", marginBottom: "50px" }}>
            <div style={{ padding: "30px", borderRadius: "16px", border: "1px solid var(--line)", background: "#f7faff" }}>
              <div style={{ width: 48, height: 48, borderRadius: "12px", background: "#edf4ff", color: "#2a5cd8", display: "grid", placeItems: "center", marginBottom: "16px" }}>
                <Nfc size={24} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 8px" }}>1. Tap with NFC</h3>
              <p style={{ fontSize: 14, color: "#536177", lineHeight: 1.6, margin: 0 }}>
                Customers simply tap their phone on the NFCPlate product. It opens your review page instantly.
              </p>
            </div>
            <div style={{ padding: "30px", borderRadius: "16px", border: "1px solid var(--line)", background: "#f7faff" }}>
              <div style={{ width: 48, height: 48, borderRadius: "12px", background: "#edf4ff", color: "#2a5cd8", display: "grid", placeItems: "center", marginBottom: "16px" }}>
                <QrCode />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 8px" }}>2. Or scan the QR</h3>
              <p style={{ fontSize: 14, color: "#536177", lineHeight: 1.6, margin: 0 }}>
                Prefer scanning? Every product has a visible QR code as a reliable backup.
              </p>
            </div>
            <div style={{ padding: "30px", borderRadius: "16px", border: "1px solid var(--line)", background: "#f7faff" }}>
              <div style={{ width: 48, height: 48, borderRadius: "12px", background: "#edf4ff", color: "#2a5cd8", display: "grid", placeItems: "center", marginBottom: "16px" }}>
                <Star size={24} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 8px" }}>3. Review gets posted</h3>
              <p style={{ fontSize: 14, color: "#536177", lineHeight: 1.6, margin: 0 }}>
                Customers land on your review page and leave their feedback in seconds.
              </p>
            </div>
          </div>
          <div className="quote-card">
            <div className="quote-copy">
              <div>
                <h2>Ready to start collecting reviews?</h2>
                <p style={{ fontSize: 12, color: "#dbe8ff", margin: "8px 0 0" }}>
                  Shop our NFC + QR products today.
                </p>
              </div>
            </div>
            <Link to="/shop" className="premium-button" style={{ background: "#fff", color: "#2a5cd8" }}>
              Shop now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
