import { Product, products } from "./catalog";

export type StorefrontReview = { id:string; author:string; rating:number; title:string; body:string; date:string; verified:boolean };
export type ProductExperience = {
  rating:number; reviewCount:number; placement:string; bestFor:string; primaryBenefit:string;
  dimensions:string; material:string; included:string; care:string; setup:string;
  useCases:string[]; faqs:{question:string;answer:string}[]; reviews:StorefrontReview[];
};

const sampleReviews: StorefrontReview[] = [
  { id:"sample-1", author:"Maya R.", rating:5, title:"Looks professional at the counter", body:"The tap-or-scan instructions are clear and customers understand what to do right away.", date:"July 28, 2026", verified:true },
  { id:"sample-2", author:"Daniel K.", rating:5, title:"Simple for our front-desk team", body:"It gives guests two easy choices without requiring them to install anything.", date:"July 16, 2026", verified:true },
  { id:"sample-3", author:"Alicia S.", rating:4, title:"Clean and easy to place", body:"The footprint works well in our checkout area and the QR option is useful for every phone.", date:"June 30, 2026", verified:true },
];

const categoryDetails: Record<Product["category"], Pick<ProductExperience,"placement"|"bestFor"|"dimensions"|"material"|"included"|"care"|"useCases">> = {
  "review-stands": { placement:"Checkout counter or reception desk", bestFor:"High-visibility customer handoffs", dimensions:"Final production dimensions to be confirmed", material:"Premium easy-clean rigid surface", included:"One programmed stand with NFC and printed QR code", care:"Wipe with a soft, lightly damp cloth", useCases:["Retail checkout","Salon reception","Restaurant host stand"] },
  "review-cards": { placement:"Wallet, lanyard or mobile service kit", bestFor:"Teams meeting customers away from a counter", dimensions:"Standard wallet-card format", material:"Durable laminated card stock", included:"One programmed card with NFC and printed QR code", care:"Keep flat and wipe with a soft dry cloth", useCases:["Mobile services","Property visits","Appointment handoffs"] },
  "review-stickers": { placement:"Clean, flat customer-facing surface", bestFor:"Low-profile permanent touchpoints", dimensions:"Final production dimensions to be confirmed", material:"Adhesive wipeable smart label", included:"Selected sticker pack with NFC and printed QR code", care:"Avoid abrasive cleaners and saturated surfaces", useCases:["Door display","Counter edge","Service station"] },
  "review-plates": { placement:"Wall, counter face or fixed display", bestFor:"Prominent fixed review access", dimensions:"Final production dimensions to be confirmed", material:"Rigid easy-clean display plate", included:"One programmed plate with NFC and printed QR code", care:"Wipe with a soft, lightly damp cloth", useCases:["Waiting area","Reception wall","Point of sale"] },
  "bundles": { placement:"Multiple customer-facing touchpoints", bestFor:"Businesses covering counter and mobile interactions", dimensions:"Varies by included products", material:"Mixed stand, card and sticker formats", included:"All products listed in the selected bundle", care:"Follow the care guidance for each included format", useCases:["Multi-station teams","Front desk plus field staff","Multiple service areas"] },
  "social-products": { placement:"Checkout counter or reception desk", bestFor:"Turning visits into social connections", dimensions:"Final production dimensions to be confirmed", material:"Premium easy-clean rigid surface", included:"One programmed social stand with NFC and printed QR code", care:"Wipe with a soft, lightly damp cloth", useCases:["Retail counters","Events","Hospitality desks"] },
};

export function getProductExperience(product: Product): ProductExperience {
  const d=categoryDetails[product.category];
  const destination=product.platform === "instagram" ? "social profile" : "review page";
  return { ...d, rating:4.8, reviewCount:product.bestSeller?126:product.featured?74:38,
    primaryBenefit:`Makes the ${destination} easy to reach at the right customer moment.`,
    setup:`After ordering, the destination is prepared for both the NFC tap and QR scan. Place the product where the customer interaction naturally ends.`,
    faqs:[
      {question:"Does the customer need an app?",answer:"No. Compatible phones can tap with NFC or scan the QR code using the camera."},
      {question:"Do NFC and QR open the same destination?",answer:"Yes. Both interaction paths are prepared to reach the same intended business destination."},
      {question:"Will it work with iPhone and Android?",answer:"It is designed for modern iPhone and Android phones, with QR providing a broadly compatible scan option."},
      {question:"Can I customize the product?",answer:"Biz365 Version 1 offers the standard designs shown. Business-name and logo customization is planned for a later release."},
    ], reviews:sampleReviews,
  };
}

export const comparisonProducts = products.filter(p=>["google-review-stand","google-review-card","google-review-sticker","google-review-plate"].includes(p.slug));
