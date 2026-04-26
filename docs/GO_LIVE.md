# GO_LIVE — One-Pager

The full launch checklist is in `LAUNCH_CHECKLIST.md`. This page is the
short, ordered runbook for the actual deploy day.

## 0. Freeze

Feature work is frozen. Any change in the next 24 hours must be a
**bug-fix** or **production-readiness** item.

## 1. Environment (Vercel → Project Settings → Environment Variables)

```
NEXT_PUBLIC_SITE_URL=https://rtomitra.in
NEXT_PUBLIC_SITE_NAME="RTO Mitra"
NEXT_PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX

# Supabase
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Razorpay (live mode)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_KEY_ID=rzp_live_...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-sonnet-4-6

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXX
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=rtomitra.in

# Search Console / Bing
NEXT_PUBLIC_GSC_VERIFICATION=...
NEXT_PUBLIC_BING_VERIFICATION=...

# Admin
ADMIN_EMAILS=admin@rtomitra.in
```

## 2. Database

In Supabase SQL editor, run in order:
1. `supabase/schema.sql`
2. `supabase/policies.sql`
3. `supabase/seed.sql` (optional)

Sign up once on `/register`, then promote yourself:
```sql
update profiles set role = 'admin'
where id = (select id from auth.users where email = 'admin@rtomitra.in');
```

## 3. Razorpay

Dashboard → **Settings → Webhooks → Add new**
- URL: `https://rtomitra.in/api/razorpay/webhook`
- Secret: same as `RAZORPAY_WEBHOOK_SECRET`
- Events: `payment.captured`, `payment.failed`, `refund.processed`, `order.paid`

Test with a ₹1 live transaction → confirm row in `payments` table + `payment_success` event in GA4 Real-time.

## 4. Search Console + Bing

1. Add property `https://rtomitra.in` in Google Search Console.
2. Pick **HTML tag** verification → copy the long token (the `content="..."` part).
3. Set `NEXT_PUBLIC_GSC_VERIFICATION` in Vercel → redeploy.
4. Hit Verify in Search Console.
5. Submit `https://rtomitra.in/sitemap.xml`.
6. Repeat in Bing Webmaster Tools using `NEXT_PUBLIC_BING_VERIFICATION`.

## 5. Smoke test (5 min)

```
[ ] /              loads, hero animates, no console errors
[ ] /services      30+ cards (8 core + 25 SEO)
[ ] /knowledge     106 articles, search works
[ ] /ai-assistant  chat responds (Claude or stub)
[ ] /pay?service=consultation  Razorpay opens
[ ] /sitemap.xml   200, contains /knowledge/* + /services/*
[ ] /robots.txt    200, blocks /admin /dashboard /pay /api
[ ] /manifest.webmanifest 200, JSON
[ ] /icon          200, PNG
[ ] /opengraph-image 200, PNG
```

## 6. SEO accept

- Submit sitemap to Google Search Console + Bing Webmaster.
- Run https://search.google.com/test/rich-results on:
  - `/` — Organization + WebSite
  - `/services/rc-transfer-ahmedabad` — LocalBusiness + Service + FAQ + Breadcrumb
  - `/knowledge/rc-transfer/how-to-transfer-rc-in-gujarat` — Article + FAQ + Breadcrumb
- Run https://securityheaders.com/?q=rtomitra.in — should hit A or A+.
- Run mobile Lighthouse — target ≥ 90 for Performance + Accessibility.

## 7. Analytics funnel

After 1 hour of live traffic, GA4 Real-time should show events:
- `service_view`
- `article_view`
- `lead_submit`
- `whatsapp_click`
- `razorpay_open`
- `payment_success`

Set conversions on `lead_submit` and `payment_success` in GA4 Admin → Events.

## 8. First 24 hours monitoring

- `logger.error` count in Vercel logs
- `*.rate_limited` count (signals abuse / bot traffic)
- Lighthouse Web Vitals (use a real-user-monitoring tool or rely on Search Console)
- Razorpay webhook deliveries → 100% success rate

## 9. Post-launch SEO ping

For new content (manual until automated):
```bash
curl -X POST 'https://api.indexnow.org/IndexNow' \
  -H 'Content-Type: application/json' \
  -d '{
    "host": "rtomitra.in",
    "key": "<your-indexnow-key>",
    "urlList": ["https://rtomitra.in/knowledge/rc-transfer/how-to-transfer-rc-in-gujarat"]
  }'
```

You're live.
