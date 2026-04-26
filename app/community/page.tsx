import type { Metadata } from "next";
import Link from "next/link";
import { Search, MessageSquarePlus, Users } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "@/components/forum/question-card";
import { FORUM_QUESTIONS, FORUM_CATEGORIES } from "@/data/forum-seed";

export const metadata: Metadata = buildMetadata({
  title: "RTO Mitra Community — Ask & Answer Vehicle Paperwork Questions",
  description:
    "Ask the community about RC transfer, hypothecation, NOC, DL, challan, FASTag and more. Real answers from real vehicle owners.",
  path: "/community",
});

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;
  const term = (q ?? "").toLowerCase().trim();
  let list = FORUM_QUESTIONS;
  if (category) list = list.filter((x) => x.category === category);
  if (term)
    list = list.filter(
      (x) =>
        x.title.toLowerCase().includes(term) ||
        x.body.toLowerCase().includes(term) ||
        x.tags.some((t) => t.includes(term))
    );

  return (
    <>
      <section className="container pt-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Community" }]} />
        <div className="mt-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="pill"><Users className="h-3.5 w-3.5 text-primary" /> RTO Mitra Community</span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Ask. Answer. Help India move.
            </h1>
            <p className="mt-3 text-slate-600">
              A friendly space for vehicle owners — moderated by our team to keep answers
              accurate and safe.
            </p>
          </div>
          <Link href="/community/ask">
            <Button size="lg"><MessageSquarePlus className="h-4 w-4" /> Ask a question</Button>
          </Link>
        </div>
      </section>

      <section className="container py-8">
        <form action="/community" className="flex w-full max-w-2xl items-center gap-2 rounded-2xl border bg-white p-2 shadow-sm">
          <div className="flex flex-1 items-center gap-2 px-2">
            <Search className="h-5 w-5 text-slate-400" />
            <input name="q" defaultValue={term} className="h-10 w-full bg-transparent text-sm outline-none" placeholder="Search questions…" />
          </div>
          <button className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">Search</button>
        </form>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/community"
            className={`rounded-full border bg-white px-3 py-1.5 text-sm font-medium ${!category ? "border-primary text-primary" : "text-slate-700 hover:border-primary/40"}`}
          >
            All
          </Link>
          {FORUM_CATEGORIES.map((c) => (
            <Link
              key={c}
              href={`/community?category=${encodeURIComponent(c)}`}
              className={`rounded-full border bg-white px-3 py-1.5 text-sm font-medium ${category === c ? "border-primary text-primary" : "text-slate-700 hover:border-primary/40"}`}
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      <section className="container pb-16">
        <h2 className="text-xl font-bold text-slate-900">
          {category ? `Questions in ${category}` : term ? `Results for "${term}"` : "Latest questions"}
        </h2>
        <div className="mt-4 space-y-3">
          {list.map((q) => <QuestionCard key={q.id} q={q} />)}
          {!list.length && (
            <p className="rounded-2xl border bg-slate-50 p-6 text-sm text-slate-700">
              No questions match. <Link href="/community/ask" className="text-primary hover:underline">Be the first to ask →</Link>
            </p>
          )}
        </div>
      </section>
    </>
  );
}
