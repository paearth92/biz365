export type Industry = {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  moment: string;
  image: string;
  imageAlt: string;
  productSlug: string;
  productName: string;
};

export const industries: Industry[] = [
  {
    slug: "restaurants",
    name: "Restaurants",
    eyebrow: "Host stand · checkout",
    description: "Keep a polished review invitation visible where a great meal naturally ends.",
    moment: "Place a full-size stand at the host desk or payment counter.",
    image: "/images/industries/biz365-nfc-google-review-stand-restaurant.webp",
    imageAlt: "NFCPlate NFC and QR Google Review Stand on a realistic restaurant host counter",
    productSlug: "google-review-stand",
    productName: "Google Review Stand",
  },
  {
    slug: "cafes",
    name: "Cafés",
    eyebrow: "Register · pickup counter",
    description: "Use a compact touchpoint that feels natural beside the register, cups and daily service flow.",
    moment: "A compact stand fits tighter counters without disappearing.",
    image: "/images/industries/biz365-compact-nfc-review-stand-cafe.webp",
    imageAlt: "Compact NFCPlate NFC Google Review Stand beside a café register",
    productSlug: "compact-google-review-stand",
    productName: "Compact Review Stand",
  },
  {
    slug: "bars-nightlife",
    name: "Bars & nightlife",
    eyebrow: "Payment area · bar top",
    description: "Create a fixed, visible review point that works in busy service and lower-light environments.",
    moment: "A rigid plate keeps the prompt visible near the payment area.",
    image: "/images/industries/biz365-nfc-google-review-plate-bar-nightlife.webp",
    imageAlt: "NFCPlate NFC Google Review Plate installed at a realistic modern bar payment area",
    productSlug: "google-review-plate",
    productName: "Google Review Plate",
  },
  {
    slug: "barbershops",
    name: "Barbershops",
    eyebrow: "Barber station · front desk",
    description: "Turn the final mirror check and checkout into an easy review or social-follow moment.",
    moment: "Use an Instagram stand at the station or a review stand at reception.",
    image: "/images/industries/biz365-instagram-nfc-follow-stand-barbershop.webp",
    imageAlt: "NFCPlate Instagram NFC and QR Follow Stand at a realistic barbershop station",
    productSlug: "instagram-follow-stand",
    productName: "Instagram Follow Stand",
  },
  {
    slug: "salons-spas",
    name: "Salons & spas",
    eyebrow: "Reception · styling station",
    description: "Invite clients to stay connected while the finished look—and the experience—is still fresh.",
    moment: "A social stand feels at home beside a refined reception display.",
    image: "/images/industries/biz365-instagram-follow-stand-salon-spa.webp",
    imageAlt: "NFCPlate Instagram NFC Follow Stand at a realistic salon and spa reception desk",
    productSlug: "instagram-follow-stand",
    productName: "Instagram Follow Stand",
  },
  {
    slug: "retail-stores",
    name: "Retail stores",
    eyebrow: "Checkout · service desk",
    description: "Give shoppers a clear next step after a helpful visit, fitting or completed purchase.",
    moment: "A low-profile sticker keeps the counter clean and easy to use.",
    image: "/images/industries/biz365-nfc-google-review-sticker-retail-checkout.webp",
    imageAlt: "NFCPlate NFC Google Review Sticker placed at a realistic boutique retail checkout",
    productSlug: "google-review-sticker",
    productName: "Google Review Sticker",
  },
  {
    slug: "gyms-wellness",
    name: "Gyms & wellness",
    eyebrow: "Front desk · member exit",
    description: "Make feedback easy after a class, training session or positive front-desk interaction.",
    moment: "A compact stand stays visible without crowding the check-in desk.",
    image: "/images/industries/biz365-compact-review-stand-gym-wellness.webp",
    imageAlt: "Compact NFCPlate NFC Google Review Stand at a realistic gym front desk",
    productSlug: "compact-google-review-stand",
    productName: "Compact Review Stand",
  },
  {
    slug: "real-estate",
    name: "Real estate",
    eyebrow: "Showing · key handoff",
    description: "Carry a professional review link to open houses, closings and client handoffs.",
    moment: "A wallet-size review card travels naturally with the agent.",
    image: "/images/industries/biz365-nfc-google-review-card-real-estate.webp",
    imageAlt: "NFCPlate NFC Google Review Card used during a realistic real-estate key handoff",
    productSlug: "google-review-card",
    productName: "Google Review Card",
  },
  {
    slug: "events",
    name: "Events",
    eyebrow: "Check-in · vendor table",
    description: "Help guests connect with a brand while they are already engaged in the experience.",
    moment: "A portable card works across check-in, booths and face-to-face handoffs.",
    image: "/images/industries/biz365-nfc-review-card-event-checkin.webp",
    imageAlt: "NFCPlate NFC and QR card used at a realistic event check-in table",
    productSlug: "google-review-card",
    productName: "Google Review Card",
  },
  {
    slug: "professional-offices",
    name: "Professional offices",
    eyebrow: "Reception · client exit",
    description: "Add a restrained review touchpoint that belongs in a polished, trust-focused setting.",
    moment: "A review stand gives reception a clear, permanent-looking prompt.",
    image: "/images/industries/biz365-google-review-stand-professional-office.webp",
    imageAlt: "NFCPlate NFC Google Review Stand at a realistic professional office reception desk",
    productSlug: "google-review-stand",
    productName: "Google Review Stand",
  },
];
