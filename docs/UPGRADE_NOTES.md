# Upgrade notes — v0.1 → v1.0

This release upgrades the MVP scaffold to a launch-ready production product.
Below is the diff at a glance.

## 1. Premium design system

- New `Plus Jakarta Sans` (display) + `Inter` (body) loaded via `next/font` with `display: swap`.
- New tokens in `globals.css`: brand gradient stops (`--brand-1/2/3`), gradient mesh, dotted texture, gradient border, marquee, shimmer, float-slow, pulse-ring.
- New animations in `tailwind.config.ts`: `fade-in-up`, `fade-in-right`, `scale-in`, `shine`, plus `display-2xl` / `display-xl` clamp font sizes.
- New `Reveal` component (IntersectionObserver) and `AnimatedCounter`.

## 2. Premium navbar + mobile bottom nav

- `components/navbar.tsx` — sticky-on-scroll glass effect, mega-menus for Services & Knowledge, gradient logo, WhatsApp link, shine button.
- `components/mobile-bottom-nav.tsx` — 4-tab dock + floating WhatsApp orb with `animate-pulse-ring`.
- `components/sticky-buttons.tsx` — desktop-only now; auto-hides on dashboard/admin/pay routes.

## 3. Conversion-focused homepage

| Section                | File                            | Purpose                                  |
|------------------------|---------------------------------|------------------------------------------|
| Hero                   | `components/hero.tsx`           | Big headline, live AI demo card          |
| Trust bar              | `components/trust-bar.tsx`      | 4 trust signals immediately below hero   |
| Press strip            | `components/press-bar.tsx`      | Marquee "as seen in" logos               |
| Stats counters         | `components/stats-section.tsx`  | Animated counters (12,480+ users etc.)   |
| How it works           | `components/how-it-works.tsx`   | 3-step explainer with reveal animation   |
| Comparison table       | `components/comparison-table.tsx` | Us vs broker vs DIY                    |
| Urgency banner         | `components/urgency-banner.tsx` | Today-only offer                         |
| Reviews grid           | `components/reviews-grid.tsx`   | Verified review cards                    |
| Service areas          | `components/service-areas.tsx`  | Internal links to all 25 SEO pages       |
| Social-proof toaster   | `components/social-proof-toaster.tsx` | "X just booked" desktop toaster    |
| Cookie consent         | `components/cookie-consent.tsx` | Required for analytics                   |

## 4. 25 programmatic SEO pages

`data/seo-pages.ts` ships a typed `SEO_PAGES` array of 25 city × service combos for Mumbai, Delhi, Bengaluru, Pune, Hyderabad, Chennai, Kolkata, Jaipur, Vadodara, Surat, Rajkot, Gandhinagar, Bhavnagar.
- Wired into `app/services/[slug]/page.tsx` (generateStaticParams + lookup).
- Wired into `app/sitemap.ts` for indexing.
- Linked from homepage via `ServiceAreas` component.

## 5. Real Claude integration

- `lib/ai.ts` now uses `@anthropic-ai/sdk` (Anthropic Messages API).
- RAG-lite scoring over `KNOWLEDGE_ARTICLES` injects top-k relevant passages into the system prompt with URL citations.
- Strict guardrails in `SYSTEM_PROMPT` (no fabricated fees / timelines, mandatory CTA).
- Bounded conversation history (last 10 turns) for cost control.
- Graceful fallback to deterministic stub if `ANTHROPIC_API_KEY` is missing.
- AI assistant chat now renders assistant replies as Markdown via `RenderedMarkdown`.

## 6. Dashboard visuals

- `components/dashboard/sparkline.tsx` — pure-SVG smooth sparkline, zero deps.
- `components/dashboard/stat-card.tsx` — gradient-underline stat card with delta + sparkline.
- `components/dashboard/case-progress.tsx` — 5-stage horizontal timeline.
- `app/dashboard/page.tsx` — 4 stat cards, active case spotlight, gradient action cards.

## 7. Trust badges, reviews, counters

- New ratings strip in hero, animated counters in `StatsSection`, verified reviews in `ReviewsGrid`, comparison table, press marquee.

## 8. Performance

- `next/font` `display: swap`.
- `next.config.mjs`: `compress`, `productionBrowserSourceMaps: false`, AVIF/WebP, long-cache headers for `/_next/static/*`, `optimizePackageImports: ["lucide-react"]`.
- `dns-prefetch` for Razorpay; `preconnect` for `fonts.gstatic.com`.

## 9. Razorpay webhook

`app/api/razorpay/webhook/route.ts` — HMAC-verified, handles:
- `payment.captured` / `order.paid` → upsert payment row as `captured`
- `payment.failed` → upsert as `failed`
- `refund.processed` → mark `refunded`

Configure in Razorpay Dashboard → Settings → Webhooks. Set `RAZORPAY_WEBHOOK_SECRET`.

## 10. Analytics + consent

- `components/analytics.tsx` — GA4 + Plausible, mount-on-consent only.
- `components/cookie-consent.tsx` — minimal banner that sets `rto-consent=1` and dispatches a custom event the analytics component listens for.

## Env additions

```
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=claude-sonnet-4-6
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
```

## Migration notes

If you had v0.1 running:
1. `pnpm install` (adds `@anthropic-ai/sdk`).
2. Copy new keys from `.env.example`.
3. Add the Razorpay webhook URL in your Razorpay dashboard.
4. Verify the homepage — many new sections render even without filling DB or API keys.
5. Optional: delete `components/testimonials.tsx` (replaced by `reviews-grid.tsx`); the old import in `app/page.tsx` has already been swapped.
