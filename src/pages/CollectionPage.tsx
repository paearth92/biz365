import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { SiteHeader } from "../components/SiteHeader";
import { AnnouncementBar } from "../components/AnnouncementBar";
import { SiteFooter } from "../components/SiteFooter";
import { ProductBrowser } from "../components/ProductBrowser";
import { collections, getProductsByCategory } from "../lib/catalog";

export function CollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const collection = slug ? collections[slug as keyof typeof collections] : undefined;
  const collectionProducts = slug ? getProductsByCategory(slug) : [];

  useEffect(() => {
    if (collection) {
      document.title = `${collection.name} | NFCPlate`;
    }
  }, [slug, collection]);

  if (!collection) {
    return (
      <main>
        <AnnouncementBar link="/shop" label="Shop now" />
        <SiteHeader />
        <div className="page-not-found">
          <h1>Collection not found</h1>
          <Link to="/shop" className="premium-button primary">
            Back to shop
          </Link>
        </div>
        <SiteFooter />
      </main>
    );
  }

  return (
    <main>
      <AnnouncementBar link="/shop" label="Shop now" />
      <SiteHeader />
      <section className="collection-page">
        <div className="shell">
          <nav className="breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/shop">Shop</Link>
            <span>/</span>
            <strong>{collection.name}</strong>
          </nav>
          <p className="commerce-kicker" style={{ marginTop: "20px" }}>
            {collection.name.toUpperCase()}
          </p>
          <h1>{collection.title}</h1>
          <p>{collection.description}</p>
          <ProductBrowser products={collectionProducts} />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
