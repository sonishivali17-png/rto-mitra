import Link from "next/link";
import { ShieldCheck, Sparkles, ArrowRight, Star, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search-bar";
import { whatsappLink } from "@/lib/utils";

const HERO_BULLETS = [
  "Fixed fees + GST invoice",
  "Live tracking on WhatsApp",
  "100% official process",
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* layered backgrounds */}
      <div className="absolute inset-0 -z-10 mesh-bg" />
      <div className="absolute inset-0 -z-10 opacity-50 dots-bg" />
      <div className="absolute -left-32 top-32 -z-10 h-[420px] w-[420px] rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -right-24 -top-10 -z-10 h-[420px] w-[420px] rounded-full bg-sky-300/20 blur-3xl" />

      <div className="container grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        {/* Left */}
        <div className="text-center lg:text-left">
          <span className="pill animate-fade-in-up">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-white">
              <CheckCircle2 className="h-3 w-3" />
            </span>
            <span>Trusted by 12,000+ vehicle owners across India</span>
          </span>

          <h1 className="mt-6 text-display-2xl font-extrabold tracking-tight text-slate-900 text-balance animate-fade-in-up [animation-delay:80ms]">
            All <span className="gradient-text">RTO help</span> in one place — without the queue.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600 text-pretty animate-fade-in-up [animation-delay:160ms] lg:mx-0">
            Step-by-step guides, AI guidance, community answers and end-to-end paid
            support for RC transfer, hypothecation removal, NOC, duplicate RC, DL
            renewal and more.
          </p>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-700 lg:justify-start">
            {HERO_BULLETS.map((b) => (
              <li key={b} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />{b}
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-7 max-w-xl animate-fade-in-up [animation-delay:240ms] lg:mx-0">
            <SearchBar />
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link href="/services">
              <Button size="lg" className="ring-glow">
                Browse services <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/ai-assistant">
              <Button size="lg" variant="outline">
                <Sparkles className="h-4 w-4 text-primary" /> Ask RTO Mitra AI
              </Button>
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-800">
              <MessageCircle className="h-4 w-4" /> Or chat on WhatsApp
            </a>
          </div>

          {/* Mini ratings strip */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-5 text-xs text-slate-500 lg:justify-start">
            <div className="flex items-center gap-1.5">
              <div className="flex">{Array.from({length:5}).map((_,i)=><Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500"/>)}</div>
              <span><span className="font-semibold text-slate-700">4.9/5</span> on 1,200+ reviews</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-primary-600" /> ISO 27001 secure
            </div>
            <div className="flex items-center gap-1.5">
              <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-emerald-500/15 text-[10px] font-bold text-emerald-700">G</span> GST registered
            </div>
          </div>
        </div>

        {/* Right: visual card */}
        <div className="relative">
          <div className="grad-border animate-fade-in-up [animation-delay:200ms]">
            <div className="rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="pill"><Sparkles className="h-3.5 w-3.5 text-primary" /> Live demo</span>
                <span className="text-xs text-slate-400">RTO Mitra Console</span>
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-xl border bg-slate-50 p-4">
                <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-white">U</span>
                <p className="text-sm text-slate-700">My loan is closed but RC still shows hypothecation. What do I do?</p>
              </div>

              <div className="mt-3 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-primary-700 to-primary-500 text-white">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                <div className="text-sm leading-relaxed text-slate-800">
                  <p className="font-medium">Here's the step-by-step:</p>
                  <ol className="mt-1.5 list-decimal space-y-1 pl-5 text-slate-700">
                    <li>Get Form 35 + bank NOC from your loan branch</li>
                    <li>File at the RTO that registered your vehicle</li>
                    <li>Pay the small endorsement fee online</li>
                    <li>New RC delivered without HP entry</li>
                  </ol>
                  <p className="mt-2 text-xs text-slate-500">Sources: parivahan.gov.in · cot.gujarat.gov.in</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 border-t pt-4">
                <Stat n="9,120+" l="cases done" />
                <Stat n="14 days" l="avg time" />
                <Stat n="4.9/5" l="reviews" />
              </div>
            </div>
          </div>

          {/* Floating card decorations */}
          <div className="pointer-events-none absolute -left-3 -top-4 hidden rounded-xl bg-white px-3 py-2 text-xs font-semibold text-emerald-700 ring-soft animate-float-slow sm:block">
            ✅ HP removed
          </div>
          <div className="pointer-events-none absolute -right-2 bottom-2 hidden rounded-xl bg-white px-3 py-2 text-xs font-semibold text-primary-700 ring-soft animate-float-slow [animation-delay:1.5s] sm:block">
            🚀 Smart card on the way
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  // n can be "12,480+" style — render as-is. AnimatedCounter is used in dedicated stats section.
  return (
    <div>
      <div className="text-lg font-bold text-slate-900">{n}</div>
      <div className="text-xs text-slate-500">{l}</div>
    </div>
  );
}
