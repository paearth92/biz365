import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "../site-header";
import { AnnouncementBar } from "../../components/announcement-bar";
import { SiteFooter } from "../../components/site-footer";
import { CartPageClient } from "../../components/commerce/cart-page-client";

export const metadata: Metadata = {
  title: "Your Cart | NFCPlate",
  description:
    "Review the standard NFCPlate NFC and QR products in your shopping cart.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <main>
      <AnnouncementBar link="/shop" label="Shop all" />
      <SiteHeader />
      <div className="shell cart-page">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <strong>Cart</strong>
        </nav>
        <CartPageClient />
      </div>
      <SiteFooter />
    </main>
  );
}
