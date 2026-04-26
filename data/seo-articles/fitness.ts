import type { KnowledgeArticle } from "@/types";

const cat = "Fitness";
const cs = "fitness";
const author = "RTO Mitra Team";

export const FITNESS_ARTICLES: KnowledgeArticle[] = [
  {
    slug: "fitness-certificate-vehicle-india",
    category: cat, categorySlug: cs, author,
    title: "Fitness Certificate India — When and How",
    excerpt: "Fitness certificate confirms your vehicle meets safety and emission norms. Required for old + commercial.",
    body: [
      "## Who needs it",
      "- Personal vehicles > 15 years (at re-registration)",
      "- All commercial vehicles annually (light) / 2 years (heavy)",
      "## Process",
      "1. Book slot at authorised testing centre (ATC) or RTO.",
      "2. Vehicle inspection — brakes, lights, tyres, pollution.",
      "3. Pay test fee (~₹600 for 4W, ₹1,500 for HMV).",
      "4. Form 38 (Fitness Certificate) issued.",
      "## Validity",
      "1 year (commercial light), 2 years (commercial heavy), 5 years (private re-reg).",
    ].join("\n\n"),
    readingMinutes: 3,
    publishedAt: "2026-04-02",
    faqs: [
      { q: "Failed test — what next?", a: "Repair issues + re-test; usually small re-test fee." },
      { q: "Automated test centre vs RTO?", a: "ATC is faster, more objective. Mandatory in Delhi, Maharashtra." },
    ],
    related: ["fitness-renewal-commercial-vehicle", "fitness-gujarat-process"],
  },
  {
    slug: "fitness-renewal-commercial-vehicle",
    category: cat, categorySlug: cs, author,
    title: "Fitness Renewal for Commercial Vehicles — Annual Cycle",
    excerpt: "Commercial vehicles need annual fitness. Process, charges, common rejection reasons.",
    body: [
      "## When to apply",
      "Up to 60 days before expiry. Apply early during festive seasons.",
      "## Documents",
      "- Form 38 (renewal application)",
      "- Original RC + insurance + PUC",
      "- Last fitness certificate",
      "- Tax payment receipt",
      "## Common rejections",
      "1. Bald tyres",
      "2. Headlight aim off",
      "3. Brake imbalance",
      "4. Smoke density (for diesel)",
      "## Tip",
      "Service the vehicle at authorised workshop a week before — saves a re-test trip.",
    ].join("\n\n"),
    readingMinutes: 3,
    publishedAt: "2026-04-03",
    faqs: [
      { q: "Penalty for expired fitness?", a: "₹2,000–₹5,000 + insurance void; vehicle may be seized." },
      { q: "Faster turnaround?", a: "Premium ATCs offer same-day fitness for ₹2x fee." },
    ],
    related: ["fitness-certificate-vehicle-india", "road-tax-commercial-vehicles"],
  },
  {
    slug: "fitness-gujarat-process",
    category: cat, categorySlug: cs, author,
    title: "Fitness Certificate in Gujarat — RTO + ATC Process",
    excerpt: "Gujarat fitness certificate process — automated testing centres, RTO option, fees and timeline.",
    body: [
      "## ATC vs RTO",
      "Gujarat operates both. ATC (Vapi, Vadodara, Ahmedabad) gives faster, objective results.",
      "## Process",
      "1. Book slot via cot.gujarat.gov.in or directly at ATC.",
      "2. Vehicle inspection: ~30 min.",
      "3. Form 38 issued same day if pass.",
      "## Fees",
      "₹500 (2W) / ₹600 (LMV) / ₹1,500 (HMV) + ATC service fee ~₹500.",
      "## Tip",
      "Carry latest pollution certificate — checked alongside fitness.",
    ].join("\n\n"),
    readingMinutes: 3,
    publishedAt: "2026-04-04",
    faqs: [
      { q: "Slot booking compulsory?", a: "Yes, walk-ins discontinued in most ATCs." },
      { q: "Reschedule charges?", a: "Free up to 24 hr before; ₹100 within 24 hr." },
    ],
    related: ["fitness-certificate-vehicle-india", "fitness-renewal-commercial-vehicle"],
  },
];
