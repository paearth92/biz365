"use client";

import Link from "next/link";
import { ChevronDown, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";

const menuItems = [
  { label: "Products", links: ["Review Stands", "Review Cards", "Stickers & Plates", "Product Bundles"] },
  { label: "Solutions", links: ["Get Google Reviews", "Grow on Instagram", "Connect on Facebook", "Multi-Link Products"] },
  { label: "Industries", links: ["Restaurants", "Salons & Barbers", "Dental Offices", "Auto Services"] },
  { label: "Resources", links: ["How NFC Works", "Review Link Generator", "Product Setup", "FAQs"] },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="logo" href="/"><span>B</span><strong>Biz365</strong></Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/shop">Shop</Link>
          {menuItems.map((item) => <div className="nav-group" key={item.label}><button>{item.label}<ChevronDown size={14} /></button><div className="dropdown"><p>{item.label}</p>{item.links.map(link => <Link href={`/${link.toLowerCase().replaceAll(" & ", "-").replaceAll(" ", "-")}`} key={link}>{link}<span>→</span></Link>)}</div></div>)}
          <Link href="/how-it-works">How It Works</Link>
        </nav>
        <div className="header-actions">
          <button aria-label="Search"><Search size={19} /></button>
          <Link href="/account" aria-label="Account"><UserRound size={19} /></Link>
          <Link href="/cart" aria-label="Cart" className="cart-icon"><ShoppingBag size={19} /><span>0</span></Link>
          <Link href="/shop" className="header-cta">Shop now</Link>
          <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && <nav className="mobile-nav" aria-label="Mobile navigation"><Link href="/shop">Shop all products</Link>{menuItems.map(item => <details key={item.label}><summary>{item.label}<ChevronDown size={16} /></summary>{item.links.map(link => <Link href={`/${link.toLowerCase().replaceAll(" & ", "-").replaceAll(" ", "-")}`} key={link}>{link}</Link>)}</details>)}<Link href="/how-it-works">How It Works</Link></nav>}
    </header>
  );
}
