-- =====================================================================
-- Row Level Security policies. Run after schema.sql.
-- =====================================================================

alter table profiles            enable row level security;
alter table leads               enable row level security;
alter table service_requests    enable row level security;
alter table payments            enable row level security;
alter table uploaded_documents  enable row level security;
alter table forum_questions     enable row level security;
alter table forum_answers       enable row level security;
alter table forum_votes         enable row level security;
alter table blog_posts          enable row level security;
alter table ai_chat_history     enable row level security;
alter table notifications       enable row level security;

-- helper: is admin?
create or replace function public.is_admin()
returns boolean language sql stable as $$
  select coalesce((select role = 'admin' from profiles where id = auth.uid()), false);
$$;

-- ----- profiles -----
drop policy if exists "self read" on profiles;
create policy "self read" on profiles for select using (id = auth.uid() or public.is_admin());
drop policy if exists "self update" on profiles;
create policy "self update" on profiles for update using (id = auth.uid());

-- ----- leads -----
drop policy if exists "leads insert anon" on leads;
create policy "leads insert anon" on leads for insert with check (true);
drop policy if exists "leads admin read" on leads;
create policy "leads admin read" on leads for select using (public.is_admin());
drop policy if exists "leads admin update" on leads;
create policy "leads admin update" on leads for update using (public.is_admin());

-- ----- service_requests -----
drop policy if exists "sr self read" on service_requests;
create policy "sr self read" on service_requests for select using (user_id = auth.uid() or public.is_admin());
drop policy if exists "sr self insert" on service_requests;
create policy "sr self insert" on service_requests for insert with check (user_id = auth.uid());
drop policy if exists "sr admin update" on service_requests;
create policy "sr admin update" on service_requests for update using (public.is_admin());

-- ----- payments -----
drop policy if exists "pay self read" on payments;
create policy "pay self read" on payments for select using (user_id = auth.uid() or public.is_admin());
drop policy if exists "pay admin write" on payments;
create policy "pay admin write" on payments for insert with check (public.is_admin());

-- ----- uploaded_documents -----
drop policy if exists "doc self read" on uploaded_documents;
create policy "doc self read" on uploaded_documents for select using (user_id = auth.uid() or public.is_admin());
drop policy if exists "doc self insert" on uploaded_documents;
create policy "doc self insert" on uploaded_documents for insert with check (user_id = auth.uid());

-- ----- forum -----
drop policy if exists "q public read" on forum_questions;
create policy "q public read" on forum_questions for select using (not is_hidden);
drop policy if exists "q auth insert" on forum_questions;
create policy "q auth insert" on forum_questions for insert with check (auth.uid() is not null);
drop policy if exists "q author update" on forum_questions;
create policy "q author update" on forum_questions for update using (user_id = auth.uid() or public.is_admin());

drop policy if exists "a public read" on forum_answers;
create policy "a public read" on forum_answers for select using (not is_hidden);
drop policy if exists "a auth insert" on forum_answers;
create policy "a auth insert" on forum_answers for insert with check (auth.uid() is not null);
drop policy if exists "a author update" on forum_answers;
create policy "a author update" on forum_answers for update using (user_id = auth.uid() or public.is_admin());

drop policy if exists "v auth all" on forum_votes;
create policy "v auth all" on forum_votes for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ----- blog -----
drop policy if exists "blog public read" on blog_posts;
create policy "blog public read" on blog_posts for select using (published_at is not null);
drop policy if exists "blog admin write" on blog_posts;
create policy "blog admin write" on blog_posts for all using (public.is_admin()) with check (public.is_admin());

-- ----- AI history -----
drop policy if exists "ai self read" on ai_chat_history;
create policy "ai self read" on ai_chat_history for select using (user_id = auth.uid() or public.is_admin());
drop policy if exists "ai self insert" on ai_chat_history;
create policy "ai self insert" on ai_chat_history for insert with check (auth.uid() is not null or user_id is null);

-- ----- notifications -----
drop policy if exists "notif self read" on notifications;
create policy "notif self read" on notifications for select using (user_id = auth.uid());
drop policy if exists "notif self update" on notifications;
create policy "notif self update" on notifications for update using (user_id = auth.uid());
