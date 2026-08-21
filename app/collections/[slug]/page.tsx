import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronDown, Nfc } from "lucide-react";
import { SiteHeader } from "../../site-header";
import { AnnouncementBar } from "../../../components/announcement-bar";
import { SiteFooter } from "../../../components/site-footer";
import { ProductBrowser } from "../../../components/commerce/product-browser";
import { QrCode } from "../../../components/qr-icon";
import { collections, getProductsByCategory, ProductCategory } from "../../../lib/catalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections[slug as ProductCategory];
  return collection
    ? {
        title: `${collection.name} | NFCPlate`,
        description: collection.description,
      }
    : {};
}

export function generateStaticParams() {
  return Object.keys(collections).map((slug) => ({ slug }));
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = collections[slug as ProductCategory];
  if (!collection) notFound();
  const collectionProducts = getProductsByCategory(slug);

  return (
    <main>
      <AnnouncementBar link="/shop" label="Shop all" />
      <SiteHeader />

      <section className="collection-hero">
        <div className="shell">
          <nav className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/shop">Shop</Link>
            <span>/</span>
            <strong>{collection.name}</strong>
          </nav>
          <div>
            <span className="commerce-kicker">NFCPLATE COLLECTION</span>
            <h1>{collection.title}</h1>
            <p>{collection.description}</p>
            <aside>
              <Nfc />
              <div>
                <strong>Tap or scan</strong>
                <span>{collection.benefit}</span>
              </div>
              <QrCode />
            </aside>
          </div>
        </div>
      </section>

      <nav className="category-nav shell" aria-label="Shop categories">
        <Link href="/shop">Shop all</Link>
        {Object.entries(collections).map(([key, c]) => (
          <Link
            href={`/collections/${key}`}
            className={key === slug ? "active" : ""}
            key={key}
          >
            {c.name}
          </Link>
        ))}
      </nav>

      <section className="shop-content shell">
        <ProductBrowser
          products={collectionProducts}
          initialCategory={slug as ProductCategory}
        />
      </section>

      <section className="collection-education shell">
        <div>
          <span className="commerce-kicker">CHOOSING {collection.name.toUpperCase()}</span>
          <h2>Built for real customer interactions.</h2>
          <p>
            {collection.description} Place products where customers naturally complete their visit,
            then invite every customer to share a genuine experience without influencing what they
            write.
          </p>
          <Link href="/guides">
            Explore review guides <ArrowRight />
          </Link>
        </div>
        <div>
          <details open>
            <summary>
              Where should I place it?
              <ChevronDown />
            </summary>
            <p>
              Choose a visible counter, reception or service-completion area where the interaction
              feels natural.
            </p>
          </details>
          <details>
            <summary>
              Does it support NFC and QR?
              <ChevronDown />
            </summary>
            <p>
              Yes. Applicable NFCPlate products clearly support both an NFC tap and QR-code scan.
            </p>
          </details>
          <details>
            <summary>
              Does the customer install anything?
              <ChevronDown />
            </summary>
            <p>No customer app is required to open the destination.</p>
          </details>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
