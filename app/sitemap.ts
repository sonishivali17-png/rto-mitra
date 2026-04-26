import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { SERVICES } from "@/data/services";
import { SEO_PAGES } from "@/data/seo-pages";
import { KNOWLEDGE_ARTICLES, KNOWLEDGE_CATEGORIES } from "@/data/knowledge-articles";
import { SEO_ARTICLES } from "@/data/seo-articles";
import { FORUM_QUESTIONS } from "@/data/forum-seed";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/contact",
    "/services",
    "/knowledge",
    "/community",
    "/ai-assistant",
    "/track",
    "/login",
    "/register",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1.0 : 0.7,
  }));

  const services: MetadataRoute.Sitemap = [...SERVICES, ...SEO_PAGES].map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const categories: MetadataRoute.Sitemap = KNOWLEDGE_CATEGORIES.map((c) => ({
    url: `${base}/knowledge/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const articles: MetadataRoute.Sitemap = [...KNOWLEDGE_ARTICLES, ...SEO_ARTICLES].map((a) => ({
    url: `${base}/knowledge/${a.categorySlug}/${a.slug}`,
    lastModified: new Date(a.updatedAt ?? a.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const questions: MetadataRoute.Sitemap = FORUM_QUESTIONS.map((q) => ({
    url: `${base}/community/${q.slug}`,
    lastModified: new Date(q.createdAt),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticUrls, ...services, ...categories, ...articles, ...questions];
}
