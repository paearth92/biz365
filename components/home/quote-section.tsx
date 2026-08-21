import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export function QuoteSection() {
  return (
    <section className="premium-quote shell">
      <div>
        <span className="premium-overline light">WHY NFCPLATE</span>
        <h2>
          Professional enough for the counter. Simple enough for every customer.
        </h2>
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
  );
}
