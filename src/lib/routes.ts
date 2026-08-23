export const routes = {
  home: "/",
  shop: "/shop",
  product: (slug: string) => `/products/${slug}`,
  collection: (slug: string) => `/collections/${slug}`,
  cart: "/cart",
  checkout: "/checkout",
  industries: "/industries",
  howItWorks: "/how-it-works",
  dashboard: "/dashboard",
  activate: (code: string) => `/activate/${code}`,
  adminDevices: "/admin/devices",
};

export const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "How it works", href: "/how-it-works" },
  { label: "For businesses", href: "/industries" },
];

export const collectionLinks = [
  { label: "Review stands", href: "/collections/review-stands", copy: "Premium counter displays" },
  { label: "Review cards", href: "/collections/review-cards", copy: "Portable tap-or-scan cards" },
  {
    label: "Stickers & plates",
    href: "/collections/review-stickers",
    copy: "Low-profile touchpoints",
  },
  { label: "Business bundles", href: "/collections/bundles", copy: "Cover more customer moments" },
];
