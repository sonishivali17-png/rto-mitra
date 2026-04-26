import type { Metadata } from "next";
import { CheckCircle2, Loader2, Clock, FileWarning, FileCheck2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, whatsappLink } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Track your RTO Mitra application",
  description:
    "Track your RTO Mitra service status by mobile number, ticket ID, or government application number.",
  path: "/track",
});

const STAGES = [
  { key: "received", label: "Received", icon: CheckCircle2 },
  { key: "under_review", label: "Under review", icon: Loader2 },
  { key: "documents_pending", label: "Documents pending", icon: FileWarning },
  { key: "submitted", label: "Submitted at RTO", icon: Clock },
  { key: "completed", label: "Completed", icon: FileCheck2 },
];

export default async function TrackPage({
  searchParams,
}: {
  searchParams: Promise<{ ticket?: string; mobile?: string; appId?: string }>;
}) {
  const { ticket, mobile, appId } = await searchParams;
  const showResult = !!(ticket || mobile || appId);

  // Demo: derive a fake current stage from the ticket suffix.
  const currentIndex = ticket ? Math.min(STAGES.length - 1, ticket.length % STAGES.length) : 1;

  return (
    <>
      <section className="container pt-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Track Status" }]} />
        <h1 className="mt-8 text-3xl font-bold text-slate-900 sm:text-4xl">Track your application</h1>
        <p className="mt-2 max-w-xl text-slate-600">
          Track by ticket ID, your registered mobile number, or your government application number.
        </p>
      </section>

      <section className="container py-10">
        <form action="/track" className="grid gap-4 rounded-2xl border bg-white p-6 ring-soft sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="ticket">Ticket ID</Label>
            <Input id="ticket" name="ticket" defaultValue={ticket} placeholder="RTO-2026-XXXXX" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="mobile">Mobile number</Label>
            <Input id="mobile" name="mobile" defaultValue={mobile} placeholder="+91 9XXXXXXXXX" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="appId">Application ID</Label>
            <Input id="appId" name="appId" defaultValue={appId} placeholder="Govt application no." />
          </div>
          <div className="sm:col-span-3">
            <Button type="submit">Track now</Button>
          </div>
        </form>
      </section>

      {showResult && (
        <section className="container pb-16">
          <div className="rounded-2xl border bg-white p-6 ring-soft">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                {ticket ? `Ticket ${ticket}` : mobile ? `Mobile ${mobile}` : `App ${appId}`}
              </h2>
              <span className="text-xs text-slate-500">Last updated: just now</span>
            </div>
            <ol className="mt-6 grid gap-3 sm:grid-cols-5">
              {STAGES.map((s, i) => {
                const done = i < currentIndex;
                const active = i === currentIndex;
                const Icon = s.icon;
                return (
                  <li key={s.key} className="relative">
                    <div className={cn(
                      "flex flex-col items-center rounded-xl border p-4 text-center text-xs font-medium",
                      active ? "border-primary bg-primary/5 text-primary" :
                      done ? "border-emerald-200 bg-emerald-50 text-emerald-700" :
                      "border-slate-200 text-slate-500"
                    )}>
                      <Icon className={cn("h-5 w-5", active && "animate-spin")} />
                      <span className="mt-2">{s.label}</span>
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className="mt-4 text-sm text-slate-600">
              Stuck or worried? <a href={whatsappLink(`Hi, my ticket is ${ticket ?? "—"}`)} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">WhatsApp our team</a>.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
