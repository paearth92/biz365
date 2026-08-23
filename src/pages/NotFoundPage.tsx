import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { AnnouncementBar } from "../components/AnnouncementBar";
import { SiteFooter } from "../components/SiteFooter";

export function NotFoundPage() {
  return (
    <main>
      <AnnouncementBar link="/shop" label="Shop now" />
      <SiteHeader />
      <div className="page-not-found">
        <h1>404</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="premium-button primary">
          <ArrowLeft size={16} /> Back to homepage
        </Link>
      </div>
      <SiteFooter />
    </main>
  );
}
