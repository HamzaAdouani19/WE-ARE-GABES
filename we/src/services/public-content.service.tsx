
import { supabase, isSupabaseConfigured } from "../lib/supabase";

import type {
  CulturalDimension,
  Delegation,
  GalleryPhoto,
  Language,
  PlaceStory,
} from "../types/gabes";

type LocalizedText = {
  en: string;
  ar: string;
  fr: string;
};

type DatabaseRow = Record<string, unknown>;

export interface PublicContent {
  places: PlaceStory[];
  delegations: Delegation[];
  dimensions: CulturalDimension[];
}

function getClient() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Supabase is not configured.");
  }

  return supabase;
}

function toLocalizedText(value: unknown): LocalizedText {
  const data = (value ?? {}) as Partial<LocalizedText>;

  return {
    en: data.en ?? "",
    ar: data.ar ?? "",
    fr: data.fr ?? "",
  };
}

function getLocalizedValue(
  translations: Map<string, DatabaseRow>,
  placeId: string,
  lang: Language,
  field: string,
): string {
  const current = translations.get(`${placeId}:${lang}`);
  const english = translations.get(`${placeId}:en`);

  return String(current?.[field] || english?.[field] || "");
}

function getPublicImageUrl(path?: string | null): string {
  if (!path) return "";

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const client = getClient();

  const cleanPath = path
    .replace(/^\/+/, "")
    .replace(/^gabes-media\//, "");

  const { data } = client.storage
    .from("gabes-media")
    .getPublicUrl(cleanPath);

  return data.publicUrl;
}

export async function getPublicContent(
  _lang: Language,
): Promise<PublicContent> {
  const client = getClient();

  const [
    placesResult,
    delegationsResult,
    dimensionsResult,
  ] = await Promise.all([
    client
      .from("places")
      .select("*")
      .eq("publication_status", "published")
      .order("sort_order", { ascending: true }),

    client
      .from("delegations")
      .select("*"),

    client
      .from("cultural_dimensions")
      .select("*")
      .order("sort_order", { ascending: true }),
  ]);

  if (placesResult.error) throw placesResult.error;
  if (delegationsResult.error) throw delegationsResult.error;
  if (dimensionsResult.error) throw dimensionsResult.error;

  const placesRows = (placesResult.data ?? []) as DatabaseRow[];
  const delegationsRows = (delegationsResult.data ?? []) as DatabaseRow[];
  const dimensionsRows = (dimensionsResult.data ?? []) as DatabaseRow[];

  const delegations: Delegation[] = delegationsRows.map((row) => ({
    id: String(row.id),
    name: toLocalizedText(row.name),
    center: {
      lat: Number(row.center_lat ?? 0),
      lng: Number(row.center_lng ?? 0),
    },
    landscape: toLocalizedText(row.landscape),
    summary: toLocalizedText(row.summary),
  }));

  const dimensions: CulturalDimension[] = dimensionsRows.map((row) => ({
    key: row.key as CulturalDimension["key"],
    label: toLocalizedText(row.label),
    description: toLocalizedText(row.description),
    accentHex: String(row.accent_hex || "#1f7d72"),
  }));

  if (placesRows.length === 0) {
    return {
      places: [],
      delegations,
      dimensions,
    };
  }

  const placeIds = placesRows.map((row) => String(row.id));

  const [translationsResult, galleryResult] = await Promise.all([
    client
      .from("place_translations")
      .select("*")
      .in("place_id", placeIds)
      .in("locale", ["en", "ar", "fr"]),

    client
      .from("place_gallery")
      .select("*")
      .in("place_id", placeIds)
      .order("sort_order", { ascending: true }),
  ]);

  if (translationsResult.error) throw translationsResult.error;
  if (galleryResult.error) throw galleryResult.error;

  const translations = new Map<string, DatabaseRow>();

  for (const row of (translationsResult.data ?? []) as DatabaseRow[]) {
    translations.set(
      `${String(row.place_id)}:${String(row.locale)}`,
      row,
    );
  }

  const galleryByPlace = new Map<string, GalleryPhoto[]>();

  for (const row of (galleryResult.data ?? []) as DatabaseRow[]) {
    const placeId = String(row.place_id);
    const photos = galleryByPlace.get(placeId) ?? [];

    photos.push({
      src: getPublicImageUrl(
        typeof row.image_path === "string" ? row.image_path : "",
      ),
      caption: toLocalizedText(row.captions),
    });

    galleryByPlace.set(placeId, photos);
  }

  const places: PlaceStory[] = placesRows.map((row) => {
    const id = String(row.id);

    const localized = (field: string): LocalizedText => ({
      en: getLocalizedValue(translations, id, "en", field),
      ar: getLocalizedValue(translations, id, "ar", field),
      fr: getLocalizedValue(translations, id, "fr", field),
    });

    return {
      id,
      slug: String(row.slug ?? ""),
      delegationId: String(row.delegation_id ?? ""),
      dimension: row.dimension as PlaceStory["dimension"],
      secondaryDimensions: (
        row.secondary_dimensions ?? []
      ) as PlaceStory["secondaryDimensions"],
      coordinates: {
        lat: Number(row.latitude ?? 0),
        lng: Number(row.longitude ?? 0),
      },
      elevationMeters: Number(row.elevation_meters ?? 0),
      image: getPublicImageUrl(
        typeof row.main_image === "string" ? row.main_image : "",
      ),
      imageCaption: localized("image_caption"),
      gallery: galleryByPlace.get(id) ?? [],
      title: localized("title"),
      subtitle: localized("subtitle"),
      summary: localized("summary"),
      storyLead: localized("story_lead"),
      storyBody: localized("story_body"),
      culturalNote: localized("cultural_note"),
      localLife: localized("local_life"),
      visitingInfo: {
        bestSeason: localized("best_season"),
        access: localized("access"),
        highlight: localized("highlight"),
      },
    };
  });

  return {
    places,
    delegations,
    dimensions,
  };
}
