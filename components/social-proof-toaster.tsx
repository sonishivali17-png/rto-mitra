"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { RECENT_BOOKINGS } from "@/data/reviews";
import { usePathname } from "next/navigation";

/**
 * Tiny toaster bottom-left (desktop-only) that rotates through recent bookings
 * to add subtle social proof. Hidden on dashboard / admin.
 */
export function SocialProofToaster() {
  const pathname = usePathname();
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const t1 = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(t1);
  }, [dismissed]);

  useEffect(() => {
    if (!visible || dismissed) return;
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % RECENT_BOOKINGS.length);
        setVisible(true);
      }, 400);
    }, 7000);
    return () => clearInterval(cycle);
  }, [visible, dismissed]);

  if (
    dismissed ||
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/pay")
  ) return null;

  const item = RECENT_BOOKINGS[idx];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed bottom-24 left-4 z-30 hidden md:block transition duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="pointer-events-auto flex max-w-xs items-start gap-3 rounded-2xl border bg-white p-3.5 ring-soft">
        <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <p className="text-sm text-slate-800">
            <strong>{item.name}</strong> from {item.city} just booked <strong>{item.service}</strong>
          </p>
          <p className="mt-0.5 text-xs text-slate-500">{item.ago}</p>
        </div>
        <button onClick={() => setDismissed(true)} aria-label="Dismiss" className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
