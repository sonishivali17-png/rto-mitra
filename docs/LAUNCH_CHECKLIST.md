# Production launch checklist

A focused, ordered checklist for going live with confidence.
Everything below is implemented in the codebase — your job is to verify and switch on.

## A. Environment

- [ ] `NEXT_PUBLIC_SITE_URL` set to the live origin (no trailing slash).
- [ ] Supabase keys: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server only).
- [ ] Razorpay live keys: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`.
- [ ] Razorpay webhook secret: `RAZORPAY_WEBHOOK_SECRET`.
- [ ] Anthropic: `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL=claude-sonnet-4-6`.
- [ ] Analytics: `NEXT_PUBLIC_GA_ID` and/or `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.
- [ ] `ADMIN_EMAILS` filled with at least one admin.
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` is the production line (digits only).

## B. Database (Supabase)

- [ ] `supabase/schema.sql` applied.
- [ ] `supabase/policies.sql` applied (RLS enabled on every table).
- [ ] Storage bucket `documents` created with the per-user folder policy from `docs/SUPABASE_SETUP.md`.
- [ ] Backups + Point-in-time-recovery enabled.
- [ ] Promoted yourself to admin (`update profiles set role='admin' where ...`).

## C. Razorpay

- [ ] KYC complete; live mode enabled.
- [ ] Webhook URL `https://<domain>/api/razorpay/webhook` registered with secret matching `RAZORPAY_WEBHOOK_SECRET`.
- [ ] Webhook events selected: `payment.captured`, `payment.failed`, `refund.processed`, `order.paid`.
- [ ] Test live: ₹1 transaction → success page → row in `payments` table.

## D. Performance

- [ ] `pnpm build` produces zero warnings on critical pages.
- [ ] Lighthouse mobile ≥ 90 on Home, Services hub, a Service page, an Article, Ask AI.
- [ ] LCP element is the H1 (no above-the-fold image).
- [ ] CLS < 0.05 sitewide.
- [ ] Heavy clients are dynamic-imported: `ChatUI`, `RazorpayButton`, social-proof toaster, cookie consent, analytics.
- [ ] ISR set on services/[slug] and knowledge/[category]/[slug].

## E. SEO technical

- [ ] `/sitemap.xml` returns 200 and lists 25+ service URLs + categories + articles.
- [ ] `/robots.txt` allows crawl, blocks `admin`, `dashboard`, `pay`, `api`.
- [ ] All pages have unique `<title>` ≤ 60 chars and meta description ≤ 160 chars.
- [ ] One canonical per URL (no trailing-slash duplicates).
- [ ] Each service page emits 4 JSON-LDs: BreadcrumbList, LocalBusiness, Service, FAQPage.
- [ ] Each article emits Article + Breadcrumb + FAQ JSON-LD.
- [ ] Manifest is reachable; Apple icon + PWA icon render.
- [ ] Submit sitemap to Google Search Console, Bing Webmaster, IndexNow.
- [ ] Run https://search.google.com/test/rich-results on 3 random URLs.

## F. Mobile UX

- [ ] All tap targets ≥ 44 × 44 px.
- [ ] No horizontal scroll on a 360 × 640 viewport.
- [ ] Safe-area insets respected (bottom nav doesn't clip on iOS notch).
- [ ] `prefers-reduced-motion` disables marquee + pulse + reveals.
- [ ] Hover effects only fire on hover-capable devices.
- [ ] Floating WhatsApp orb visible above mobile bottom nav.

## G. Forms & conversion

- [ ] Lead form: inline validation, `tel`/`email` `inputMode`, `autoComplete`, honeypot, success state.
- [ ] Contact form: same.
- [ ] Server validates with zod; honeypot rejected silently with 200.
- [ ] `lead_submit` event fires in GA4 / Plausible after success.
- [ ] WhatsApp links fire `whatsapp_click` with source attribution.

## H. Error handling & loading

- [ ] Per-segment `error.tsx` in dashboard, admin, services.
- [ ] Per-segment `loading.tsx` in dashboard, admin, services, knowledge, community, ai-assistant.
- [ ] All API routes return structured JSON errors with `x-request-id`.
- [ ] 404 page returns proper status (Next does this automatically with `notFound()`).
- [ ] No raw stack traces leak to browser.

## I. Security

- [ ] `Content-Security-Policy` header live; verify with https://securityheaders.com.
- [ ] HSTS sent with `preload` and submitted via https://hstspreload.org.
- [ ] All API POSTs rate-limited (`/api/leads` 6/min, `/api/contact` 4/min, `/api/ai/chat` 10/min).
- [ ] Supabase service role key never imported in `app/(.*)?\\.tsx` (only used in `app/api/*` and `lib/supabase/server.ts`).
- [ ] All `target="_blank"` links carry `rel="noopener noreferrer"`.
- [ ] Hide `Server` / `X-Powered-By` (set in `next.config.mjs`).

## J. Accessibility

- [ ] Skip-to-content link visible on `Tab`.
- [ ] All icon buttons have `aria-label`.
- [ ] Form fields have visible labels and `aria-describedby` for errors.
- [ ] Focus rings visible (`:focus-visible`).
- [ ] No `outline: none` overrides anywhere.
- [ ] Run https://wave.webaim.org on Home + a Service page; fix any contrast warnings.
- [ ] Run keyboard-only smoke test through hero → CTAs → forms.

## K. Analytics

- [ ] `consent_accepted` fires after banner accept.
- [ ] `lead_submit`, `contact_submit`, `ai_message_sent`, `whatsapp_click`, `razorpay_open`, `payment_success`, `payment_failed` all visible in real-time view.
- [ ] GA4 conversions configured for `payment_success` and `lead_submit`.

## L. Pre-flight smoke

- [ ] Cold-load Home on slow 4G — no jank, no layout shift.
- [ ] Cold-load `/services/rc-transfer-mumbai` — passes Core Web Vitals.
- [ ] Cold-load `/ai-assistant` — chat renders, message round-trips.
- [ ] Submit a lead form — receives Supabase row + GA event.
- [ ] Sign up → log in → land on dashboard → see live case progress.
- [ ] Make a ₹1 live Razorpay charge → success page → webhook fires → row in `payments`.
- [ ] Log out → `/admin` redirects to `/login`.
- [ ] Visit a non-existent slug → proper 404 page, response code 404.

## M. Day-of launch

- [ ] DNS pointed at Vercel; HTTPS verified.
- [ ] Custom 404 + error pages render branded.
- [ ] Search Console shows sitemap accepted.
- [ ] Razorpay live webhook test fires green.
- [ ] First 10 leads / 1 payment monitored for 24h.

## N. After 24h

- [ ] Review `logger` output for spike in `*.failed` or `*.rate_limited`.
- [ ] Check Search Console for crawl errors.
- [ ] Review Web Vitals report → fix any 75th-percentile regressions.
- [ ] Review GA4 funnel: pageview → service view → quote click → lead submit → payment.
