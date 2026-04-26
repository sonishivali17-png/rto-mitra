import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { KNOWLEDGE_ARTICLES, KNOWLEDGE_CATEGORIES } from "@/data/knowledge-articles";
import { SEO_ARTICLES } from "@/data/seo-articles";

const ALL_ARTICLES = [...KNOWLEDGE_ARTICLES, ...SEO_ARTICLES];

export async function generateStaticParams() {
  return KNOWLEDGE_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = KNOWLEDGE_CATEGORIES.find((c) => c.slug === category);
  if (!cat) return buildMetadata({ title: "Not found", noIndex: true });
  return buildMetadata({
    title: `${cat.label} Guides — RTO Mitra`,
    description: `In-depth ${cat.label.toLowerCase()} guides for vehicle owners in India. Step-by-step processes, documents, and fees.`,
    path: `/knowledge/${cat.slug}`,
  });
}

export default async function KnowledgeCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = KNOWLEDGE_CATEGORIES.find((c) => c.slug === category);
  if (!cat) return notFound();

  const articles = ALL_ARTICLES
    .filter((a) => a.categorySlug === cat.slug)
    .sort((a, b) => (b.updatedAt ?? b.publishedAt).localeCompare(a.updatedAt ?? a.publishedAt));

  return (
    <>
      <section className="container pt-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Knowledge Hub", href: "/knowledge" },
            { label: cat.label },
          ]}
        />
        <h1 className="mt-8 text-3xl font-bold text-slate-900 sm:text-4xl">{cat.label} guides</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Everything we know about {cat.label.toLowerCase()} — written and updated by our team.
        </p>
      </section>

      <section className="container py-10">
        {!articles.length && (
          <p className="rounded-2xl border bg-slate-50 p-6 text-sm text-slate-700">
            We're working on guides for this category. In the meantime, try our{" "}
            <Link href="/ai-assistant" className="text-primary hover:underline">AI assistant</Link>{" "}
            or browse{" "}
            <Link href="/knowledge" className="text-primary hover:underline">all categories</Link>.
          </p>
        )}
        <div className="grid gap-5 lg:grid-cols-2">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/knowledge/${a.categorySlug}/${a.slug}`}
              className="card-elevated"
            >
              <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                <span>{a.category}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {a.readingMinutes} min</span>
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
