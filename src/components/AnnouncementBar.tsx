import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type AnnouncementBarProps = {
  link: string;
  label: string;
};

export function AnnouncementBar({ link, label }: AnnouncementBarProps) {
  return (
    <div className="announcement">
      <span>Free U.S. shipping on orders $35+</span>
      <Link to={link}>
        {label} <ArrowRight size={14} />
      </Link>
    </div>
  );
}
