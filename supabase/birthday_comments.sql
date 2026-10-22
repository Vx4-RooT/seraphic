-- Run this in Supabase Dashboard -> SQL Editor.
create table if not exists public.birthday_comments (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 1 and 40),
  message text not null check (char_length(trim(message)) between 1 and 500),
  created_at timestamptz not null default now()
);

create index if not exists birthday_comments_created_at_idx
  on public.birthday_comments (created_at desc);

-- The Next.js API route uses the server-only service-role key. Keep RLS enabled
-- and do not add anon/public insert or select policies for this table.
alter table public.birthday_comments enable row level security;
