import { AnimatedCounter } from "@/components/animated-counter";
import { HOMEPAGE_STATS } from "@/data/stats";

export function StatsSection() {
  return (
    <section className="container py-12 sm:py-16">
      <div className="rounded-3xl border bg-white p-8 ring-soft sm:p-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOMEPAGE_STATS.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <div className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                {s.display ? (
                  <span className="gradient-text">{s.display}</span>
                ) : (
                  <span className="gradient-text">
                    <AnimatedCounter to={s.value} suffix={s.suffix} />
                  </span>
                )}
              </div>
              <div className="mt-1 text-sm text-slate-600">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
