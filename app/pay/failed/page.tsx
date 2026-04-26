import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/utils";

export default async function PayFailed({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;
  return (
    <section className="container grid min-h-[70vh] place-items-center py-12">
      <div className="max-w-md rounded-2xl border bg-red-50 p-8 text-center">
        <XCircle className="mx-auto h-12 w-12 text-red-600" />
        <h1 className="mt-3 text-2xl font-bold text-slate-900">Payment failed</h1>
        <p className="mt-2 text-slate-700">
          We couldn't complete your payment.
          {orderId ? <> Order: <span className="font-mono text-xs">{orderId}</span></> : null}
        </p>
        <p className="mt-1 text-sm text-slate-600">
          If money was deducted, it will reflect back in 5–7 business days. WhatsApp us if needed.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/services"><Button>Try again</Button></Link>
          <a href={whatsappLink(`Payment failed for order ${orderId ?? ""}`)} target="_blank" rel="noopener noreferrer">
            <Button variant="outline">WhatsApp us</Button>
          </a>
        </div>
      </div>
    </section>
  );
}
