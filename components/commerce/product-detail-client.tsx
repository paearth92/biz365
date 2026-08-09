"use client";

import { useState } from "react";
import { Check, ChevronDown, Minus, Nfc, Plus, QrCode, ShieldCheck, Smartphone, Truck } from "lucide-react";
import { Product } from "../../lib/catalog";
import { ProductVisual } from "../../app/product-visual";
import { useCart } from "./cart-context";

export function ProductDetailClient({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [view, setView] = useState(0);
  const variant = product.variants.find(item => item.id === variantId)!;
  const { addItem } = useCart();
  return <>
    <div className="product-detail-grid">
      <div className="product-gallery">
        <div className={`product-gallery__main gallery-view--${view}`}><ProductVisual tone={view === 1 ? "black" : view === 2 ? "white" : product.tone} /><span className="gallery-hint">Product image is independently replaceable</span></div>
        <div className="gallery-thumbs">{["Product", "Alternate", "Detail"].map((label,index)=><button className={view===index ? "active" : ""} onClick={()=>setView(index)} key={label}><span className={`mini-product mini-product--${index}`} />{label}</button>)}</div>
      </div>
      <section className="product-info-panel">
        {product.badge && <span className="commerce-badge commerce-badge--inline">{product.badge}</span>}
        <span className="product-overline">{product.categoryLabel}</span><h1>{product.name}</h1><p className="product-intro">{product.shortDescription}</p>
        <div className="detail-price"><strong>${variant.price.toFixed(2)}</strong>{variant.compareAtPrice && <del>${variant.compareAtPrice.toFixed(2)}</del>}</div>
        <div className="stock-line"><i /> In stock and ready to program</div>
        <div className="variant-block"><div><strong>Choose an option</strong><span>{variant.name}</span></div><div className="variant-options">{product.variants.map(item=><button className={variantId===item.id ? "active" : ""} onClick={()=>setVariantId(item.id)} key={item.id}>{item.color && <i className={`swatch swatch--${item.color}`} />}{item.name}</button>)}</div></div>
        <div className="purchase-row"><div className="quantity-control"><button onClick={()=>setQuantity(Math.max(1,quantity-1))} aria-label="Decrease quantity"><Minus /></button><span>{quantity}</span><button onClick={()=>setQuantity(quantity+1)} aria-label="Increase quantity"><Plus /></button></div><button className="add-cart-button" onClick={()=>addItem({productSlug:product.slug,variantId,quantity})}>Add to cart — ${(variant.price*quantity).toFixed(2)}</button></div>
        <button className="buy-now-placeholder">Buy now</button>
        <div className="purchase-trust"><span><Nfc /> NFC tap</span><span><QrCode /> QR scan</span><span><Smartphone /> iPhone + Android</span></div>
        <div className="delivery-note"><Truck /><div><strong>Free U.S. shipping over $35</strong><span>Delivery estimate shown at checkout</span></div></div>
        <div className="product-accordions">
          <details open><summary>Product details <ChevronDown /></summary><p>{product.description}</p></details>
          <details><summary>What is included <ChevronDown /></summary><p>{product.features.join(" · ")}</p></details>
          <details><summary>Setup and programming <ChevronDown /></summary><p>Provide the destination link after ordering. Biz365 prepares the product so customers can tap or scan when it arrives.</p></details>
          <details><summary>Shipping and returns <ChevronDown /></summary><p>Shipping timing and return eligibility are shown clearly before checkout.</p></details>
        </div>
      </section>
    </div>
    <div className="detail-trust-strip"><span><Nfc /> <strong>NFC tap</strong><small>Fast connection</small></span><span><QrCode /> <strong>QR scan</strong><small>Universal backup</small></span><span><Smartphone /> <strong>Phone ready</strong><small>iPhone + Android</small></span><span><ShieldCheck /> <strong>No app</strong><small>Nothing to download</small></span></div>
  </>;
}

export function ProductStory({ product }: { product: Product }) {
  return <>
    <section className="product-story"><div><span className="commerce-kicker">WHY IT WORKS</span><h2>Remove the friction between a happy customer and your review page.</h2><p>{product.description}</p><ul>{product.features.slice(0,4).map(feature=><li key={feature}><Check />{feature}</li>)}</ul></div><div className="tap-scan-demo"><div className="demo-phone"><span>Customer phone</span><strong>Review page opened</strong><div>★★★★★</div></div><div className="demo-wave"><Nfc /></div><div className="demo-stand"><span>B</span><strong>Tap</strong><small>or scan</small><QrCode /></div></div></section>
    <section className="three-steps"><div className="section-heading-center"><span className="commerce-kicker">THREE SIMPLE STEPS</span><h2>Ready where the customer moment happens.</h2></div><div>{[["01","Place it","Set it at the counter, reception desk or completion area."],["02","Tap or scan","Customers choose NFC or the visible QR code."],["03","Reach the page","The intended business destination opens directly."]].map(([num,title,copy])=><article key={num}><span>{num}</span><strong>{title}</strong><p>{copy}</p></article>)}</div></section>
    <section className="specification-section"><div><span className="commerce-kicker">PRODUCT DETAILS</span><h2>Everything you need. Nothing complicated.</h2><p>Clear specifications make it easy to choose the right Biz365 product for your customer-facing space.</p></div><dl>{Object.entries(product.specifications).map(([key,value])=><div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl></section>
    <section className="product-faq"><div><span className="commerce-kicker">COMMON QUESTIONS</span><h2>Good to know before you order.</h2></div><div>{[["Does the customer need an app?","No. NFC-compatible phones can tap, and any modern camera can scan the QR code."],["Do NFC and QR open the same place?","Yes. Both methods are prepared to reach the intended business destination."],["Will it work with iPhone and Android?","It is designed for modern iPhone and Android devices, with QR as a widely compatible alternative."],["Can I replace the destination later?","Direct-link product behavior depends on the selected setup. Managed destinations will be introduced separately."]].map(([q,a])=><details key={q}><summary>{q}<ChevronDown /></summary><p>{a}</p></details>)}</div></section>
  </>;
}
