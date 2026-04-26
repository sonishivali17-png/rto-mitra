# Deploy to Vercel

## 1. Push to GitHub
```bash
git init
git remote add origin git@github.com:your-org/rto-mitra.git
git add .
git commit -m "feat: initial RTO Mitra build"
git push -u origin main
```

## 2. Import on Vercel
- Visit https://vercel.com/new
- Import the repo, framework auto-detects **Next.js**
- Build command: `next build`
- Output: default

## 3. Environment variables
Add in **Project Settings → Environment Variables**:

| Key | Where to use | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production | e.g. `https://rtomitra.in` |
| `NEXT_PUBLIC_SITE_NAME` | Production | `RTO Mitra` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Production | digits only |
| `NEXT_PUBLIC_SUPABASE_URL` | All | |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | All | |
| `SUPABASE_SERVICE_ROLE_KEY` | Production (server only) | never expose client-side |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | All | rzp_test_… for staging |
| `RAZORPAY_KEY_ID` | All | |
| `RAZORPAY_KEY_SECRET` | Production (server only) | |
| `RAZORPAY_WEBHOOK_SECRET` | Production | optional |
| `ADMIN_EMAILS` | All | comma-separated |
| `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` | Phase 2 | optional |

## 4. Domain
Add `rtomitra.in` in **Project → Domains** and update Cloudflare/Registrar DNS:
```
A      @       76.76.21.21
CNAME  www     cname.vercel-dns.com
```

## 5. Post-deploy
- Verify `/sitemap.xml` and `/robots.txt`
- Submit sitemap to Google Search Console + Bing Webmaster Tools
- Set up Razorpay webhook URL: `https://rtomitra.in/api/razorpay/webhook` (Phase 2)
