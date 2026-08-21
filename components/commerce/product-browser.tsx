"use client";

import { useMemo, useState } from "react";
import { ListFilter as Filter, SlidersHorizontal, X } from "lucide-react";
import { Product, ProductCategory, startingPrice } from "../../lib/catalog";
import { ProductCard } from "./product-card";

type SortOption = "featured" | "best" | "low" | "high";

const CATEGORY_FILTERS: ReadonlyArray<[string, string]> = [
  ["all", "All products"],
  ["review-stands", "Review stands"],
  ["review-cards", "Review cards"],
  ["review-stickers", "Stickers"],
  ["review-plates", "Plates"],
  ["bundles", "Bundles"],
  ["social-products", "Social products"],
];

const PLATFORM_FILTERS: ReadonlyArray<[string, string]> = [
  ["all", "All platforms"],
  ["google", "Google"],
  ["instagram", "Instagram"],
];

export function ProductBrowser({ products, initialCategory }: { products: Product[]; initialCategory?: ProductCategory }) {
  const [category, setCategory] = useState<string>(initialCategory ?? "all");
  const [platform, setPlatform] = useState("all");
  const [sort, setSort] = useState<SortOption>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const next = products.filter(
      (product) =>
        (category === "all" || product.category === category) &&
        (platform === "all" || product.platform === platform),
    );
    return [...next].sort((a, b) => {
      if (sort === "low") return startingPrice(a) - startingPrice(b);
      if (sort === "high") return startingPrice(b) - startingPrice(a);
      if (sort === "best") return Number(b.bestSeller) - Number(a.bestSeller);
      return Number(b.featured) - Number(a.featured);
    });
  }, [products, category, platform, sort]);

  const resetFilters = () => {
    setCategory(initialCategory ?? "all");
    setPlatform("all");
  };

  const filters = (
    <div className="filter-panel">
      <div className="filter-title">
        <strong>Filters</strong>
        <button onClick={resetFilters}>Reset</button>
      </div>
      <fieldset>
        <legend>Product type</legend>
        {CATEGORY_FILTERS.map(([value, label]) => (
          <label key={value}>
            <input
              type="radio"
              name="category"
              value={value}
              checked={category === value}
              onChange={() => setCategory(value)}
            />{" "}
            <span>{label}</span>
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>Platform</legend>
        {PLATFORM_FILTERS.map(([value, label]) => (
          <label key={value}>
            <input
              type="radio"
              name="platform"
              value={value}
              checked={platform === value}
              onChange={() => setPlatform(value)}
            />{" "}
            <span>{label}</span>
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>Availability</legend>
        <label>
          <input type="checkbox" defaultChecked /> <span>In stock</span>
        </label>
      </fieldset>
    </div>
  );

  return (
    <div className="product-browser">
      <div className="browser-toolbar">
        <div>
          <button className="mobile-filter-button" onClick={() => setFiltersOpen(true)}>
            <Filter /> Filters
          </button>
          <span>{filtered.length} products</span>
        </div>
        <label>
          Sort by{" "}
          <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)}>
            <option value="featured">Featured</option>
            <option value="best">Best selling</option>
            <option value="low">Price: Low to high</option>
            <option value="high">Price: High to low</option>
          </select>
        </label>
      </div>

      <div className="browser-layout">
        <aside className="desktop-filters">{filters}</aside>
        <div className="commerce-grid">
          {filtered.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
          {filtered.length === 0 && (
            <div className="empty-products">
              <SlidersHorizontal />
              <h3>No exact matches</h3>
              <p>Clear a filter to see more NFCPlate products.</p>
            </div>
          )}
        </div>
      </div>

      {filtersOpen && (
        <>
          <button className="filter-backdrop" onClick={() => setFiltersOpen(false)} aria-label="Close filters" />
          <aside className="mobile-filters">
            <button className="mobile-filters__close" onClick={() => setFiltersOpen(false)}>
              <X /> Close
            </button>
            {filters}
            <button className="apply-filters" onClick={() => setFiltersOpen(false)}>
              Show {filtered.length} products
            </button>
          </aside>
        </>
      )}
    </div>
  );
}
