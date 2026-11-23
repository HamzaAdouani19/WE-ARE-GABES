-- WE ARE GABÈS: record CMS row changes in an admin-readable audit log.
create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  table_name text not null,
  record_id text not null,
  action text not null check (action in ('INSERT', 'UPDATE', 'DELETE')),
  old_data jsonb,
  new_data jsonb,
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists audit_log_created_at_idx
  on public.audit_log(created_at desc);

alter table public.audit_log enable row level security;

revoke all on table public.audit_log
  from public, anon, authenticated, service_role;
grant select on table public.audit_log to authenticated;

drop policy if exists "Admins can read audit log" on public.audit_log;
create policy "Admins can read audit log"
on public.audit_log for select to authenticated
using (public.is_cms_admin());

create or replace function public.write_cms_audit_log()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  old_row jsonb;
  new_row jsonb;
begin
  if tg_op = 'INSERT' then
    new_row := pg_catalog.to_jsonb(new);
  elsif tg_op = 'UPDATE' then
    old_row := pg_catalog.to_jsonb(old);
    new_row := pg_catalog.to_jsonb(new);
  else
    old_row := pg_catalog.to_jsonb(old);
  end if;

  insert into public.audit_log (
    table_name,
    record_id,
    action,
    old_data,
    new_data,
    user_id
  )
  values (
    tg_table_name,
    coalesce(
      new_row ->> 'id',
      new_row ->> 'key',
      old_row ->> 'id',
      old_row ->> 'key'
    ),
    tg_op,
    old_row,
    new_row,
    auth.uid()
  );

  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

drop trigger if exists places_audit_log on public.places;
create trigger places_audit_log
after insert or update or delete on public.places
for each row execute function public.write_cms_audit_log();

drop trigger if exists place_translations_audit_log
  on public.place_translations;
create trigger place_translations_audit_log
after insert or update or delete on public.place_translations
for each row execute function public.write_cms_audit_log();

drop trigger if exists delegations_audit_log on public.delegations;
create trigger delegations_audit_log
after insert or update or delete on public.delegations
for each row execute function public.write_cms_audit_log();

drop trigger if exists cultural_dimensions_audit_log
  on public.cultural_dimensions;
create trigger cultural_dimensions_audit_log
after insert or update or delete on public.cultural_dimensions
for each row execute function public.write_cms_audit_log();
