import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { AnnouncementBar } from "../components/AnnouncementBar";
import { SiteFooter } from "../components/SiteFooter";
import { useCart } from "../lib/cart-context";
import { getProduct } from "../lib/catalog";

export function CartPage() {
  const { items, subtotal, updateItem, removeItem } = useCart();

  useEffect(() => {
    document.title = "Your Cart | NFCPlate";
  }, []);

  if (items.length === 0) {
    return (
      <main>
        <AnnouncementBar link="/shop" label="Shop now" />
        <SiteHeader />
        <div className="cart-page">
          <div className="shell">
            <h1>Your cart</h1>
            <div className="cart-page-empty">
              <ShoppingBag size={64} />
              <h2>Your cart is empty</h2>
              <p>Browse our NFC and QR review products to get started.</p>
              <Link to="/shop" className="premium-button primary">
                Shop products <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
        <SiteFooter />
      </main>
    );
  }

  return (
    <main>
      <AnnouncementBar link="/shop" label="Shop now" />
      <SiteHeader />
      <div className="cart-page">
        <div className="shell">
          <h1>Your cart</h1>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {items.map((item) => {
              const product = getProduct(item.productSlug);
              const variant = product?.variants.find((v) => v.id === item.variantId);
              if (!product || !variant) return null;
              return (
                <div
                  className="cart-item"
                  key={`${item.productSlug}-${item.variantId}`}
                  style={{ borderBottom: "1px solid #edf1f6", paddingBottom: "16px" }}
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
            })}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "30px",
            }}
          >
            <div>
              <span style={{ fontSize: "14px", color: "#536177" }}>Subtotal </span>
              <strong style={{ fontSize: "24px", fontWeight: 800 }}>${subtotal.toFixed(2)}</strong>
            </div>
            <Link to="/checkout" className="premium-button primary">
              Checkout <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
