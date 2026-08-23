import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products } from "../../lib/catalog";
import { ProductCard } from "../ProductCard";

export function FeaturedProducts() {
  const featured = products.filter((p) => p.featured).slice(0, 3);
  return (
    <section className="premium-featured">
      <div className="shell">
        <div className="premium-section-head">
          <div>
            <p className="commerce-kicker">FEATURED PRODUCTS</p>
            <h2>Best-selling review tools.</h2>
          </div>
          <Link to="/shop" className="premium-button secondary">
            Shop all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="featured-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
