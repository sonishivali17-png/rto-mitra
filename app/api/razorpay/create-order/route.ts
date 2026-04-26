import { NextResponse } from "next/server";
import { z } from "zod";
import { createRazorpayOrder } from "@/lib/razorpay";

const Body = z.object({
  amountInPaise: z.number().int().positive().max(50_00_000), // ₹50,000 max
  serviceSlug: z.string().regex(/^[a-z0-9-]+$/).min(1).max(120),
});

export async function POST(req: Request) {
  let parsed;
  try {
    parsed = Body.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  try {
    const order = await createRazorpayOrder({
      amountInPaise: parsed.amountInPaise,
      receipt: `rto_${Date.now()}`,
      notes: { serviceSlug: parsed.serviceSlug },
    });
    return NextResponse.json(order);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Order creation failed" }, { status: 500 });
  }
}
