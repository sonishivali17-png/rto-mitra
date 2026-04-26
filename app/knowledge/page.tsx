import type { Metadata } from "next";
import Link from "next/link";
import { Search, Clock, ArrowUpRight, BookOpen } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { KNOWLEDGE_CATEGORIES, KNOWLEDGE_ARTICLES } from "@/data/knowledge-articles";
import { SEO_ARTICLES } from "@/data/seo-articles";
import { TrackPageView } from "@/components/track-page-view";

const ALL_ARTICLES = [...KNOWLEDGE_ARTICLES, ...SEO_ARTICLES];

export const metadata: Metadata = buildMetadata({
  title: "Knowledge Hub — RTO Guides & Procedures (India)",
  description:
    "Free, accurate guides on every common RTO process — RC transfer, hypothecation removal, NOC, duplicate RC, DL, challan, FASTag, road tax and more.",
  path: "/knowledge",
});

export default async function KnowledgeIndex({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const term = (q ?? "").toLowerCase().trim();
  const filtered = term
    ? ALL_ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(term) ||
          a.excerpt.toLowerCase().includes(term) ||
          a.category.toLowerCase().includes(term)
      )
    : ALL_ARTICLES;

  return (
    <>
      {term && <TrackPageView event="knowledge_search" props={{ term, results: filtered.length }} />}
      <section className="container pt-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Knowledge Hub" }]} />
        <div className="mt-8 max-w-2xl">
          <span className="pill"><BookOpen className="h-3.5 w-3.5 text-primary" /> Knowledge Hub</span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to know about Indian RTOs
          </h1>
          <p className="mt-3 text-slate-600">
            Step-by-step procedures, official forms, document checklists, and FAQ — written
            in plain English.
          </p>
        </div>
      </section>

      <section className="container py-10">
        <form action="/knowledge" className="flex w-full max-w-2xl items-center gap-2 rounded-2xl border bg-white p-2 shadow-sm">
          <div className="flex flex-1 items-center gap-2 px-2">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              defaultValue={term}
              name="q"
              placeholder="Search guides…"
              className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>
          <button className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">Search</button>
        </form>
      </section>

      <section className="container pb-10">
        <h2 className="text-xl font-bold text-slate-900">Browse by category</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {KNOWLEDGE_CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/knowledge/${c.slug}`}
              className="rounded-full border bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-primary/40 hover:text-primary"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="container pb-20">
        <h2 className="text-xl font-bold text-slate-900">
          {term ? `Results for "${term}"` : "Latest articles"}
        </h2>
        {!filtered.length && (
          <p className="mt-4 text-sm text-slate-600">No articles found. Try a different keyword.</p>
        )}
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {filtered.map((a) => (
            <Link
              key={a.slug}
              href={`/knowledge/${a.categorySlug}/${a.slug}`}
              className="card-elevated"
            >
              <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                <span>{a.category}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {a.readingMinutes} min
                </span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-slate-900 hover:text-primary">{a.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-slate-600">{a.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Read guide <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
