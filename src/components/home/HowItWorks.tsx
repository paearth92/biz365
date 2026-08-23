import { Link } from "react-router-dom";
import { Nfc, Star } from "lucide-react";

export function HowItWorks() {
  return (
    <section className="premium-how">
      <div className="shell how-grid">
        <div className="how-demo">
          <div className="demo-halo" />
          <div className="phone-mock">
            <div className="phone-screen">
              <div className="google-g">G</div>
              <small>Rate your experience</small>
              <strong>Leave a review</strong>
              <div className="review-stars">★★★★★</div>
              <button>Post review</button>
            </div>
          </div>
          <div className="tap-card">
            <Nfc size={28} />
            <strong>Tap</strong>
            <small>NFC TAP TO REVIEW</small>
          </div>
        </div>
        <div className="how-content">
          <p className="commerce-kicker">HOW IT WORKS</p>
          <h2>One tap. One review. That simple.</h2>
          <p>
            No apps to download. No links to type. Customers just tap or scan and they land right on
            your review page.
          </p>
          <ol className="steps">
            <li>
              <span>01</span>
              <div>
                <strong>Place your NFCPlate</strong>
                <p>Set it on your counter, desk, or reception area.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>Customer taps or scans</strong>
                <p>Phone opens your review page instantly—no app needed.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>Review gets posted</strong>
                <p>More genuine reviews from happy customers, right in the moment.</p>
              </div>
            </li>
          </ol>
          <Link to="/shop" className="premium-button primary">
            Get started <Star size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
