import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Check, ShoppingBag, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { AnnouncementBar } from "../components/AnnouncementBar";
import { SiteFooter } from "../components/SiteFooter";
import { ProductVisual } from "../components/ProductVisual";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../lib/cart-context";
import { getProduct, products as allProducts } from "../lib/catalog";

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProduct(slug) : undefined;
  const { addItem, setOpen: setCartOpen } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      document.title = product.seoTitle;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", product.seoDescription);
    }
    setSelectedVariantId(0);
    setQuantity(1);
  }, [slug, product]);

  if (!product) {
    return (
      <main>
        <AnnouncementBar link="/shop" label="Shop now" />
        <SiteHeader />
        <div className="page-not-found">
          <h1>Product not found</h1>
          <p>The product you're looking for doesn't exist or has been moved.</p>
          <Link to="/shop" className="premium-button primary">
            Back to shop
          </Link>
        </div>
        <SiteFooter />
      </main>
    );
  }

  const variant = product.variants[selectedVariantId];
  const related = product.relatedProductSlugs
    .map((s) => getProduct(s))
    .filter(Boolean)
    .slice(0, 3);

  return (
    <main>
      <AnnouncementBar link="/shop" label="Shop now" />
      <SiteHeader />
      <section className="product-detail">
        <div className="shell">
          <nav className="breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/shop">Shop</Link>
            <span>/</span>
            <strong>{product.name}</strong>
          </nav>
          <div className="product-detail-grid" style={{ marginTop: "30px" }}>
            <div className="product-gallery">
              <div className="product-gallery-main">
                <ProductVisual product={product} />
              </div>
            </div>
            <div className="product-info">
              <p className="category-label">{product.categoryLabel}</p>
              <h1>{product.name}</h1>
              <p className="short-desc">{product.shortDescription}</p>
              <div className="product-price-row">
                <strong>${variant.price}</strong>
                {variant.compareAtPrice && (
                  <s>${variant.compareAtPrice}</s>
                )}
              </div>
              {product.variants.length > 1 && (
                <div className="variant-selector">
                  {product.variants.map((v, i) => (
                    <button
                      key={v.id}
                      className={`variant-option ${i === selectedVariantId ? "active" : ""}`}
                      onClick={() => setSelectedVariantId(i)}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              )}
              <ul className="product-features">
                {product.features.map((feature) => (
                  <li key={feature}>
                    <Check size={18} /> {feature}
                  </li>
                ))}
              </ul>
              <table className="spec-table">
                <tbody>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key}>
                      <th>{key}</th>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="buy-row">
                <div className="quantity-selector">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <button
                  className="buy-button"
                  onClick={() => {
                    addItem({ productSlug: product.slug, variantId: variant.id, quantity });
                    setCartOpen(true);
                  }}
                >
                  <ShoppingBag size={18} /> Add to cart
                </button>
              </div>
              <div className="trust-strip">
                <span>
                  <Truck size={18} /> Free shipping over $35
                </span>
                <span>
                  <RotateCcw size={18} /> 30-day returns
                </span>
                <span>
                  <ShieldCheck size={18} /> NFC + QR built in
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="related-products">
          <div className="shell">
            <div className="premium-section-head">
              <div>
                <p className="commerce-kicker">RELATED PRODUCTS</p>
                <h2>You might also like</h2>
              </div>
            </div>
            <div className="featured-grid">
              {related.map((p) => (
                <ProductCard key={p!.id} product={p!} />
              ))}
            </div>
          </div>
        </section>
      )}
      <SiteFooter />
      <div className="mobile-buy-bar">
        <span className="price">${variant.price}</span>
        <button
          className="buy-button"
          onClick={() => {
            addItem({ productSlug: product.slug, variantId: variant.id, quantity });
            setCartOpen(true);
          }}
        >
          <ShoppingBag size={18} /> Add to cart
        </button>
      </div>
    </main>
  );
}
