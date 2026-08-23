import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";

export function QuoteSection() {
  return (
    <section className="premium-quote">
      <div className="shell">
        <div className="quote-card">
          <div className="quote-copy">
            <div className="quote-icon">
              <Zap />
            </div>
            <div>
              <p className="commerce-kicker" style={{ color: "#cfe0ff" }}>
                READY TO GROW
              </p>
              <h2>Make every happy customer count.</h2>
            </div>
          </div>
          <Link to="/shop" className="premium-button" style={{ background: "#fff", color: "#2a5cd8" }}>
            Shop now <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
