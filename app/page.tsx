import { SiteHeader } from "./site-header";
import { AnnouncementBar } from "../components/announcement-bar";
import { SiteFooter } from "../components/site-footer";
import { HeroSection } from "../components/home/hero-section";
import { FeaturedProducts } from "../components/home/featured-products";
import { HowItWorks } from "../components/home/how-it-works";
import { IndustriesPreview } from "../components/home/industries-preview";
import { QuoteSection } from "../components/home/quote-section";
import { MobileDock } from "../components/home/mobile-dock";

export default function Home() {
  return (
    <main className="premium-home">
      <AnnouncementBar link="/shop" label="Explore the collection" />
      <SiteHeader />
      <HeroSection />
      <FeaturedProducts />
      <HowItWorks />
      <IndustriesPreview />
      <QuoteSection />
      <SiteFooter />
      <MobileDock />
    </main>
  );
}
