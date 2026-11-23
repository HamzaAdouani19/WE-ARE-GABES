-- WE ARE GABÈS: add language-neutral full-text search to place translations.
do $$
begin
  if to_regclass('public.place_translations') is not null then
    alter table public.place_translations
      add column if not exists search_vector tsvector
      generated always as (
        to_tsvector(
          'simple'::regconfig,
          coalesce(title, '') || ' ' ||
          coalesce(subtitle, '') || ' ' ||
          coalesce(summary, '') || ' ' ||
          coalesce(story_lead, '') || ' ' ||
          coalesce(story_body, '') || ' ' ||
          coalesce(cultural_note, '') || ' ' ||
          coalesce(local_life, '') || ' ' ||
          coalesce(image_caption, '') || ' ' ||
          coalesce(best_season, '') || ' ' ||
          coalesce(access, '') || ' ' ||
          coalesce(highlight, '')
        )
      ) stored;

    create index if not exists place_translations_search_vector_idx
      on public.place_translations using gin (search_vector);
  end if;
end;
$$;
