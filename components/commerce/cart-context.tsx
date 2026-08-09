"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { getProduct } from "../../lib/catalog";

export type CartItem = { productSlug: string; variantId: string; quantity: number };
type CartContextValue = { items: CartItem[]; count: number; open: boolean; setOpen: (open: boolean) => void; addItem: (item: CartItem) => void; updateItem: (slug: string, variant: string, quantity: number) => void; removeItem: (slug: string, variant: string) => void };
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => { const timer=window.setTimeout(()=>{try { const stored = localStorage.getItem("biz365-cart"); if (stored) setItems(JSON.parse(stored)); } catch {}},0); return()=>window.clearTimeout(timer) }, []);
  useEffect(() => { localStorage.setItem("biz365-cart", JSON.stringify(items)); }, [items]);
  const value = useMemo<CartContextValue>(() => ({
    items, open, setOpen, count: items.reduce((sum, item) => sum + item.quantity, 0),
    addItem: (next) => { setItems(current => { const existing = current.find(item => item.productSlug === next.productSlug && item.variantId === next.variantId); return existing ? current.map(item => item === existing ? { ...item, quantity: item.quantity + next.quantity } : item) : [...current, next]; }); setOpen(true); },
    updateItem: (slug, variant, quantity) => setItems(current => quantity < 1 ? current.filter(item => !(item.productSlug === slug && item.variantId === variant)) : current.map(item => item.productSlug === slug && item.variantId === variant ? { ...item, quantity } : item)),
    removeItem: (slug, variant) => setItems(current => current.filter(item => !(item.productSlug === slug && item.variantId === variant))),
  }), [items, open]);
  return <CartContext.Provider value={value}>{children}<CartDrawer /></CartContext.Provider>;
}

export function useCart() { const context = useContext(CartContext); if (!context) throw new Error("useCart must be inside CartProvider"); return context; }

function CartDrawer() {
  const { items, open, setOpen, updateItem, removeItem } = useCart();
  const subtotal = items.reduce((sum, item) => { const product = getProduct(item.productSlug); const variant = product?.variants.find(v => v.id === item.variantId); return sum + (variant?.price ?? 0) * item.quantity; }, 0);
  return <>
    {open && <button className="cart-backdrop" aria-label="Close cart" onClick={() => setOpen(false)} />}
    <aside className={`cart-drawer ${open ? "cart-drawer--open" : ""}`} aria-hidden={!open} aria-label="Shopping cart">
      <div className="cart-drawer__head"><div><span>YOUR CART</span><h2>{items.length ? `${items.length} product${items.length > 1 ? "s" : ""}` : "Your cart is empty"}</h2></div><button aria-label="Close cart" onClick={() => setOpen(false)}><X /></button></div>
      <div className="cart-drawer__body">{items.length === 0 ? <div className="empty-cart"><ShoppingBag /><h3>Ready when you are.</h3><p>Add a tap-or-scan product and it will appear here.</p><Link href="/shop" onClick={() => setOpen(false)}>Explore products</Link></div> : items.map(item => { const product = getProduct(item.productSlug)!; const variant = product.variants.find(v => v.id === item.variantId)!; return <div className="cart-line" key={`${item.productSlug}-${item.variantId}`}><div className={`cart-thumb cart-thumb--${product.tone}`}><span>B</span></div><div><strong>{product.name}</strong><small>{variant.name}</small><div className="cart-qty"><button onClick={() => updateItem(item.productSlug, item.variantId, item.quantity - 1)}><Minus /></button><span>{item.quantity}</span><button onClick={() => updateItem(item.productSlug, item.variantId, item.quantity + 1)}><Plus /></button></div></div><div className="cart-line__end"><strong>${(variant.price * item.quantity).toFixed(2)}</strong><button aria-label={`Remove ${product.name}`} onClick={() => removeItem(item.productSlug, item.variantId)}><Trash2 /></button></div></div> })}</div>
      {items.length > 0 && <div className="cart-drawer__foot"><div><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div><p>Taxes and shipping calculated at checkout.</p><button>Continue to checkout</button><Link href="/shop" onClick={() => setOpen(false)}>Continue shopping</Link></div>}
    </aside>
  </>;
}
