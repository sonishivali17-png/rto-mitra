# RTO Mitra — India's Smart Vehicle Help Platform

**v1.0 — launch-ready production product.**
A premium Next.js 15 + TypeScript + Tailwind codebase for India's smartest RTO
help platform — guides, real Claude AI assistance, community, end-to-end paid
help, real Razorpay flow, real analytics, real SEO scale.

> Stack: Next.js 15 (App Router) · TypeScript · Tailwind · shadcn-style UI · Supabase (Auth + DB + Storage) · Razorpay (live + webhook) · Anthropic Claude API · GA4 + Plausible · SEO-first.

---

## Run locally

```bash
pnpm install      # or npm install / yarn
cp .env.example .env.local   # fill values
pnpm dev
```

Open `http://localhost:3000`.

## What's new in v1.0

1. **Premium UI** — gradient mesh, animated reveals, premium typography (Plus Jakarta Sans + Inter), shine micro-interactions, mega-menu navbar.
2. **Conversion-focused homepage** — new hero with live AI demo card, animated counters, trust bar, press strip, how-it-works, comparison table, urgency banner, real reviews grid, social-proof toaster.
3. **Mobile-first** — sticky bottom tab nav with floating WhatsApp, hidden desktop sticky bar, safe-area handling, larger tap targets.
4. **+25 SEO landing pages** — `data/seo-pages.ts` programmatically generates RC Transfer / HP Removal / NOC / DL / Address / Duplicate RC pages for Mumbai, Delhi, Bengaluru, Pune, Hyderabad, Chennai, Kolkata, Jaipur and more — wired into the existing route + sitemap.
5. **Real Claude API** — `lib/ai.ts` calls Anthropic Messages API with RAG-lite over your knowledge hub. Falls back to a deterministic stub if `ANTHROPIC_API_KEY` is missing.
6. **Premium dashboard** — SVG sparkline charts, gradient stat cards with deltas, visual case-progress timeline, gradient action cards.
7. **Trust** — ISO/GST badges in hero, 4.9/5 rating strip, verified reviewer badges, animated pulse-ring WhatsApp orb.
8. **Performance** — long-cache headers, `next/font` swap display, dns-prefetch, AVIF/WebP image formats, `lucide-react` import optimisation.
9. **Razorpay webhook** — `/api/razorpay/webhook` with HMAC verification + Supabase upserts on `payment.captured`, `payment.failed`, `refund.processed`.
10. **Analytics + consent** — GA4 + Plausible mounted only after explicit cookie consent banner.

## What's inside

- **Public site**: Home, About, Contact, Services hub, 8 service pages + 25 city × service SEO pages.
- **Knowledge Hub**: categories, list, article template with TOC, FAQ schema, related articles.
- **Community**: forum index, ask page, question detail, profile.
- **Ask RTO Mitra AI**: real Claude API + RAG-lite, source citations, state/vehicle context, doc-upload affordance.
- **Auth**: Supabase email/password (extendable to OTP/Google).
- **Dashboard**: overview with sparklines, case progress timeline, payments, documents, profile, notifications.
- **Track status**: by ticket, mobile, or application ID.
- **Payments**: Razorpay create-order + verify + webhook, success/failed/invoice pages.
- **Admin**: leads, users, cases, blog CMS, forum moderation, document review.
- **SEO**: dynamic `sitemap.xml` (services + 25 SEO pages + categories + articles + forum), `robots.txt`, JSON-LD (Org, Article, FAQ, Breadcrumb), canonical URLs, edge OG image.
- **Supabase**: full SQL schema + RLS policies in `supabase/`.

## Folder structure

```
app/         # routes (incl. /api/razorpay/webhook)
components/  # premium design system + 12 new homepage / dashboard components
lib/         # supabase, razorpay, ai (real Claude), seo, utils
hooks/
types/
data/        # services, articles, FAQs, RTO codes, forum seed,
             # NEW: stats, reviews, seo-pages
supabase/    # schema.sql, policies.sql, seed.sql
docs/        # setup + roadmap docs
```

## Setup docs

- [docs/LOCAL_RUN.md](docs/LOCAL_RUN.md)
- [docs/VERCEL_DEPLOY.md](docs/VERCEL_DEPLOY.md)
- [docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md)
- [docs/RAZORPAY_SETUP.md](docs/RAZORPAY_SETUP.md)
- [docs/AI_ROADMAP.md](docs/AI_ROADMAP.md)
- [docs/LAUNCH_CHECKLIST.md](docs/LAUNCH_CHECKLIST.md) — production go-live checklist
- [docs/SEO_ROADMAP.md](docs/SEO_ROADMAP.md)
- [docs/UPGRADE_NOTES.md](docs/UPGRADE_NOTES.md) — v0.1 → v1.0 changes
- **NEW** [docs/ARTICLE_QUALITY_UPGRADE.md](docs/ARTICLE_QUALITY_UPGRADE.md) — E-E-A-T pass on the 100 SEO articles

## Quick env checklist

```
# AI (real Claude — required for live AI)
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=claude-sonnet-4-6

# Analytics (optional — only fire after cookie consent)
NEXT_PUBLIC_GA_ID=G-XXXXXXX
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=rtomitra.in

# Razorpay (webhook)
RAZORPAY_WEBHOOK_SECRET=
```

## License

Proprietary © RTO Mitra.
