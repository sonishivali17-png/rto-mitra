/**
 * Category-level defaults that get merged into every article at render time.
 * Lets us upgrade all 100 articles without rewriting prose:
 *   - Trusted-source citations (E-E-A-T)
 *   - Common follow-up FAQs
 *
 * These are *defaults*: per-article `sources` / `faqs` are appended on top.
 */

type Source = { title: string; url: string };
type Faq = { q: string; a: string };

const COMMON: Source[] = [
  { title: "Parivahan Sewa (Govt of India)",       url: "https://parivahan.gov.in" },
  { title: "VAHAN Citizen Services",                url: "https://vahan.parivahan.gov.in" },
  { title: "Sarathi (Driving Licence portal)",      url: "https://sarathi.parivahan.gov.in" },
  { title: "Gujarat Transport — cot.gujarat.gov.in",url: "https://cot.gujarat.gov.in" },
];

export const CATEGORY_SOURCES: Record<string, Source[]> = {
  "rc-transfer": COMMON.concat([
    { title: "Central Motor Vehicles Rules 1989", url: "https://morth.nic.in/road-transport-and-highways" },
  ]),
  "driving-licence": COMMON.concat([
    { title: "Sarathi Help Centre", url: "https://sarathi.parivahan.gov.in/sarathiservice/staticServiceJSP.do?stateCode=33&serviceName=help" },
    { title: "Motor Vehicles (Amendment) Act 2019", url: "https://prsindia.org/billtrack/the-motor-vehicles-amendment-bill-2019" },
  ]),
  "vehicle-registration": COMMON.concat([
    { title: "MoRTH — Bharat Series notification", url: "https://morth.nic.in/sites/default/files/notifications_document/BH-series.pdf" },
  ]),
  "duplicate-rc": COMMON,
  "hp-removal": COMMON.concat([
    { title: "RBI Master Direction — Loan closure", url: "https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx" },
  ]),
  "noc": COMMON.concat([
    { title: "Road tax refund — state procedures", url: "https://parivahan.gov.in/parivahan/en/content/tax-refund" },
  ]),
  "address-change": COMMON,
  "challan": COMMON.concat([
    { title: "echallan — National portal", url: "https://echallan.parivahan.gov.in" },
    { title: "Gujarat Traffic Cell — gtc.gujarat.gov.in", url: "https://gtc.gujarat.gov.in" },
  ]),
  "fancy-number": COMMON.concat([
    { title: "VAHAN fancy-number bidding", url: "https://vahan.parivahan.gov.in/vahanservice/vahan/ui/fancyNumber" },
  ]),
  "tax": COMMON.concat([
    { title: "Parivahan tax calculator", url: "https://parivahan.gov.in/parivahan//en/content/tax-calculator" },
  ]),
  "permit": COMMON.concat([
    { title: "MoRTH National Permit notifications", url: "https://morth.nic.in" },
  ]),
  "fitness": COMMON.concat([
    { title: "Automated Testing Centres — MoRTH", url: "https://morth.nic.in/sites/default/files/notifications_document/atc.pdf" },
  ]),
  "insurance": COMMON.concat([
    { title: "IRDAI — Motor Insurance regulations", url: "https://irdai.gov.in" },
    { title: "IIB — Information Bureau", url: "https://www.iib.gov.in" },
  ]),
  "fastag": COMMON.concat([
    { title: "NHAI FASTag", url: "https://fastag.ihmcl.com" },
    { title: "NPCI — FASTag", url: "https://www.npci.org.in/what-we-do/netc-fastag/product-overview" },
  ]),
};

/** Two universal closing FAQs added to every article. */
const UNIVERSAL_FAQS: Faq[] = [
  {
    q: "Is RTO Mitra a government website?",
    a: "No — RTO Mitra is an independent assistance and information platform. We help you navigate official processes on parivahan.gov.in and your state's transport portal, but all approvals are issued by the RTO itself.",
  },
  {
    q: "Can I get this work done by RTO Mitra end-to-end?",
    a: "Yes — for most services we offer fixed-fee, end-to-end execution including document pickup, RTO submission, and smart-card delivery. Browse services or WhatsApp our team for a quote in minutes.",
  },
];

