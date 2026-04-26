import Link from "next/link";
import { BookOpen, MapPin, Sparkles, ExternalLink } from "lucide-react";
import type { Author, KnowledgeArticle } from "@/types";

/** Featured-snippet card at the top of every article. */
export function TldrCard({ tldr }: { tldr: string }) {
  return (
    <aside
      role="note"
      aria-label="Quick answer"
      className="my-6 rounded-2xl border border-primary/15 bg-primary/5 p-5"
    >
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-700">
        <Sparkles className="h-3.5 w-3.5" />
        Quick answer
      </div>
      <p className="mt-2 text-base leading-relaxed text-slate-800">{tldr}</p>
    </aside>
  );
}

export function ComparisonTable({ table }: { table: NonNullable<KnowledgeArticle["comparisonTable"]> }) {
  return (
    <figure className="my-8">
      <h2 className="text-xl font-bold text-slate-900">{table.title}</h2>
      <div className="mt-3 overflow-x-auto rounded-2xl border bg-white ring-soft">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
            <tr>
              {table.headers.map((h) => (
                <th key={h} className="px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/40"}>
                {row.map((cell, j) => (
                  <td key={j} className="border-t px-4 py-2.5 text-slate-700">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.caption && (
        <figcaption className="mt-2 text-xs text-slate-500">{table.caption}</figcaption>
      )}
    </figure>
  );
}

export function CityVariants({ variants }: { variants: NonNullable<KnowledgeArticle["cityVariants"]> }) {
  return (
    <section className="my-8">
      <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
        <MapPin className="h-5 w-5 text-primary" /> By city
      </h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {variants.map((v) => (
          <div key={v.city} className="rounded-xl border bg-white p-4 ring-soft">
            <div className="text-sm font-semibold text-slate-900">{v.city}</div>
            <div className="mt-1 text-sm text-slate-700">{v.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SourcesList({ sources }: { sources: NonNullable<KnowledgeArticle["sources"]> }) {
  return (
    <section className="mt-12 rounded-2xl border bg-slate-50 p-6">
      <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900">
        <BookOpen className="h-4 w-4 text-primary" /> Sources & references
      </h2>
      <ul className="mt-3 space-y-1.5 text-sm">
        {sources.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-1 text-primary-700 hover:underline"
            >
              {s.title} <ExternalLink className="h-3 w-3" />
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-slate-500">
        We continually verify against official sources. Found a discrepancy?{" "}
        <Link href="/contact" className="text-primary hover:underline">tell us</Link> — we'll review within 48 hours.
      </p>
    </section>
  );
}

export function AuthorCard({ author, updatedAt }: { author: Author; updatedAt?: string }) {
  const initials = author.name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <aside className="mt-12 flex items-start gap-4 rounded-2xl border bg-white p-6 ring-soft">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary-700 to-primary-500 text-sm font-bold text-white">
        {initials}
      </div>
      <div>
        <div className="text-sm text-slate-500">Written by</div>
        <div className="text-base font-semibold text-slate-900">{author.name}</div>
        <div className="text-xs text-slate-500">{author.jobTitle}</div>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">{author.bio}</p>
        {updatedAt && (
          <p className="mt-2 text-xs text-slate-400">
            Last reviewed:{" "}
            {new Date(updatedAt).toLocaleDateString("en-IN", { dateStyle: "long" })}
          </p>
        )}
      </div>
    </aside>
  );
}

/**
 * Cover image — RENDERED ONLY when an article explicitly sets `coverImage`.
 * The dynamic /opengraph-image endpoint still serves social cards regardless,
 * so we don't bloat the rendered page (LCP win) without losing share previews.
 */
export function CoverImage({
  article,
}: {
  article: Pick<KnowledgeArticle, "title" | "coverImage">;
}) {
  if (!article.coverImage?.src) return null;
  return (
    <figure className="my-6 overflow-hidden rounded-2xl border bg-slate-50 ring-soft">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={article.coverImage.src}
        alt={article.coverImage.alt ?? `${article.title} — illustrated cover`}
        loading="lazy"
        decoding="async"
        width={1200}
        height={630}
        className="aspect-[1200/630] w-full object-cover"
      />
      {article.coverImage.caption && (
        <figcaption className="px-4 py-2 text-xs text-slate-500">{article.coverImage.caption}</figcaption>
      )}
    </figure>
  );
}
