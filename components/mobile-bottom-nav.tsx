"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wrench, Sparkles, Users, MessageCircle } from "lucide-react";
import { cn, whatsappLink } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

const ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/services", label: "Services", icon: Wrench },
  { href: "/ai-assistant", label: "Ask AI", icon: Sparkles, accent: true },
  { href: "/community", label: "Forum", icon: Users },
];

/**
 * Sticky bottom tab bar — only on mobile, hidden on desktop.
 * Includes a centered floating WhatsApp CTA for instant conversions.
 */
export function MobileBottomNav() {
  const pathname = usePathname();
  // Hide inside admin/dashboard so it doesn't fight with sidebars
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard")) return null;

  return (
    <>
      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      >
        <ul className="grid grid-cols-4">
          {ITEMS.map(({ href, label, icon: Icon, accent }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 px-2 py-2.5 text-[11px] font-medium transition",
                    active ? "text-primary" : accent ? "text-primary-600" : "text-slate-500"
                  )}
                >
                  <Icon className={cn("h-5 w-5", accent && "drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]")} />
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Floating WhatsApp orb */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp RTO Mitra"
        onClick={() => trackEvent("whatsapp_click", { source: "mobile-orb" })}
        className="fixed bottom-20 right-4 z-30 grid h-12 w-12 place-items-center rounded-full bg-emerald-500 text-white shadow-lg animate-pulse-ring md:hidden"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
    </>
  );
}
