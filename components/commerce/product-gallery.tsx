"use client";

import Image from "next/image";
import { Expand, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Product } from "../../lib/catalog";
import { ProductVisual } from "../../app/product-visual";

const galleryLabels = ["Front view", "Alternate angle", "In-use view", "Dimensions"];

function GalleryVisual({ product, view }: { product: Product; view: number }) {
  return (
    <div
      className={`gallery-scene gallery-scene--${view}`}
      aria-label={`${product.name} ${galleryLabels[view]}`}
      role="img"
    >
      <ProductVisual product={product} tone={product.tone} view={view} priority />
      {view === 2 && (
        <div className="gallery-context">
          <span>Customer moment</span>
          <strong>Tap or scan</strong>
        </div>
      )}
      {view === 3 && (
        <div className="dimension-overlay">
          <span>Production dimensions</span>
          <strong>Replace with final measurements</strong>
        </div>
      )}
    </div>
  );
}

export function ProductGallery({ product }: { product: Product }) {
  const [view, setView] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    if (!lightbox) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [lightbox]);

  return (
    <>
      <div className="product-gallery">
        <button
          className="product-gallery__main"
          onClick={() => setLightbox(true)}
          aria-label={`Enlarge ${galleryLabels[view]} of ${product.name}`}
        >
          <GalleryVisual product={product} view={view} />
          <span className="gallery-zoom">
            <Expand /> View larger
          </span>
        </button>
        <div className="gallery-thumbs" role="tablist" aria-label="Product views">
          {galleryLabels.map((label, index) => (
            <button
              role="tab"
              aria-selected={view === index}
              className={view === index ? "active" : ""}
              onClick={() => setView(index)}
              key={label}
            >
              <Image
                className={`gallery-thumb-image gallery-thumb-image--${index}`}
                src={product.image}
                alt=""
                width={90}
                height={90}
                unoptimized
              />
              {label}
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} enlarged image`}
        >
          <button className="lightbox-close" onClick={() => setLightbox(false)} aria-label="Close enlarged image">
            <X />
          </button>
          <GalleryVisual product={product} view={view} />
          <div className="lightbox-nav">
            {galleryLabels.map((label, index) => (
              <button
                className={view === index ? "active" : ""}
                onClick={() => setView(index)}
                key={label}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
