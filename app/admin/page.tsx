import { Inbox, Users, Briefcase, Receipt, MessagesSquare } from "lucide-react";

const STATS = [
  { label: "New leads (7d)", value: 142, icon: Inbox },
  { label: "Active cases", value: 38, icon: Briefcase },
  { label: "Registered users", value: 1284, icon: Users },
  { label: "Revenue (30d)", value: "₹2.4L", icon: Receipt },
  { label: "Forum posts (24h)", value: 21, icon: MessagesSquare },
];

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Admin overview</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STATS.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border bg-white p-5 ring-soft">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Icon className="h-4 w-4" /> {label}
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">{value}</div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border bg-amber-50 p-5 text-sm text-amber-800">
        Hook this dashboard up to Supabase queries — table names match the schema in
        <code className="rounded bg-amber-100 px-1.5 py-0.5">supabase/schema.sql</code>.
      </div>
    </div>
  );
}
