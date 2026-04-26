import { Badge } from "@/components/ui/badge";

const DEMO = [
  { id: 1, name: "Ravi P.", phone: "+91 98XXXXXXXX", service: "RC Transfer", city: "Ahmedabad", source: "website", status: "new", date: "2026-04-25" },
  { id: 2, name: "Khushbu S.", phone: "+91 97XXXXXXXX", service: "HP Removal", city: "Surat", source: "ai-chat", status: "contacted", date: "2026-04-24" },
];

export default function LeadsAdmin() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
        <input placeholder="Search…" className="h-9 rounded-xl border px-3 text-sm" />
      </div>
      <div className="overflow-hidden rounded-2xl border bg-white ring-soft">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Phone</th>
              <th className="px-5 py-3">Service</th>
              <th className="px-5 py-3">City</th>
              <th className="px-5 py-3">Source</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {DEMO.map((l) => (
              <tr key={l.id} className="border-t">
                <td className="px-5 py-3 font-medium">{l.name}</td>
                <td className="px-5 py-3 font-mono text-xs">{l.phone}</td>
                <td className="px-5 py-3">{l.service}</td>
                <td className="px-5 py-3">{l.city}</td>
                <td className="px-5 py-3">{l.source}</td>
                <td className="px-5 py-3">
                  <Badge variant={l.status === "new" ? "warning" : "success"}>{l.status}</Badge>
                </td>
                <td className="px-5 py-3 text-slate-500">{l.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
