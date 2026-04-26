"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, HelpCircle, Receipt } from "lucide-react";
import { whatsappLink } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

/**
 * Desktop-only sticky pill (mobile uses MobileBottomNav).
 * Hides on admin / dashboard / pay screens to avoid overlap.
 */
export function StickyButtons() {
  const pathname = usePathname();
  if (
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/pay")
  ) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-30 hidden justify-center px-3 md:flex">
      <div className="pointer-events-auto flex items-center gap-2 rounded-full border bg-white p-1.5 shadow-xl ring-1 ring-slate-100">
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with RTO Mitra on WhatsApp"
          onClick={() => trackEvent("whatsapp_click", { source: "sticky-bar" })}
          className="flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
        <Link href="/contact" className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100">
          <HelpCircle className="h-4 w-4" /> Need help?
        </Link>
        <Link href="/services" className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700">
          <Receipt className="h-4 w-4" /> Get quote
        </Link>
      </div>
    </div>
  );
}
