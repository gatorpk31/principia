-- Run this once in the Supabase SQL editor to enable app analytics.
-- The app writes fire-and-forget events here via the anon key; until this
-- table exists, inserts fail silently and the app is unaffected.

create table if not exists public.analytics_events (
  id bigint generated always as identity primary key,
  install_id uuid not null,
  event_name text not null,
  properties jsonb not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.analytics_events enable row level security;

-- Anonymous clients may only INSERT — never read, update, or delete.
create policy "anon can insert events"
  on public.analytics_events for insert
  to anon
  with check (true);

create index if not exists analytics_events_name_time
  on public.analytics_events (event_name, created_at desc);

-- Useful first queries:
--   Funnel:   select event_name, count(distinct install_id) from analytics_events group by 1 order by 2 desc;
--   Paywall:  select date_trunc('day', created_at) d, count(*) from analytics_events where event_name = 'paywall_view' group by 1 order by 1;
