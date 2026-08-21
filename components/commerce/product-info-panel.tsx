"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  Check,
  ChevronDown,
  Minus,
  Nfc,
  PackageCheck,
  Plus,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Truck,
} from "lucide-react";
import { Product } from "../../lib/catalog";
import { getProductExperience } from "../../lib/product-experience";
import { useCart } from "./cart-context";
import { QuantitySelector } from "../ui/quantity-selector";
import { QrCode } from "../qr-icon";

export function ProductInfoPanel({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [zip, setZip] = useState("");
  const [delivery, setDelivery] = useState("");
  const [added, setAdded] = useState(false);

  const variant = product.variants.find((item) => item.id === variantId)!;
  const { addItem } = useCart();
  const experience = getProductExperience(product);
  const savings = variant.compareAtPrice
    ? Math.round((1 - variant.price / variant.compareAtPrice) * 100)
    : 0;

  useEffect(() => {
    try {
      const current = JSON.parse(localStorage.getItem("biz365-recent") || "[]") as string[];
      localStorage.setItem(
        "biz365-recent",
        JSON.stringify([product.slug, ...current.filter((x) => x !== product.slug)].slice(0, 4)),
      );
    } catch {
      // ignore storage errors
    }
  }, [product.slug]);

  const add = () => {
    addItem({ productSlug: product.slug, variantId, quantity });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const estimate = (e: FormEvent) => {
    e.preventDefault();
    setDelivery(
      /^\d{5}$/.test(zip)
        ? "Estimated arrival: 4–7 business days"
        : "Enter a valid 5-digit U.S. ZIP code",
    );
  };

  return (
    <section className="product-info-panel">
      <div className="detail-topline">
        {product.badge && <span className="commerce-badge commerce-badge--inline">{product.badge}</span>}
        <span className="product-overline">{product.categoryLabel}</span>
      </div>

      <h1>{product.name}</h1>

      <a className="rating-link" href="#reviews">
        <span>★★★★★</span>
        <strong>{experience.rating}</strong>
        <small>{experience.reviewCount} storefront reviews</small>
      </a>

      <p className="product-intro">{product.shortDescription}</p>

      <div className="detail-price">
        <strong>${variant.price.toFixed(2)}</strong>
        {variant.compareAtPrice && (
          <>
            <del>${variant.compareAtPrice.toFixed(2)}</del>
            <span>Save {savings}%</span>
          </>
        )}
      </div>

      <div className="stock-line">
        <i /> In stock <span>•</span> Standard NFCPlate design
      </div>

      {product.variants.length > 1 ? (
        <div className="variant-block">
          <div>
            <strong>
              {product.category === "review-stickers" ? "Choose pack size" : "Choose an option"}
            </strong>
            <span>{variant.name}</span>
          </div>
          <div className="variant-options">
            {product.variants.map((item) => (
              <button
                aria-pressed={variantId === item.id}
                className={variantId === item.id ? "active" : ""}
                onClick={() => setVariantId(item.id)}
                key={item.id}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="standard-design-line">
          <Check />
          <span>
            <strong>Standard NFCPlate design</strong>
            <small>SKU {variant.sku}</small>
          </span>
        </div>
      )}

      <div className="purchase-row">
        <QuantitySelector
          quantity={quantity}
          onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
          onIncrease={() => setQuantity(quantity + 1)}
        />
        <button className="add-cart-button" onClick={add}>
          {added ? "Added to cart ✓" : `Add to cart — $${(variant.price * quantity).toFixed(2)}`}
        </button>
      </div>

      <div className="purchase-trust">
        <span>
          <Nfc /> NFC tap
        </span>
        <span>
          <QrCode /> QR scan
        </span>
        <span>
          <Smartphone /> iPhone + Android
        </span>
      </div>

      <form className="delivery-estimator" onSubmit={estimate}>
        <Truck />
        <label>
          <strong>Estimate delivery</strong>
          <span>Front-end estimate; carrier timing confirmed later.</span>
        </label>
        <input
          inputMode="numeric"
          maxLength={5}
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
          placeholder="ZIP code"
          aria-label="U.S. ZIP code"
        />
        <button>Check</button>
        {delivery && <p aria-live="polite">{delivery}</p>}
      </form>

      <div className="purchase-reassurance">
        <span>
          <PackageCheck /> Prepared for your destination
        </span>
        <span>
          <RotateCcw /> Clear return guidance
        </span>
        <span>
          <ShieldCheck /> Secure local cart
        </span>
      </div>

      <div className="product-accordions">
        <details open>
          <summary>
            Product details <ChevronDown />
          </summary>
          <p>{product.description}</p>
        </details>
        <details>
          <summary>
            What is included <ChevronDown />
          </summary>
          <p>{experience.included}</p>
        </details>
        <details>
          <summary>
            Setup <ChevronDown />
          </summary>
          <p>{experience.setup}</p>
        </details>
        <details>
          <summary>
            Care and compatibility <ChevronDown />
          </summary>
          <p>{experience.care}. Designed for modern iPhone and Android phones.</p>
        </details>
      </div>
    </section>
  );
}
