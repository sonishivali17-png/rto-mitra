# SEO growth roadmap

## What's already in place
- Dynamic `sitemap.xml` (services, knowledge, forum)
- `robots.txt` (excludes admin, dashboard, pay, api)
- Per-page canonical URLs + Open Graph + Twitter cards
- JSON-LD: `Organization`, `Article`, `FAQPage`, `BreadcrumbList`
- Edge-rendered OG image
- Clean, hierarchical URLs (`/services/rc-transfer-ahmedabad`, `/knowledge/<cat>/<slug>`)
- Internal linking from articles → services and services → consultation
- Mobile-first, fast (Tailwind + RSC)

## 0–30 days
1. **Top 20 Indian RTO long-tail terms** — write one in-depth guide per week:
   - "RC transfer in [city]" × 10 cities
   - "Hypothecation removal in [city]"
   - "How to check challan online" + state variants
   - "DL renewal in Ahmedabad / Surat / Vadodara / Rajkot"
2. **Programmatic city pages** — turn `/services/[slug]` into `/services/[service]-in-[city]` for the top 20 Indian cities (template in `app/services/[slug]/page.tsx`).
3. **Submit sitemap** to Google Search Console + Bing.
4. **Speed audit** — `pnpm next-lighthouse` (CLS < 0.05, LCP < 2.5s).

## 30–90 days
1. **Knowledge category cluster pages** — `/knowledge/rc-transfer` → links to 10–15 spoke articles.
2. **AI assistant** as a feature page → multiple "how to ask AI for X" landing pages.
3. **Backlinks**:
   - Guest posts on used-car & insurance blogs (BikeWale, CarTrade, Acko, Digit).
   - Press release after launch (PRLog, Newsvoir).
   - Partnerships with driving schools (link exchanges).
4. **Forum SEO** — encourage users to post; questions rank well long-tail.

## 90–180 days
1. **Programmatic Gujarat city × service grid** — automatically generate ~250 SEO pages.
2. **Hindi & Gujarati translations** of the top 30 articles (use `i18n` or sub-paths).
3. **Schema enrichment** — add `Service`, `LocalBusiness`, `Review` schema for service pages once you have ratings.
4. **Affiliate revenue** — insurance comparison, FASTag recharge, vehicle loans (deeper integrations).

## Tooling stack to add
- **Plausible / GA4** for analytics
- **Search Console** API → admin dashboard widget
- **Brevo / Resend** for transactional + lifecycle emails
- **Cloudflare Cache + ISR** for popular guide pages
