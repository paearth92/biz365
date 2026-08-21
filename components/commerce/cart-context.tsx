"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProduct } from "../../lib/catalog";
import { CartDrawer } from "./cart-drawer";

export type CartItem = { productSlug: string; variantId: string; quantity: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  addItem: (item: CartItem) => void;
  updateItem: (slug: string, variant: string, quantity: number) => void;
  removeItem: (slug: string, variant: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const CART_STORAGE_KEY = "biz365-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (!stored) return;
        const parsed = JSON.parse(stored) as CartItem[];
        const valid = parsed
          .filter((item) => {
            const product = getProduct(item.productSlug);
            return Boolean(
              product?.variants.some((v) => v.id === item.variantId && v.inStock),
            ) && item.quantity > 0;
          })
          .map((item) => ({ ...item, quantity: Math.max(1, Math.floor(item.quantity)) }));
        setItems(valid);
      } catch {
        // ignore malformed cart data
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    open,
    setOpen,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    addItem: (next) => {
      const product = getProduct(next.productSlug);
      if (!product?.variants.some((v) => v.id === next.variantId && v.inStock)) return;
      const safe = { ...next, quantity: Math.max(1, Math.floor(next.quantity)) };
      setItems((current) => {
        const existing = current.find(
          (item) => item.productSlug === safe.productSlug && item.variantId === safe.variantId,
        );
        if (existing) {
          return current.map((item) =>
            item === existing ? { ...item, quantity: item.quantity + safe.quantity } : item,
          );
        }
        return [...current, safe];
      });
      setOpen(true);
    },
    updateItem: (slug, variant, quantity) =>
      setItems((current) =>
        quantity < 1
          ? current.filter((item) => !(item.productSlug === slug && item.variantId === variant))
          : current.map((item) =>
              item.productSlug === slug && item.variantId === variant ? { ...item, quantity } : item,
            ),
      ),
    removeItem: (slug, variant) =>
      setItems((current) =>
        current.filter((item) => !(item.productSlug === slug && item.variantId === variant)),
      ),
  }), [items, open]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be inside CartProvider");
  return context;
}
