import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, FileText, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { SERVICES } from "@/data/services";
import { SEO_PAGES } from "@/data/seo-pages";
import {
  buildMetadata,
  breadcrumbJsonLd,
  faqJsonLd,
  localBusinessJsonLd,
  serviceJsonLd,
} from "@/lib/seo";
import { SITE } from "@/lib/constants";

const ALL_SERVICES = [...SERVICES, ...SEO_PAGES];

// ISR: regenerate at most once an hour; static between regenerations.
export const revalidate = 3600;
export const dynamicParams = true;
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";
import { TrackPageView } from "@/components/track-page-view";
import { formatINR, whatsappLink } from "@/lib/utils";

export async function generateStaticParams() {
  return ALL_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const svc = ALL_SERVICES.find((s) => s.slug === slug);
  if (!svc) return buildMetadata({ title: "Service not found", noIndex: true });
  return buildMetadata({
    title: `${svc.title} | Documents, Fees, Timeline`,
    description: `${svc.blurb} See documents, government fees, timeline and book end-to-end help on WhatsApp.`,
    path: `/services/${svc.slug}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const svc = ALL_SERVICES.find((s) => s.slug === slug);
  if (!svc) return notFound();

  const url = `${SITE.url}/services/${svc.slug}`;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: SITE.url },
    { name: "Services", url: `${SITE.url}/services` },
    { name: svc.shortTitle, url },
  ]);
  const localBiz = localBusinessJsonLd({
    city: svc.city,
    state: svc.state,
    serviceTitle: svc.title,
    url,
    priceFrom: svc.priceFrom,
  });
  const service = serviceJsonLd({
    serviceTitle: svc.title,
    description: svc.blurb,
    url,
    city: svc.city,
    state: svc.state,
    priceFrom: svc.priceFrom,
  });

  return (
    <>
      <TrackPageView event="service_view" props={{ slug: svc.slug, city: svc.city, state: svc.state, price: svc.priceFrom }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBiz) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(svc.faqs)) }}
      />

      <section className="container pt-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: svc.shortTitle },
          ]}
        />
      </section>

      <section className="container grid gap-10 py-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Badge variant="default">{svc.timeline} • Starts at {formatINR(svc.priceFrom)}</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {svc.title}
          </h1>
          <p className="mt-4 text-lg text-slate-600">{svc.blurb}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/pay?service=${svc.slug}`}>
              <Button size="lg">Book this service <ArrowRight className="h-4 w-4" /></Button>
            </Link>
            <a href={whatsappLink(`Hi, I want help with: ${svc.title}`)} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline">
                <MessageCircle className="h-4 w-4 text-emerald-600" /> WhatsApp us
              </Button>
            </a>
          </div>

          <div className="mt-12 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">What is this service?</h2>
              <p className="mt-3 text-slate-700">
                {svc.title} covers everything from document checks to RTO submission and
                final delivery. Our local executive handles every step so you don't have
                to take a day off.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">Who needs it</h2>
              <ul className="mt-3 space-y-2 text-slate-700">
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" /> Anyone whose paperwork is stuck or pending.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" /> Vehicle owners who don't have time to visit the RTO.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" /> Buyers/sellers who want the transfer to be safe and on-record.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">Documents required</h2>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {svc.documents.map((d) => (
                  <div key={d} className="flex items-start gap-2 rounded-xl border bg-white p-3 text-sm text-slate-700">
                    <FileText className="mt-0.5 h-4 w-4 text-primary" />
                    {d}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">How it works</h2>
              <ol className="mt-4 space-y-4">
                {svc.steps.map((st, i) => (
                  <li key={i} className="flex gap-4 rounded-xl border bg-white p-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-slate-900">{st.title}</h3>
                      <p className="text-sm text-slate-600">{st.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">Fees & timeline</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="card-elevated">
                  <div className="text-xs font-medium text-slate-500">RTO Mitra fee</div>
                  <div className="mt-1 text-2xl font-bold text-slate-900">{formatINR(svc.priceFrom)}+</div>
                  <p className="mt-1 text-xs text-slate-500">Plus actual government fee, paid directly to the RTO.</p>
                </div>
                <div className="card-elevated">
                  <div className="text-xs font-medium text-slate-500">Typical timeline</div>
                  <div className="mt-1 flex items-center gap-2 text-2xl font-bold text-slate-900">
                    <Clock className="h-5 w-5 text-primary" /> {svc.timeline}
                  </div>
                  <p className="mt-1 text-xs text-slate-500">Faster turnarounds available for urgent cases.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">FAQs</h2>
              <div className="mt-4">
                <Accordion items={svc.faqs.map((f) => ({ q: f.q, a: f.a }))} />
              </div>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <LeadForm serviceSlug={svc.slug} serviceTitle={svc.title} />
          <div className="mt-4 rounded-2xl border bg-slate-50 p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Still confused?</p>
            <p className="mt-1">
              <Link href="/services/consultation" className="text-primary hover:underline">
                Book a 20-minute consultation →
              </Link>
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
