import { NextResponse } from "next/server";
import { verifyRazorpayWebhook } from "@/lib/razorpay";
import { createAdminClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Razorpay webhook endpoint.
 * Configure: Razorpay Dashboard → Settings → Webhooks → Add new
 *   URL:     https://rtomitra.in/api/razorpay/webhook
 *   Events:  payment.captured, payment.failed, refund.processed, order.paid
 *   Secret:  set in env as RAZORPAY_WEBHOOK_SECRET
 */
export async function POST(req: Request) {
  const signature = req.headers.get("x-razorpay-signature") ?? "";
  const raw = await req.text();

  if (!verifyRazorpayWebhook(raw, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let body: any;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const event: string = body?.event ?? "unknown";
  const payment = body?.payload?.payment?.entity;
  const refund = body?.payload?.refund?.entity;

  try {
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createAdminClient();

      switch (event) {
        case "payment.captured":
        case "order.paid":
          if (payment?.id) {
            await supabase
              .from("payments")
              .upsert(
                {
                  razorpay_order_id: payment.order_id,
                  razorpay_payment_id: payment.id,
                  amount: payment.amount,
                  currency: payment.currency,
                  status: "captured",
                  service_slug: payment.notes?.serviceSlug ?? null,
                },
                { onConflict: "razorpay_payment_id" }
              );
          }
          break;
        case "payment.failed":
          if (payment?.id) {
            await supabase
              .from("payments")
              .upsert(
                {
                  razorpay_order_id: payment.order_id,
                  razorpay_payment_id: payment.id,
                  amount: payment.amount,
                  currency: payment.currency,
                  status: "failed",
                  service_slug: payment.notes?.serviceSlug ?? null,
                },
                { onConflict: "razorpay_payment_id" }
              );
          }
          break;
        case "refund.processed":
          if (refund?.payment_id) {
            await supabase
              .from("payments")
              .update({ status: "refunded" })
              .eq("razorpay_payment_id", refund.payment_id);
          }
          break;
        default:
          // Unhandled event — log and 200 OK so Razorpay doesn't retry forever.
          console.log("Unhandled Razorpay event:", event);
      }
    }
  } catch (e) {
    console.error("Webhook persistence error:", e);
    // Always 200 to acknowledge receipt; surface persistence errors via your APM.
  }

  return NextResponse.json({ received: true });
}
