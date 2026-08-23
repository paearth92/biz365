import { Link } from "react-router-dom";
import { Plus, Star } from "lucide-react";
import type { Product } from "../lib/catalog";
import { startingPrice } from "../lib/catalog";
import { useCart } from "../lib/cart-context";
import { ProductVisual } from "./ProductVisual";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const firstVariant = product.variants[0];

  return (
    <div className="product-card">
      <Link to={`/products/${product.slug}`}>
        <div className="product-card__media">
          {product.badge && <span className="product-badge">{product.badge}</span>}
          <button
            className="quick-add"
            onClick={(e) => {
              e.preventDefault();
              addItem({ productSlug: product.slug, variantId: firstVariant.id, quantity: 1 });
            }}
            aria-label="Quick add to cart"
          >
            <Plus size={18} />
          </button>
          <ProductVisual product={product} compact />
        </div>
      </Link>
      <div className="product-card__body">
        <div>
          <span>{product.categoryLabel}</span>
          <h3>{product.name}</h3>
        </div>
        <strong>${startingPrice(product)}</strong>
      </div>
      <div className="product-rating">
        <span>★★★★★</span> Ready to ship
      </div>
    </div>
  );
}
