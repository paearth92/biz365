import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "../../site-header";
import { AnnouncementBar } from "../../../components/announcement-bar";
import { SiteFooter } from "../../../components/site-footer";
import { getProduct, products } from "../../../lib/catalog";
import { ProductDetailClient } from "../../../components/commerce/product-detail-client";
import { ProductStory } from "../../../components/commerce/product-story";
import { ProductCard } from "../../../components/commerce/product-card";
import { getProductExperience } from "../../../lib/product-experience";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.seoTitle,
    description: p.seoDescription,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: {
      title: p.seoTitle,
      description: p.seoDescription,
      type: "website",
      url: `/products/${p.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: p.seoTitle,
      description: p.seoDescription,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = product.relatedProductSlugs.map(getProduct).filter(Boolean);
  const experience = getProductExperience(product);
  const offer = product.variants[0];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: experience.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: offer.sku,
    brand: { "@type": "Brand", name: "NFCPlate" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: offer.price,
      availability: "https://schema.org/InStock",
      url: `/products/${product.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: experience.rating,
      reviewCount: experience.reviewCount,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Shop", item: "/shop" },
      { "@type": "ListItem", position: 3, name: product.name, item: `/products/${product.slug}` },
    ],
  };

  return (
    <main className="product-detail-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <AnnouncementBar link="/shop" label="Shop all" />
      <SiteHeader />

      <div className="product-page-atmosphere" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      <div className="shell product-page">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/shop">Shop</Link>
          <span>/</span>
          <strong>{product.name}</strong>
        </nav>

        <ProductDetailClient product={product} />
        <ProductStory product={product} />

        <section className="related-section">
          <div className="section-head">
            <div>
              <span className="commerce-kicker">COMPLETE YOUR SETUP</span>
              <h2>Related NFCPlate products</h2>
            </div>
            <Link href="/shop">
              View all products <ArrowRight />
            </Link>
          </div>
          <div className="commerce-grid">
            {related.map((item) => (
              <ProductCard product={item!} key={item!.id} />
            ))}
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
