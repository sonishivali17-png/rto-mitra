# Razorpay setup

## 1. Account
- Sign up at https://razorpay.com (use a business PAN + GST for live mode)
- Stay in **Test Mode** while building

## 2. API keys
- Dashboard → **Settings → API Keys → Generate Test Key**
- Copy `key_id` (starts `rzp_test_`) and `key_secret`
- Put in `.env.local`:
  - `NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxx`
  - `RAZORPAY_KEY_ID=rzp_test_xxx`
  - `RAZORPAY_KEY_SECRET=xxx`

## 3. How payment works in this codebase
1. User opens `/pay?service=<slug>` — server renders booking summary.
2. Clicking **Pay securely** calls `POST /api/razorpay/create-order` (server creates a Razorpay order).
3. Razorpay Checkout opens. User pays.
4. On success Razorpay returns `payment_id + signature`. We `POST /api/razorpay/verify` to validate the HMAC SHA-256 signature, then persist the payment in Supabase.
5. User is redirected to `/pay/success` or `/pay/failed`.

## 4. Test cards
- Success: `4111 1111 1111 1111`, CVV `100`, any future expiry
- Failure: `5267 3181 8797 5449`
- Full list: https://razorpay.com/docs/payments/payments/test-card-details

## 5. Going live
- Submit business KYC (PAN, GST, bank account)
- Generate **Live API Keys**, replace env vars
- Configure **Webhook** at:
  - URL: `https://rtomitra.in/api/razorpay/webhook` (add this route in Phase 2 — see `lib/razorpay.ts → verifyRazorpayWebhook`)
  - Events: `payment.captured`, `payment.failed`, `refund.processed`
  - Set `RAZORPAY_WEBHOOK_SECRET`
