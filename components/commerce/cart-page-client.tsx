"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, Minus, Nfc, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import { getProduct, products, Product, ProductVariant } from "../../lib/catalog";
import { useCart } from "./cart-context";
import { OrderSummary } from "./order-summary";
import { ProductCard } from "./product-card";
import { QrCode } from "../qr-icon";

type CartLine = {
  product: Product;
  variant: ProductVariant;
  quantity: number;
};

export function CartPageClient() {
  const { items, count, updateItem, removeItem } = useCart();
  const [zip, setZip] = useState("");
  const [estimate, setEstimate] = useState("");

  const lines: CartLine[] = items
    .map((item) => {
      const product = getProduct(item.productSlug);
      const variant = product?.variants.find((v) => v.id === item.variantId);
      return product && variant
        ? { product, variant, quantity: item.quantity }
        : null;
    })
    .filter(Boolean) as CartLine[];

  const subtotal = lines.reduce(
    (sum, line) => sum + line.variant.price * line.quantity,
    0,
  );

  const suggestions = useMemo(
    () => products.filter((p) => !items.some((item) => item.productSlug === p.slug)).slice(0, 3),
    [items],
  );

  const checkZip = (e: FormEvent) => {
    e.preventDefault();
    setEstimate(
      /^\d{5}$/.test(zip)
        ? "Estimated arrival: 4–7 business days. Timing is confirmed at live checkout."
        : "Enter a valid 5-digit U.S. ZIP code.",
    );
  };

  if (!lines.length) {
    return (
      <>
        <section className="cart-title">
          <span className="commerce-kicker">YOUR NFCPLATE CART</span>
          <h1>Your cart</h1>
        </section>
        <section className="cart-empty-page">
          <ShoppingBag />
          <h2>Your cart is ready for something smart.</h2>
          <p>
            Explore standard NFCPlate products that customers can tap with NFC or scan using the QR
            code.
          </p>
          <Link href="/shop">
            Shop products <ArrowRight />
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="cart-title">
        <span className="commerce-kicker">YOUR NFCPLATE CART</span>
        <h1>Your cart</h1>
        <p>
          {count} item{count === 1 ? "" : "s"} reserved in this browser
        </p>
      </section>

      <div className="cart-page-grid">
        <section className="cart-items" aria-label="Cart products">
          {lines.map(({ product, variant, quantity }) => (
            <article
              className="cart-page-line"
              key={`${product.slug}-${variant.id}`}
            >
              <Link
                className={`cart-page-image cart-thumb--${product.tone}`}
                href={`/products/${product.slug}`}
              >
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  width={240}
                  height={240}
                  sizes="130px"
                  unoptimized
                />
              </Link>
              <div className="cart-line-copy">
                <span className="stock-line">
                  <i /> In stock
                </span>
                <h2>
                  <Link href={`/products/${product.slug}`}>{product.name}</Link>
                </h2>
                <p>{variant.name} · SKU {variant.sku}</p>
                <div className="line-compatibility">
                  <span>
                    <Nfc /> NFC tap
                  </span>
                  <span>
                    <QrCode /> QR scan
                  </span>
                </div>
              </div>
              <div className="cart-line-price">
                <strong>${variant.price.toFixed(2)}</strong>
                <small>each</small>
              </div>
              <div className="quantity-control">
                <button
                  onClick={() => updateItem(product.slug, variant.id, quantity - 1)}
                  aria-label={`Decrease ${product.name} quantity`}
                >
                  <Minus />
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => updateItem(product.slug, variant.id, quantity + 1)}
                  aria-label={`Increase ${product.name} quantity`}
                >
                  <Plus />
                </button>
              </div>
              <div className="cart-line-total">
                <strong>${(variant.price * quantity).toFixed(2)}</strong>
                <button
                  onClick={() => removeItem(product.slug, variant.id)}
                  aria-label={`Remove ${product.name}`}
                >
                  <Trash2 /> Remove
                </button>
              </div>
            </article>
          ))}

          <div className="cart-tools">
            <Link href="/shop">← Continue shopping</Link>
            <form onSubmit={checkZip}>
              <Truck />
              <label htmlFor="cart-zip">Delivery estimate</label>
              <input
                id="cart-zip"
                inputMode="numeric"
                maxLength={5}
                value={zip}
                onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
                placeholder="ZIP code"
              />
              <button>Check</button>
              {estimate && <p aria-live="polite">{estimate}</p>}
            </form>
          </div>
        </section>

        <div className="cart-summary-column">
          <OrderSummary subtotal={subtotal} />
          <Link className="cart-checkout-cta" href="/checkout">
            Continue to checkout <ArrowRight />
          </Link>
          <div className="cart-assurance">
            <strong>Standard NFCPlate products</strong>
            <span>NFC tap + QR scan included</span>
            <span>Modern iPhone and Android support</span>
            <span>No customer app required</span>
          </div>
        </div>
      </div>

      <section className="cart-recommendations">
        <span className="commerce-kicker">YOU MAY ALSO LIKE</span>
        <h2>Complete your customer touchpoints.</h2>
        <div className="commerce-grid">
          {suggestions.map((product) => (
            <ProductCard product={product} key={product.slug} />
          ))}
        </div>
      </section>
    </>
  );
}
