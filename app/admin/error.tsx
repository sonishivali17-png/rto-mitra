"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error("[admin]", error); }, [error]);
  return (
    <div className="rounded-2xl border bg-red-50 p-8 text-red-800 ring-soft">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <AlertCircle className="h-5 w-5" /> Admin module crashed
      </div>
      <p className="mt-2 text-sm">Check the server logs and try again.</p>
      {error.digest && <p className="mt-1 text-xs text-red-700/70">Digest: <span className="font-mono">{error.digest}</span></p>}
      <div className="mt-4 flex gap-2">
        <Button onClick={reset}>Try again</Button>
        <Link href="/"><Button variant="outline">Back to site</Button></Link>
      </div>
    </div>
  );
}
