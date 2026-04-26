"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, FileText, Receipt, User, Bell, MessageSquare } from "lucide-react";
import { cn, whatsappLink } from "@/lib/utils";

const ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/cases", label: "My cases", icon: Briefcase },
  { href: "/dashboard/payments", label: "Payments", icon: Receipt },
  { href: "/dashboard/documents", label: "Documents", icon: FileText },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  return (
    <aside className="space-y-1 lg:sticky lg:top-24 lg:self-start">
      {ITEMS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
              active ? "bg-primary text-white" : "text-slate-700 hover:bg-slate-100"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
      <a
        href={whatsappLink("Hi, I need help with my RTO Mitra case")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp RTO Mitra support"
        className="mt-2 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
      >
        <MessageSquare className="h-4 w-4" /> Chat support
      </a>
    </aside>
  );
}
