import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CreditCard, Layers as Layers3, Nfc, Smartphone, Sticker } from "lucide-react";
import { SiteHeader } from "../site-header";
import { AnnouncementBar } from "../../components/announcement-bar";
import { SiteFooter } from "../../components/site-footer";
import { QrCode } from "../../components/qr-icon";
import { industries } from "../../lib/industries";

export const metadata: Metadata = {
  title: "NFC Review Products by Industry | NFCPlate",
  description: "See how NFCPlate NFC and QR review stands, cards, stickers and plates fit restaurants, cafés, bars, barbershops, salons, retail, gyms, real estate, events and offices.",
};

const formats = [
  {
    icon: Layers3,
    name: "Counter stands",
    copy: "Visible at host desks, registers and reception counters.",
    href: "/collections/review-stands",
  },
  {
    icon: CreditCard,
    name: "Review cards",
    copy: "Portable for appointments, showings and personal handoffs.",
    href: "/collections/review-cards",
  },
  {
    icon: Sticker,
    name: "Stickers & plates",
    copy: "Low-profile or fixed placement on customer-facing surfaces.",
    href: "/collections/review-stickers",
  },
];

export default function IndustriesPage() {
  return (
    <main className="industries-page">
      <AnnouncementBar link="/shop" label="Explore the collection" />
      <SiteHeader />

      <section className="industries-hero">
        <div className="industries-hero-pattern" />
        <div className="shell industries-hero-grid">
          <div className="industries-hero-copy">
            <span className="premium-overline light">BUILT FOR REAL CUSTOMER MOMENTS</span>
            <h1>
              One simple interaction.
              <br />
              <em>Ten different businesses.</em>
            </h1>
            <p>See where an NFCPlate stand, card, sticker or plate fits naturally into the way your customers already visit, pay and leave.</p>
            <div className="industries-hero-actions">
              <Link className="premium-button white" href="#industry-grid">
                Find your industry <ArrowRight />
              </Link>
              <Link className="industries-text-link" href="/shop">
                Shop all products
              </Link>
            </div>
            <div className="industries-hero-proof">
              <span>
                <Nfc /> NFC tap
              </span>
              <span>
                <QrCode /> QR scan
              </span>
              <span>
                <Smartphone /> No customer app
              </span>
            </div>
          </div>
          <div className="industries-hero-media">
            <Image src={industries[0].image} alt={industries[0].imageAlt} fill priority unoptimized sizes="(max-width: 760px) 100vw, 50vw" />
            <div className="industries-hero-card">
              <span>Featured placement</span>
              <strong>Review stand at the host counter</strong>
            </div>
          </div>
        </div>
        <nav className="shell industry-jump" aria-label="Jump to an industry">
          {industries.map((industry) => (
            <Link key={industry.slug} href={`#${industry.slug}`}>
              {industry.name}
            </Link>
          ))}
        </nav>
      </section>

      <section className="industry-catalog shell" id="industry-grid">
        <div className="industry-catalog-head">
          <div>
            <span className="premium-overline">INDUSTRY SOLUTIONS</span>
            <h2>Designed around the moment—not a generic template.</h2>
          </div>
          <p>Every setting calls for a different product format and placement. These examples show the product in context so you can choose with confidence.</p>
        </div>
        <div className="industry-scene-grid">
          {industries.map((industry, index) => (
            <article id={industry.slug} className={`industry-scene-card ${index === 0 || index === 5 ? "industry-scene-card--wide" : ""}`} key={industry.slug}>
              <div className="industry-scene-media">
                <Image src={industry.image} alt={industry.imageAlt} fill unoptimized loading={index < 2 ? "eager" : "lazy"} sizes={index === 0 || index === 5 ? "(max-width: 760px) 92vw, 65vw" : "(max-width: 760px) 92vw, 33vw"} />
                <div className="industry-scene-number">{String(index + 1).padStart(2, "0")}</div>
              </div>
              <div className="industry-scene-copy">
                <span>{industry.eyebrow}</span>
                <h3>{industry.name}</h3>
                <p>{industry.description}</p>
                <div className="industry-placement">
                  <BadgeCheck />
                  <span>
                    <small>Recommended placement</small>
                    <strong>{industry.moment}</strong>
                  </span>
                </div>
                <Link href={`/products/${industry.productSlug}`}>
                  View {industry.productName} <ArrowRight />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="industry-format-section">
        <div className="shell">
          <div className="industry-format-head">
            <span className="premium-overline light">CHOOSE BY FORMAT</span>
            <h2>The right product depends on where the conversation happens.</h2>
          </div>
          <div className="industry-format-grid">
            {formats.map(({ icon: Icon, name, copy, href }) => (
              <Link href={href} key={name}>
                <Icon />
                <div>
                  <h3>{name}</h3>
                  <p>{copy}</p>
                </div>
                <ArrowRight />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="industry-final-cta shell">
        <div>
          <span className="premium-overline light">READY FOR YOUR BUSINESS</span>
          <h2>Put the next step where customers can see it.</h2>
          <p>Choose one clear touchpoint or cover several customer moments with a coordinated bundle.</p>
        </div>
        <Link className="premium-button white" href="/shop">
          Explore NFCPlate products <ArrowRight />
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
