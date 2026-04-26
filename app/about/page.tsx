import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Sparkles, Users, Compass } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = buildMetadata({
  title: "About RTO Mitra",
  description:
    "RTO Mitra is on a mission to make Indian vehicle paperwork simple, transparent and humane — starting from Ahmedabad and Gujarat.",
  path: "/about",
});

const VALUES = [
  { icon: ShieldCheck, title: "Honest by default", body: "We never bypass official rules. If something can't be done, we say so." },
  { icon: Sparkles, title: "Tech-first", body: "AI guidance + community + premium UX — paperwork as it should feel in 2026." },
  { icon: Users, title: "People-first", body: "Real humans on WhatsApp during business hours. Not bots, not call-centers." },
  { icon: Compass, title: "Made in India", body: "Built for Indian roads, RTOs, regional languages and edge cases." },
];

export default function AboutPage() {
  return (
    <>
      <section className="container pt-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
        <div className="mx-auto mt-8 max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Simplifying vehicle paperwork in India
          </h1>
          <p className="mt-5 text-lg text-slate-600">
            Most Indians lose entire days at the RTO — chasing forms, brokers and rumors.
            RTO Mitra exists to replace that mess with one trusted, premium platform.
          </p>
        </div>
      </section>

      <section className="container py-16">
        <div className="mx-auto max-w-3xl space-y-6 text-slate-700">
          <h2 className="text-2xl font-bold text-slate-900">Our story</h2>
          <p>
            We started in 2025 in Ahmedabad after watching friends and family bounce
            between brokers, banks and helpdesks for the simplest things — a duplicate
            RC, an HP removal, a sale that never got transferred. Each story ended the
            same way: <em>"there has to be a better way to do this."</em>
          </p>
          <p>
            RTO Mitra is that better way. We combine official process knowledge, a
            growing community of vehicle owners, an AI assistant trained on trusted
            sources, and a real on-ground execution team — so anyone with a vehicle in
            India can solve their paperwork without losing days of work.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container">
          <h2 className="mx-auto max-w-2xl text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            What we believe
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="card-elevated">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
                <p className="mt-1 text-sm text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Want to work with us?</h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          We're hiring across operations, engineering and partnerships. We'd love to hear from you.
        </p>
        <Link href="/contact" className="mt-6 inline-block">
          <Button size="lg">Contact our team</Button>
        </Link>
      </section>
    </>
  );
}
