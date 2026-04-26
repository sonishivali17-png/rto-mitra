-- Optional: minimal seed for local development.
-- Run after schema.sql + policies.sql.
-- Promote your own user to admin once you've signed up:
-- update profiles set role = 'admin' where id = (select id from auth.users where email = 'admin@rtomitra.in');

insert into forum_questions (slug, title, body, category, tags)
values
  ('rc-transfer-delayed-30-days',
   'RC transfer delayed for 30 days at GJ-1, what should I do?',
   'Submitted Form 29/30 last month, smart card hasn''t arrived. How long is normal?',
   'RC Transfer', '{ahmedabad,rc-transfer,delay}')
on conflict (slug) do nothing;

insert into blog_posts (slug, title, excerpt, body_md, category_slug, reading_minutes, published_at)
values
  ('how-to-transfer-rc-in-gujarat',
   'How to Transfer RC in Gujarat: Step-by-Step Guide (2026)',
   'Complete official process to transfer ownership of a vehicle in Gujarat.',
   '## Documents required ...',
   'rc-transfer', 6, now())
on conflict (slug) do nothing;
