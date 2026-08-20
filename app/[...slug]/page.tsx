import Link from "next/link";
import { ArrowLeft, ArrowRight, Layers3 } from "lucide-react";
import { SiteHeader } from "../site-header";

export default async function FoundationPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const title = slug.at(-1)?.replaceAll("-", " ") ?? "NFCPlate";
  return (
    <main>
      <div className="announcement"><span>NFCPlate</span><Link href="/shop">Shop now <ArrowRight size={14} /></Link></div>
      <SiteHeader />
      <section className="foundation-page">
        <div className="foundation-icon"><Layers3 /></div>
        <p className="kicker">NFCPLATE</p>
        <h1>{title}</h1>
        <p>This route is connected to the NFCPlate experience and ready for its dedicated commerce or content template.</p>
        <Link className="button button--primary" href="/"><ArrowLeft size={16} /> Back to homepage</Link>
      </section>
    </main>
  );
}
