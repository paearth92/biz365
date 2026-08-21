import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "../../lib/catalog";
import { ProductCard } from "../../components/commerce/product-card";

const featured = products.filter((product) => product.featured).slice(0, 3);

export function FeaturedProducts() {
  return (
    <section className="premium-section premium-collection shell">
      <div className="premium-section-head">
        <div>
          <span className="premium-overline">THE NFCPLATE COLLECTION</span>
          <h2>Designed to look right in your business.</h2>
          <p>
            Choose the format that fits the moment—from a polished counter stand to a card your team
            can carry.
          </p>
        </div>
        <Link href="/shop">
          Shop all products <ArrowRight />
        </Link>
      </div>
      <div className="commerce-grid premium-product-grid">
        {featured.map((product) => (
          <ProductCard product={product} key={product.slug} />
        ))}
      </div>
    </section>
  );
}
