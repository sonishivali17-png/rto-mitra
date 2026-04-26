/**
 * In-memory token-bucket rate limiter. Good enough for a single-region Vercel
 * deploy or one Node instance. For multi-instance / serverless edge,
 * swap to Upstash Redis (drop-in: same `check()` API).
 *
 * Usage in an API route:
 *   const ip = clientIp(req);
 *   const r = await limit(ip, "ai_chat", 10, 60_000); // 10 req / min
 *   if (!r.ok) return tooMany(r.retryAfter);
 */

type Bucket = { count: number; reset: number };
const store = new Map<string, Bucket>();

export function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "anon"
  );
}

export async function limit(
  key: string,
  bucket: string,
  max: number,
  windowMs: number
): Promise<{ ok: boolean; remaining: number; retryAfter: number }> {
  const k = `${bucket}:${key}`;
  const now = Date.now();
  const cur = store.get(k);

  if (!cur || cur.reset < now) {
    store.set(k, { count: 1, reset: now + windowMs });
    return { ok: true, remaining: max - 1, retryAfter: 0 };
  }
  if (cur.count >= max) {
    return { ok: false, remaining: 0, retryAfter: Math.ceil((cur.reset - now) / 1000) };
  }
  cur.count += 1;
  return { ok: true, remaining: max - cur.count, retryAfter: 0 };
}

/** Convenience: 429 JSON response with Retry-After header. */
export function tooMany(retryAfter: number) {
  return new Response(
    JSON.stringify({ error: "Too many requests. Please slow down." }),
    {
      status: 429,
      headers: {
        "content-type": "application/json",
        "retry-after": String(retryAfter || 60),
      },
    }
  );
}
