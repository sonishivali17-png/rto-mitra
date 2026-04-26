# Supabase setup

## 1. Create project
- https://supabase.com → **New project**
- Region: `ap-south-1` (Mumbai) is closest for Indian users
- Note your **Project URL**, **anon key**, **service role key**

## 2. Schema
Open **SQL Editor** in the Supabase dashboard and run, in order:
1. `supabase/schema.sql`
2. `supabase/policies.sql`
3. `supabase/seed.sql` (optional — seeds a sample question + post)

## 3. Auth
- **Authentication → Providers → Email**: enable Email/Password
- (Optional) Add **Phone (OTP)** for India — works great with MSG91/Twilio
- (Optional) Google / Apple OAuth — add redirect `https://rtomitra.in/auth/callback`

## 4. Storage
- Create a **`documents`** bucket (private)
- Add a policy:
```sql
create policy "user can upload own files"
on storage.objects for insert
to authenticated
with check (bucket_id = 'documents' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "user can read own files"
on storage.objects for select
to authenticated
using (bucket_id = 'documents' and auth.uid()::text = (storage.foldername(name))[1]);
```

## 5. Promote your admin user
After signing up once on `/register`, run:
```sql
update profiles
set role = 'admin'
where id = (select id from auth.users where email = 'admin@rtomitra.in');
```
Also add the email to `ADMIN_EMAILS` env var so the middleware allows `/admin`.

## 6. Local development
- Add `http://localhost:3000` to **Authentication → URL Configuration → Site URL** (or as a redirect URL)
