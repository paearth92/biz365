import { useEffect } from "react";
import { SiteHeader } from "../components/SiteHeader";
import { AnnouncementBar } from "../components/AnnouncementBar";
import { SiteFooter } from "../components/SiteFooter";
import { HeroSection } from "../components/home/HeroSection";
import { FeaturedProducts } from "../components/home/FeaturedProducts";
import { HowItWorks } from "../components/home/HowItWorks";
import { IndustriesPreview } from "../components/home/IndustriesPreview";
import { QuoteSection } from "../components/home/QuoteSection";
import { MobileDock } from "../components/home/MobileDock";

export function HomePage() {
  useEffect(() => {
    document.title = "NFCPlate | Smart NFC Review Products for Business";
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        "content",
        "Make it easier for customers to leave genuine reviews with premium NFC and QR review stands, cards, stickers, and business bundles from NFCPlate.",
      );
  }, []);

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
