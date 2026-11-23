-- WE ARE GABÈS: local development sample data only; safe to rerun.
insert into public.delegations (
  id,
  name,
  center_lat,
  center_lng,
  landscape,
  summary
)
values (
  'seed-gabes',
  '{"en":"Gabès","ar":"قابس","fr":"Gabès"}'::jsonb,
  33.88,
  10.10,
  '{"en":"Coastal oasis","ar":"واحة ساحلية","fr":"Oasis côtière"}'::jsonb,
  '{"en":"Sample delegation for local development.","ar":"معتمدية تجريبية للتطوير المحلي.","fr":"Délégation exemple pour le développement local."}'::jsonb
)
on conflict (id) do nothing;

insert into public.cultural_dimensions (
  key,
  label,
  description,
  accent_hex,
  sort_order
)
values (
  'culture',
  '{"en":"Culture","ar":"الثقافة","fr":"Culture"}'::jsonb,
  '{"en":"Sample cultural dimension.","ar":"بُعد ثقافي تجريبي.","fr":"Dimension culturelle exemple."}'::jsonb,
  '#26766c',
  0
)
on conflict (key) do nothing;

insert into public.places (
  id,
  slug,
  delegation_id,
  dimension,
  latitude,
  longitude,
  elevation_meters,
  publication_status,
  sort_order
)
values (
  'seed-oasis-garden',
  'seed-oasis-garden',
  'seed-gabes',
  'culture',
  33.88,
  10.10,
  0,
  'draft',
  0
)
on conflict (id) do nothing;

insert into public.place_translations (place_id, locale, title, summary)
values
  (
    'seed-oasis-garden',
    'en',
    'Oasis garden',
    'A sample draft place for local development.'
  ),
  (
    'seed-oasis-garden',
    'ar',
    'حديقة الواحة',
    'مكان تجريبي مسودة للتطوير المحلي.'
  ),
  (
    'seed-oasis-garden',
    'fr',
    'Jardin de l’oasis',
    'Lieu brouillon d’exemple pour le développement local.'
  )
on conflict (place_id, locale) do nothing;
