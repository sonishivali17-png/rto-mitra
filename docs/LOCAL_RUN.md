# Local development

## 1. Prerequisites
- **Node.js** 18.18+ (20 LTS recommended)
- **pnpm** (or npm / yarn)
- A free **Supabase** project (for auth, DB, storage)
- A **Razorpay** test account (for payments)

## 2. Install
```bash
pnpm install
```

## 3. Environment
```bash
cp .env.example .env.local
```
Fill in:
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
- `ADMIN_EMAILS` — comma-separated list of admin emails
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — your WhatsApp business number (no `+`)

## 4. Database
See `docs/SUPABASE_SETUP.md` to apply `supabase/schema.sql` and `supabase/policies.sql`.

## 5. Start the dev server
```bash
pnpm dev
```
Visit:
- `http://localhost:3000` — homepage
- `http://localhost:3000/services` — services hub
- `http://localhost:3000/knowledge` — knowledge hub
- `http://localhost:3000/ai-assistant` — AI assistant
- `http://localhost:3000/admin` — admin (gated by ADMIN_EMAILS)

## 6. Type-check & build
```bash
pnpm typecheck
pnpm build
```

## Common issues
- **Razorpay test cards** — see https://razorpay.com/docs/payments/payments/test-card-details
- **Supabase auth not working** — confirm `NEXT_PUBLIC_SUPABASE_URL` matches the project and email confirmation is enabled.
- **Middleware redirect loop** — make sure your admin email is in `ADMIN_EMAILS`.
