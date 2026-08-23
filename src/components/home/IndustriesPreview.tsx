import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { industries } from "../../lib/industries";

export function IndustriesPreview() {
  return (
    <section className="premium-industries">
      <div className="shell">
        <div className="premium-section-head">
          <div>
            <p className="commerce-kicker">FOR BUSINESSES</p>
            <h2>Built for every customer moment.</h2>
          </div>
          <Link to="/industries" className="premium-button secondary">
            See all industries <ChevronRight size={16} />
          </Link>
        </div>
        <div className="industry-grid">
          {industries.slice(0, 6).map((industry) => {
            const Icon = industry.icon;
            return (
              <Link to={`/industries`} key={industry.slug} className="industry-card">
                <span className="industry-card-icon">
                  <Icon />
                </span>
                <div>
                  <strong>{industry.name}</strong>
                  <p>{industry.description}</p>
                </div>
                <ChevronRight size={18} className="chevron" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
