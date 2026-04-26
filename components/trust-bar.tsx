import { ShieldCheck, FileCheck2, Lock, BadgeIndianRupee } from "lucide-react";

const ITEMS = [
  { icon: ShieldCheck, label: "100% official process" },
  { icon: FileCheck2,  label: "Document pre-checks" },
  { icon: Lock,         label: "Bank-grade encryption" },
  { icon: BadgeIndianRupee, label: "Refund if not possible" },
];

export function TrustBar() {
  return (
    <section className="container -mt-2 pb-6 sm:-mt-4 sm:pb-2">
      <div className="grid gap-2 rounded-2xl border bg-white p-3 ring-soft sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-slate-700">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-4 w-4" />
            </span>
            {label}
          </div>
        ))}
      </div>
    </section>
  );
}
