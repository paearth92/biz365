import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { BrandLogo } from "../brand-logo";
import { QrCode } from "../qr-icon";

export function HowItWorks() {
  return (
    <section className="premium-how">
      <div className="shell premium-how-grid">
        <div className="premium-how-copy">
          <span className="premium-overline light">HOW IT WORKS</span>
          <h2>
            Two ways to connect.
            <br />
            One clear destination.
          </h2>
          <p>
            Customers choose the interaction that feels natural. Both NFC and QR lead to the same
            intended page.
          </p>
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
  );
}
