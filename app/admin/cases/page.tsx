import { Badge } from "@/components/ui/badge";

export default function CasesAdmin() {
  const DEMO = [
    { id: "RTO-2026-00012", customer: "Ravi P.", service: "RC Transfer", status: "submitted", updated: "2026-04-22" },
    { id: "RTO-2026-00018", customer: "Hardik M.", service: "Vehicle NOC", status: "documents_pending", updated: "2026-04-23" },
  ];
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Cases</h1>
      <div className="overflow-hidden rounded-2xl border bg-white ring-soft">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3">Ticket</th>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">Service</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Updated</th>
            </tr>
          </thead>
          <tbody>
            {DEMO.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="px-5 py-3 font-mono text-xs">{c.id}</td>
                <td className="px-5 py-3">{c.customer}</td>
                <td className="px-5 py-3">{c.service}</td>
                <td className="px-5 py-3"><Badge variant={c.status === "submitted" ? "default" : "warning"}>{c.status.replace(/_/g, " ")}</Badge></td>
                <td className="px-5 py-3 text-slate-500">{c.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
