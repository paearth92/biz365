import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PhoneIncoming as HomeIcon, Scissors, Store, UtensilsCrossed } from "lucide-react";
import { industries as industryCatalog } from "../../lib/industries";

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

export function IndustriesPreview() {
  return (
    <section className="premium-section business-section">
      <div className="shell">
        <div className="premium-section-head">
          <div>
            <span className="premium-overline">MADE FOR CUSTOMER-FACING BUSINESSES</span>
            <h2>At home in every customer moment.</h2>
            <p>
              See real NFCPlate products placed naturally in restaurants, barbershops, stores and
              client-facing work.
            </p>
          </div>
          <Link href="/industries">
            View all 10 industries <ArrowRight />
          </Link>
        </div>
        <div className="business-grid">
          {industries.map(({ slug, name, description, icon: Icon, image, imageAlt }, index) => (
            <article key={name}>
              <div className="business-media">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  unoptimized
                  sizes="(max-width: 760px) 84vw, (max-width: 1050px) 50vw, 25vw"
                  priority={index < 2}
                />
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
  );
}
