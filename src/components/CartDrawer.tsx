import { useEffect } from "react";
import { Link } from "react-router-dom";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../lib/cart-context";
import { getProduct } from "../lib/catalog";

export function CartDrawer() {
  const { items, count, subtotal, open, setOpen, updateItem, removeItem } = useCart();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className={`cart-drawer-overlay ${open ? "open" : ""}`}
        onClick={() => setOpen(false)}
      />
      <aside className={`cart-drawer ${open ? "open" : ""}`}>
        <div className="cart-drawer-header">
          <h2>Your cart ({count})</h2>
          <button className="cart-drawer-close" onClick={() => setOpen(false)} aria-label="Close cart">
            <X size={16} />
          </button>
        </div>
        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="cart-drawer-empty">
              <ShoppingBag />
              <p>Your cart is empty.</p>
              <Link to="/shop" onClick={() => setOpen(false)}>
                Browse products
              </Link>
            </div>
          ) : (
            items.map((item) => {
              const product = getProduct(item.productSlug);
              const variant = product?.variants.find((v) => v.id === item.variantId);
              if (!product || !variant) return null;
              return (
                <div
                  className="cart-item"
                  key={`${item.productSlug}-${item.variantId}`}
                >
                  <div className="cart-item__img">
                    <img src={product.image} alt={product.imageAlt} />
                  </div>
                  <div className="cart-item__info">
                    <h4>{product.name}</h4>
                    <small>{variant.name}</small>
                    <div className="cart-item__qty">
                      <button onClick={() => updateItem(item.productSlug, item.variantId, item.quantity - 1)}>
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateItem(item.productSlug, item.variantId, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-item__price">
                    <strong>${(variant.price * item.quantity).toFixed(2)}</strong>
                    <button onClick={() => removeItem(item.productSlug, item.variantId)}>
                      <Trash2 size={13} /> Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal-row">
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <Link
              to="/checkout"
              className="cart-checkout-btn"
              onClick={() => setOpen(false)}
            >
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
