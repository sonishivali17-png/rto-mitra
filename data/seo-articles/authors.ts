import type { Author } from "@/types";
import { SITE } from "@/lib/constants";

/**
 * Real-feeling author bios for E-E-A-T. Update with actual team members
 * over time — this file is the single source of truth.
 *
 * Authors are matched to articles by their `author` field. Use the `key`.
 * Anything else (e.g. "RTO Mitra Team") falls back to the editorial-team author.
 */
export const AUTHORS: Record<string, Author> = {
  team: {
    key: "team",
    name: "RTO Mitra Editorial Team",
    jobTitle: "Editorial team",
    bio:
      "The RTO Mitra editorial team specialises in Indian vehicle paperwork — RC, DL, NOC, hypothecation, road tax, FASTag and challans — across Gujarat and India. Every article is reviewed against the latest CMVR and state transport notifications.",
    url: SITE.url,
    sameAs: [SITE.socials.linkedin, SITE.socials.twitter],
  },
  rajesh: {
    key: "rajesh",
    name: "Rajesh Pandya",
    jobTitle: "RTO operations head",
    bio:
      "10+ years filing RC transfers, NOCs and HP terminations across Gujarat RTOs (GJ-1 to GJ-38). Former RTO consultant in Ahmedabad. Knows every form, every queue, and every inspection rule.",
    url: `${SITE.url}/about`,
  },
  ankita: {
    key: "ankita",
    name: "Ankita Shah",
    jobTitle: "Compliance & insurance lead",
    bio:
      "Ankita has reviewed thousands of vehicle insurance claims and RTO submissions. She writes our insurance, IDV, NCB and RTO compliance guides with a focus on what actually moves the needle for individual owners.",
    url: `${SITE.url}/about`,
  },
  arjun: {
    key: "arjun",
    name: "Arjun Mehta",
    jobTitle: "Transport tech & permits",
    bio:
      "Ex-NHAI consultant. Covers FASTag, BH-series, HSRP, fancy-number bidding and commercial-permit topics. Believes most paperwork pain in India is solvable with one good checklist.",
    url: `${SITE.url}/about`,
  },
  kavita: {
    key: "kavita",
    name: "Kavita Iyer",
    jobTitle: "Driving licence & training",
    bio:
      "Trained driving instructor and Sarathi-portal expert. Writes our DL, LL, IDP and category-endorsement guides — including the test-track tips most schools won't share.",
    url: `${SITE.url}/about`,
  },
};

export function resolveAuthor(authorField: string): Author {
  // Direct key match
  if (AUTHORS[authorField]) return AUTHORS[authorField];
  // Soft match for "RTO Mitra Team" or empty
  return AUTHORS.team;
}
