import {
  UtensilsCrossed,
  Scissors,
  Dumbbell,
  ShoppingCart,
  Briefcase,
  Home,
  Music,
  CalendarCheck,
  type LucideIcon,
} from "lucide-react";

export type Industry = {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  products: string[];
};

export const industries: Industry[] = [
  {
    slug: "restaurants-cafes",
    name: "Restaurants & Cafes",
    description:
      "Place a review stand at the register or tableside so happy diners can leave a review before they walk out.",
    icon: UtensilsCrossed,
    products: ["google-review-stand", "google-review-sticker", "business-review-bundle"],
  },
  {
    slug: "salons-studios",
    name: "Salons & Studios",
    description:
      "Keep a review card at every station and turn checkouts into five-star moments.",
    icon: Scissors,
    products: ["google-review-card", "compact-google-review-stand", "review-starter-bundle"],
  },
  {
    slug: "gym-wellness",
    name: "Gym & Wellness",
    description:
      "Add a compact stand at the front desk so members share their experience on the way out.",
    icon: Dumbbell,
    products: ["compact-google-review-stand", "google-review-sticker"],
  },
  {
    slug: "retail-service",
    name: "Retail & Service",
    description:
      "Place a sticker at the checkout counter for a quick, frictionless review prompt.",
    icon: ShoppingCart,
    products: ["google-review-sticker", "google-review-stand", "review-starter-bundle"],
  },
  {
    slug: "professional-offices",
    name: "Professional Offices",
    description:
      "Display a review plate in your reception area for clients leaving appointments.",
    icon: Briefcase,
    products: ["google-review-plate", "google-review-stand"],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    description:
      "Hand a review card to clients at closing and make the ask effortless.",
    icon: Home,
    products: ["google-review-card", "review-starter-bundle"],
  },
  {
    slug: "bars-nightlife",
    name: "Bars & Nightlife",
    description:
      "Set a review plate on the bar so patrons can tap while they wait for their tab.",
    icon: Music,
    products: ["google-review-plate", "google-review-sticker"],
  },
  {
    slug: "events-checkin",
    name: "Events & Check-in",
    description:
      "Use cards at registration desks so attendees can follow and review instantly.",
    icon: CalendarCheck,
    products: ["google-review-card", "instagram-follow-stand"],
  },
];
