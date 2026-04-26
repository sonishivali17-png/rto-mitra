import { MessageCircle, FileCheck2, Truck } from "lucide-react";
import { Reveal } from "@/components/reveal";

const STEPS = [
  {
    icon: MessageCircle,
    title: "Tell us your case",
    body: "WhatsApp us or fill the form on a service page. We respond in minutes with a clear quote and the documents you'll need.",
  },
  {
    icon: FileCheck2,
    title: "Upload documents",
    body: "Drag-drop docs into your secure dashboard. We verify everything before submission to avoid rejections.",
  },
  {
    icon: Truck,
    title: "We handle the RTO",
    body: "Our local executive submits, follows up and gets your smart card delivered to your address. You track live.",
  },
];

export function HowItWorks() {
  return (
    <section className="container py-16">
      <div className="mx-auto max-w-2xl text-center">
        <span className="pill">How it works</span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Three simple steps. Zero queue time.
        </h2>
        <p className="mt-3 text-slate-600">From "I'm stuck" to "Done" — usually in two to three weeks.</p>
      </div>
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 80}>
            <div className="card-elevated h-full">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary-700 to-primary-500 text-white">
                  <s.icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Step {i + 1}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
