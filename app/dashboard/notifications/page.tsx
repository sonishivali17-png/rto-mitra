import { Bell } from "lucide-react";

const DEMO = [
  { id: "n1", title: "Documents received", body: "We've verified your Form 35 and bank NOC.", time: "2h ago" },
  { id: "n2", title: "Application submitted", body: "Your file is at GJ-1 RTO.", time: "1d ago" },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
      <ul className="divide-y divide-slate-100 rounded-2xl border bg-white ring-soft">
        {DEMO.map((n) => (
          <li key={n.id} className="flex items-start gap-3 p-5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <Bell className="h-4 w-4" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">{n.title}</p>
              <p className="text-sm text-slate-600">{n.body}</p>
            </div>
            <span className="text-xs text-slate-500">{n.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
