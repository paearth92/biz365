import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "../../site-header";
import { getProduct, products } from "../../../lib/catalog";
import { ProductDetailClient, ProductStory } from "../../../components/commerce/product-detail-client";
import { ProductCard } from "../../../components/commerce/product-card";

export function generateStaticParams(){return products.map(product=>({slug:product.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=getProduct(slug);return p?{title:p.seoTitle,description:p.seoDescription}:{}}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const product=getProduct(slug);if(!product)notFound();const related=product.relatedProductSlugs.map(getProduct).filter(Boolean);return <main><div className="announcement"><span>Free U.S. shipping on orders $35+</span><Link href="/shop">Shop all <ArrowRight size={14}/></Link></div><SiteHeader/><div className="shell product-page"><nav className="breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href="/shop">Shop</Link><span>/</span><strong>{product.name}</strong></nav><ProductDetailClient product={product}/><ProductStory product={product}/><section className="related-section"><div className="section-head"><div><span className="commerce-kicker">COMPLETE YOUR SETUP</span><h2>Related Biz365 products</h2></div><Link href="/shop">View all products <ArrowRight/></Link></div><div className="commerce-grid">{related.map(item=><ProductCard product={item!} key={item!.id}/>)}</div></section></div></main>}
