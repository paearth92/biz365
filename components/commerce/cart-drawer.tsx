"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { getProduct } from "../../lib/catalog";
import { useCart } from "./cart-context";

export function CartDrawer() {
  const { items, open, setOpen, updateItem, removeItem } = useCart();

  const subtotal = items.reduce((sum, item) => {
    const product = getProduct(item.productSlug);
    const variant = product?.variants.find((v) => v.id === item.variantId);
    return sum + (variant?.price ?? 0) * item.quantity;
  }, 0);

  const remaining = Math.max(0, 35 - subtotal);

  return (
    <>
      {open && (
        <button className="cart-backdrop" aria-label="Close cart" onClick={() => setOpen(false)} />
      )}
      <aside
        className={`cart-drawer ${open ? "cart-drawer--open" : ""}`}
        aria-hidden={!open}
        aria-label="Shopping cart"
      >
        <div className="cart-drawer__head">
          <div>
            <span>YOUR CART</span>
            <h2>
              {items.length
                ? `${items.length} product${items.length > 1 ? "s" : ""}`
                : "Your cart is empty"}
            </h2>
          </div>
          <button aria-label="Close cart" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag />
              <h3>Ready when you are.</h3>
              <p>Add a tap-or-scan product and it will appear here.</p>
              <Link href="/shop" onClick={() => setOpen(false)}>
                Explore products
              </Link>
            </div>
          ) : (
            items.map((item) => {
              const product = getProduct(item.productSlug)!;
              const variant = product.variants.find((v) => v.id === item.variantId)!;
              return (
                <div className="cart-line" key={`${item.productSlug}-${item.variantId}`}>
                  <div className={`cart-thumb cart-thumb--${product.tone}`}>
                    <Image
                      src={product.image}
                      alt=""
                      width={150}
                      height={150}
                      sizes="70px"
                      unoptimized
                    />
                  </div>
                  <div>
                    <strong>{product.name}</strong>
                    <small>{variant.name}</small>
                    <div className="cart-qty">
                      <button
                        onClick={() => updateItem(item.productSlug, item.variantId, item.quantity - 1)}
                      >
                        <Minus />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateItem(item.productSlug, item.variantId, item.quantity + 1)}
                      >
                        <Plus />
                      </button>
                    </div>
                  </div>
                  <div className="cart-line__end">
                    <strong>${(variant.price * item.quantity).toFixed(2)}</strong>
                    <button
                      aria-label={`Remove ${product.name}`}
                      onClick={() => removeItem(item.productSlug, item.variantId)}
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-drawer__foot">
            <div className="drawer-shipping">
              <span>
                {remaining > 0
                  ? `$${remaining.toFixed(2)} away from free U.S. shipping`
                  : "You qualify for free U.S. shipping"}
              </span>
              <i>
                <b style={{ width: `${Math.min(100, (subtotal / 35) * 100)}%` }} />
              </i>
            </div>
            <div>
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <p>Taxes and final shipping are calculated later.</p>
            <Link className="drawer-checkout" href="/checkout" onClick={() => setOpen(false)}>
              Continue to checkout
            </Link>
            <Link className="drawer-view-cart" href="/cart" onClick={() => setOpen(false)}>
              View cart
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
