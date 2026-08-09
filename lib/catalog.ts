export type ProductCategory = "stand" | "card" | "sticker" | "plate" | "bundle" | "social";

export type ProductVariant = {
  id: string;
  name: string;
  sku: string;
  price: number;
  color?: "black" | "white" | "blue";
  quantity: number;
  inStock: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  platform: "google" | "instagram" | "facebook" | "yelp" | "multi-link";
  shortDescription: string;
  features: string[];
  variants: ProductVariant[];
  bestSeller?: boolean;
  seoTitle: string;
  seoDescription: string;
};

export const products: Product[] = [
  {
    id: "grs-01",
    slug: "google-review-stand",
    name: "Google Review Stand",
    category: "stand",
    platform: "google",
    shortDescription: "A counter-ready NFC and QR stand that opens your Google review page.",
    features: ["NFC tap", "QR backup", "No customer app", "iPhone and Android"],
    variants: [
      { id: "grs-white", name: "White", sku: "B365-GRS-W", price: 29, color: "white", quantity: 1, inStock: true },
      { id: "grs-black", name: "Black", sku: "B365-GRS-B", price: 29, color: "black", quantity: 1, inStock: true },
    ],
    bestSeller: true,
    seoTitle: "Google Review Stand with NFC + QR | Biz365",
    seoDescription: "Help customers reach your genuine Google review page with one NFC tap or QR scan.",
  },
  {
    id: "grc-01",
    slug: "google-review-card",
    name: "Google Review Card",
    category: "card",
    platform: "google",
    shortDescription: "A portable NFC review card for service teams and business owners.",
    features: ["Pocket size", "Reusable NFC", "QR backup", "No customer app"],
    variants: [{ id: "grc-blue", name: "Biz365 Blue", sku: "B365-GRC-BL", price: 14, color: "blue", quantity: 1, inStock: true }],
    seoTitle: "NFC Google Review Card | Biz365",
    seoDescription: "Carry your Google review link anywhere with a reusable NFC and QR review card.",
  },
];
