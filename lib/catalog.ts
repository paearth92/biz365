export type ProductCategory = "review-stands" | "review-cards" | "review-stickers" | "review-plates" | "bundles" | "social-products";
export type ProductPlatform = "google" | "instagram" | "facebook" | "yelp" | "multi-link";

export type ProductVariant = {
  id: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  color?: "blue" | "black" | "white";
  pack?: number;
  inStock: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  platform: ProductPlatform;
  shortDescription: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  variants: ProductVariant[];
  relatedProductSlugs: string[];
  badge?: string;
  featured?: boolean;
  bestSeller?: boolean;
  newProduct?: boolean;
  tone: "blue" | "black" | "white";
  seoTitle: string;
  seoDescription: string;
};

const sharedFeatures = ["NFC tap + QR scan", "Works with iPhone and Android", "No customer app required", "Reusable every day"];

export const products: Product[] = [
  {
    id: "grs-01", slug: "google-review-stand", name: "Google Review Stand", category: "review-stands", categoryLabel: "Counter Stand", platform: "google", tone: "blue", badge: "BEST SELLER", featured: true, bestSeller: true,
    shortDescription: "A premium counter stand that puts your Google review page one tap or scan away.",
    description: "Make the review request effortless at the exact moment a customer is happiest. The flagship Biz365 stand combines fast NFC with a clear QR-code alternative in a professional counter-ready format.",
    features: sharedFeatures,
    specifications: { "Connectivity": "NFC + QR code", "Placement": "Countertop", "Compatibility": "Modern iPhone and Android", "Customer app": "Not required", "Finish": "Easy-clean premium surface" },
    variants: [
      { id: "grs-blue", name: "Biz365 Blue", sku: "B365-GRS-BL", price: 29, color: "blue", inStock: true },
      { id: "grs-black", name: "Black", sku: "B365-GRS-BK", price: 29, color: "black", inStock: true },
      { id: "grs-white", name: "White", sku: "B365-GRS-WH", price: 29, color: "white", inStock: true },
    ], relatedProductSlugs: ["google-review-card", "review-starter-bundle", "google-review-sticker"],
    seoTitle: "Google Review Stand with NFC + QR | Biz365", seoDescription: "Help customers reach your genuine Google review page with one NFC tap or QR scan using the premium Biz365 counter stand."
  },
  {
    id: "grs-02", slug: "compact-google-review-stand", name: "Compact Google Review Stand", category: "review-stands", categoryLabel: "Compact Stand", platform: "google", tone: "white", newProduct: true, badge: "COMPACT",
    shortDescription: "A smaller counter footprint with the same tap-or-scan convenience.", description: "Designed for tighter counters, reception desks and mobile stations without sacrificing visibility.", features: sharedFeatures,
    specifications: { "Connectivity": "NFC + QR code", "Placement": "Compact countertop", "Compatibility": "Modern iPhone and Android", "Customer app": "Not required" },
    variants: [{ id: "cgrs-black", name: "Black", sku: "B365-CGRS-BK", price: 24, color: "black", inStock: true }, { id: "cgrs-white", name: "White", sku: "B365-CGRS-WH", price: 24, color: "white", inStock: true }],
    relatedProductSlugs: ["google-review-stand", "google-review-card"], seoTitle: "Compact NFC Google Review Stand | Biz365", seoDescription: "Save counter space while giving customers fast NFC tap and QR scan access to your review page."
  },
  {
    id: "grc-01", slug: "google-review-card", name: "Google Review Card", category: "review-cards", categoryLabel: "Pocket Card", platform: "google", tone: "black", badge: "ON THE GO", featured: true,
    shortDescription: "Carry your review page anywhere with a reusable NFC and QR card.", description: "Ideal for mobile service teams, appointments and face-to-face customer handoffs.", features: sharedFeatures,
    specifications: { "Connectivity": "NFC + QR code", "Format": "Wallet-size card", "Compatibility": "Modern iPhone and Android", "Customer app": "Not required" },
    variants: [{ id: "grc-blue", name: "Blue", sku: "B365-GRC-BL", price: 14, color: "blue", inStock: true }, { id: "grc-black", name: "Black", sku: "B365-GRC-BK", price: 14, color: "black", inStock: true }, { id: "grc-white", name: "White", sku: "B365-GRC-WH", price: 14, color: "white", inStock: true }],
    relatedProductSlugs: ["google-review-stand", "review-starter-bundle", "business-review-bundle"], seoTitle: "NFC Google Review Card with QR | Biz365", seoDescription: "Carry your Google review link with a durable Biz365 NFC and QR review card."
  },
  {
    id: "grst-01", slug: "google-review-sticker", name: "Google Review Sticker", category: "review-stickers", categoryLabel: "Smart Sticker", platform: "google", tone: "white",
    shortDescription: "A low-profile tap-or-scan prompt for counters, doors and displays.", description: "Place a clear review invitation wherever customers naturally pause.", features: sharedFeatures,
    specifications: { "Connectivity": "NFC + QR code", "Placement": "Flat clean surface", "Finish": "Wipeable", "Customer app": "Not required" },
    variants: [{ id: "grst-1", name: "1 Sticker", sku: "B365-GRST-1", price: 9, pack: 1, inStock: true }, { id: "grst-3", name: "3 Stickers", sku: "B365-GRST-3", price: 22, compareAtPrice: 27, pack: 3, inStock: true }, { id: "grst-5", name: "5 Stickers", sku: "B365-GRST-5", price: 34, compareAtPrice: 45, pack: 5, inStock: true }],
    relatedProductSlugs: ["google-review-plate", "google-review-stand", "business-review-bundle"], seoTitle: "NFC Google Review Sticker with QR | Biz365", seoDescription: "Add tap-or-scan review access to a counter, door or display with a Biz365 smart sticker."
  },
  {
    id: "grp-01", slug: "google-review-plate", name: "Google Review Plate", category: "review-plates", categoryLabel: "Display Plate", platform: "google", tone: "black",
    shortDescription: "A durable fixed display for prominent tap-or-scan placement.", description: "A clean, permanent-looking review touchpoint for counters and walls.", features: sharedFeatures,
    specifications: { "Connectivity": "NFC + QR code", "Placement": "Wall or counter", "Compatibility": "Modern iPhone and Android", "Customer app": "Not required" },
    variants: [{ id: "grp-black", name: "Black", sku: "B365-GRP-BK", price: 19, color: "black", inStock: true }, { id: "grp-white", name: "White", sku: "B365-GRP-WH", price: 19, color: "white", inStock: true }],
    relatedProductSlugs: ["google-review-sticker", "google-review-stand"], seoTitle: "Google Review NFC Plate + QR | Biz365", seoDescription: "Create a permanent tap-or-scan review touchpoint with a professional Biz365 display plate."
  },
  {
    id: "rsb-01", slug: "review-starter-bundle", name: "Review Starter Bundle", category: "bundles", categoryLabel: "Stand + Card", platform: "google", tone: "blue", badge: "SAVE 12%", featured: true,
    shortDescription: "One counter stand and one portable card for complete review coverage.", description: "Start at the counter and keep collecting during customer handoffs with two complementary formats.", features: ["1 Review Stand", "1 Review Card", ...sharedFeatures],
    specifications: { "Included": "1 stand + 1 card", "Connectivity": "NFC + QR code", "Customer app": "Not required" },
    variants: [{ id: "rsb-blue", name: "Biz365 Blue", sku: "B365-RSB-BL", price: 39, compareAtPrice: 43, color: "blue", inStock: true }],
    relatedProductSlugs: ["google-review-stand", "google-review-card", "business-review-bundle"], seoTitle: "Google Review Starter Bundle | Biz365", seoDescription: "Cover your counter and customer handoffs with a Biz365 NFC and QR review stand and card bundle."
  },
  {
    id: "brb-01", slug: "business-review-bundle", name: "Business Review Bundle", category: "bundles", categoryLabel: "Multi-Location Kit", platform: "google", tone: "black", badge: "BEST VALUE", bestSeller: true,
    shortDescription: "Two stands, two cards and three stickers for teams with multiple touchpoints.", description: "Give every customer-facing area a clear route to your review page.", features: ["2 Review Stands", "2 Review Cards", "3 Review Stickers", ...sharedFeatures],
    specifications: { "Included": "2 stands + 2 cards + 3 stickers", "Connectivity": "NFC + QR code", "Customer app": "Not required" },
    variants: [{ id: "brb-black", name: "Black", sku: "B365-BRB-BK", price: 69, compareAtPrice: 95, color: "black", inStock: true }],
    relatedProductSlugs: ["review-starter-bundle", "google-review-stand", "google-review-sticker"], seoTitle: "Business Google Review Bundle | Biz365", seoDescription: "Equip multiple customer touchpoints with Biz365 NFC and QR review stands, cards and stickers."
  },
  {
    id: "ifs-01", slug: "instagram-follow-stand", name: "Instagram Follow Stand", category: "social-products", categoryLabel: "Social Stand", platform: "instagram", tone: "blue", badge: "SOCIAL",
    shortDescription: "Turn counter visits into Instagram connections with one tap or scan.", description: "Give customers a fast route to your Instagram profile without searching or typing.", features: sharedFeatures,
    specifications: { "Destination": "Instagram profile", "Connectivity": "NFC + QR code", "Compatibility": "Modern iPhone and Android", "Customer app": "Instagram optional" },
    variants: [{ id: "ifs-blue", name: "Blue", sku: "B365-IFS-BL", price: 29, color: "blue", inStock: true }],
    relatedProductSlugs: ["google-review-stand", "business-review-bundle"], seoTitle: "Instagram NFC Follow Stand + QR | Biz365", seoDescription: "Help customers reach and follow your Instagram profile with a Biz365 NFC and QR stand."
  },
];

