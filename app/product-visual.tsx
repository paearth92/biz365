import Image from "next/image";
import { Nfc } from "lucide-react";
import type { Product } from "../lib/catalog";
import { BrandLogo } from "../components/brand-logo";

type ProductVisualProps = {
  tone?: string;
  compact?: boolean;
  product?: Pick<Product, "name" | "image" | "imageAlt">;
  productImage?: string;
  priority?: boolean;
  view?: number;
};

export function ProductVisual({ tone = "blue", compact = false, product, productImage, priority = false, view = 0 }: ProductVisualProps) {
  const image = productImage ?? product?.image;
  const alt = product?.imageAlt ?? `${product?.name ?? "NFCPlate NFC and QR product"} product preview`;
  return (
    <div className={`product-visual ${image ? "product-visual--photography" : ""} ${compact ? "product-visual--compact" : ""} product-visual--view-${view}`}>
      {image ? (
        <Image className="real-product-image" src={image} alt={alt} width={1254} height={1254} priority={priority} unoptimized sizes={compact ? "(max-width: 760px) 92vw, (max-width: 1100px) 45vw, 30vw" : "(max-width: 760px) 94vw, 52vw"} />
      ) : (
        <>
          <div className={`stand stand--${tone}`}>
            <div className="stand-glow" />
            <div className="stand-brand">
              <BrandLogo />
            </div>
            <div className="stand-copy">
              <span>HAPPY WITH US?</span>
              <strong>
                Leave us a<br />
                Google review
              </strong>
            </div>
            <div className="stand-action">
              <span className="tap-ring">
                <Nfc size={compact ? 22 : 34} strokeWidth={1.7} />
              </span>
              <span>Tap or scan here</span>
            </div>
            <div className="stand-bottom">
              <span className="mini-stars">★★★★★</span>
              <span className="fake-qr">
                <i />
                <i />
                <i />
                <i />
              </span>
            </div>
          </div>
          <div className="stand-foot" />
        </>
      )}
      {!image && <div className="product-shadow" />}
    </div>
  );
}
