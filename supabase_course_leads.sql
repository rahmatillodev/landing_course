-- Run this in Supabase SQL Editor to create the table for course landing page leads.
-- Table: course_leads (used by config SUPABASE_TABLE_LEADS)

create table if not exists public.course_leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  created_at timestamptz not null default now(),
  -- Event context (for Facebook / CAPI parity)
  event text,
  event_time bigint,
  event_source_url text,
  -- Attribution for Facebook / ads
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  fbclid text,
  fbp text,
  fbc text,
  user_agent text,
  ip_address text
);

-- RLS: allow anonymous insert (so the landing page can submit), no public read
alter table public.course_leads enable row level security;

create policy "Allow anonymous insert"
  on public.course_leads
  for insert
  to anon
  with check (true);

-- Optional: allow authenticated service role to read (dashboard, exports)
create policy "Allow service role all"
  on public.course_leads
  for all
  to service_role
  using (true)
  with check (true);

comment on table public.course_leads is 'Leads from CD IELTS course landing page (website-only flow, no bot).';
