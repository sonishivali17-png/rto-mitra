import Link from "next/link";
import { Users, ArrowRight, ThumbsUp, CheckCircle2 } from "lucide-react";
import { FORUM_QUESTIONS } from "@/data/forum-seed";

export function CommunityCta() {
  const top = FORUM_QUESTIONS.slice(0, 3);
  return (
    <section className="bg-slate-50 py-16">
      <div className="container grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <span className="pill"><Users className="h-3.5 w-3.5 text-primary" /> Community</span>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Real questions, answered by real people
          </h2>
          <p className="mt-3 max-w-md text-slate-600">
            Stuck with delayed RC transfer or a confusing bank NOC? Ask the RTO Mitra
            community — we'll jump in with answers.
          </p>
          <Link
            href="/community"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-700"
          >
            Browse community <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {top.map((q) => (
            <Link
              key={q.id}
              href={`/community/${q.slug}`}
              className="block rounded-2xl border bg-white p-5 ring-soft hover:border-primary/40"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-slate-900">{q.title}</h3>
                {q.solved && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" /> Solved
                  </span>
                )}
              </div>
              <p className="mt-1 line-clamp-1 text-sm text-slate-600">{q.body}</p>
              <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1"><ThumbsUp className="h-3.5 w-3.5" /> {q.upvotes}</span>
                <span>{q.answers} answers</span>
                <span>{q.category}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
