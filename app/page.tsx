import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  CreditCard,
  MessageSquareText,
  Nfc,
  QrCode,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Store,
  Zap,
} from "lucide-react";
import { SiteHeader } from "./site-header";
import { ProductVisual } from "./product-visual";

const products = [
  { name: "Google Review Stand", kind: "Counter Stand", price: "$29.00", tone: "blue", badge: "BEST SELLER" },
  { name: "Google Review Card", kind: "Pocket Card", price: "$14.00", tone: "black", badge: "ON THE GO" },
  { name: "Review Starter Bundle", kind: "Stand + Card", price: "$39.00", tone: "white", badge: "SAVE 12%" },
];

const industries = ["Restaurants", "Salons", "Dental offices", "Auto services", "Fitness studios", "Retail stores"];

export default function Home() {
  return (
    <main>
      <div className="announcement">
        <span><Sparkles size={14} /> Launch offer: Free U.S. shipping on orders $35+</span>
        <Link href="/shop">Shop now <ArrowRight size={14} /></Link>
      </div>
      <SiteHeader />

      <section className="hero">
        <div className="hero-orb hero-orb--one" />
        <div className="hero-orb hero-orb--two" />
        <div className="shell hero-grid">
          <div className="hero-content">
            <div className="eyebrow"><span className="eyebrow-dot" /> Smart tools for growing businesses</div>
            <h1>More reviews.<br /><span>One simple tap—or scan.</span></h1>
            <p className="hero-lead">Turn happy customers into lasting credibility with NFC-powered review products built for the front counter.</p>
            <div className="hero-actions">
              <Link className="button button--primary" href="/shop">Shop review products <ArrowRight size={17} /></Link>
              <Link className="button button--ghost" href="/how-it-works"><span className="play">▶</span> See how it works</Link>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack"><span>JD</span><span>MK</span><span>AP</span><span>+</span></div>
              <div><div className="stars">★★★★★</div><p>Designed for everyday business use</p></div>
            </div>
          </div>
          <div className="hero-product">
            <div className="float-note float-note--top"><span><Zap size={16} /></span><div><strong>Instant connection</strong><small>No app required</small></div></div>
            <ProductVisual />
            <div className="float-note float-note--bottom"><span><BadgeCheck size={17} /></span><div><strong>Works with NFC + QR</strong><small>iPhone &amp; Android</small></div></div>
          </div>
        </div>
        <div className="shell confidence-bar">
          <span><ShieldCheck size={18} /> Secure checkout</span>
          <span><Smartphone size={18} /> iPhone &amp; Android</span>
          <span><QrCode size={18} /> NFC + QR backup</span>
          <span><CreditCard size={18} /> No app needed</span>
        </div>
      </section>

      <section className="section shell">
        <div className="section-head">
          <div><p className="kicker">SHOP BEST SELLERS</p><h2>Small tools. Big business impact.</h2></div>
          <Link className="text-link" href="/shop">View all products <ArrowRight size={16} /></Link>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.name}>
              <div className="product-card__media">
                <span className="product-badge">{product.badge}</span>
                <button className="quick-add" aria-label={`Quick add ${product.name}`}>+</button>
                <ProductVisual tone={product.tone} compact />
              </div>
              <div className="product-card__body">
                <div><span>{product.kind}</span><h3>{product.name}</h3></div>
                <strong>{product.price}</strong>
              </div>
              <div className="product-rating"><span>★★★★★</span> Built for daily use</div>
            </article>
          ))}
        </div>
      </section>

      <section className="how-section">
        <div className="shell how-grid">
          <div className="how-demo">
            <div className="phone">
              <div className="phone-island" />
              <div className="phone-screen">
                <div className="google-g">G</div>
                <small>How was your experience?</small>
                <strong>Clean &amp; Co.</strong>
                <div className="review-stars"><Star /><Star /><Star /><Star /><Star /></div>
                <button>Post review</button>
              </div>
            </div>
            <div className="tap-card"><Nfc /><strong>TAP</strong><small>to review</small></div>
            <div className="signal s1" /><div className="signal s2" /><div className="signal s3" />
          </div>
          <div className="how-content">
            <p className="kicker">HOW IT WORKS</p>
            <h2>From happy customer to new review—in seconds.</h2>
            <p>Remove the searching, typing and “I’ll do it later.” Biz365 puts your review page right where the moment happens.</p>
            <ol className="steps">
              <li><span>01</span><div><strong>Place it</strong><p>Set your Biz365 product where customers naturally finish their visit.</p></div></li>
              <li><span>02</span><div><strong>Tap or scan</strong><p>Customers use NFC or the QR code with their own phone.</p></div></li>
              <li><span>03</span><div><strong>Leave a review</strong><p>Your genuine review page opens directly—no app or searching.</p></div></li>
            </ol>
            <Link className="text-link text-link--light" href="/how-it-works">Learn how Biz365 works <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="section shell industry-section">
        <div className="industry-intro">
          <p className="kicker">BUILT FOR REAL BUSINESSES</p>
          <h2>Meet customers where<br />business happens.</h2>
          <p>At the counter, front desk or checkout—make your next review the easiest one to leave.</p>
          <Link className="button button--dark" href="/industries">Explore industries <ArrowRight size={17} /></Link>
        </div>
        <div className="industry-grid">
          {industries.map((industry, i) => (
            <Link href={`/industries/${industry.toLowerCase().replaceAll(" ", "-")}`} className={`industry-card industry-card--${i + 1}`} key={industry}>
              <span>{i % 3 === 0 ? <Store /> : i % 3 === 1 ? <MessageSquareText /> : <Star />}</span>
              <strong>{industry}</strong><ChevronRight size={18} />
            </Link>
          ))}
        </div>
      </section>

      <section className="cta-section shell">
        <div className="cta-copy"><span className="cta-icon"><Nfc /></span><div><p className="kicker">READY WHEN YOU ARE</p><h2>Make every happy customer count.</h2><p>Put your review page one tap or scan away.</p></div></div>
        <Link className="button button--white" href="/shop">Shop Biz365 <ArrowRight size={17} /></Link>
      </section>

      <footer className="footer">
        <div className="shell footer-grid">
          <div className="footer-brand"><Link className="logo logo--light" href="/"><span>B</span><strong>Biz365</strong></Link><p>Smart, simple tools that help businesses build trust and grow every day.</p><div className="footer-pills"><span>NFC</span><span>QR</span><span>SSL</span></div></div>
          <div><strong>Shop</strong><Link href="/collections/review-stands">Review stands</Link><Link href="/collections/review-cards">Review cards</Link><Link href="/collections/review-stickers">Stickers &amp; plates</Link><Link href="/collections/bundles">Bundles</Link></div>
          <div><strong>Discover</strong><Link href="/how-it-works">How it works</Link><Link href="/industries">Industries</Link><Link href="/guides">Guides</Link><Link href="/nfc-compatibility">Compatibility</Link></div>
          <div><strong>Help</strong><Link href="/faq">FAQs</Link><Link href="/setup">Product setup</Link><Link href="/track-order">Track order</Link><Link href="/contact">Contact us</Link></div>
          <div className="newsletter"><strong>Growth tips, minus the noise.</strong><p>Practical ideas for earning more customer trust.</p><form><input type="email" placeholder="Email address" aria-label="Email address" /><button aria-label="Subscribe"><ArrowRight /></button></form></div>
        </div>
        <div className="shell footer-bottom"><span>© 2026 Biz365. All rights reserved.</span><span>Not affiliated with or endorsed by Google.</span><div><Link href="/privacy-policy">Privacy</Link><Link href="/terms">Terms</Link></div></div>
      </footer>
    </main>
  );
}
