import type { Metadata } from "next";
import { SITE } from "./constants";

type SeoArgs = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/og-default.png",
  noIndex = false,
}: SeoArgs): Metadata {
  const url = `${SITE.url}${path}`;
  const fullTitle = title.includes(SITE.name) ? title : `${title} — ${SITE.name}`;
  return {
    metadataBase: new URL(SITE.url),
    title: fullTitle,
    description: description ?? SITE.description,
    alternates: {
      canonical: url,
      languages: { "en-IN": url, "x-default": url },
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description: description ?? SITE.description,
      siteName: SITE.name,
      locale: "en_IN",
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description ?? SITE.description,
      images: [image],
    },
    formatDetection: { telephone: true, email: true, address: true },
    authors: [{ name: SITE.name }],
    category: "Vehicle services",
  };
}

export function localBusinessJsonLd(args: {
  city?: string;
  state?: string;
  serviceTitle: string;
  url: string;
  priceFrom: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${SITE.name} — ${args.serviceTitle}`,
    image: `${SITE.url}/og-default.png`,
    url: args.url,
    telephone: SITE.phone,
    priceRange: `₹${args.priceFrom}+`,
    address: {
      "@type": "PostalAddress",
      addressLocality: args.city ?? "Ahmedabad",
      addressRegion: args.state ?? "Gujarat",
      addressCountry: "IN",
    },
    areaServed: args.state ?? "IN",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1200",
    },
  };
}

export function serviceJsonLd(args: {
  serviceTitle: string;
  description: string;
  url: string;
  city?: string;
  state?: string;
  priceFrom: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: args.serviceTitle,
    name: args.serviceTitle,
    description: args.description,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    areaServed: args.city
      ? { "@type": "City", name: args.city }
      : { "@type": "Country", name: "India" },
    offers: {
      "@type": "Offer",
      price: args.priceFrom,
      priceCurrency: "INR",
      url: args.url,
      availability: "https://schema.org/InStock",
    },
  };
}

export function itemListJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: it.url,
    })),
  };
}

export function articleJsonLd(args: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.title,
    description: args.description,
    image: args.image ?? `${SITE.url}/og-default.png`,
    datePublished: args.datePublished,
    dateModified: args.dateModified ?? args.datePublished,
    author: { "@type": "Organization", name: args.author ?? SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": args.url },
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    sameAs: Object.values(SITE.socials),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: SITE.phone,
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Gujarati"],
      },
    ],
  };
}
