import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "../site-header";
import { CartPageClient } from "../../components/commerce/cart-page-client";

export const metadata:Metadata={title:"Your Cart | NFCPlate",description:"Review the standard NFCPlate NFC and QR products in your shopping cart.",robots:{index:false,follow:false}};
export default function CartPage(){return <main><div className="announcement"><span>Free U.S. shipping on orders $35+</span><Link href="/shop">Shop all <ArrowRight size={14}/></Link></div><SiteHeader/><div className="shell cart-page"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><strong>Cart</strong></nav><CartPageClient/></div></main>}
