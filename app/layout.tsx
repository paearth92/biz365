import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./commerce.css";
import "./premium.css";
import "./portal.css";
import "./brand.css";
import "./header-theme.css";
import "./nfcplate-theme.css";
import { CartProvider } from "../components/commerce/cart-context";
import { ExperienceMotion } from "../components/experience-motion";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NFCPlate | Smart NFC Review Products for Business",
  description: "Make it easier for customers to leave genuine reviews with premium NFC and QR review stands, cards, stickers, and business bundles from NFCPlate.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/images/brand/nfcplate-standing-plate-mark.png",
    shortcut: "/images/brand/nfcplate-standing-plate-mark.png",
    apple: "/images/brand/nfcplate-standing-plate-mark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider><ExperienceMotion />{children}</CartProvider>
      </body>
    </html>
  );
}
