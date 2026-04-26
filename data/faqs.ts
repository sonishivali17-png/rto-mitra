import type { FaqItem } from "@/types";

export const HOME_FAQS: FaqItem[] = [
  {
    q: "Is RTO Mitra an official government body?",
    a: "No. RTO Mitra is an independent assistance and information platform. We help you navigate official processes on parivahan.gov.in and your state transport portals — but all approvals are issued by the RTO itself.",
  },
  {
    q: "Where do you operate?",
    a: "We are launching with full coverage in Ahmedabad and across Gujarat (GJ-1 to GJ-38). Other states are being added — you can still book a consultation today.",
  },
  {
    q: "Are my documents safe?",
    a: "Yes. Documents are stored in encrypted cloud storage with strict access control. Only verified executives working on your case can view them.",
  },
  {
    q: "How are fees calculated?",
    a: "Each service has a fixed RTO Mitra fee + the official government fee (paid directly to the RTO). You'll see a clear breakdown before payment — no hidden charges.",
  },
  {
    q: "What if my case gets rejected at the RTO?",
    a: "We re-submit at no extra service fee for the same case (additional government fees, if any, would apply). If a case is structurally not possible, we refund our fee.",
  },
  {
    q: "Can I just talk to an expert first?",
    a: "Yes — book a 20-minute consultation. If you book a paid service afterwards, the consultation fee is adjusted in your final bill.",
  },
];

export const TRUST_FAQS: FaqItem[] = [
  { q: "Is this faster than going myself?", a: "For most cases, yes — we already have document checklists, pre-verified forms and an executive at the RTO." },
  { q: "Do I need to visit the RTO?", a: "Only if a physical inspection or biometric is mandatory. Most cases proceed without your presence." },
];
