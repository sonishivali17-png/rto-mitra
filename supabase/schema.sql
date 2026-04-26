-- =====================================================================
-- RTO Mitra — Supabase schema
-- Run in Supabase SQL editor (in order). Then run policies.sql, seed.sql.
-- =====================================================================

create extension if not exists "pgcrypto";

-- ---------- USERS / PROFILES ----------
create table if not exists profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  full_name    text,
  phone        text,
  city         text,
  state        text,
  avatar_url   text,
  role         text not null default 'user' check (role in ('user','executive','admin')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Auto-create profile when a new auth.user appears
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- LEADS ----------
create table if not exists leads (
  id              bigserial primary key,
  name            text not null,
  phone           text not null,
  email           text,
  city            text,
  state           text,
  message         text,
  service_slug    text,
  source          text default 'website',
  status          text default 'new' check (status in ('new','contacted','qualified','converted','lost')),
  assigned_to     uuid references profiles(id),
  created_at      timestamptz not null default now()
);
create index on leads (created_at desc);
create index on leads (status);

-- ---------- SERVICE REQUESTS / CASES ----------
do $$ begin
  create type case_status as enum (
    'received','under_review','documents_pending','submitted','completed','cancelled'
  );
exception when duplicate_object then null; end $$;

create sequence if not exists service_requests_ticket_seq;

create table if not exists service_requests (
  id              uuid primary key default gen_random_uuid(),
  ticket_id       text unique not null default ('RTO-' || to_char(now(),'YYYY') || '-' || lpad(nextval('service_requests_ticket_seq')::text, 5, '0')),
  user_id         uuid references profiles(id) on delete set null,
  service_slug    text not null,
  status          case_status not null default 'received',
  amount_paid     integer default 0,
  notes           text,
  assigned_to     uuid references profiles(id),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index on service_requests (user_id);
create index on service_requests (status);

-- ---------- PAYMENTS ----------
create table if not exists payments (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid references profiles(id) on delete set null,
  service_request_id    uuid references service_requests(id) on delete set null,
  service_slug          text,
  amount                integer,                -- in paise
  currency              text default 'INR',
  razorpay_order_id     text unique,
  razorpay_payment_id   text unique,
  status                text default 'created'
                        check (status in ('created','authorized','captured','refunded','failed')),
  created_at            timestamptz not null default now()
);
create index on payments (user_id);
create index on payments (status);

-- ---------- DOCUMENT UPLOADS ----------
create table if not exists uploaded_documents (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid references profiles(id) on delete cascade,
  service_request_id    uuid references service_requests(id) on delete set null,
  doc_type              text,                   -- rc | aadhaar | pan | insurance | noc | address_proof | other
  file_path             text not null,           -- supabase storage path
  status                text default 'queued'
                        check (status in ('queued','uploaded','approved','rejected')),
  notes                 text,
  created_at            timestamptz not null default now()
);

-- ---------- FORUM ----------
create table if not exists forum_questions (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  user_id       uuid references profiles(id) on delete set null,
  title         text not null,
  body          text not null,
  category      text not null,
  tags          text[] not null default '{}',
  upvotes       integer not null default 0,
  is_solved     boolean not null default false,
  is_hidden     boolean not null default false,
  created_at    timestamptz not null default now()
);
create index on forum_questions (created_at desc);
create index on forum_questions (category);

create table if not exists forum_answers (
  id            uuid primary key default gen_random_uuid(),
  question_id   uuid references forum_questions(id) on delete cascade,
  user_id       uuid references profiles(id) on delete set null,
  body          text not null,
  upvotes       integer not null default 0,
  is_accepted   boolean not null default false,
  is_hidden     boolean not null default false,
  created_at    timestamptz not null default now()
);
create index on forum_answers (question_id);

create table if not exists forum_votes (
  user_id       uuid references profiles(id) on delete cascade,
  target_type   text check (target_type in ('question','answer')),
  target_id     uuid,
  value         smallint check (value in (-1, 1)),
  created_at    timestamptz not null default now(),
  primary key (user_id, target_type, target_id)
);

-- ---------- BLOG / CMS ----------
create table if not exists blog_posts (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  title           text not null,
  excerpt         text,
  body_md         text,
  category_slug   text,
  cover_url       text,
  author_id       uuid references profiles(id),
  reading_minutes integer default 5,
  published_at    timestamptz,
  updated_at      timestamptz not null default now(),
  created_at      timestamptz not null default now()
);
create index on blog_posts (published_at desc);

-- ---------- AI CHAT HISTORY ----------
create table if not exists ai_chat_history (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references profiles(id) on delete set null,
  state         text,
  vehicle_type  text,
  question      text not null,
  answer        text,
  sources       jsonb,
  created_at    timestamptz not null default now()
);

-- ---------- NOTIFICATIONS ----------
create table if not exists notifications (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references profiles(id) on delete cascade,
  title       text not null,
  body        text,
  link        text,
  is_read     boolean not null default false,
  created_at  timestamptz not null default now()
);
create index on notifications (user_id, is_read);

-- ---------- UPDATED_AT TRIGGERS ----------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists trg_profiles_updated on profiles;
create trigger trg_profiles_updated before update on profiles
  for each row execute function public.set_updated_at();

drop trigger if exists trg_service_requests_updated on service_requests;
create trigger trg_service_requests_updated before update on service_requests
  for each row execute function public.set_updated_at();

drop trigger if exists trg_blog_posts_updated on blog_posts;
create trigger trg_blog_posts_updated before update on blog_posts
  for each row execute function public.set_updated_at();