export const collections = {
  "review-stands": { name: "Review Stands", title: "Google review stands built for the front counter.", description: "Professional NFC and QR review stands that make it easier for customers to reach your genuine review page before they leave.", benefit: "Visible, durable and ready for daily customer interactions." },
  "review-cards": { name: "Review Cards", title: "Your review page, ready wherever business happens.", description: "Portable NFC and QR review cards for mobile services, appointments and customer handoffs.", benefit: "Pocket-sized convenience without asking customers to search." },
  "review-stickers": { name: "Review Stickers", title: "Low-profile review access for high-traffic surfaces.", description: "Smart NFC and QR stickers for counters, doors and customer-facing displays.", benefit: "Simple placement with two reliable ways to connect." },
  "review-plates": { name: "Review Plates", title: "A permanent-looking home for your review request.", description: "Durable review plates designed for prominent wall or counter placement.", benefit: "Clear visibility and a refined professional finish." },
  "bundles": { name: "Product Bundles", title: "Cover more customer moments for less.", description: "Pair stands, cards and stickers across the places where customers naturally finish their experience.", benefit: "Coordinated products and better combined value." },
  "social-products": { name: "Social Products", title: "Turn in-person visits into lasting social connections.", description: "NFC and QR products that send customers directly to your social profiles.", benefit: "Remove searching and make following your business effortless." },
} satisfies Record<ProductCategory, { name: string; title: string; description: string; benefit: string }>;

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
export const getProductsByCategory = (category: string) => products.filter((product) => product.category === category);
export const startingPrice = (product: Product) => Math.min(...product.variants.map((variant) => variant.price));
