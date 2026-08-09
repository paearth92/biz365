"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, Expand, Minus, Nfc, PackageCheck, Plus, QrCode, RotateCcw, ShieldCheck, Smartphone, Truck, X } from "lucide-react";
import { Product, products } from "../../lib/catalog";
import { comparisonProducts, getProductExperience } from "../../lib/product-experience";
import { ProductVisual } from "../../app/product-visual";
import { useCart } from "./cart-context";
import { ProductCard } from "./product-card";

const galleryLabels=["Front view","Alternate angle","In-use view","Dimensions"];

function GalleryVisual({product,view}:{product:Product;view:number}) {
  return <div className={`gallery-scene gallery-scene--${view}`} aria-label={`${product.name} ${galleryLabels[view]}`} role="img">
    <ProductVisual tone={view===1?"black":view===2?"blue":product.tone}/>
    {view===2&&<div className="gallery-context"><span>Customer moment</span><strong>Tap or scan</strong></div>}
    {view===3&&<div className="dimension-overlay"><span>Production dimensions</span><strong>Replace with final measurements</strong></div>}
  </div>;
}

export function ProductDetailClient({ product }: { product: Product }) {
  const [variantId,setVariantId]=useState(product.variants[0].id); const [quantity,setQuantity]=useState(1); const [view,setView]=useState(0); const [lightbox,setLightbox]=useState(false); const [zip,setZip]=useState(""); const [delivery,setDelivery]=useState(""); const [added,setAdded]=useState(false);
  const variant=product.variants.find(item=>item.id===variantId)!; const {addItem}=useCart(); const experience=getProductExperience(product);
  const savings=variant.compareAtPrice?Math.round((1-variant.price/variant.compareAtPrice)*100):0;
  useEffect(()=>{try{const current=JSON.parse(localStorage.getItem("biz365-recent")||"[]") as string[];localStorage.setItem("biz365-recent",JSON.stringify([product.slug,...current.filter(x=>x!==product.slug)].slice(0,4)))}catch{}},[product.slug]);
  useEffect(()=>{if(!lightbox)return;const close=(e:KeyboardEvent)=>{if(e.key==="Escape")setLightbox(false)};window.addEventListener("keydown",close);return()=>window.removeEventListener("keydown",close)},[lightbox]);
  const add=()=>{addItem({productSlug:product.slug,variantId,quantity});setAdded(true);window.setTimeout(()=>setAdded(false),1800)};
  const estimate=(e:FormEvent)=>{e.preventDefault();setDelivery(/^\d{5}$/.test(zip)?"Estimated arrival: 4–7 business days":"Enter a valid 5-digit U.S. ZIP code")};
  return <>
    <div className="product-detail-grid phase3-detail">
      <div className="product-gallery">
        <button className="product-gallery__main" onClick={()=>setLightbox(true)} aria-label={`Enlarge ${galleryLabels[view]} of ${product.name}`}><GalleryVisual product={product} view={view}/><span className="gallery-zoom"><Expand/> View larger</span><span className="gallery-hint">Product image area — replace independently later</span></button>
        <div className="gallery-thumbs" role="tablist" aria-label="Product views">{galleryLabels.map((label,index)=><button role="tab" aria-selected={view===index} className={view===index?"active":""} onClick={()=>setView(index)} key={label}><span className={`mini-product mini-product--${index}`}/>{label}</button>)}</div>
      </div>
      <section className="product-info-panel">
        <div className="detail-topline">{product.badge&&<span className="commerce-badge commerce-badge--inline">{product.badge}</span>}<span className="product-overline">{product.categoryLabel}</span></div>
        <h1>{product.name}</h1><a className="rating-link" href="#reviews"><span>★★★★★</span><strong>{experience.rating}</strong><small>{experience.reviewCount} storefront reviews</small></a><p className="product-intro">{product.shortDescription}</p>
        <div className="detail-price"><strong>${variant.price.toFixed(2)}</strong>{variant.compareAtPrice&&<><del>${variant.compareAtPrice.toFixed(2)}</del><span>Save {savings}%</span></>}</div>
        <div className="stock-line"><i/> In stock <span>•</span> Standard Biz365 design</div>
        <div className="variant-block"><div><strong>Choose an option</strong><span>{variant.name}</span></div><div className="variant-options">{product.variants.map(item=><button aria-pressed={variantId===item.id} className={variantId===item.id?"active":""} onClick={()=>setVariantId(item.id)} key={item.id}>{item.color&&<i className={`swatch swatch--${item.color}`}/>} {item.name}</button>)}</div></div>
        <div className="purchase-row"><div className="quantity-control"><button onClick={()=>setQuantity(Math.max(1,quantity-1))} aria-label="Decrease quantity"><Minus/></button><span>{quantity}</span><button onClick={()=>setQuantity(quantity+1)} aria-label="Increase quantity"><Plus/></button></div><button className="add-cart-button" onClick={add}>{added?"Added to cart ✓":`Add to cart — $${(variant.price*quantity).toFixed(2)}`}</button></div>
        <div className="purchase-trust"><span><Nfc/> NFC tap</span><span><QrCode/> QR scan</span><span><Smartphone/> iPhone + Android</span></div>
        <form className="delivery-estimator" onSubmit={estimate}><Truck/><label><strong>Estimate delivery</strong><span>Front-end estimate; carrier timing confirmed later.</span></label><input inputMode="numeric" maxLength={5} value={zip} onChange={e=>setZip(e.target.value.replace(/\D/g,""))} placeholder="ZIP code" aria-label="U.S. ZIP code"/><button>Check</button>{delivery&&<p aria-live="polite">{delivery}</p>}</form>
        <div className="purchase-reassurance"><span><PackageCheck/> Prepared for your destination</span><span><RotateCcw/> Clear return guidance</span><span><ShieldCheck/> Secure local cart</span></div>
        <div className="product-accordions"><details open><summary>Product details <ChevronDown/></summary><p>{product.description}</p></details><details><summary>What is included <ChevronDown/></summary><p>{experience.included}</p></details><details><summary>Setup <ChevronDown/></summary><p>{experience.setup}</p></details><details><summary>Care and compatibility <ChevronDown/></summary><p>{experience.care}. Designed for modern iPhone and Android phones.</p></details></div>
      </section>
    </div>
    <div className="detail-trust-strip"><span><Nfc/><strong>NFC tap</strong><small>Hold a compatible phone near it</small></span><span><QrCode/><strong>QR scan</strong><small>Use the phone camera</small></span><span><Smartphone/><strong>Same destination</strong><small>Two equal ways to connect</small></span><span><ShieldCheck/><strong>No customer app</strong><small>Nothing extra to download</small></span></div>
    <div className="mobile-buy-bar"><div><small>{variant.name}</small><strong>${variant.price.toFixed(2)}</strong></div><button onClick={add}>{added?"Added ✓":"Add to cart"}</button></div>
    {lightbox&&<div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`${product.name} enlarged image`}><button className="lightbox-close" onClick={()=>setLightbox(false)} aria-label="Close enlarged image"><X/></button><GalleryVisual product={product} view={view}/><div className="lightbox-nav">{galleryLabels.map((label,index)=><button className={view===index?"active":""} onClick={()=>setView(index)} key={label}>{label}</button>)}</div></div>}
  </>;
}

