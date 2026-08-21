"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Nfc } from "lucide-react";
import { Product, products } from "../../lib/catalog";
import { comparisonProducts, getProductExperience } from "../../lib/product-experience";
import { BrandLogo } from "../brand-logo";
import { QrCode } from "../qr-icon";
import { ProductCard } from "./product-card";

function ReviewsSection({ product }: { product: Product }) {
  const x = getProductExperience(product);
  const distribution = [72, 19, 7, 2, 0];
  return (
    <section className="reviews-section" id="reviews">
      <div className="reviews-heading">
        <span className="commerce-kicker">STOREFRONT FEEDBACK</span>
        <h2>Built for everyday customer moments.</h2>
        <p>Sample storefront review content for layout preview; this is not imported from Google.</p>
      </div>
      <div className="review-summary">
        <strong>{x.rating}</strong>
        <span>★★★★★</span>
        <small>Based on {x.reviewCount} storefront reviews</small>
        {distribution.map((value, index) => (
          <div className="rating-row" key={index}>
            <label>{5 - index} star</label>
            <i>
              <b style={{ width: `${value}%` }} />
            </i>
            <em>{value}%</em>
          </div>
        ))}
      </div>
      <div className="review-cards">
        {x.reviews.map((review) => (
          <article key={review.id}>
            <div>
              <span>{"★".repeat(review.rating)}</span>
              <small>{review.date}</small>
            </div>
            <h3>{review.title}</h3>
            <p>{review.body}</p>
            <footer>
              <strong>{review.author}</strong>
              {review.verified && (
                <em>
                  <Check /> Verified purchase
                </em>
              )}
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}

function RecentlyViewed({ currentSlug }: { currentSlug: string }) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const slugs = JSON.parse(localStorage.getItem("biz365-recent") || "[]") as string[];
        setItems(
          slugs
            .filter((s) => s !== currentSlug)
            .map((s) => products.find((p) => p.slug === s))
            .filter(Boolean) as Product[],
        );
      } catch {
        // ignore storage errors
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [currentSlug]);

  const shown = useMemo(() => items.slice(0, 3), [items]);
  if (!shown.length) return null;

  return (
    <section className="recent-section">
      <div className="section-head">
        <div>
          <span className="commerce-kicker">RECENTLY VIEWED</span>
          <h2>Continue comparing</h2>
        </div>
      </div>
      <div className="commerce-grid">
        {shown.map((item) => (
          <ProductCard product={item} key={item.slug} />
        ))}
      </div>
    </section>
  );
}

export function ProductStory({ product }: { product: Product }) {
  const experience = getProductExperience(product);
  return (
    <>
      <section className="product-story">
        <div>
          <span className="commerce-kicker">TWO WAYS. ONE DESTINATION.</span>
          <h2>Tap with NFC or scan the QR code.</h2>
          <p>
            Both paths open the same intended business destination. Customers choose whichever feels
            natural—without downloading a separate app.
          </p>
          <ul>
            {product.features.slice(0, 4).map((feature) => (
              <li key={feature}>
                <Check />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="tap-scan-demo">
          <div className="demo-phone">
            <span>Customer phone</span>
            <strong>Destination opened</strong>
            <div>Ready to continue</div>
          </div>
          <div className="demo-wave">
            <Nfc />
          </div>
          <div className="demo-stand">
            <BrandLogo markOnly />
            <strong>Tap</strong>
            <small>or scan</small>
            <QrCode />
          </div>
        </div>
      </section>

      <section className="experience-grid">
        <article>
          <span>BEST PLACEMENT</span>
          <h3>{experience.placement}</h3>
        </article>
        <article>
          <span>BEST FOR</span>
          <h3>{experience.bestFor}</h3>
        </article>
        <article>
          <span>PRIMARY BENEFIT</span>
          <h3>{experience.primaryBenefit}</h3>
        </article>
      </section>

      <section className="three-steps">
        <div className="section-heading-center">
          <span className="commerce-kicker">THE CUSTOMER JOURNEY</span>
          <h2>Ready where the customer moment happens.</h2>
        </div>
        <div>
          {[
            ["01", "Place it", experience.placement],
            ["02", "Tap or scan", "Customers choose NFC or the clearly visible QR code."],
            ["03", "Reach the page", "The intended business destination opens directly."],
          ].map(([num, title, copy]) => (
            <article key={num}>
              <span>{num}</span>
              <strong>{title}</strong>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="use-case-section">
        <div>
          <span className="commerce-kicker">MADE FOR REAL BUSINESS MOMENTS</span>
          <h2>One product, several natural placements.</h2>
        </div>
        <div>
          {experience.useCases.map((item, index) => (
            <article key={item}>
              <span>0{index + 1}</span>
              <strong>{item}</strong>
              <p>Place {product.name.toLowerCase()} where this interaction naturally finishes.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="comparison-section">
        <div className="section-heading-center">
          <span className="commerce-kicker">COMPARE FORMATS</span>
          <h2>Find the right NFCPlate touchpoint.</h2>
        </div>
        <div className="comparison-scroll">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Format</th>
                <th>Placement</th>
                <th>Portable</th>
                <th>NFC</th>
                <th>QR</th>
                <th>Best use</th>
              </tr>
            </thead>
            <tbody>
              {comparisonProducts.map((item) => {
                const x = getProductExperience(item);
                return (
                  <tr className={item.slug === product.slug ? "current" : ""} key={item.slug}>
                    <th>
                      <Link href={`/products/${item.slug}`}>{item.name}</Link>
                      {item.slug === product.slug && <small>Current</small>}
                    </th>
                    <td>{item.categoryLabel}</td>
                    <td>{x.placement}</td>
                    <td>{item.category === "review-cards" ? "Yes" : "Stationary"}</td>
                    <td>Included</td>
                    <td>Included</td>
                    <td>{x.bestFor}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="specification-section">
        <div>
          <span className="commerce-kicker">PRODUCT DETAILS</span>
          <h2>Everything you need. Nothing complicated.</h2>
          <p>
            Final production measurements remain independently replaceable when physical inventory is
            confirmed.
          </p>
        </div>
        <dl>
          {[
            ...Object.entries(product.specifications),
            ["Dimensions", experience.dimensions],
            ["Material", experience.material],
            ["Included", experience.included],
          ].map(([key, value]) => (
            <div key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <ReviewsSection product={product} />

      <section className="product-faq">
        <div>
          <span className="commerce-kicker">COMMON QUESTIONS</span>
          <h2>Good to know before you order.</h2>
        </div>
        <div>
          {experience.faqs.map((item) => (
            <details key={item.question}>
              <summary>
                {item.question}
                <ChevronDown />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <RecentlyViewed currentSlug={product.slug} />
    </>
  );
}
