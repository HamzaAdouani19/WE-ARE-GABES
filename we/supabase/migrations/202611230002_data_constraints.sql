-- WE ARE GABÈS: enforce valid place slugs and geographic coordinates.
do $$
begin
  if to_regclass('public.places') is not null then
    alter table public.places
      drop constraint if exists places_slug_valid;
    alter table public.places
      add constraint places_slug_valid
      check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$');

    alter table public.places
      drop constraint if exists places_coordinates_valid;
    alter table public.places
      add constraint places_coordinates_valid
      check (
        latitude between -90 and 90
        and longitude between -180 and 180
        and elevation_meters >= 0
      );
  end if;

  if to_regclass('public.delegations') is not null then
    alter table public.delegations
      drop constraint if exists delegations_coordinates_valid;
    alter table public.delegations
      add constraint delegations_coordinates_valid
      check (
        center_lat between -90 and 90
        and center_lng between -180 and 180
      );
  end if;
end;
$$;
