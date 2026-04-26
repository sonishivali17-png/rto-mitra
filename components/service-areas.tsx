import Link from "next/link";
import { MapPin } from "lucide-react";
import { SEO_PAGES } from "@/data/seo-pages";

/**
 * Internal-link grid that renders all 25 programmatic city × service pages
 * for sitewide SEO. Mobile-friendly chip layout.
 */
export function ServiceAreas() {
  return (
    <section className="container py-16">
      <div className="mx-auto max-w-2xl text-center">
        <span className="pill"><MapPin className="h-3.5 w-3.5 text-primary" /> Coverage</span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          We help across India — starting with Gujarat
        </h2>
        <p className="mt-3 text-slate-600">
          Pick your city below or WhatsApp us — we'll route you to the right RTO.
        </p>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SEO_PAGES.map((p) => (
          <Link
            key={p.slug}
            href={`/services/${p.slug}`}
            className="group flex items-center justify-between rounded-xl border bg-white px-4 py-3 text-sm transition hover:border-primary/40 hover:bg-primary/5"
          >
            <span className="font-medium text-slate-800 group-hover:text-primary">{p.shortTitle}</span>
            <span className="text-xs text-slate-500">{p.city ?? p.state}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
