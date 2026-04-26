import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/server";
import { clientIp, limit, tooMany } from "@/lib/rate-limit";
import { logger, newRequestId } from "@/lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(7).max(20),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().min(2).max(4000),
  company_url: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  const reqId = newRequestId();
  const ip = clientIp(req);

  const r = await limit(ip, "contact", 4, 60_000);
  if (!r.ok) return tooMany(r.retryAfter);

  let parsed;
  try {
    parsed = Body.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400, headers: { "x-request-id": reqId } });
  }
  if (parsed.company_url) {
    logger.warn("contact.honeypot_triggered", { reqId, ip });
    return NextResponse.json({ ok: true }, { headers: { "x-request-id": reqId } });
  }
  try {
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createAdminClient();
      const { error } = await supabase.from("leads").insert({
        name: parsed.name,
        phone: parsed.phone,
        email: parsed.email || null,
        message: parsed.message,
        source: "contact-form",
      });
      if (error) throw error;
    }
    logger.info("contact.ok", { reqId });
    return NextResponse.json({ ok: true }, { headers: { "x-request-id": reqId } });
  } catch (e) {
    logger.error("contact.failed", { reqId, err: (e as Error).message });
    return NextResponse.json({ error: "Failed" }, { status: 500, headers: { "x-request-id": reqId } });
  }
}