export function ProductStory({product}:{product:Product}) { const experience=getProductExperience(product); return <>
  <section className="product-story"><div><span className="commerce-kicker">TWO WAYS. ONE DESTINATION.</span><h2>Tap with NFC or scan the QR code.</h2><p>Both paths open the same intended business destination. Customers choose whichever feels natural—without downloading a separate app.</p><ul>{product.features.slice(0,4).map(feature=><li key={feature}><Check/>{feature}</li>)}</ul></div><div className="tap-scan-demo"><div className="demo-phone"><span>Customer phone</span><strong>Destination opened</strong><div>Ready to continue</div></div><div className="demo-wave"><Nfc/></div><div className="demo-stand"><span>B</span><strong>Tap</strong><small>or scan</small><QrCode/></div></div></section>
  <section className="experience-grid"><article><span>BEST PLACEMENT</span><h3>{experience.placement}</h3></article><article><span>BEST FOR</span><h3>{experience.bestFor}</h3></article><article><span>PRIMARY BENEFIT</span><h3>{experience.primaryBenefit}</h3></article></section>
  <section className="three-steps"><div className="section-heading-center"><span className="commerce-kicker">THE CUSTOMER JOURNEY</span><h2>Ready where the customer moment happens.</h2></div><div>{[["01","Place it",experience.placement],["02","Tap or scan","Customers choose NFC or the clearly visible QR code."],["03","Reach the page","The intended business destination opens directly."]].map(([num,title,copy])=><article key={num}><span>{num}</span><strong>{title}</strong><p>{copy}</p></article>)}</div></section>
  <section className="use-case-section"><div><span className="commerce-kicker">MADE FOR REAL BUSINESS MOMENTS</span><h2>One product, several natural placements.</h2></div><div>{experience.useCases.map((item,index)=><article key={item}><span>0{index+1}</span><strong>{item}</strong><p>Place {product.name.toLowerCase()} where this interaction naturally finishes.</p></article>)}</div></section>
  <section className="comparison-section"><div className="section-heading-center"><span className="commerce-kicker">COMPARE FORMATS</span><h2>Find the right Biz365 touchpoint.</h2></div><div className="comparison-scroll"><table><thead><tr><th>Product</th><th>Format</th><th>Placement</th><th>Portable</th><th>NFC</th><th>QR</th><th>Best use</th></tr></thead><tbody>{comparisonProducts.map(item=>{const x=getProductExperience(item);return <tr className={item.slug===product.slug?"current":""} key={item.slug}><th><Link href={`/products/${item.slug}`}>{item.name}</Link>{item.slug===product.slug&&<small>Current</small>}</th><td>{item.categoryLabel}</td><td>{x.placement}</td><td>{item.category==="review-cards"?"Yes":"Stationary"}</td><td>Included</td><td>Included</td><td>{x.bestFor}</td></tr>})}</tbody></table></div></section>
  <section className="specification-section"><div><span className="commerce-kicker">PRODUCT DETAILS</span><h2>Everything you need. Nothing complicated.</h2><p>Final production measurements remain independently replaceable when physical inventory is confirmed.</p></div><dl>{[...Object.entries(product.specifications),["Dimensions",experience.dimensions],["Material",experience.material],["Included",experience.included]].map(([key,value])=><div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl></section>
  <ReviewsSection product={product}/>
  <section className="product-faq"><div><span className="commerce-kicker">COMMON QUESTIONS</span><h2>Good to know before you order.</h2></div><div>{experience.faqs.map(item=><details key={item.question}><summary>{item.question}<ChevronDown/></summary><p>{item.answer}</p></details>)}</div></section>
  <RecentlyViewed currentSlug={product.slug}/>
  </>; }

function ReviewsSection({product}:{product:Product}) { const x=getProductExperience(product); const distribution=[72,19,7,2,0]; return <section className="reviews-section" id="reviews"><div className="reviews-heading"><span className="commerce-kicker">STOREFRONT FEEDBACK</span><h2>Built for everyday customer moments.</h2><p>Sample storefront review content for layout preview; this is not imported from Google.</p></div><div className="review-summary"><strong>{x.rating}</strong><span>★★★★★</span><small>Based on {x.reviewCount} storefront reviews</small>{distribution.map((value,index)=><div className="rating-row" key={index}><label>{5-index} star</label><i><b style={{width:`${value}%`}}/></i><em>{value}%</em></div>)}</div><div className="review-cards">{x.reviews.map(review=><article key={review.id}><div><span>{"★".repeat(review.rating)}</span><small>{review.date}</small></div><h3>{review.title}</h3><p>{review.body}</p><footer><strong>{review.author}</strong>{review.verified&&<em><Check/> Verified purchase</em>}</footer></article>)}</div></section> }

function RecentlyViewed({currentSlug}:{currentSlug:string}) { const [items,setItems]=useState<Product[]>([]); useEffect(()=>{const timer=window.setTimeout(()=>{try{const slugs=JSON.parse(localStorage.getItem("biz365-recent")||"[]") as string[];setItems(slugs.filter(s=>s!==currentSlug).map(s=>products.find(p=>p.slug===s)).filter(Boolean) as Product[])}catch{}},0);return()=>window.clearTimeout(timer)},[currentSlug]); const shown=useMemo(()=>items.slice(0,3),[items]); if(!shown.length)return null; return <section className="recent-section"><div className="section-head"><div><span className="commerce-kicker">RECENTLY VIEWED</span><h2>Continue comparing</h2></div></div><div className="commerce-grid">{shown.map(item=><ProductCard product={item} key={item.slug}/>)}</div></section> }
