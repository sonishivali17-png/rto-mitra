import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function PaySuccess({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;
  return (
    <section className="container grid min-h-[70vh] place-items-center py-12">
      <div className="max-w-md rounded-2xl border bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
        <h1 className="mt-3 text-2xl font-bold text-slate-900">Payment successful</h1>
        <p className="mt-2 text-slate-700">
          Thank you! Your booking is confirmed.
          {orderId ? <> Order ID: <span className="font-mono text-xs">{orderId}</span></> : null}
        </p>
        <p className="mt-1 text-sm text-slate-600">You'll receive a WhatsApp message in a few minutes with next steps.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/dashboard"><Button>Go to dashboard</Button></Link>
          <Link href="/track"><Button variant="outline">Track status</Button></Link>
        </div>
      </div>
    </section>
  );
}
