"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ServicesError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error("[services]", error); }, [error]);
  return (
    <section className="container py-16 text-center">
      <h1 className="text-2xl font-bold text-slate-900">We couldn't load this service</h1>
      <p className="mt-2 max-w-md mx-auto text-slate-600">Try again, or browse all services. You can also WhatsApp our team directly.</p>
      {error.digest && <p className="mt-1 text-xs text-slate-400">Ref: <span className="font-mono">{error.digest}</span></p>}
      <div className="mt-5 flex justify-center gap-2">
        <Button onClick={reset}>Try again</Button>
        <Link href="/services"><Button variant="outline">All services</Button></Link>
      </div>
    </section>
  );
}
