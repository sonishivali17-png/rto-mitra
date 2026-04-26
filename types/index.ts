export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  blurb: string;
  category:
    | "rc"
    | "dl"
    | "noc"
    | "address"
    | "duplicate"
    | "hp"
    | "consult";
  city?: string;
  state?: string;
  priceFrom: number;
  timeline: string;
  documents: string[];
  steps: { title: string; description: string }[];
  faqs: { q: string; a: string }[];
};

export type KnowledgeArticle = {
  slug: string;
  category: string;
  categorySlug: string;
  title: string;
  excerpt: string;
  body: string; // markdown-ish; rendered with prose-rto class
  readingMinutes: number;
  publishedAt: string;
  updatedAt?: string;
  /**
   * Author key — looked up in `data/seo-articles/authors.ts`.
   * Falls back to "team" if missing or unknown. Free-form strings still render.
   */
  author: string;
  faqs?: { q: string; a: string }[];
  related?: string[];

  /** Featured-snippet target — 1–2 sentences answering the headline query. */
  tldr?: string;
  /** Trusted source citations rendered at the bottom of the article. */
  sources?: { title: string; url: string }[];
  /** Optional cover image; defaults to dynamic OG /knowledge/.../opengraph-image. */
  coverImage?: { src: string; alt: string; caption?: string };
  /** City-by-city local notes. */
  cityVariants?: { city: string; note: string }[];
  /** Optional comparison table block. */
  comparisonTable?: {
    title: string;
    headers: string[];
    rows: (string | number)[][];
    caption?: string;
  };
};

export type Author = {
  key: string;
  name: string;
  jobTitle: string;
  bio: string;
  avatar?: string; // initials used if missing
  url?: string;
  sameAs?: string[]; // social profiles for schema
};

export type ForumQuestion = {
  id: string;
  slug: string;
  title: string;
  body: string;
  category: string;
  tags: string[];
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  upvotes: number;
  answers: number;
  solved: boolean;
};

export type ForumAnswer = {
  id: string;
  questionId: string;
  body: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  upvotes: number;
  isAccepted?: boolean;
};

export type Lead = {
  name: string;
  phone: string;
  email?: string;
  serviceSlug?: string;
  city?: string;
  state?: string;
  message?: string;
};

export type CaseStatus =
  | "received"
  | "under_review"
  | "documents_pending"
  | "submitted"
  | "completed"
  | "cancelled";

export type ServiceCase = {
  id: string;
  ticketId: string;
  userId?: string;
  serviceSlug: string;
  status: CaseStatus;
  amountPaid?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type FaqItem = { q: string; a: string };
