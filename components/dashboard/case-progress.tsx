import { CheckCircle2, Loader2, Clock, FileWarning, FileCheck2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const CASE_STAGES = [
  { key: "received",          label: "Received",            icon: CheckCircle2 },
  { key: "under_review",      label: "Under review",        icon: Loader2 },
  { key: "documents_pending", label: "Documents pending",   icon: FileWarning },
  { key: "submitted",         label: "Submitted at RTO",    icon: Clock },
  { key: "completed",         label: "Completed",           icon: FileCheck2 },
] as const;

export function CaseProgress({
  status,
}: {
  status:
    | "received"
    | "under_review"
    | "documents_pending"
    | "submitted"
    | "completed";
}) {
  const currentIndex = CASE_STAGES.findIndex((s) => s.key === status);
  return (
    <ol className="grid gap-3 sm:grid-cols-5">
      {CASE_STAGES.map((s, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        const Icon = s.icon;
        return (
          <li key={s.key} className="relative">
            <div
              className={cn(
                "flex flex-col items-center rounded-xl border p-4 text-center text-xs font-medium transition",
                active
                  ? "border-primary/30 bg-primary/5 text-primary"
                  : done
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 text-slate-500"
              )}
            >
              <Icon className={cn("h-5 w-5", active && "animate-spin")} />
              <span className="mt-2">{s.label}</span>
            </div>
            {i < CASE_STAGES.length - 1 && (
              <span
                className={cn(
                  "absolute right-0 top-1/2 hidden h-0.5 w-3 -translate-y-1/2 sm:block",
                  done || active ? "bg-primary/40" : "bg-slate-200"
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
