"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Inbox,
  Briefcase,
  Receipt,
  FileText,
  MessagesSquare,
  Upload,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/cases", label: "Cases", icon: Briefcase },
  { href: "/admin/blog", label: "Blog CMS", icon: FileText },
  { href: "/admin/forum", label: "Forum mod", icon: MessagesSquare },
  { href: "/admin/uploads", label: "Document review", icon: Upload },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="space-y-1 lg:sticky lg:top-24 lg:self-start">
      <Link href="/" className="mb-4 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-500 hover:bg-slate-100">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to site
      </Link>
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
    </aside>
  );
}
