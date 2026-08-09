"use client";

import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { Product, startingPrice } from "../../lib/catalog";
import { ProductVisual } from "../../app/product-visual";
import { useCart } from "./cart-context";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const price = startingPrice(product);
  const compare = product.variants.find(v => v.price === price)?.compareAtPrice;
  return <article className="shop-product-card">
    <div className="shop-product-card__media">
      {product.badge && <span className="commerce-badge">{product.badge}</span>}
      <button className="heart-button" aria-label={`Save ${product.name}`}><Heart /></button>
      <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}><ProductVisual tone={product.tone} compact /></Link>
      <button className="quick-shop" onClick={() => addItem({ productSlug: product.slug, variantId: product.variants[0].id, quantity: 1 })}>Quick add <ArrowRight /></button>
    </div>
    <div className="shop-product-card__content">
      <span>{product.categoryLabel}</span>
      <Link href={`/products/${product.slug}`}><h3>{product.name}</h3></Link>
      <p>{product.shortDescription}</p>
      <div className="shop-card-meta"><div><strong>{product.variants.length > 1 ? "From " : ""}${price.toFixed(2)}</strong>{compare && <del>${compare.toFixed(2)}</del>}</div><div className="swatches" aria-label="Available options">{product.variants.slice(0,4).map(v => <i className={`swatch swatch--${v.color ?? "blue"}`} key={v.id} title={v.name} />)}</div></div>
      <div className="shop-card-proof"><span>★★★★★</span> Built for daily business use</div>
    </div>
  </article>;
}
