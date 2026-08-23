import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Nfc, ShieldCheck, Smartphone } from "lucide-react";
import { products } from "../../lib/catalog";
import { ProductVisual } from "../ProductVisual";
import { QrCode } from "../QrIcon";

export function HeroSection() {
  return (
    <section className="premium-hero">
      <div className="hero-ambient hero-ambient-one" />
      <div className="hero-ambient hero-ambient-two" />
      <div className="shell premium-hero-grid">
        <div className="premium-hero-copy">
          <div className="premium-pill">
            <span />
            <strong>NFC + QR products for modern businesses</strong>
          </div>
          <h1>
            Make the review
            <br />
            moment <em>effortless.</em>
          </h1>
          <p>
            Premium countertop tools that let customers reach your review page with one simple NFC
            tap or QR scan—no app, no searching, no awkward instructions.
          </p>
          <div className="premium-hero-actions">
            <Link className="premium-button primary" to="/shop">
              Shop review products <ArrowRight size={18} />
            </Link>
            <Link className="premium-button secondary" to="/how-it-works">
              See how it works
            </Link>
          </div>
          <div className="premium-proof">
            <span>
              <BadgeCheck size={16} /> Standard designs, ready to order
            </span>
            <span>
              <Smartphone size={16} /> iPhone + Android
            </span>
          </div>
        </div>
        <div className="premium-hero-stage">
          <div className="stage-card stage-card-one">
            <Nfc size={22} />
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
            <ProductVisual product={products[0]} tone="blue" />
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
  );
}
