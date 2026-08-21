"use client";

import { Product } from "../../lib/catalog";
import { ProductGallery } from "./product-gallery";
import { ProductInfoPanel } from "./product-info-panel";
import { MobileBuyBar } from "./mobile-buy-bar";
import { TrustStrip } from "./trust-strip";

export function ProductDetailClient({ product }: { product: Product }) {
  return (
    <>
      <div className="product-detail-grid phase3-detail">
        <ProductGallery product={product} />
        <ProductInfoPanel product={product} />
      </div>
      <TrustStrip />
      <MobileBuyBar product={product} />
    </>
  );
}
