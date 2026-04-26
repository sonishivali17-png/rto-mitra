import { NextResponse } from "next/server";
import { askRtoMitraAI } from "@/lib/ai";
import { z } from "zod";
import { clientIp, limit, tooMany } from "@/lib/rate-limit";
import { logger, newRequestId } from "@/lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  question: z.string().min(2).max(2000),
  state: z.string().optional(),
  vehicleType: z.string().optional(),
  history: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(4000) }))
    .max(10)
    .optional(),
});

export async function POST(req: Request) {
  const reqId = newRequestId();
  const ip = clientIp(req);

  // Rate limit: 10 messages / minute / IP
  const r = await limit(ip, "ai_chat", 10, 60_000);
  if (!r.ok) {
    logger.warn("ai.rate_limited", { reqId, ip, retryAfter: r.retryAfter });
    return tooMany(r.retryAfter);
  }

  let parsed;
  try {
    parsed = Body.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const result = await askRtoMitraAI(parsed);
    logger.info("ai.ok", { reqId, qLen: parsed.question.length, state: parsed.state });
    return NextResponse.json(result, {
      headers: { "x-request-id": reqId },
    });
  } catch (e) {
    logger.error("ai.failed", { reqId, err: (e as Error).message });
    return NextResponse.json({ error: "AI failed" }, { status: 500, headers: { "x-request-id": reqId } });
  }
}
