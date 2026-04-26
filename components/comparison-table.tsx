import { Check, X } from "lucide-react";
import { COMPARISON } from "@/data/stats";

export function ComparisonTable() {
  return (
    <section className="container py-16">
      <div className="mx-auto max-w-2xl text-center">
        <span className="pill">Why RTO Mitra</span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          The premium way to handle vehicle paperwork
        </h2>
        <p className="mt-3 text-slate-600">
          See how we stack up against local brokers and going to the RTO yourself.
        </p>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border bg-white ring-soft">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="w-1/3 px-5 py-3"></th>
              <th className="px-5 py-3 text-center">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-white">
                  RTO Mitra
                </div>
              </th>
              <th className="px-5 py-3 text-center text-slate-700">Local broker</th>
              <th className="px-5 py-3 text-center text-slate-700">Going alone</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.rows.map((r, i) => (
              <tr key={r.feature} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/40"}>
                <td className="px-5 py-3 font-medium text-slate-800">{r.feature}</td>
                <td className="px-5 py-3 text-center"><Cell ok={r.rto} highlight /></td>
                <td className="px-5 py-3 text-center"><Cell ok={r.broker} /></td>
                <td className="px-5 py-3 text-center"><Cell ok={r.alone} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Cell({ ok, highlight }: { ok: boolean; highlight?: boolean }) {
  if (ok) {
    return (
      <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${highlight ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
        <Check className="h-4 w-4" />
      </span>
    );
  }
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-400">
      <X className="h-4 w-4" />
    </span>
  );
}
