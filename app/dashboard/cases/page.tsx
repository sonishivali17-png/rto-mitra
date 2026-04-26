import Link from "next/link";
import { Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const STATUS_VARIANT: Record<string, "default" | "muted" | "success" | "warning"> = {
  received: "muted",
  under_review: "warning",
  documents_pending: "warning",
  submitted: "default",
  completed: "success",
};

const DEMO_CASES = [
  {
    id: "case-1",
    ticketId: "RTO-2026-00012",
    service: "RC Transfer in Ahmedabad",
    status: "submitted",
    amountPaid: 1499,
    updatedAt: "2026-04-22T08:00:00Z",
  },
];

export default function MyCasesPage() {
  if (!DEMO_CASES.length) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center ring-soft">
        <Briefcase className="mx-auto h-10 w-10 text-slate-300" />
        <h1 className="mt-4 text-xl font-semibold text-slate-900">No cases yet</h1>
        <p className="mt-1 text-sm text-slate-600">Once you book a service, you can track it here.</p>
        <Link href="/services" className="mt-4 inline-block">
          <Button>Browse services</Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">My cases</h1>
      <div className="overflow-hidden rounded-2xl border bg-white ring-soft">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3">Ticket</th>
              <th className="px-5 py-3">Service</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Updated</th>
              <th className="px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {DEMO_CASES.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="px-5 py-3 font-mono text-xs">{c.ticketId}</td>
                <td className="px-5 py-3">{c.service}</td>
                <td className="px-5 py-3">
                  <Badge variant={STATUS_VARIANT[c.status]}>{c.status.replace(/_/g, " ")}</Badge>
                </td>
                <td className="px-5 py-3 text-slate-500">{new Date(c.updatedAt).toLocaleDateString("en-IN")}</td>
                <td className="px-5 py-3">
                  <Link href={`/track?ticket=${c.ticketId}`} className="text-primary hover:underline">Track →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
