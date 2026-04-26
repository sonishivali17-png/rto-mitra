import Link from "next/link";
import { ThumbsUp, MessageSquare, CheckCircle2 } from "lucide-react";
import { timeAgo } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { ForumQuestion } from "@/types";

export function QuestionCard({ q }: { q: ForumQuestion }) {
  return (
    <Link
      href={`/community/${q.slug}`}
      className="block rounded-2xl border bg-white p-5 ring-soft hover:border-primary/40"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-slate-900">{q.title}</h3>
        {q.solved && (
          <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-emerald-700">
            <CheckCircle2 className="h-4 w-4" /> Solved
          </span>
        )}
      </div>
      <p className="mt-1 line-clamp-2 text-sm text-slate-600">{q.body}</p>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
        <Badge variant="muted">{q.category}</Badge>
        {q.tags.slice(0, 3).map((t) => (
          <span key={t} className="text-slate-400">#{t}</span>
        ))}
        <span className="ml-auto flex items-center gap-3">
          <span className="flex items-center gap-1"><ThumbsUp className="h-3.5 w-3.5" /> {q.upvotes}</span>
          <span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" /> {q.answers}</span>
          <span>{timeAgo(q.createdAt)}</span>
        </span>
      </div>
    </Link>
  );
}
