import Link from "next/link";
import { Sparkles, MessageCircle, ArrowRight } from "lucide-react";

export function AiCta() {
  return (
    <section className="container py-16">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 p-1">
        <div className="flex flex-col items-center justify-between gap-8 rounded-[22px] bg-slate-950 p-10 text-white sm:flex-row sm:p-14">
          <div className="max-w-xl">
            <span className="pill border-white/20 bg-white/10 text-white">
              <Sparkles className="h-3.5 w-3.5" /> Ask RTO Mitra AI
            </span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Type your problem. Get a clear plan.
            </h2>
            <p className="mt-3 text-slate-300">
              Personalised, source-referenced guidance — drawing only from official sources
              like parivahan.gov.in and state transport departments.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Link
              href="/ai-assistant"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow hover:bg-slate-100"
            >
              Start chatting <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services/consultation"
              className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Or book a 1-on-1 consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
