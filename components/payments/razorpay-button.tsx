"use client";

import Script from "next/script";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function RazorpayButton({
  amountInPaise,
  serviceSlug,
  serviceTitle,
  customerName,
  customerEmail,
  customerPhone,
}: {
  amountInPaise: number;
  serviceSlug: string;
  serviceTitle: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
}) {
  const [busy, setBusy] = useState(false);

  async function pay() {
    setBusy(true);
    trackEvent("razorpay_open", { service: serviceSlug, amount: amountInPaise });
    try {
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ amountInPaise, serviceSlug }),
      });
      if (!res.ok) throw new Error("Order creation failed");
      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "RTO Mitra",
        description: serviceTitle,
        order_id: order.id,
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        theme: { color: "#1d4ed8" },
        handler: async (response: any) => {
          const v = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              serviceSlug,
            }),
          });
          if (v.ok) {
            trackEvent("payment_success", { service: serviceSlug, amount: amountInPaise });
            window.location.href = `/pay/success?orderId=${response.razorpay_order_id}`;
          } else {
            trackEvent("payment_failed", { service: serviceSlug, reason: "verify_failed" });
            window.location.href = `/pay/failed?orderId=${response.razorpay_order_id}`;
          }
        },
        modal: {
          ondismiss: () => setBusy(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (resp: any) => {
        trackEvent("payment_failed", { service: serviceSlug, reason: resp?.error?.code ?? "unknown" });
        window.location.href = `/pay/failed?orderId=${order.id}`;
      });
      rzp.open();
    } catch (e) {
      console.error(e);
      trackEvent("payment_failed", { service: serviceSlug, reason: "exception" });
      window.location.href = `/pay/failed`;
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <Button onClick={pay} disabled={busy} size="lg" className="w-full">
        <CreditCard className="h-4 w-4" /> {busy ? "Loading…" : "Pay securely"}
      </Button>
    </>
  );
}
