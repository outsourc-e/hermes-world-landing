-- HermesWorld profiles + founder system (idempotent / safe to re-run)
-- First 100 sign-ups get is_founder=true with monotonic founder_rank 1..100

create extension if not exists pgcrypto;
create extension if not exists citext;

drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
drop function if exists public.claim_founder_vault();
drop view if exists public.founders_status;
drop table if exists public.founder_counter cascade;
drop table if exists public.profiles cascade;

create table public.profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  username        citext unique,
  display_name    text,
  avatar_url      text,
  discord_id      text,
  x_handle        text,
  is_founder      boolean not null default false,
  founder_rank    int unique,
  founder_claimed boolean not null default false,
  claimed_rewards jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now()
);
create index idx_profiles_username on public.profiles (username);
create index idx_profiles_founder_rank on public.profiles (founder_rank) where founder_rank is not null;
alter table public.profiles enable row level security;
create policy "profiles read all" on public.profiles for select using (true);
create policy "profiles write own" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);

create table public.founder_counter (
  id int primary key check (id = 1),
  next_rank int not null default 1,
  cap int not null default 100,
  updated_at timestamptz not null default now()
);
insert into public.founder_counter (id, next_rank, cap) values (1, 1, 100);
alter table public.founder_counter enable row level security;
create policy "founder_counter read" on public.founder_counter for select using (true);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare assigned_rank int;
begin
  update public.founder_counter set next_rank = next_rank + 1, updated_at = now()
   where id = 1 and next_rank <= cap
  returning next_rank - 1 into assigned_rank;
  insert into public.profiles (id, display_name, avatar_url, is_founder, founder_rank)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
          new.raw_user_meta_data->>'avatar_url', assigned_rank is not null, assigned_rank)
  on conflict (id) do nothing;
  return new;
end; $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

create view public.founders_status as
  select cap as total, cap - (next_rank - 1) as remaining, next_rank - 1 as claimed
  from public.founder_counter where id = 1;
grant select on public.founders_status to anon, authenticated;

create or replace function public.claim_founder_vault()
returns jsonb language plpgsql security definer set search_path = public as $$
declare v_user uuid := auth.uid(); v_profile public.profiles; v_rewards jsonb;
begin
  if v_user is null then raise exception 'not authenticated'; end if;
  select * into v_profile from public.profiles where id = v_user for update;
  if v_profile is null then raise exception 'profile not found'; end if;
  if not v_profile.is_founder then raise exception 'not a founder'; end if;
  if v_profile.founder_claimed then return v_profile.claimed_rewards; end if;
  v_rewards := jsonb_build_object('founder_cape',true,'founder_banner',true,'aether',50,'coins',1000,
    'trader_agent_trial',true,'founder_title','Founder #' || v_profile.founder_rank,
    'founder_pet',true,'rank',v_profile.founder_rank);
  update public.profiles set founder_claimed = true, claimed_rewards = v_rewards where id = v_user;
  return v_rewards;
end; $$;
grant execute on function public.claim_founder_vault() to authenticated;
