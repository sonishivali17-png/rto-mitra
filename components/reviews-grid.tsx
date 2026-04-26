import { Star, BadgeCheck } from "lucide-react";
import { REVIEWS } from "@/data/reviews";

export function ReviewsGrid() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="container">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="flex items-center gap-1 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            <span className="gradient-text">4.9 / 5</span> from 1,200+ reviews
          </h2>
          <p className="mt-3 text-slate-600">Real cases. Real customers. Real outcomes.</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="card-elevated flex h-full flex-col">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {r.avatar}
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                      {r.name}
                      {r.verified && <BadgeCheck className="h-4 w-4 text-primary-600" />}
                    </div>
                    <div className="text-xs text-slate-500">{r.location}</div>
                  </div>
                </div>
                <span className="rounded-full border bg-white px-2 py-0.5 text-[10px] font-medium text-slate-600">{r.case}</span>
              </div>
              <div className="mt-3 flex items-center gap-1 text-amber-500">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-slate-700">"{r.quote}"</blockquote>
              <div className="mt-auto pt-4 text-[11px] text-slate-400">{r.date}</div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
