import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { whatsappLink } from "@/lib/utils";

export function FinalCta() {
  return (
    <section className="container pb-24">
      <div className="rounded-3xl bg-gradient-to-r from-primary-700 to-primary-500 p-10 text-white sm:p-14">
        <div className="grid gap-8 sm:grid-cols-[1.4fr_1fr] sm:items-center">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Ready to skip the RTO queue?</h2>
            <p className="mt-3 max-w-lg text-white/85">
              Tell us about your vehicle and what you need done — we'll send a clear quote
              and timeline within minutes.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-primary-700 hover:bg-slate-100"
            >
              Get a quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white"
            >
              Or chat on WhatsApp →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
