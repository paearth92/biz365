import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Nfc, QrCode } from "lucide-react";
import { SiteHeader } from "../site-header";
import { ProductBrowser } from "../../components/commerce/product-browser";
import { products, collections } from "../../lib/catalog";

export const metadata: Metadata = { title: "Shop NFC + QR Business Products | Biz365", description: "Shop premium Biz365 NFC and QR review stands, cards, stickers, plates and bundles for customer-facing businesses." };

export default function ShopPage() { return <main><div className="announcement"><span>Free U.S. shipping on orders $35+</span><Link href="/how-it-works">How it works <ArrowRight size={14}/></Link></div><SiteHeader />
  <section className="shop-hero"><div className="shell"><div className="shop-hero__copy"><nav className="breadcrumbs"><Link href="/">Home</Link><span>/</span><strong>Shop</strong></nav><span className="commerce-kicker">BIZ365 SHOP</span><h1>Smart tools for stronger customer connections.</h1><p>Professional products that put your business destination one NFC tap or QR scan away.</p></div><div className="shop-hero__art"><div className="shop-art-card"><span>B</span><strong>Tap</strong><small>or scan</small><Nfc/><QrCode/></div><div className="shop-art-ring ring-one"/><div className="shop-art-ring ring-two"/></div></div></section>
  <nav className="category-nav shell" aria-label="Shop categories"><Link href="/shop" className="active">Shop all</Link>{Object.entries(collections).map(([slug,c])=><Link href={`/collections/${slug}`} key={slug}>{c.name}</Link>)}</nav>
  <section className="shop-content shell"><ProductBrowser products={products}/></section>
  <section className="shop-confidence"><div className="shell"><span><Nfc/>Tap with NFC</span><span><QrCode/>Scan the QR</span><strong>Two simple ways to connect.</strong><Link href="/how-it-works">See how it works <ArrowRight/></Link></div></section>
</main> }
