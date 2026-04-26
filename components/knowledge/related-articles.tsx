import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { KNOWLEDGE_ARTICLES } from "@/data/knowledge-articles";
import { SEO_ARTICLES } from "@/data/seo-articles";

const ALL_ARTICLES = [...KNOWLEDGE_ARTICLES, ...SEO_ARTICLES];

export function RelatedArticles({ slugs }: { slugs?: string[] }) {
  const articles = (slugs ?? [])
    .map((s) => ALL_ARTICLES.find((a) => a.slug === s))
    .filter(Boolean);
  if (!articles.length) return null;
  return (
    <section className="mt-16">
      <h2 className="text-xl font-bold text-slate-900">Related guides</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {articles.map((a) => (
          a && (
            <Link
              key={a.slug}
              href={`/knowledge/${a.categorySlug}/${a.slug}`}
              className="card-elevated"
            >
              <div className="text-xs text-slate-500">{a.category}</div>
              <h3 className="mt-1 font-semibold text-slate-900 hover:text-primary">{a.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-slate-600">{a.excerpt}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Read <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          )
        ))}
      </div>
    </section>
  );
}
