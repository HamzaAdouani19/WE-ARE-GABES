-- Repeatable database hardening for WE ARE GABÈS CMS.
-- This migration does not modify production rows or add duplicate schemas.

do $$
begin
  if to_regclass('public.cultural_dimensions') is not null then
    if exists (
      select 1
      from public.cultural_dimensions
      where key not in (
        'geography', 'nature', 'culture', 'heritage',
        'experiences', 'local_life', 'stories'
      )
    ) then
      raise exception 'Cannot add dimension key constraint: unsupported cultural dimension keys exist';
    end if;

    alter table public.cultural_dimensions
      drop constraint if exists cultural_dimensions_key_allowed;
    alter table public.cultural_dimensions
      add constraint cultural_dimensions_key_allowed
      check (key in (
        'geography', 'nature', 'culture', 'heritage',
        'experiences', 'local_life', 'stories'
      ));

    alter table public.cultural_dimensions
      drop constraint if exists cultural_dimensions_accent_hex_valid;
    alter table public.cultural_dimensions
      add constraint cultural_dimensions_accent_hex_valid
      check (accent_hex ~ '^#[0-9A-Fa-f]{6}$');
  end if;
end;
$$;

do $$
begin
  if to_regclass('public.places') is not null then
    if exists (
      select 1
      from public.places
      where dimension not in (
        'geography', 'nature', 'culture', 'heritage',
        'experiences', 'local_life', 'stories'
      )
         or exists (
           select 1
           from unnest(secondary_dimensions) as secondary(key)
           where key not in (
             'geography', 'nature', 'culture', 'heritage',
             'experiences', 'local_life', 'stories'
           )
              or key = dimension
         )
    ) then
      raise exception 'Cannot add place dimension constraints: unsupported or duplicate dimension keys exist';
    end if;

    alter table public.places
      drop constraint if exists places_dimension_allowed;
    alter table public.places
      add constraint places_dimension_allowed
      check (dimension in (
        'geography', 'nature', 'culture', 'heritage',
        'experiences', 'local_life', 'stories'
      ));

    alter table public.places
      drop constraint if exists places_secondary_dimensions_valid;
    alter table public.places
      add constraint places_secondary_dimensions_valid
      check (
        secondary_dimensions <@
          array[
            'geography', 'nature', 'culture', 'heritage',
            'experiences', 'local_life', 'stories'
          ]::text[]
        and not (dimension = any(secondary_dimensions))
      );

    alter table public.places
      drop constraint if exists places_slug_valid;
    alter table public.places
      add constraint places_slug_valid
      check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$');

    alter table public.places
      drop constraint if exists places_coordinates_valid;
    alter table public.places
      add constraint places_coordinates_valid
      check (
        latitude between -90 and 90
        and longitude between -180 and 180
        and elevation_meters >= 0
      );

    alter table public.places
      drop constraint if exists places_sort_order_valid;
    alter table public.places
      add constraint places_sort_order_valid
      check (sort_order >= 0);
  end if;
end;
$$;

do $$
begin
  if to_regclass('public.place_gallery') is not null then
    alter table public.place_gallery
      drop constraint if exists place_gallery_image_path_required;
    alter table public.place_gallery
      add constraint place_gallery_image_path_required
      check (btrim(image_path) <> '');

    alter table public.place_gallery
      drop constraint if exists place_gallery_sort_order_valid;
    alter table public.place_gallery
      add constraint place_gallery_sort_order_valid
      check (sort_order >= 0);
  end if;
end;
$$;

create index if not exists places_publication_sort_idx
  on public.places(publication_status, sort_order);

create index if not exists place_gallery_image_path_idx
  on public.place_gallery(image_path);
