-- WE ARE GABÈS CMS: initial schema.
-- Apply through Supabase SQL Editor or Supabase CLI after reviewing the project.

create extension if not exists pgcrypto;

create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Administrator',
  created_at timestamptz not null default now()
);

create or replace function public.is_cms_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

revoke all on function public.is_cms_admin() from public;
grant execute on function public.is_cms_admin() to anon, authenticated;

create table if not exists public.delegations (
  id text primary key,
  name jsonb not null,
  center_lat double precision not null,
  center_lng double precision not null,
  landscape jsonb not null default '{}'::jsonb,
  summary jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.cultural_dimensions (
  key text primary key,
  label jsonb not null,
  description jsonb not null default '{}'::jsonb,
  accent_hex text not null default '#26766c',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.places (
  id text primary key,
  slug text not null unique,
  delegation_id text references public.delegations(id) on update cascade on delete restrict,
  dimension text not null references public.cultural_dimensions(key) on update cascade on delete restrict,
  secondary_dimensions text[] not null default '{}',
  latitude double precision not null,
  longitude double precision not null,
  elevation_meters double precision not null default 0,
  main_image text,
  publication_status text not null default 'draft' check (publication_status in ('draft','published')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.place_translations (
  id uuid primary key default gen_random_uuid(),
  place_id text not null references public.places(id) on delete cascade,
  locale text not null check (locale in ('en','ar','fr')),
  title text not null default '',
  subtitle text not null default '',
  summary text not null default '',
  story_lead text not null default '',
  story_body text not null default '',
  cultural_note text not null default '',
  local_life text not null default '',
  image_caption text not null default '',
  best_season text not null default '',
  access text not null default '',
  highlight text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(place_id, locale)
);

create table if not exists public.place_gallery (
  id uuid primary key default gen_random_uuid(),
  place_id text not null references public.places(id) on delete cascade,
  image_path text not null,
  sort_order integer not null default 0,
  captions jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists places_status_idx on public.places(publication_status);
create index if not exists places_delegation_idx on public.places(delegation_id);
create index if not exists places_dimension_idx on public.places(dimension);
create index if not exists place_translations_place_locale_idx on public.place_translations(place_id, locale);
create index if not exists place_gallery_place_order_idx on public.place_gallery(place_id, sort_order);

alter table public.admin_profiles enable row level security;
alter table public.delegations enable row level security;
alter table public.cultural_dimensions enable row level security;
alter table public.places enable row level security;
alter table public.place_translations enable row level security;
alter table public.place_gallery enable row level security;

drop policy if exists "Admins can read admin profiles" on public.admin_profiles;
create policy "Admins can read admin profiles"
on public.admin_profiles for select to authenticated
using (public.is_cms_admin());

drop policy if exists "Admins can manage delegations" on public.delegations;
create policy "Admins can manage delegations"
on public.delegations for all to authenticated
using (public.is_cms_admin()) with check (public.is_cms_admin());

drop policy if exists "Public can read delegations" on public.delegations;
create policy "Public can read delegations"
on public.delegations for select to anon, authenticated
using (true);

drop policy if exists "Admins can manage cultural dimensions" on public.cultural_dimensions;
create policy "Admins can manage cultural dimensions"
on public.cultural_dimensions for all to authenticated
using (public.is_cms_admin()) with check (public.is_cms_admin());

drop policy if exists "Public can read cultural dimensions" on public.cultural_dimensions;
create policy "Public can read cultural dimensions"
on public.cultural_dimensions for select to anon, authenticated
using (true);

drop policy if exists "Admins can manage places" on public.places;
create policy "Admins can manage places"
on public.places for all to authenticated
using (public.is_cms_admin()) with check (public.is_cms_admin());

drop policy if exists "Public can read published places" on public.places;
create policy "Public can read published places"
on public.places for select to anon, authenticated
using (publication_status = 'published');

drop policy if exists "Admins can manage place translations" on public.place_translations;
create policy "Admins can manage place translations"
on public.place_translations for all to authenticated
using (public.is_cms_admin()) with check (public.is_cms_admin());

drop policy if exists "Public can read published place translations" on public.place_translations;
create policy "Public can read published place translations"
on public.place_translations for select to anon, authenticated
using (
  exists (
    select 1 from public.places p
    where p.id = place_id and p.publication_status = 'published'
  )
);

drop policy if exists "Admins can manage place gallery" on public.place_gallery;
create policy "Admins can manage place gallery"
on public.place_gallery for all to authenticated
using (public.is_cms_admin()) with check (public.is_cms_admin());

drop policy if exists "Public can read published place gallery" on public.place_gallery;
create policy "Public can read published place gallery"
on public.place_gallery for select to anon, authenticated
using (
  exists (
    select 1 from public.places p
    where p.id = place_id and p.publication_status = 'published'
  )
);

-- Public media bucket. Upload/update/delete remain Admin-only through storage policies.
insert into storage.buckets (id, name, public)
values ('gabes-media', 'gabes-media', true)
on conflict (id) do nothing;

drop policy if exists "Public can view CMS media" on storage.objects;
create policy "Public can view CMS media"
on storage.objects for select to anon, authenticated
using (bucket_id = 'gabes-media');

drop policy if exists "CMS admins can upload media" on storage.objects;
create policy "CMS admins can upload media"
on storage.objects for insert to authenticated
with check (bucket_id = 'gabes-media' and public.is_cms_admin());

drop policy if exists "CMS admins can update media" on storage.objects;
create policy "CMS admins can update media"
on storage.objects for update to authenticated
using (bucket_id = 'gabes-media' and public.is_cms_admin())
with check (bucket_id = 'gabes-media' and public.is_cms_admin());

drop policy if exists "CMS admins can delete media" on storage.objects;
create policy "CMS admins can delete media"
on storage.objects for delete to authenticated
using (bucket_id = 'gabes-media' and public.is_cms_admin());


-- SQL privileges are separate from RLS policies. These grants allow the
-- Supabase API roles to reach the tables; RLS still restricts which rows
-- each role can read or modify.
grant select on table public.delegations, public.cultural_dimensions, public.places,
  public.place_translations, public.place_gallery to anon;

grant select, insert, update, delete on table public.delegations,
  public.cultural_dimensions, public.places, public.place_translations,
  public.place_gallery to authenticated;

grant select on table public.admin_profiles to authenticated;
