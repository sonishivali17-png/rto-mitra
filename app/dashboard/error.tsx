"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error("[dashboard]", error); }, [error]);
  return (
    <div className="rounded-2xl border bg-red-50 p-8 text-red-800 ring-soft">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <AlertCircle className="h-5 w-5" /> Something went wrong
      </div>
      <p className="mt-2 text-sm">We couldn't load your dashboard. Please try again, and if it persists, WhatsApp our support team.</p>
      {error.digest && <p className="mt-1 text-xs text-red-700/70">Reference: <span className="font-mono">{error.digest}</span></p>}
      <div className="mt-4 flex gap-2">
        <Button onClick={reset}>Try again</Button>
        <Link href="/contact"><Button variant="outline">Contact support</Button></Link>
      </div>
    </div>
  );
}
