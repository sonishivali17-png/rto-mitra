import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ThumbsUp, MessageSquare, CheckCircle2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { AnswerForm } from "@/components/forum/answer-form";
import { FORUM_QUESTIONS, FORUM_ANSWERS } from "@/data/forum-seed";
import { timeAgo } from "@/lib/utils";

export async function generateStaticParams() {
  return FORUM_QUESTIONS.map((q) => ({ id: q.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const q = FORUM_QUESTIONS.find((x) => x.slug === id);
  if (!q) return buildMetadata({ title: "Not found", noIndex: true });
  return buildMetadata({
    title: q.title,
    description: q.body.slice(0, 150),
    path: `/community/${q.slug}`,
  });
}

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const q = FORUM_QUESTIONS.find((x) => x.slug === id);
  if (!q) return notFound();
  const answers = FORUM_ANSWERS.filter((a) => a.questionId === q.id);

  return (
    <>
      <section className="container pt-10">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Community", href: "/community" },
          { label: q.title },
        ]} />
      </section>

      <section className="container py-10">
        <div className="rounded-2xl border bg-white p-6 ring-soft">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-2xl font-bold text-slate-900">{q.title}</h1>
            {q.solved && (
              <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700">
                <CheckCircle2 className="h-4 w-4" /> Solved
              </span>
            )}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <Badge variant="muted">{q.category}</Badge>
            <span>by {q.authorName}</span>
            <span>·</span>
            <span>{timeAgo(q.createdAt)}</span>
            <span className="ml-auto flex items-center gap-3">
              <span className="flex items-center gap-1"><ThumbsUp className="h-4 w-4" /> {q.upvotes}</span>
              <span className="flex items-center gap-1"><MessageSquare className="h-4 w-4" /> {q.answers}</span>
            </span>
          </div>
          <p className="mt-5 whitespace-pre-line text-slate-700">{q.body}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
            {q.tags.map((t) => (
              <span key={t}>#{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="container pb-10">
        <h2 className="text-xl font-bold text-slate-900">{answers.length} answer{answers.length === 1 ? "" : "s"}</h2>
        <div className="mt-4 space-y-3">
          {answers.map((a) => (
            <div key={a.id} className="rounded-2xl border bg-white p-5 ring-soft">
              {a.isAccepted && (
                <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Accepted answer
                </div>
              )}
              <p className="whitespace-pre-line text-slate-700">{a.body}</p>
              <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
                <span>by {a.authorName}</span>
                <span>·</span>
                <span>{timeAgo(a.createdAt)}</span>
                <span className="ml-auto flex items-center gap-1"><ThumbsUp className="h-3.5 w-3.5" /> {a.upvotes}</span>
              </div>
            </div>
          ))}
          {!answers.length && (
            <p className="rounded-2xl border bg-slate-50 p-6 text-sm text-slate-700">
              No answers yet. Be the first to help!
            </p>
          )}
        </div>
      </section>

      <section className="container pb-16">
        <AnswerForm questionId={q.id} />
      </section>
    </>
  );
}
