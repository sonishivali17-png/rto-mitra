import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, MessageCircle, ArrowRight } from "lucide-react";
import {
  buildMetadata,
  articleJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArticleToc } from "@/components/knowledge/article-toc";
import { RenderedMarkdown } from "@/components/knowledge/rendered-markdown";
import { RelatedArticles } from "@/components/knowledge/related-articles";
import {
  TldrCard,
  ComparisonTable,
  CityVariants,
  SourcesList,
  AuthorCard,
  CoverImage,
} from "@/components/knowledge/article-extras";
import { TrackPageView } from "@/components/track-page-view";
import { KNOWLEDGE_ARTICLES } from "@/data/knowledge-articles";
import { SEO_ARTICLES } from "@/data/seo-articles";
import { ARTICLE_ENRICHMENTS } from "@/data/seo-articles/enrichments";
import { withCategoryDefaults } from "@/data/seo-articles/category-defaults";
import { resolveAuthor } from "@/data/seo-articles/authors";
import { whatsappLink } from "@/lib/utils";
import type { KnowledgeArticle } from "@/types";

const ALL_ARTICLES = [...KNOWLEDGE_ARTICLES, ...SEO_ARTICLES];

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return ALL_ARTICLES.map((a) => ({ category: a.categorySlug, slug: a.slug }));
}

/** Apply category defaults + slug-level enrichments at render time. */
function enrich(article: KnowledgeArticle): KnowledgeArticle {
  const e = ARTICLE_ENRICHMENTS[article.slug] ?? {};
  const merged: KnowledgeArticle = {
    ...article,
    ...e,
    tldr: article.tldr ?? e.tldr ?? article.excerpt,
    cityVariants: article.cityVariants ?? e.cityVariants,
    comparisonTable: article.comparisonTable ?? e.comparisonTable,
    author: e.author ?? article.author,
  };
  const { faqs, sources } = withCategoryDefaults(
    merged.categorySlug,
    merged.faqs,
    merged.sources
  );
  return { ...merged, faqs, sources };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = ALL_ARTICLES.find((x) => x.slug === slug);
  if (!a) return buildMetadata({ title: "Not found", noIndex: true });
  return buildMetadata({
    title: a.title,
    description: a.excerpt,
    path: `/knowledge/${a.categorySlug}/${a.slug}`,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const raw = ALL_ARTICLES.find((a) => a.slug === slug && a.categorySlug === category);
  if (!raw) return notFound();
  const article = enrich(raw);
  const author = resolveAuthor(article.author);

  const url = `${SITE.url}/knowledge/${article.categorySlug}/${article.slug}`;
  const articleLd = {
    ...articleJsonLd({
      title: article.title,
      description: article.excerpt,
      url,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      author: author.name,
    }),
    // Replace Organization author with rich Person author for E-E-A-T
    author: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.jobTitle,
      description: author.bio,
      url: author.url,
      sameAs: author.sameAs,
    },
  };
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: SITE.url },
    { name: "Knowledge Hub", url: `${SITE.url}/knowledge` },
    { name: article.category, url: `${SITE.url}/knowledge/${article.categorySlug}` },
    { name: article.title, url },
  ]);

  return (
    <>
      <TrackPageView event="article_view" props={{ slug: article.slug, category: article.categorySlug, author: author.key }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {article.faqs?.length ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(article.faqs)) }}
        />
      ) : null}

      <section className="container pt-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Knowledge Hub", href: "/knowledge" },
            { label: article.category, href: `/knowledge/${article.categorySlug}` },
            { label: article.title },
          ]}
        />
      </section>

      <section className="container grid gap-12 py-10 lg:grid-cols-[1fr_300px]">
        <article>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{article.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
            <span>
              By <Link href={author.url ?? "/about"} className="font-medium text-slate-700 hover:underline">{author.name}</Link>{" "}
              <span className="text-slate-400">· {author.jobTitle}</span>
            </span>
            <span>·</span>
            <span>
              {new Date(article.updatedAt ?? article.publishedAt).toLocaleDateString("en-IN", { dateStyle: "long" })}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {article.readingMinutes} min read</span>
          </div>

          {/* Featured-snippet target */}
          {article.tldr && <TldrCard tldr={article.tldr} />}

          {/* Cover image — defaults to dynamic OG */}
          <CoverImage article={article} />

          <div className="mt-2">
            <RenderedMarkdown source={article.body} />
          </div>

          {/* Optional comparison table */}
          {article.comparisonTable && <ComparisonTable table={article.comparisonTable} />}

          {/* City-by-city locals */}
          {article.cityVariants?.length ? <CityVariants variants={article.cityVariants} /> : null}

          {article.faqs?.length ? (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-slate-900">FAQs</h2>
              <div className="mt-4">
                <Accordion items={article.faqs.map((f) => ({ q: f.q, a: f.a }))} />
              </div>
            </div>
          ) : null}

          <div className="mt-12 rounded-3xl bg-gradient-to-r from-primary-50 to-emerald-50 p-8">
            <h2 className="text-2xl font-bold text-slate-900">Want this done for you?</h2>
            <p className="mt-2 max-w-xl text-slate-700">
              Skip the queues. Our experts handle the entire process — pickup, RTO, delivery.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/services"><Button>Browse services <ArrowRight className="h-4 w-4" /></Button></Link>
              <a href={whatsappLink(`Hi, I read the guide "${article.title}". I need help.`)} target="_blank" rel="noopener noreferrer">
                <Button variant="outline"><MessageCircle className="h-4 w-4 text-emerald-600" /> WhatsApp us</Button>
              </a>
            </div>
          </div>

          <RelatedArticles slugs={article.related} />

          {/* Sources / E-E-A-T */}
          {article.sources?.length ? <SourcesList sources={article.sources} /> : null}

          {/* Author bio */}
          <AuthorCard author={author} updatedAt={article.updatedAt ?? article.publishedAt} />
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <ArticleToc markdown={article.body} />
          <div className="mt-4 rounded-2xl border bg-white p-5 ring-soft">
            <p className="text-sm font-semibold text-slate-900">Still confused?</p>
            <p className="mt-1 text-sm text-slate-600">
              Get a custom plan in 20 minutes from a real expert.
            </p>
            <Link href="/services/consultation" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
              Book consultation →
            </Link>
          </div>
        </aside>
      </section>
    </>
  );
}
