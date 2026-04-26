import type { Service } from "@/types";

/**
 * 25 programmatically-generated city × service landing pages.
 * Each page reuses the same `Service` type so it renders through
 * the existing /services/[slug] route.
 */

type Combo = {
  city: string;
  state: string;
  service: "rc" | "hp" | "duplicate" | "noc" | "address" | "dl";
  priceFrom: number;
  timeline: string;
};

const SHARED_DOCS: Record<Combo["service"], string[]> = {
  rc: [
    "Original RC Book",
    "Form 29 & Form 30 (signed by buyer & seller)",
    "Aadhaar of both parties",
    "PAN of both parties",
    "Insurance copy (in buyer's name preferred)",
    "PUC certificate",
    "Address proof of buyer",
    "Sale receipt or affidavit",
  ],
  hp: [
    "Original RC",
    "Form 35 (signed and stamped by financier)",
    "Bank NOC / loan closure letter",
    "Aadhaar",
    "Insurance copy",
    "PUC",
  ],
  duplicate: [
    "FIR / e-complaint copy (if lost)",
    "Form 26",
    "Aadhaar",
    "Insurance",
    "PUC",
    "Affidavit of loss (if applicable)",
  ],
  noc: ["Form 28 (3 copies)", "Original RC", "Insurance", "PUC", "Tax receipts", "Aadhaar"],
  address: ["Form 33", "New address proof", "Original RC", "Aadhaar", "Insurance", "PUC"],
  dl: ["Form 9", "Original DL", "Form 1A (medical, if 40+ years)", "Aadhaar", "Recent photo"],
};

const SHARED_STEPS: Record<Combo["service"], { title: string; description: string }[]> = {
  rc: [
    { title: "Share details",     description: "WhatsApp us your vehicle details and the buyer/seller's IDs." },
    { title: "Document review",   description: "We pre-verify Form 29/30 and supporting docs to avoid rejections." },
    { title: "RTO submission",    description: "Our local executive submits at the correct RTO with tracking." },
    { title: "Smart card delivery", description: "New RC delivered to your address." },
  ],
  hp: [
    { title: "Bank NOC + Form 35", description: "We help you get Form 35 from the financier if needed." },
    { title: "Verification",       description: "We check the lien details and supporting docs." },
    { title: "RTO submission",     description: "Filed at the registering RTO with status tracking." },
    { title: "Clean RC issued",    description: "Updated RC without the bank's lien is delivered." },
  ],
  duplicate: [
    { title: "FIR assistance",     description: "We guide you on lodging a quick online complaint if RC is lost." },
    { title: "Form 26 + affidavit",description: "We prepare the application bundle for you." },
    { title: "Submit & track",     description: "RTO submission and active follow-up till issue." },
    { title: "Smart card delivery",description: "New duplicate RC delivered." },
  ],
  noc: [
    { title: "Pre-checks",         description: "We clear pending challans and tax dues that block NOC." },
    { title: "Form 28 + clearances", description: "Police clearance + tax NDC arranged." },
    { title: "Submit at RTO",      description: "Submission and tracking till NOC issue." },
    { title: "NOC handover",       description: "Original NOC delivered for your destination state." },
  ],
  address: [
    { title: "Address proof",      description: "We confirm acceptable proofs for your RTO." },
    { title: "Form 33 prep",       description: "Filled and verified by our experts." },
    { title: "Submit & follow up", description: "Submission with tracking." },
    { title: "Updated RC delivery",description: "Smart card with new address delivered." },
  ],
  dl: [
    { title: "Eligibility check",  description: "We confirm if a medical certificate is needed." },
    { title: "Sarathi application",description: "Online application + slot booking." },
    { title: "Biometric / RTO visit", description: "We assist with the biometric appointment if required." },
    { title: "DL delivery",        description: "Renewed DL smart card delivered." },
  ],
};

const SERVICE_LABEL: Record<Combo["service"], { full: string; short: string; cat: Service["category"] }> = {
  rc:        { full: "RC Transfer",          short: "RC Transfer",     cat: "rc" },
  hp:        { full: "Hypothecation Removal",short: "HP Removal",      cat: "hp" },
  duplicate: { full: "Duplicate RC",         short: "Duplicate RC",    cat: "duplicate" },
  noc:       { full: "Vehicle NOC",          short: "Vehicle NOC",     cat: "noc" },
  address:   { full: "Address Change in RC", short: "Address Change",  cat: "address" },
  dl:        { full: "Driving Licence Renewal", short: "DL Renewal",   cat: "dl" },
};

