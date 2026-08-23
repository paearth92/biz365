import type { Product } from "../lib/catalog";
import { ProductCard } from "./ProductCard";

export function ProductBrowser({ products }: { products: Product[] }) {
  return (
    <div className="featured-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
