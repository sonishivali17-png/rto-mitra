import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Sparkline } from "./sparkline";

export function StatCard({
  label,
  value,
  delta,
  trend,
  series,
}: {
  label: string;
  value: string | number;
  delta?: string;     // e.g. "+12%"
  trend?: "up" | "down";
  series?: number[];
}) {
  const isUp = trend === "up";
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-white p-5 ring-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-medium text-slate-500">{label}</div>
          <div className="mt-1 text-3xl font-bold text-slate-900">{value}</div>
          {delta && (
            <div
              className={`mt-1 inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium ${
                isUp ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
              }`}
            >
              {isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {delta}
            </div>
          )}
        </div>
        {series && (
          <Sparkline
            values={series}
            stroke={isUp ? "#10b981" : "#2563eb"}
            fill={isUp ? "rgba(16,185,129,0.14)" : "rgba(37,99,235,0.12)"}
            width={120}
            height={48}
            className="hidden h-12 w-32 sm:block"
          />
        )}
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />
    </div>
  );
}
