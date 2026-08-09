import Image from "next/image";
import { Nfc } from "lucide-react";

type ProductVisualProps = { tone?: string; compact?: boolean; productImage?: string };

export function ProductVisual({ tone = "blue", compact = false, productImage }: ProductVisualProps) {
  return (
    <div className={`product-visual ${compact ? "product-visual--compact" : ""}`} aria-label="Biz365 NFC and QR Google Review Stand product preview">
      {productImage ? (
        <Image className="real-product-image" src={productImage} alt="Biz365 NFC and QR Google Review Stand" width={700} height={800} priority={!compact} />
      ) : (
        <>
          <div className={`stand stand--${tone}`}>
            <div className="stand-glow" />
            <div className="stand-brand"><span className="brand-mark">B</span><span>Biz365</span></div>
            <div className="stand-copy"><span>HAPPY WITH US?</span><strong>Leave us a<br />Google review</strong></div>
            <div className="stand-action"><span className="tap-ring"><Nfc size={compact ? 22 : 34} strokeWidth={1.7} /></span><span>Tap or scan here</span></div>
            <div className="stand-bottom"><span className="mini-stars">★★★★★</span><span className="fake-qr"><i /><i /><i /><i /></span></div>
          </div>
          <div className="stand-foot" />
        </>
      )}
      <div className="product-shadow" />
    </div>
  );
}
