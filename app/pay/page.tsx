import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { ShieldCheck, Lock } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SERVICES } from "@/data/services";
import { SEO_PAGES } from "@/data/seo-pages";
import { formatINR } from "@/lib/utils";

// Razorpay button + checkout script are heavy — only load at /pay.
const RazorpayButton = dynamic(
  () => import("@/components/payments/razorpay-button").then((m) => m.RazorpayButton),
  { loading: () => <div className="h-12 w-full rounded-xl shimmer" /> }
);

const ALL_SERVICES = [...SERVICES, ...SEO_PAGES];

export const metadata: Metadata = buildMetadata({
  title: "Secure checkout — RTO Mitra",
  description: "Pay securely for your RTO Mitra service via UPI, card, or net banking.",
  path: "/pay",
  noIndex: true,
});

export default async function PayPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const svc = ALL_SERVICES.find((s) => s.slug === service);
  if (!svc) return notFound();

  const amount = svc.priceFrom;
  const gst = Math.round(amount * 0.18);
  const total = amount + gst;

  return (
    <>
      <section className="container pt-10">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: svc.shortTitle, href: `/services/${svc.slug}` },
          { label: "Checkout" },
        ]} />
      </section>

      <section className="container grid gap-8 py-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Booking summary</h1>
          <div className="mt-6 rounded-2xl border bg-white p-6 ring-soft">
            <h2 className="font-semibold text-slate-900">{svc.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{svc.blurb}</p>
            <ul className="mt-5 divide-y divide-slate-100 text-sm">
              <li className="flex items-center justify-between py-3"><span className="text-slate-600">Service fee</span><span className="font-medium">{formatINR(amount)}</span></li>
              <li className="flex items-center justify-between py-3"><span className="text-slate-600">GST (18%)</span><span className="font-medium">{formatINR(gst)}</span></li>
              <li className="flex items-center justify-between py-3 text-base"><span className="font-semibold text-slate-900">Total payable now</span><span className="font-bold text-slate-900">{formatINR(total)}</span></li>
            </ul>
            <p className="mt-3 text-xs text-slate-500">Government RTO fee is paid separately, directly to the RTO.</p>
          </div>

          <div className="mt-6 rounded-2xl border bg-emerald-50 p-5 text-sm text-emerald-800">
            <div className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="h-4 w-4" /> 100% transparent pricing
            </div>
            <p className="mt-1">If your case can't be done, we refund the service fee.</p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border bg-white p-6 ring-soft">
            <h2 className="font-semibold text-slate-900">Pay securely</h2>
            <p className="mt-1 text-xs text-slate-500"><Lock className="mr-1 inline h-3 w-3" /> Payments processed by Razorpay. UPI, cards & net banking supported.</p>
            <div className="mt-5">
              <RazorpayButton
                amountInPaise={total * 100}
                serviceSlug={svc.slug}
                serviceTitle={svc.title}
              />
            </div>
            <p className="mt-3 text-xs text-slate-500">By paying you agree to our <a href="/terms" className="text-primary hover:underline">Terms</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.</p>
          </div>
        </aside>
      </section>
    </>
  );
}
