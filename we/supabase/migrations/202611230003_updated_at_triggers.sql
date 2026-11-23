-- WE ARE GABÈS: maintain updated_at for editable CMS records.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := pg_catalog.now();
  return new;
end;
$$;

drop trigger if exists delegations_set_updated_at on public.delegations;
create trigger delegations_set_updated_at
before update on public.delegations
for each row execute function public.set_updated_at();

drop trigger if exists cultural_dimensions_set_updated_at
  on public.cultural_dimensions;
create trigger cultural_dimensions_set_updated_at
before update on public.cultural_dimensions
for each row execute function public.set_updated_at();

drop trigger if exists places_set_updated_at on public.places;
create trigger places_set_updated_at
before update on public.places
for each row execute function public.set_updated_at();

drop trigger if exists place_translations_set_updated_at
  on public.place_translations;
create trigger place_translations_set_updated_at
before update on public.place_translations
for each row execute function public.set_updated_at();
