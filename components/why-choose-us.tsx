import { ShieldCheck, Clock4, CreditCard, FileCheck2, MessageCircle, Users } from "lucide-react";

const ITEMS = [
  { icon: ShieldCheck, title: "Official process only", body: "We never bypass rules. Every action runs through the official RTO/parivahan flow." },
  { icon: Clock4, title: "Fast turnaround", body: "Most cases done in 7–25 days. Live tracking till delivery." },
  { icon: CreditCard, title: "Transparent fees", body: "Fixed RTO Mitra fee + actual government fees. No hidden charges." },
  { icon: FileCheck2, title: "Document pre-checks", body: "We verify your documents before submission to avoid rejections." },
  { icon: MessageCircle, title: "WhatsApp support", body: "Real humans answer on WhatsApp during business hours." },
  { icon: Users, title: "Trusted community", body: "10,000+ vehicle owners helped across Gujarat and growing." },
];

export function WhyChooseUs() {
  return (
    <section className="container py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Why vehicle owners choose us</h2>
        <p className="mt-3 text-slate-600">Premium experience for an unglamorous problem.</p>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map(({ icon: Icon, title, body }) => (
          <div key={title} className="card-elevated">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
            <p className="mt-1 text-sm text-slate-600">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
