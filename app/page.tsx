import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeCheck, Check, HomeIcon, Nfc, Scissors, ShieldCheck, ShoppingBag, Smartphone, Sparkles, Star, Store, UtensilsCrossed } from "lucide-react";
import { SiteHeader } from "./site-header";
import { ProductVisual } from "./product-visual";
import { ProductCard } from "../components/commerce/product-card";
import { BrandLogo } from "../components/brand-logo";
import { QrCode } from "../components/qr-icon";
import { products } from "../lib/catalog";
import { industries as industryCatalog } from "../lib/industries";

const featured = products.filter((product) => product.featured).slice(0, 3);
const homeIndustryIcons = {
  restaurants: UtensilsCrossed,
  barbershops: Scissors,
  "retail-stores": Store,
  "real-estate": HomeIcon,
};
const industries = industryCatalog
  .filter((industry) => industry.slug in homeIndustryIcons)
  .map((industry) => ({
    ...industry,
    icon: homeIndustryIcons[industry.slug as keyof typeof homeIndustryIcons],
  }));

export default function Home() {
  return (
    <main className="premium-home">
      <div className="announcement">
        <span>Free U.S. shipping on orders $35+</span>
        <Link href="/shop">
          Explore the collection <ArrowRight />
        </Link>
      </div>
      <SiteHeader />
      <section className="premium-hero">
        <div className="mobile-hero-composite" aria-hidden="true" />
        <div className="hero-ambient hero-ambient-one" />
        <div className="hero-ambient hero-ambient-two" />
        <div className="shell premium-hero-grid">
          <div className="premium-hero-copy">
            <div className="premium-pill">
              <span />
              <strong>NFC + QR products for modern businesses</strong>
            </div>
            <h1>
              Make the review<br />moment <em>effortless.<span aria-hidden="true" /></em>
            </h1>
            <p>Premium countertop tools that let customers reach your review page with one simple NFC tap or QR scan—no app, no searching, no awkward instructions.</p>
            <div className="premium-hero-actions">
              <Link className="premium-button primary" href="/shop">
                Shop review products <ArrowRight />
              </Link>
              <Link className="premium-button secondary" href="/how-it-works">
                See how it works
              </Link>
            </div>
            <div className="premium-proof">
              <span>
                <BadgeCheck /> Standard designs, ready to order
              </span>
              <span>
                <Smartphone /> iPhone + Android
              </span>
            </div>
          </div>
          <div className="premium-hero-stage">
            <div className="stage-card stage-card-one">
              <Nfc />
              <span>
                <strong>Tap</strong>
                <small>with NFC</small>
              </span>
            </div>
            <div className="stage-card stage-card-two">
              <QrCode />
              <span>
                <strong>Scan</strong>
                <small>the QR code</small>
              </span>
            </div>
            <div className="hero-pedestal">
              <ProductVisual product={products[0]} tone="blue" priority />
            </div>
            <div className="stage-caption">
              <span>Google Review Stand</span>
              <strong>From $29</strong>
            </div>
          </div>
        </div>
        <div className="benefit-marquee">
          <div className="premium-benefit-row">
            <span>
              <ShieldCheck />
              <strong>No customer app</strong>
              <small>Nothing extra to download</small>
            </span>
            <span>
              <Nfc />
              <strong>NFC tap included</strong>
              <small>Fast, natural interaction</small>
            </span>
            <span>
              <QrCode />
              <strong>QR scan included</strong>
              <small>A visible second option</small>
            </span>
            <span>
              <Smartphone />
              <strong>Modern phone ready</strong>
              <small>Designed for iPhone + Android</small>
            </span>
            <span aria-hidden="true">
              <ShieldCheck />
              <strong>No customer app</strong>
              <small>Nothing extra to download</small>
            </span>
            <span aria-hidden="true">
              <Nfc />
              <strong>NFC tap included</strong>
              <small>Fast, natural interaction</small>
            </span>
            <span aria-hidden="true">
              <QrCode />
              <strong>QR scan included</strong>
              <small>A visible second option</small>
            </span>
            <span aria-hidden="true">
              <Smartphone />
              <strong>Modern phone ready</strong>
              <small>Designed for iPhone + Android</small>
            </span>
          </div>
        </div>
      </section>
      <section className="premium-section premium-collection shell">
        <div className="premium-section-head">
          <div>
            <span className="premium-overline">THE NFCPLATE COLLECTION</span>
            <h2>Designed to look right in your business.</h2>
            <p>Choose the format that fits the moment—from a polished counter stand to a card your team can carry.</p>
          </div>
          <Link href="/shop">
            Shop all products <ArrowRight />
          </Link>
        </div>
        <div className="commerce-grid premium-product-grid">
          {featured.map((product) => (
            <ProductCard product={product} key={product.slug} />
          ))}
        </div>
      </section>
      <section className="premium-how">
        <div className="shell premium-how-grid">
          <div className="premium-how-copy">
            <span className="premium-overline light">HOW IT WORKS</span>
            <h2>
              Two ways to connect.
              <br />
              One clear destination.
            </h2>
            <p>Customers choose the interaction that feels natural. Both NFC and QR lead to the same intended page.</p>
            <Link href="/how-it-works">
              Explore how NFCPlate works <ArrowRight />
            </Link>
          </div>
          <div className="premium-journey">
            <article>
              <span>01</span>
              <div>
                <strong>Place it</strong>
                <p>Set it where the customer experience naturally ends.</p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <strong>Tap or scan</strong>
                <p>Customers use NFC or their phone camera—no app required.</p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <strong>Reach the page</strong>
                <p>Your intended review or social destination opens directly.</p>
              </div>
            </article>
          </div>
          <div className="premium-device-demo">
            <div className="demo-halo" />
            <div className="demo-product">
              <BrandLogo markOnly />
              <strong>TAP</strong>
              <small>OR SCAN</small>
              <QrCode />
            </div>
            <div className="demo-phone-new">
              <span>Destination opened</span>
              <div>
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
              <strong>Ready for feedback</strong>
            </div>
          </div>
        </div>
      </section>
      <section className="premium-section business-section">
        <div className="shell">
          <div className="premium-section-head">
            <div>
              <span className="premium-overline">MADE FOR CUSTOMER-FACING BUSINESSES</span>
              <h2>At home in every customer moment.</h2>
              <p>See real NFCPlate products placed naturally in restaurants, barbershops, stores and client-facing work.</p>
            </div>
            <Link href="/industries">
              View all 10 industries <ArrowRight />
            </Link>
          </div>
          <div className="business-grid">
            {industries.map(({ slug, name, description, icon: Icon, image, imageAlt }, index) => (
              <article key={name}>
                <div className="business-media">
                  <Image src={image} alt={imageAlt} fill unoptimized sizes="(max-width: 760px) 84vw, (max-width: 1050px) 50vw, 25vw" priority={index < 2} />
                  <div className="business-media-shade" />
                  <span>
                    <Icon />
                  </span>
                </div>
                <div className="business-card-copy">
                  <small>0{index + 1}</small>
                  <h3>{name}</h3>
                  <p>{description}</p>
                  <Link href={`/industries#${slug}`}>
                    See it in context <ArrowRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="premium-quote shell">
        <div>
          <span className="premium-overline light">WHY NFCPLATE</span>
          <h2>Professional enough for the counter. Simple enough for every customer.</h2>
          <div className="quote-points">
            <span>
              <Check /> Premium standard designs
            </span>
            <span>
              <Check /> Tap and scan on every applicable product
            </span>
            <span>
              <Check /> Clear setup guidance
            </span>
          </div>
        </div>
        <Link className="premium-button white" href="/shop">
          Find your product <ArrowRight />
        </Link>
      </section>
      <footer className="footer premium-footer">
        <div className="shell footer-grid">
          <div className="footer-brand">
            <Link className="logo logo--light" href="/">
              <BrandLogo />
            </Link>
            <p>Premium NFC and QR products designed for better customer connections.</p>
          </div>
          <div>
            <strong>Shop</strong>
            <Link href="/collections/review-stands">Review stands</Link>
            <Link href="/collections/review-cards">Review cards</Link>
            <Link href="/collections/review-stickers">Stickers & plates</Link>
            <Link href="/collections/bundles">Bundles</Link>
          </div>
          <div>
            <strong>Learn</strong>
            <Link href="/how-it-works">How it works</Link>
            <Link href="/industries">For businesses</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/faq">FAQs</Link>
          </div>
          <div>
            <strong>Support</strong>
            <Link href="/setup">Product setup</Link>
            <Link href="/nfc-compatibility">Compatibility</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/cart">Your cart</Link>
          </div>
          <div className="footer-promise">
            <strong>Tap or scan.</strong>
            <p>Two simple ways to reach the same intended destination.</p>
            <div>
              <Nfc />
              <QrCode />
            </div>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© 2026 NFCPlate</span>
          <span>Not affiliated with or endorsed by Google.</span>
          <div>
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </footer>
      <nav className="mobile-home-dock" aria-label="Mobile quick navigation">
        <Link className="active" href="/">
          <HomeIcon />
          <span>Home</span>
        </Link>
        <Link href="/shop">
          <Sparkles />
          <span>Shop</span>
        </Link>
        <Link className="dock-primary" href="/products/google-review-stand">
          <Nfc />
          <span>Tap + Scan</span>
        </Link>
        <Link href="/how-it-works">
          <QrCode />
          <span>How it works</span>
        </Link>
        <Link href="/cart">
          <ShoppingBag />
          <span>Cart</span>
        </Link>
      </nav>
    </main>
  );
}
