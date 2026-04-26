import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactForm } from "@/components/forms/contact-form";
import { SITE } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Contact RTO Mitra",
  description: "Talk to RTO Mitra on WhatsApp, phone or email. We help with all RTO services across Gujarat and India.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="container pt-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        <div className="mx-auto mt-8 max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Contact RTO Mitra</h1>
          <p className="mt-3 text-slate-600">
            We respond on WhatsApp within minutes during business hours. For urgent cases please call directly.
          </p>
        </div>
      </section>

      <section className="container py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <div className="card-elevated">
              <h2 className="text-lg font-semibold text-slate-900">Reach us</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-primary" />
                  <a href={`tel:${SITE.phone}`} className="hover:text-primary">{SITE.phone}</a>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 h-4 w-4 text-emerald-600" />
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    WhatsApp +{SITE.whatsapp}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-primary" />
                  <a href={`mailto:${SITE.email}`} className="hover:text-primary">{SITE.email}</a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                  <span>{SITE.office}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Mon–Sat, 10:00 AM – 7:00 PM IST</span>
                </li>
              </ul>
            </div>
            <div className="overflow-hidden rounded-2xl border bg-white ring-soft">
              <iframe
                title="RTO Mitra office map"
                src="https://www.google.com/maps?q=Iscon+Cross+Road,+Ahmedabad&output=embed"
                loading="lazy"
                className="aspect-[4/3] w-full border-0"
              />
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
