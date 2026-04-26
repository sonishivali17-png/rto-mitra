import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import { KNOWLEDGE_ARTICLES } from "@/data/knowledge-articles";
import { SEO_ARTICLES } from "@/data/seo-articles";

export function LatestGuides() {
  const articles = [...KNOWLEDGE_ARTICLES, ...SEO_ARTICLES]
    .sort((a, b) => (b.updatedAt ?? b.publishedAt).localeCompare(a.updatedAt ?? a.publishedAt))
    .slice(0, 4);
  return (
    <section className="bg-slate-50 py-16">
      <div className="container">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Latest guides</h2>
            <p className="mt-2 max-w-xl text-slate-600">
              Free, accurate, step-by-step explanations of every common RTO process.
            </p>
          </div>
          <Link href="/knowledge" className="hidden text-sm font-semibold text-primary hover:underline sm:block">
            Browse all guides →
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/knowledge/${a.categorySlug}/${a.slug}`}
              className="group card-elevated"
            >
              <div className="flex items-center justify-between gap-3 text-xs font-medium text-slate-500">
                <span>{a.category}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {a.readingMinutes} min read
                </span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-slate-900 group-hover:text-primary">
                {a.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-slate-600">{a.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Read guide <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
