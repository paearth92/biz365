import type { MetadataRoute } from "next";
import { publicRoutes } from "../lib/routes";
import { products } from "../lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nfcplate.com";
  return [
    ...publicRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date(), changeFrequency: route === "/" ? "weekly" as const : "monthly" as const, priority: route === "/" ? 1 : .7 })),
    ...products.map((product) => ({ url: `${baseUrl}/products/${product.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: .9 })),
  ];
}
