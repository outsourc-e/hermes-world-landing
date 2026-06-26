create extension if not exists pgcrypto;

create table if not exists public.newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint newsletter_signups_email_format check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);

create unique index if not exists newsletter_signups_email_key
  on public.newsletter_signups (lower(email));

alter table public.newsletter_signups enable row level security;

create policy "newsletter signups are insertable by visitors"
  on public.newsletter_signups
  for insert
  to anon, authenticated
  with check (true);

create policy "newsletter signups are readable by service role only"
  on public.newsletter_signups
  for select
  to service_role
  using (true);
