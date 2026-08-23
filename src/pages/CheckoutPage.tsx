import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, Lock } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { AnnouncementBar } from "../components/AnnouncementBar";
import { SiteFooter } from "../components/SiteFooter";
import { useCart } from "../lib/cart-context";
import { getProduct } from "../lib/catalog";

export function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
    state: "",
  });

  useEffect(() => {
    document.title = "Checkout | NFCPlate";
  }, []);

  if (placed) {
    return (
      <main>
        <AnnouncementBar link="/shop" label="Shop now" />
        <SiteHeader />
        <div className="cart-page">
          <div className="shell" style={{ textAlign: "center", padding: "80px 20px" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "#e8f5e9",
                color: "#2e7d32",
                display: "grid",
                placeItems: "center",
                margin: "0 auto 20px",
              }}
            >
              <Check size={32} />
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 12px" }}>Order placed!</h1>
            <p style={{ color: "#536177", maxWidth: 400, margin: "0 auto 24px" }}>
              Thank you for your order. We'll send a confirmation to your email shortly.
            </p>
            <Link to="/shop" className="premium-button primary">
              Continue shopping
            </Link>
          </div>
        </div>
        <SiteFooter />
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main>
        <AnnouncementBar link="/shop" label="Shop now" />
        <SiteHeader />
        <div className="cart-page">
          <div className="shell">
            <h1>Checkout</h1>
            <div className="cart-page-empty">
              <p>Your cart is empty. Add some products first.</p>
              <Link to="/shop" className="premium-button primary">
                Shop products
              </Link>
            </div>
          </div>
        </div>
        <SiteFooter />
      </main>
    );
  }

  const shipping = subtotal >= 35 ? 0 : 4.99;
  const total = subtotal + shipping;

  return (
    <main>
      <AnnouncementBar link="/shop" label="Shop now" />
      <SiteHeader />
      <div className="checkout-page">
        <div className="shell">
          <h1>Checkout</h1>
          <div className="checkout-grid">
            <form
              className="checkout-form"
              onSubmit={(e) => {
                e.preventDefault();
                clear();
                setPlaced(true);
              }}
            >
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First name</label>
                  <input
                    id="firstName"
                    required
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    id="lastName"
                    required
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="address">Shipping address</label>
                <input
                  id="address"
                  required
                  placeholder="123 Main St"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    id="state"
                    required
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="zip">ZIP code</label>
                <input
                  id="zip"
                  required
                  value={form.zip}
                  onChange={(e) => setForm({ ...form, zip: e.target.value })}
                />
              </div>
              <button type="submit" className="checkout-place-btn">
                <Lock size={16} /> Place order — ${total.toFixed(2)}
              </button>
            </form>
            <div className="order-summary">
              <h3>Order summary</h3>
              {items.map((item) => {
                const product = getProduct(item.productSlug);
                const variant = product?.variants.find((v) => v.id === item.variantId);
                if (!product || !variant) return null;
                return (
                  <div className="order-summary-item" key={`${item.productSlug}-${item.variantId}`}>
                    <span>
                      {product.name} × {item.quantity}
                    </span>
                    <strong>${(variant.price * item.quantity).toFixed(2)}</strong>
                  </div>
                );
              })}
              <div className="order-summary-item">
                <span>Shipping</span>
                <strong>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</strong>
              </div>
              <div className="order-summary-total">
                <span>Total</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
