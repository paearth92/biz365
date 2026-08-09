"use client";

import Link from "next/link";
import { ChevronDown, Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../components/commerce/cart-context";

const products=[
  ["Review stands","/collections/review-stands","Premium counter displays"],
  ["Review cards","/collections/review-cards","Portable tap-or-scan cards"],
  ["Stickers & plates","/collections/review-stickers","Low-profile touchpoints"],
  ["Business bundles","/collections/bundles","Cover more customer moments"],
];

export function SiteHeader(){const [open,setOpen]=useState(false);const {count,setOpen:setCartOpen}=useCart();return <header className="site-header"><div className="shell header-inner"><Link className="logo" href="/" aria-label="Biz365 home"><span>B</span><strong>Biz365</strong></Link><nav className="desktop-nav" aria-label="Main navigation"><div className="nav-group"><button>Shop <ChevronDown/></button><div className="dropdown premium-menu"><p>Shop tap-or-scan products</p>{products.map(([label,href,copy])=><Link href={href} key={href}><span><strong>{label}</strong><small>{copy}</small></span><em>→</em></Link>)}<Link className="menu-all" href="/shop"><span><strong>Shop all products</strong><small>Explore the complete collection</small></span><em>→</em></Link></div></div><Link href="/how-it-works">How it works</Link><Link href="/industries">For businesses</Link><Link href="/guides">Guides</Link></nav><div className="header-actions"><Link className="header-shop-link" href="/shop">Shop products</Link><button aria-label={`Open cart with ${count} items`} className="cart-icon" onClick={()=>setCartOpen(true)}><ShoppingBag/><span>{count}</span></button><button className="menu-toggle" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button></div></div>{open&&<nav className="mobile-nav" aria-label="Mobile navigation"><Link className="mobile-shop" href="/shop" onClick={()=>setOpen(false)}>Shop all products <span>→</span></Link><details><summary>Products <ChevronDown/></summary>{products.map(([label,href])=><Link href={href} key={href} onClick={()=>setOpen(false)}>{label}</Link>)}</details><Link href="/how-it-works" onClick={()=>setOpen(false)}>How it works</Link><Link href="/industries" onClick={()=>setOpen(false)}>For businesses</Link><Link href="/guides" onClick={()=>setOpen(false)}>Guides</Link><Link href="/cart" onClick={()=>setOpen(false)}>View cart ({count})</Link></nav>}</header>}
