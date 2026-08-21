"use client";

import { useState } from "react";
import { Product } from "../../lib/catalog";
import { useCart } from "./cart-context";

export function MobileBuyBar({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const variant = product.variants[0];

  const add = () => {
    addItem({ productSlug: product.slug, variantId: variant.id, quantity: 1 });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="mobile-buy-bar">
      <div>
        <small>{variant.name}</small>
        <strong>${variant.price.toFixed(2)}</strong>
      </div>
      <button onClick={add}>{added ? "Added ✓" : "Add to cart"}</button>
    </div>
  );
}
