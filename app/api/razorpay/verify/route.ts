import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { createAdminClient } from "@/lib/supabase/server";

const Body = z.object({
  orderId: z.string().min(8).max(64),
  paymentId: z.string().min(8).max(64),
  signature: z.string().min(16).max(256),
  serviceSlug: z.string().regex(/^[a-z0-9-]+$/).min(1).max(120),
});

export async function POST(req: Request) {
  let parsed;
  try {
    parsed = Body.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const ok = verifyRazorpaySignature({
    orderId: parsed.orderId,
    paymentId: parsed.paymentId,
    signature: parsed.signature,
  });
  if (!ok) return NextResponse.json({ error: "Invalid signature" }, { status: 400 });

  // Persist the payment + create a service_request.
  try {
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createAdminClient();
      await supabase.from("payments").insert({
        razorpay_order_id: parsed.orderId,
        razorpay_payment_id: parsed.paymentId,
        service_slug: parsed.serviceSlug,
        status: "captured",
      });
    }
  } catch (e) {
    console.error("payment persist failed", e);
  }

  return NextResponse.json({ ok: true });
}
