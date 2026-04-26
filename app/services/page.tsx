import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { buildMetadata, itemListJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SERVICES } from "@/data/services";
import { SITE } from "@/lib/constants";
import { formatINR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { FaqSection } from "@/components/faq-section";
import { HOME_FAQS } from "@/data/faqs";

export const metadata: Metadata = buildMetadata({
  title: "All RTO Services — RC Transfer, NOC, HP Removal & More",
  description:
    "Browse RTO Mitra services — RC transfer, hypothecation removal, duplicate RC, vehicle NOC, address change, DL renewal and 1-on-1 expert consultation.",
  path: "/services",
});

export const revalidate = 3600;

export default function ServicesIndex() {
  const itemList = itemListJsonLd(
    SERVICES.map((s) => ({ name: s.title, url: `${SITE.url}/services/${s.slug}` }))
  );
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <section className="container pt-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
        <div className="mt-8">
          <span className="pill"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Official process • Transparent fees</span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            RTO services we handle
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Pick a service to see exact documents, fees and timelines — or jump straight
            to a quote on WhatsApp.
          </p>
        </div>
      </section>

      <section className="container pb-12 pt-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="card-elevated group flex flex-col">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-semibold text-slate-900 group-hover:text-primary">{s.title}</h2>
                <Badge variant="muted"><Clock className="mr-1 h-3 w-3" />{s.timeline}</Badge>
              </div>
              <p className="mt-2 text-sm text-slate-600">{s.blurb}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm text-slate-500">Starts at</span>
                <span className="text-base font-bold text-slate-900">{formatINR(s.priceFrom)}</span>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                See details <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <FaqSection faqs={HOME_FAQS} title="Common questions" />
    </>
  );
}
