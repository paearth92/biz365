import Link from "next/link";
import { ArrowLeft, ArrowRight, Layers3 } from "lucide-react";
import { SiteHeader } from "../site-header";

export default async function FoundationPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const title = slug.at(-1)?.replaceAll("-", " ") ?? "Biz365";
  return (
    <main>
      <div className="announcement"><span>Biz365 Phase 1 foundation</span><Link href="/shop">Shop now <ArrowRight size={14} /></Link></div>
      <SiteHeader />
      <section className="foundation-page">
        <div className="foundation-icon"><Layers3 /></div>
        <p className="kicker">BIZ365</p>
        <h1>{title}</h1>
        <p>This route is connected to the Biz365 architecture and ready for its dedicated commerce or content template in the next build phase.</p>
        <Link className="button button--primary" href="/"><ArrowLeft size={16} /> Back to homepage</Link>
      </section>
    </main>
  );
}