/** Category-specific extra FAQs that ride along with universal ones. */
export const CATEGORY_FAQS: Record<string, Faq[]> = {
  "rc-transfer": [
    { q: "Do I need to be present at the RTO for an RC transfer?",
      a: "Most cases proceed without your physical presence. Inspection — when required — does need the vehicle to be brought in." },
    { q: "What if the seller has already left the country?",
      a: "If Form 29/30 was signed before they left, transfer can still proceed. If not, you'll need an affidavit of sale + buyer's declaration; consult our team." },
  ],
  "driving-licence": [
    { q: "Is Aadhaar mandatory for a DL in 2026?",
      a: "Aadhaar e-KYC is the fastest path on Sarathi, but you can still apply with alternate ID. Some states accept passport + voter ID + utility bill bundles." },
  ],
  "vehicle-registration": [
    { q: "Will my vehicle get scrapped after 15 years?",
      a: "Only in NCR/CAQM zones (Delhi, parts of UP/HR/RJ). Elsewhere, you can re-register every 5 years subject to fitness." },
  ],
  "duplicate-rc": [
    { q: "Will my old RC still work after duplicate is issued?",
      a: "No — once duplicate is issued, the original card stands cancelled in VAHAN. Surrender it if found." },
  ],
  "hp-removal": [
    { q: "What if the financier (NBFC/bank) is shut down?",
      a: "Approach the merged successor entity or RBI's banking ombudsman with your loan-closure proof. We routinely help escalate." },
  ],
  "noc": [
    { q: "Can I drive on NOC alone after moving states?",
      a: "Yes for up to 30 days; after that fresh registration is mandatory in the destination state." },
  ],
  "address-change": [
    { q: "Do I need to update FASTag address separately?",
      a: "Yes — FASTag KYC must match the latest RC; update via your issuer's app after RC is updated." },
  ],
  "challan": [
    { q: "Will pending challans block my RC transfer or NOC?",
      a: "Yes — most RTOs refuse RC transfer or NOC until echallan shows zero pending." },
  ],
  "fancy-number": [
    { q: "Can I bid for a fancy number that's already been auctioned?",
      a: "Once won and used, the number stays with that vehicle. Auction-pool numbers refresh per series." },
  ],
  "tax": [
    { q: "Is tax refundable if I move within the same state?",
      a: "No — refunds apply only across states with NOC + re-registration." },
  ],
  "permit": [
    { q: "Difference between permit and route authorisation?",
      a: "Permit is the legal right to ply; authorisation is the per-state acknowledgement. National permits need both." },
  ],
  "fitness": [
    { q: "Failed fitness — how long do I have to fix?",
      a: "Re-test slot is usually within 30 days; vehicle off-road in the meantime." },
  ],
  "insurance": [
    { q: "Does my insurance cover the new buyer right after sale?",
      a: "Cover is automatic for 14 days post-sale; after that, the buyer must update the policy or get a fresh one." },
  ],
  "fastag": [
    { q: "Can I use one FASTag across multiple vehicles?",
      a: "No — one tag is locked to one vehicle. Multiple vehicles need multiple tags." },
  ],
};

export function withCategoryDefaults(
  categorySlug: string,
  faqs: Faq[] | undefined,
  sources: Source[] | undefined
) {
  const mergedFaqs: Faq[] = [
    ...(faqs ?? []),
    ...(CATEGORY_FAQS[categorySlug] ?? []),
    ...UNIVERSAL_FAQS,
  ];
  const mergedSources: Source[] = [
    ...(sources ?? []),
    ...(CATEGORY_SOURCES[categorySlug] ?? COMMON),
  ];
  // De-dup sources by URL
  const seen = new Set<string>();
  const uniqueSources = mergedSources.filter((s) =>
    seen.has(s.url) ? false : (seen.add(s.url), true)
  );
  return { faqs: mergedFaqs, sources: uniqueSources };
}
