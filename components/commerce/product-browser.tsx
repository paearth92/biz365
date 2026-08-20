"use client";

import { useMemo, useState } from "react";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { Product, ProductCategory, startingPrice } from "../../lib/catalog";
import { ProductCard } from "./product-card";

export function ProductBrowser({ products, initialCategory }: { products: Product[]; initialCategory?: ProductCategory }) {
  const [category, setCategory] = useState<string>(initialCategory ?? "all");
  const [platform, setPlatform] = useState("all");
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filtered = useMemo(() => {
    const next = products.filter(product => (category === "all" || product.category === category) && (platform === "all" || product.platform === platform));
    return [...next].sort((a,b) => sort === "low" ? startingPrice(a)-startingPrice(b) : sort === "high" ? startingPrice(b)-startingPrice(a) : sort === "best" ? Number(b.bestSeller)-Number(a.bestSeller) : Number(b.featured)-Number(a.featured));
  }, [products, category, platform, sort]);
  const filters = <div className="filter-panel"><div className="filter-title"><strong>Filters</strong><button onClick={() => { setCategory(initialCategory ?? "all"); setPlatform("all"); }}>Reset</button></div><fieldset><legend>Product type</legend>{[["all","All products"],["review-stands","Review stands"],["review-cards","Review cards"],["review-stickers","Stickers"],["review-plates","Plates"],["bundles","Bundles"],["social-products","Social products"]].map(([value,label]) => <label key={value}><input type="radio" name="category" value={value} checked={category===value} onChange={() => setCategory(value)} /> <span>{label}</span></label>)}</fieldset><fieldset><legend>Platform</legend>{[["all","All platforms"],["google","Google"],["instagram","Instagram"]].map(([value,label]) => <label key={value}><input type="radio" name="platform" value={value} checked={platform===value} onChange={() => setPlatform(value)} /> <span>{label}</span></label>)}</fieldset><fieldset><legend>Availability</legend><label><input type="checkbox" defaultChecked /> <span>In stock</span></label></fieldset></div>;
  return <div className="product-browser">
    <div className="browser-toolbar"><div><button className="mobile-filter-button" onClick={() => setFiltersOpen(true)}><Filter /> Filters</button><span>{filtered.length} products</span></div><label>Sort by <select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="best">Best selling</option><option value="low">Price: Low to high</option><option value="high">Price: High to low</option></select></label></div>
    <div className="browser-layout"><aside className="desktop-filters">{filters}</aside><div className="commerce-grid">{filtered.map(product => <ProductCard product={product} key={product.id} />)}{filtered.length===0 && <div className="empty-products"><SlidersHorizontal /><h3>No exact matches</h3><p>Clear a filter to see more NFCPlate products.</p></div>}</div></div>
    {filtersOpen && <><button className="filter-backdrop" onClick={() => setFiltersOpen(false)} aria-label="Close filters"/><aside className="mobile-filters"><button className="mobile-filters__close" onClick={() => setFiltersOpen(false)}><X /> Close</button>{filters}<button className="apply-filters" onClick={() => setFiltersOpen(false)}>Show {filtered.length} products</button></aside></>}
  </div>;
}
