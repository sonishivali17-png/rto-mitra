import Link from "next/link";
import { Briefcase, FileText, Receipt, MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/stat-card";
import { CaseProgress } from "@/components/dashboard/case-progress";
import { whatsappLink } from "@/lib/utils";

export default function DashboardOverview() {
  // TODO: Replace with real Supabase data once auth is wired.
  const summary = {
    activeCases: 1,
    documentsUploaded: 4,
    totalPaid: 1499,
  };
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, Ravi 👋</h1>
          <p className="mt-1 text-sm text-slate-600">Here's a quick look at what's happening today.</p>
        </div>
        <Link href="/services" className="hidden md:block"><Button>New booking</Button></Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Active cases"
          value={summary.activeCases}
          trend="up"
          delta="+1 this month"
          series={[0, 0, 1, 1, 1, 1, 1]}
        />
        <StatCard
          label="Documents"
          value={summary.documentsUploaded}
          trend="up"
          delta="+2 this week"
          series={[0, 1, 1, 2, 3, 4, 4]}
        />
        <StatCard
          label="Paid (₹)"
          value={`₹${summary.totalPaid.toLocaleString("en-IN")}`}
          trend="up"
          delta="+₹1,499"
          series={[0, 0, 0, 500, 800, 1200, 1499]}
        />
        <StatCard
          label="Avg. response time"
          value="4 min"
          trend="down"
          delta="-1 min vs last week"
          series={[8, 7, 6, 5, 5, 4, 4]}
        />
      </div>

      {/* Active case spotlight */}
      <div className="rounded-2xl border bg-white p-6 ring-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Active case</p>
            <h2 className="mt-1 text-lg font-semibold text-slate-900">RC Transfer in Ahmedabad</h2>
            <p className="text-xs text-slate-500">Ticket: <span className="font-mono">RTO-2026-00012</span></p>
          </div>
          <Link href="/track?ticket=RTO-2026-00012" className="hidden sm:block">
            <Button variant="outline">Track <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </div>
        <div className="mt-6">
          <CaseProgress status="submitted" />
        </div>
      </div>

      {/* Action cards */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 p-6 text-white">
          <Sparkles className="absolute right-4 top-4 h-6 w-6 opacity-50" />
          <h3 className="text-lg font-semibold">Need a quick clarification?</h3>
          <p className="mt-1 text-sm text-white/80">Ask RTO Mitra AI — it cites official sources every time.</p>
          <Link href="/ai-assistant" className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-primary-700 hover:bg-slate-100">
            Open AI assistant <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="rounded-2xl border bg-emerald-50 p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-emerald-900">
            <MessageCircle className="h-5 w-5" /> WhatsApp support is live
          </h3>
          <p className="mt-1 text-sm text-emerald-800">
            Real humans, Mon–Sat 10 AM–7 PM IST. Average reply time: 4 minutes.
          </p>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp support" className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
