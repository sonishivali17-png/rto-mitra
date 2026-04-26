import { Badge } from "@/components/ui/badge";

const DEMO = [
  { id: 1, customer: "Ravi P.", file: "rc.pdf", case: "RTO-2026-00012", status: "approved" },
  { id: 2, customer: "Khushbu S.", file: "form-35.pdf", case: "RTO-2026-00018", status: "pending" },
];

export default function UploadsAdmin() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Document review</h1>
      <div className="overflow-hidden rounded-2xl border bg-white ring-soft">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3">Customer</th>
              <th className="px-5 py-3">File</th>
              <th className="px-5 py-3">Case</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {DEMO.map((d) => (
              <tr key={d.id} className="border-t">
                <td className="px-5 py-3 font-medium">{d.customer}</td>
                <td className="px-5 py-3 font-mono text-xs">{d.file}</td>
                <td className="px-5 py-3">{d.case}</td>
                <td className="px-5 py-3"><Badge variant={d.status === "approved" ? "success" : "warning"}>{d.status}</Badge></td>
                <td className="px-5 py-3 space-x-3">
                  <button className="text-primary hover:underline">Open</button>
                  <button className="text-emerald-700 hover:underline">Approve</button>
                  <button className="text-red-600 hover:underline">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