const COMBOS: Combo[] = [
  // Mumbai metro
  { city: "Mumbai",     state: "Maharashtra", service: "rc",        priceFrom: 1899, timeline: "12–28 working days" },
  { city: "Mumbai",     state: "Maharashtra", service: "hp",        priceFrom: 1199, timeline: "10–20 working days" },
  { city: "Mumbai",     state: "Maharashtra", service: "noc",       priceFrom: 1499, timeline: "15–30 working days" },
  // Delhi
  { city: "Delhi",      state: "Delhi",       service: "rc",        priceFrom: 1899, timeline: "10–25 working days" },
  { city: "Delhi",      state: "Delhi",       service: "duplicate", priceFrom: 999,  timeline: "10–20 working days" },
  { city: "Delhi",      state: "Delhi",       service: "dl",        priceFrom: 799,  timeline: "7–15 working days" },
  // Bengaluru
  { city: "Bengaluru",  state: "Karnataka",   service: "rc",        priceFrom: 1899, timeline: "14–28 working days" },
  { city: "Bengaluru",  state: "Karnataka",   service: "hp",        priceFrom: 1199, timeline: "10–18 working days" },
  // Pune
  { city: "Pune",       state: "Maharashtra", service: "rc",        priceFrom: 1799, timeline: "12–22 working days" },
  { city: "Pune",       state: "Maharashtra", service: "address",   priceFrom: 899,  timeline: "10–20 working days" },
  // Hyderabad
  { city: "Hyderabad",  state: "Telangana",   service: "rc",        priceFrom: 1799, timeline: "12–22 working days" },
  { city: "Hyderabad",  state: "Telangana",   service: "noc",       priceFrom: 1499, timeline: "15–28 working days" },
  // Chennai
  { city: "Chennai",    state: "Tamil Nadu",  service: "rc",        priceFrom: 1799, timeline: "12–24 working days" },
  { city: "Chennai",    state: "Tamil Nadu",  service: "duplicate", priceFrom: 999,  timeline: "10–20 working days" },
  // Kolkata
  { city: "Kolkata",    state: "West Bengal", service: "rc",        priceFrom: 1799, timeline: "14–25 working days" },
  // Jaipur
  { city: "Jaipur",     state: "Rajasthan",   service: "rc",        priceFrom: 1699, timeline: "10–20 working days" },
  { city: "Jaipur",     state: "Rajasthan",   service: "hp",        priceFrom: 999,  timeline: "8–14 working days" },
  // Gujarat extra
  { city: "Vadodara",   state: "Gujarat",     service: "rc",        priceFrom: 1599, timeline: "10–22 working days" },
  { city: "Vadodara",   state: "Gujarat",     service: "hp",        priceFrom: 999,  timeline: "7–14 working days" },
  { city: "Surat",      state: "Gujarat",     service: "rc",        priceFrom: 1599, timeline: "10–22 working days" },
  { city: "Surat",      state: "Gujarat",     service: "dl",        priceFrom: 699,  timeline: "7–14 working days" },
  { city: "Rajkot",     state: "Gujarat",     service: "rc",        priceFrom: 1499, timeline: "10–18 working days" },
  { city: "Rajkot",     state: "Gujarat",     service: "noc",       priceFrom: 1299, timeline: "12–22 working days" },
  { city: "Gandhinagar",state: "Gujarat",     service: "rc",        priceFrom: 1499, timeline: "10–18 working days" },
  { city: "Bhavnagar",  state: "Gujarat",     service: "rc",        priceFrom: 1499, timeline: "10–18 working days" },
];

export const SEO_PAGES: Service[] = COMBOS.map((c) => {
  const label = SERVICE_LABEL[c.service];
  const slug = `${label.full.toLowerCase().replace(/\s+/g, "-")}-${c.city.toLowerCase().replace(/\s+/g, "-")}`;
  return {
    slug,
    title: `${label.full} in ${c.city}`,
    shortTitle: `${label.short} — ${c.city}`,
    blurb:
      `End-to-end ${label.full.toLowerCase()} assistance in ${c.city}, ${c.state}. ` +
      `Fixed fees, transparent timelines, real human follow-ups till delivery.`,
    category: label.cat,
    city: c.city,
    state: c.state,
    priceFrom: c.priceFrom,
    timeline: c.timeline,
    documents: SHARED_DOCS[c.service],
    steps: SHARED_STEPS[c.service],
    faqs: [
      {
        q: `Do you cover the ${c.city} RTO?`,
        a: `Yes — we have local executives who handle ${c.city} RTOs for ${label.full.toLowerCase()}. Most cases are managed without the customer needing to visit.`,
      },
      {
        q: `What if my case is rejected?`,
        a: `If we filed it, we resubmit at no additional service fee (only any re-applicable government fee). If your case is not legally possible, we refund our fee.`,
      },
      {
        q: `Can I track my case?`,
        a: `Yes — you'll get a ticket ID with live status updates on WhatsApp and inside your dashboard.`,
      },
    ],
  };
});

export const SEO_PAGE_SLUGS = SEO_PAGES.map((p) => p.slug);
