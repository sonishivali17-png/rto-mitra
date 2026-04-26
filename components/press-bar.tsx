import { PRESS_LOGOS } from "@/data/stats";

export function PressBar() {
  return (
    <section className="container py-8">
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
        As seen in
      </p>
      <div className="marquee">
        <div className="marquee-track">
          {[...PRESS_LOGOS, ...PRESS_LOGOS].map((logo, i) => (
            <span
              key={i}
              className="select-none whitespace-nowrap text-base font-semibold tracking-tight text-slate-400 sm:text-lg"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
