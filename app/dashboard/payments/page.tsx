import { Receipt } from "lucide-react";
import { formatINR } from "@/lib/utils";

const DEMO_PAYMENTS = [
  { id: "pay_001", date: "2026-04-15", service: "RC Transfer", amount: 1499, status: "captured" },
];

export default function PaymentsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Payments</h1>
      <div className="overflow-hidden rounded-2xl border bg-white ring-soft">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Service</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Invoice</th>
            </tr>
          </thead>
          <tbody>
            {DEMO_PAYMENTS.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-5 py-3 text-slate-600">{p.date}</td>
                <td className="px-5 py-3">{p.service}</td>
                <td className="px-5 py-3 font-medium">{formatINR(p.amount)}</td>
                <td className="px-5 py-3 text-emerald-700">{p.status}</td>
                <td className="px-5 py-3">
                  <a href={`/pay/invoice/${p.id}`} className="text-primary hover:underline">View →</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!DEMO_PAYMENTS.length && (
          <p className="p-10 text-center text-sm text-slate-500">
            <Receipt className="mx-auto mb-2 h-6 w-6 text-slate-300" />
            No payments yet.
          </p>
        )}
      </div>
    </div>
  );
}
