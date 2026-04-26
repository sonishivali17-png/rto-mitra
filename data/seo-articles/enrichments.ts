import type { KnowledgeArticle } from "@/types";

/**
 * Slug-keyed enrichments. Anything missing for an article falls back to
 * sensible defaults at render time — but where geography or comparison
 * actually adds ranking value, we hand-curate it here.
 *
 * Featured-snippet tldr: 1–2 sentence answer to the headline query.
 */

type Enrichment = Partial<
  Pick<KnowledgeArticle, "tldr" | "cityVariants" | "comparisonTable" | "author">
>;

export const ARTICLE_ENRICHMENTS: Record<string, Enrichment> = {
  /* ---------------------- RC Transfer ---------------------- */
  "rc-transfer-fees-india-2026": {
    author: "rajesh",
    tldr:
      "RC transfer fees in 2026 range from ₹400 (2-wheeler) to ₹1,500 (commercial), plus a ₹200 smart-card fee. Pending challans and road-tax dues must be cleared before submission.",
    comparisonTable: {
      title: "RC transfer fees by vehicle class",
      headers: ["Vehicle class", "Govt fee", "Smart card", "Postal", "Total"],
      rows: [
        ["Two-wheeler",          "₹400–₹600",   "₹200", "₹35–₹100", "~₹650"],
        ["Four-wheeler private", "₹600–₹1,000", "₹200", "₹35–₹100", "~₹1,100"],
        ["Commercial",           "₹1,000–₹1,500","₹200","₹35–₹100", "~₹1,600"],
        ["EV (most states)",      "Waived",      "₹200", "₹35–₹100", "~₹250"],
      ],
      caption: "Indicative — exact amount confirmed by your registering RTO.",
    },
    cityVariants: [
      { city: "Ahmedabad",  note: "Strict insurance-name match; PUC must be < 6 months old." },
      { city: "Surat",      note: "Diamond-trade season (Oct–Dec) adds 5–7 days." },
      { city: "Mumbai",     note: "Higher service load; expect 4–6 weeks vs 3 in smaller cities." },
      { city: "Bengaluru",  note: "Digital Form 29/30 accepted in select RTOs since 2025." },
      { city: "Delhi",      note: "EV transfers fully exempt from govt fee; HSRP fitting same day." },
    ],
  },
  "rc-transfer-documents-checklist": {
    author: "rajesh",
    tldr: "Minimum docs: original RC, Form 29 (duplicate) + Form 30, Aadhaar + PAN of buyer & seller, valid insurance and PUC, sale receipt. Add Form 35 for HP cases and Form 31 for inheritance.",
  },
  "how-long-does-rc-transfer-take": {
    author: "rajesh",
    tldr: "Most RC transfers complete in 10–25 working days end-to-end. Inter-state and inheritance cases stretch to 30–60 days because of NOC, succession or police-verification stages.",
  },
  "rc-transfer-online-vs-offline": {
    author: "rajesh",
    tldr: "Application initiation, fee payment, status tracking and smart-card delivery are online via parivahan.gov.in. Wet signatures on Form 29/30, original RC submission and any inspection still need a physical RTO touchpoint.",
    comparisonTable: {
      title: "Online vs offline — what's possible in 2026",
      headers: ["Step", "Online", "Offline (RTO visit)"],
      rows: [
        ["Application start",          "Yes", "Optional"],
        ["Fee payment",                "Yes", "Optional"],
        ["Wet signature Form 29/30",   "No",  "Required"],
        ["Submit original RC",         "No",  "Required"],
        ["Vehicle inspection",         "No",  "When applicable"],
        ["Smart-card delivery",        "Yes", "Yes"],
      ],
    },
  },
  "rc-transfer-form-29-form-30-explained": {
    author: "rajesh",
    tldr: "Form 29 = seller's notice of transfer (filed in duplicate). Form 30 = buyer's application asking the RTO to update ownership. Most rejections come from signature mismatches with PAN/Aadhaar.",
  },
  "rc-transfer-rejected-common-reasons": {
    author: "rajesh",
    tldr: "Top reasons: signature mismatch on Form 29/30, insurance still in seller's name, expired PUC, pending challans on echallan, and HP entry not removed.",
  },
  "rc-transfer-interstate": {
    author: "rajesh",
    tldr: "Two steps: NOC (Form 28) from the registering RTO, followed by re-registration (Form 27) at the destination state. Tax refund on unused months can be claimed back from the original state.",
  },
  "rc-transfer-ahmedabad-guide": {
    author: "rajesh",
    cityVariants: [
      { city: "Subhash Bridge (GJ-1)", note: "Older registrations (pre-2011); token system from 9:30 AM." },
      { city: "Vastral (GJ-27)",       note: "Newer registrations; mostly afternoon slots." },
    ],
  },
  "rc-transfer-surat-guide": {
    author: "rajesh",
    cityVariants: [
      { city: "Athwa Lines (GJ-5)", note: "Diamond-trade season Oct–Dec adds 5–7 days." },
      { city: "Surat Ext (GJ-28)",  note: "Newer plates; less queue." },
    ],
  },

  /* ---------------------- Driving Licence ---------------------- */
  "how-to-apply-for-driving-licence-india-2026": {
    author: "kavita",
    tldr: "Hold a valid LL for 30+ days, apply on Sarathi, pay fees, take the slot, pass the test on your own/friend's vehicle, and receive the smart card by post in 2–3 weeks.",
    comparisonTable: {
      title: "DL eligibility by vehicle type",
      headers: ["Vehicle", "Min age", "Pre-requisite", "Test type"],
      rows: [
        ["Gearless ≤ 50cc",     "16+", "Parental consent",            "Practical"],
        ["Geared 2W / car",     "18+", "Valid LL ≥ 30 days",          "Theory + Practical"],
        ["Transport (CDL)",     "20+", "1 yr non-transport DL",       "Practical + Medical"],
        ["Heavy goods / pass.", "22+", "Driving school certificate",  "Practical + Medical"],
      ],
    },
  },
  "learners-licence-online-india": {
    author: "kavita",
    tldr: "Apply on sarathi.parivahan.gov.in, complete Aadhaar e-KYC, take the mandatory e-learning module, schedule the online test, score 16/20+ and download the LL — all without an RTO visit in most states.",
  },
  "driving-licence-test-tips-rto": {
    author: "kavita",
    tldr: "Examiners want smooth, predictable driving — not speed. Always belt up first, adjust mirrors, use indicators, and clear the H-pattern (4W) or figure-8 (2W) without touching cones.",
  },
  "driving-licence-fees-india-2026": {
    author: "kavita",
    tldr: "Standard 2026 fees: LL ₹150, DL ₹200 + ₹200 smart card, renewal ₹200, IDP ₹1,000, duplicate ₹200, test ₹300. Late renewal adds ₹300/year after expiry.",
  },
  "international-driving-permit-india": {
    author: "kavita",
    tldr: "An IDP is a translation of your Indian DL recognised in 150+ countries under the 1949 Geneva Convention. Issued in 1–2 days; valid for one year or until your Indian DL expires.",
  },
  "dl-renewal-after-expiry-penalty": {
    author: "kavita",
    tldr: "0–30 days after expiry: normal fee. 30 days–1 year: ₹300 late fee. 1–5 years: late fee + medical. Beyond 5 years: re-application + LL + driving test.",
  },
  "commercial-driving-licence-india": {
    author: "kavita",
    tldr: "CDL needs age 20+, a valid non-transport DL for ≥ 1 year, 8th-pass certificate and Form 1A medical. Renewal cycle is 3 years vs 20 for personal.",
  },

  /* ---------------------- Vehicle Registration ---------------------- */
  "new-vehicle-registration-india-process": {
    author: "rajesh",
    tldr: "Dealer files Form 20 + temporary registration. You complete permanent registration within 30 days using Form 21, Form 22, insurance, PUC and ID — paying govt fee + road tax + HSRP charge.",
  },
  "vehicle-registration-fees-india": {
    author: "arjun",
    tldr: "Total registration cost = registration fee (₹200–₹1,500) + state road tax (4–14% of ex-showroom) + ₹200 smart card + HSRP (₹400–₹1,200). Same car can cost ₹2L more in some states.",
    comparisonTable: {
      title: "Indicative road-tax % across major states",
      headers: ["State", "Petrol 4W", "Diesel 4W", "EV 4W"],
      rows: [
        ["Karnataka",   "13–18%", "+1%", "Waived"],
        ["Maharashtra", "11–14%", "+1%", "Waived"],
        ["Tamil Nadu",  "10–15%", "+1%", "Waived"],
        ["Gujarat",     "6–8%",   "+1%", "Waived"],
        ["Delhi",       "4–10%",  "+1%", "Waived"],
      ],
    },
  },
  "vehicle-registration-validity-15-years": {
    author: "rajesh",
    tldr: "Personal vehicles get 15 years initial RC validity. After that, renew via Form 25 every 5 years with fitness certificate, except in Delhi-NCR where re-registration is barred.",
  },
  "bharat-series-bh-number-plate": {
    author: "arjun",
    tldr: "BH-series lets eligible employees skip re-registration when moving states, paying road tax in 2-year blocks (8/10/12% of price). Defence, central/state govt, PSU and multi-state private employees qualify.",
  },
  "hsrp-high-security-number-plate": {
    author: "arjun",
    tldr: "HSRP plates have hot-stamped chromium holograms, laser-etched IDs and snap-lock fixings. Mandatory for all vehicles since April 2019 — fitting cost ₹400–₹1,200 via the manufacturer's portal.",
  },
  "ev-registration-india": {
    author: "arjun",
    tldr: "Electric vehicles get green plates (white text private / yellow commercial), 100% road-tax waiver in most states, and direct FAME-II subsidy at the dealer level.",
  },

  /* ---------------------- Duplicate RC ---------------------- */
  "lost-rc-fir-online": {
    author: "rajesh",
    tldr: "File an online lost-article complaint on your state police portal (e.g. gp.gujarat.gov.in for Gujarat). The acknowledgement copy is accepted by most RTOs in lieu of a full FIR.",
  },
  "duplicate-rc-fees-india": {
    author: "rajesh",
    tldr: "Total cost ~₹400 (govt ₹200 + smart card ₹200) plus postal ₹35–₹100. Some states (Maharashtra, TN) add a ₹100 verification fee.",
  },

  /* ---------------------- HP Removal ---------------------- */
  "form-35-download-and-fill-guide": {
    author: "ankita",
    tldr: "Form 35 is the bank's notice of HP termination — issued after full loan repayment. Vehicle, engine and chassis numbers must be entered by the bank, with seal and signature.",
  },
  "hp-removal-fees-and-timeline": {
    author: "ankita",
    tldr: "Govt fee ₹100 + smart card ₹200; banks issue Form 35 free for most major lenders. Total turnaround: 3–5 weeks (bank: 1–2 weeks, RTO: 2–3 weeks).",
    comparisonTable: {
      title: "Bank-by-bank Form 35 turnaround",
      headers: ["Bank", "Channel", "Typical turnaround", "Fee"],
      rows: [
        ["HDFC Bank",   "NetBanking → Loans",  "Same day digital + 7d post",  "Free"],
        ["ICICI Bank",  "iMobile app",         "7–10 days post",              "Free"],
        ["SBI",         "Branch",              "10–14 days",                  "₹500"],
        ["Axis Bank",   "Email loan-noc@",     "5–7 days digital",            "Free"],
        ["Bajaj Finance","Bajaj Finserv app",  "Instant digital",             "Free"],
      ],
    },
  },
  "hp-removal-major-banks-procedure": { author: "ankita" },
  "bank-noc-for-hp-removal":          { author: "ankita" },

  /* ---------------------- NOC ---------------------- */
  "vehicle-noc-application-india-process": {
    author: "rajesh",
    tldr: "File Form 28 (3 copies) at your registering RTO with cleared challans, road-tax receipts, valid insurance and PUC. NOC is issued in 12–25 working days and valid for 6 months.",
  },
  "noc-fees-and-timeline": {
    author: "rajesh",
    tldr: "NOC application ₹100 + police verification ₹100 + postal ₹35. Add green tax (₹2k–₹10k) for vehicles > 5 years. Realistic total turnaround: 3–5 weeks.",
  },
  "noc-interstate-transfer-gujarat-maharashtra": {
    author: "rajesh",
    tldr: "Gujarat → Maharashtra: file Form 28 in GJ, get NOC in 15–25 days. Re-register in MH (Form 27) and pay MH road tax. Tax refund on unused GJ months can be claimed back.",
    cityVariants: [
      { city: "Mumbai",  note: "MH road tax for premium cars (>₹20L) can be ₹3–4 lakh — factor in." },
      { city: "Pune",    note: "Faster MH re-reg counter on weekdays before 11 AM." },
      { city: "Ahmedabad", note: "GJ refund processing typically 60–90 days." },
    ],
  },
  "pending-challans-noc-blocked": {
    author: "rajesh",
    tldr: "Pending challans are the #1 reason NOC gets rejected. Pay or dispute them on echallan.parivahan.gov.in, then wait 3–7 days for VAHAN sync before re-applying.",
  },

  /* ---------------------- Address Change ---------------------- */
  "address-change-in-rc-india-process": {
    author: "rajesh",
    tldr: "File Form 33 at the registering RTO with a recent address proof (Aadhaar, voter ID, electricity bill, or registered rent agreement). Total cost ~₹400, smart card delivered in 10–20 days.",
  },
  "address-proofs-accepted-by-rto": { author: "rajesh" },

  /* ---------------------- Challan ---------------------- */
  "how-to-check-pending-challan-online": {
    author: "arjun",
    tldr: "Visit echallan.parivahan.gov.in, enter your vehicle or DL number, view the list with date / location / fine, and pay via UPI / card / netbanking. Recent challans may take up to 7 days to appear.",
  },
  "traffic-challan-rates-india-2026": {
    author: "arjun",
    tldr: "Common 2026 fines: no helmet ₹1,000 + 3-mo DL suspension; speeding ₹1,000–₹2,000; drunk driving ₹10,000 + 6-month jail; mobile use ₹1,000–₹10,000.",
    comparisonTable: {
      title: "Common offences — fine + ancillary penalty",
      headers: ["Offence", "Fine", "Other penalty"],
      rows: [
        ["No helmet (2W)",     "₹1,000",  "DL suspended 3 months"],
        ["No seatbelt",        "₹1,000",  "—"],
        ["Speeding (LMV)",     "₹1,000–₹2,000", "—"],
        ["Drunk driving (1st)","₹10,000", "Up to 6 months jail"],
        ["Mobile while driving","₹1,000–₹10,000","—"],
        ["Driving without licence","₹5,000","—"],
        ["Without insurance",  "₹2,000",  "—"],
      ],
    },
  },
  "drunk-driving-fines-india": { author: "arjun" },

  /* ---------------------- Fancy Number ---------------------- */
  "how-to-book-fancy-number-gujarat": {
    author: "arjun",
    tldr: "Reserve on the VAHAN fancy-number portal with a refundable deposit (₹1k–₹5k), wait for the auction window, place bids and pay the winning amount within 7 days of close.",
    cityVariants: [
      { city: "Ahmedabad (GJ-1)", note: "0001 sold for ₹16L in 2024 auction." },
      { city: "Surat (GJ-5)",     note: "0786 typically clears at ₹3–6L." },
      { city: "Vadodara (GJ-6)",  note: "Less competition; reserve numbers go 30% under metro rates." },
      { city: "Rajkot (GJ-3)",    note: "Choice 4-digits often available at base price." },
    ],
  },
  "vip-number-plate-cost-india": {
    author: "arjun",
    tldr: "Reserve prices: 0001 ₹5–₹10L, 0007/0786/9999 ₹3–₹6L, last-4-same ₹50k–₹2L, 4-digit choice ₹10k–₹50k. Bid amount + 18% GST + standard registration fees.",
  },

  /* ---------------------- Tax ---------------------- */
  "road-tax-india-by-state": {
    author: "arjun",
    tldr: "Road tax ranges from 4% (Delhi/Pondicherry) to 18% (Karnataka) of the ex-showroom price. EVs are 100% exempt in most states until 2027–2030. Same car can cost ₹2L more in high-tax states.",
  },
  "road-tax-refund-after-noc": {
    author: "ankita",
    tldr: "After re-registering in a new state, claim a prorated refund of unused tax from your original state's RTO using Form 16-A + new RC + NOC + cancelled cheque. Refund credited via NEFT in 60–90 days.",
  },
  "green-tax-india": { author: "arjun" },
  "road-tax-gujarat-slabs": { author: "arjun" },

  /* ---------------------- Permits ---------------------- */
  "national-permit-aitp": { author: "arjun" },

  /* ---------------------- Fitness ---------------------- */
  "fitness-certificate-vehicle-india": {
    author: "rajesh",
    tldr: "Personal vehicles need fitness only at re-registration (year 15+). Commercial vehicles need annual (light) or 2-yearly (heavy) fitness via Form 38, tested at ATC or RTO.",
  },

  /* ---------------------- Insurance ---------------------- */
  "third-party-vs-comprehensive-insurance": {
    author: "ankita",
    tldr: "Third-party (TP) is mandatory and covers others. Comprehensive adds own-damage, theft, fire and natural calamities. Skip comprehensive only when premium exceeds your IDV (typically vehicles > 10 yrs).",
    comparisonTable: {
      title: "TP vs Comprehensive at a glance",
      headers: ["Coverage", "Third-party", "Comprehensive"],
      rows: [
        ["Damage to others",         "Yes", "Yes"],
        ["Damage to your vehicle",   "No",  "Yes"],
        ["Theft / fire",             "No",  "Yes"],
        ["Natural calamities",       "No",  "Yes"],
        ["Personal accident cover",  "Optional", "Yes"],
        ["Premium (avg sedan)",      "₹3–6k/yr", "₹12–20k/yr"],
      ],
    },
  },
  "ncb-no-claim-bonus-india": {
    author: "ankita",
    tldr: "NCB starts at 20% after 1 claim-free year and stacks to 50% by year 5. Any own-damage claim resets it; lapse > 90 days kills it. Skip claims under ₹10k to preserve.",
  },
  "idv-explained": { author: "ankita" },

  /* ---------------------- FASTag ---------------------- */
  "fastag-online-application": {
    author: "arjun",
    tldr: "Apply with any of 30+ NPCI-approved issuers (Paytm, ICICI, HDFC, SBI, Axis, IDFC). Steps: pick issuer → enter vehicle + RC → Aadhaar e-KYC → pay ₹100–₹500 → tag delivered in 5–7 days.",
  },
  "fastag-blacklisted-how-to-unblock": {
    author: "arjun",
    tldr: "Top causes: low balance, KYC not updated, RC mismatch. Recharge above the minimum, update KYC in your issuer's app, and wait 4–24 hours for sync. Escalate to NPCI ombudsman after 7 days.",
  },
  "fastag-for-commercial-vehicle": { author: "arjun" },

  /* ---------------------- Misc ---------------------- */
  "puc-certificate-india-process-validity": {
    author: "rajesh",
    tldr: "PUC is mandatory and valid for 1 year on new vehicles, 6 months on BS-VI older, and 3 months on pre-BS-VI. Cost ₹50–₹150 at any authorised petrol-pump centre.",
  },
};

/** Returns the merged article with category defaults still to be applied separately. */
export function getEnrichment(slug: string): Enrichment | undefined {
  return ARTICLE_ENRICHMENTS[slug];
}
