import type { KnowledgeArticle } from "@/types";
import { RC_TRANSFER_ARTICLES } from "./rc-transfer";
import { DL_ARTICLES } from "./driving-licence";
import { VEHICLE_REGISTRATION_ARTICLES } from "./vehicle-registration";
import { DUPLICATE_RC_ARTICLES } from "./duplicate-rc";
import { HP_REMOVAL_ARTICLES } from "./hp-removal";
import { NOC_ARTICLES } from "./noc";
import { ADDRESS_CHANGE_ARTICLES } from "./address-change";
import { CHALLAN_ARTICLES } from "./challan";
import { FANCY_NUMBER_ARTICLES } from "./fancy-number";
import { TAX_ARTICLES } from "./tax";
import { PERMIT_ARTICLES } from "./permit";
import { FITNESS_ARTICLES } from "./fitness";
import { INSURANCE_ARTICLES } from "./insurance";
import { FASTAG_ARTICLES } from "./fastag";
import { MISC_ARTICLES } from "./misc";

/**
 * 100 high-intent SEO articles spanning the 14 knowledge categories.
 * Wired into knowledge listing, category, detail, and sitemap routes.
 */
export const SEO_ARTICLES: KnowledgeArticle[] = [
  ...RC_TRANSFER_ARTICLES,           // 15
  ...DL_ARTICLES,                    // 12
  ...VEHICLE_REGISTRATION_ARTICLES,  // 10
  ...DUPLICATE_RC_ARTICLES,          //  5
  ...HP_REMOVAL_ARTICLES,            //  6
  ...NOC_ARTICLES,                   //  8
  ...ADDRESS_CHANGE_ARTICLES,        //  5
  ...CHALLAN_ARTICLES,               //  8
  ...FANCY_NUMBER_ARTICLES,          //  5
  ...TAX_ARTICLES,                   //  6
  ...PERMIT_ARTICLES,                //  4
  ...FITNESS_ARTICLES,               //  3
  ...INSURANCE_ARTICLES,             //  5
  ...FASTAG_ARTICLES,                //  5
  ...MISC_ARTICLES,                  //  3
];

/** True total. Asserted at module load to catch off-by-ones early. */
export const SEO_ARTICLE_COUNT = SEO_ARTICLES.length;
