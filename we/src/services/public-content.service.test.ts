import { beforeEach, describe, expect, it, vi } from "vitest";

interface QueryResult {
  data: unknown[] | null;
  error: Error | null;
}

const mockState = vi.hoisted(() => ({
  results: {} as Record<
    string,
    { data: unknown[] | null; error: Error | null }
  >,
}));

vi.mock("../lib/supabase", () => {
  class QueryBuilder implements PromiseLike<QueryResult> {
    constructor(private readonly table: string) {}

    select(): this {
      return this;
    }

    eq(): this {
      return this;
    }

    order(): this {
      return this;
    }

    in(): this {
      return this;
    }

    then<TResult1 = QueryResult, TResult2 = never>(
      onfulfilled?:
        | ((value: QueryResult) => TResult1 | PromiseLike<TResult1>)
        | null,
      onrejected?:
        | ((reason: unknown) => TResult2 | PromiseLike<TResult2>)
        | null,
    ): Promise<TResult1 | TResult2> {
      return Promise.resolve(mockState.results[this.table]).then(
        onfulfilled,
        onrejected,
      );
    }
  }

  return {
    isSupabaseConfigured: true,
    supabase: {
      from: (table: string) => new QueryBuilder(table),
      storage: {
        from: () => ({
          getPublicUrl: (path: string) => ({
            data: { publicUrl: `https://cdn.example/${path}` },
          }),
        }),
      },
    },
  };
});

import { getPublicContent } from "./public-content.service";

describe("getPublicContent", () => {
  beforeEach(() => {
    mockState.results = {
      places: {
        data: [
          {
            id: "place-1",
            slug: "gabes-oasis",
            delegation_id: "delegation-1",
            dimension: "nature",
            secondary_dimensions: ["heritage"],
            latitude: 33.88,
            longitude: 10.1,
            elevation_meters: 3,
            main_image: "gabes-media/places/main.jpg",
          },
        ],
        error: null,
      },
      delegations: {
        data: [
          {
            id: "delegation-1",
            name: { en: "Gabes", ar: "قابس", fr: "Gabès" },
            center_lat: 33.88,
            center_lng: 10.1,
            landscape: {},
            summary: {},
          },
        ],
        error: null,
      },
      cultural_dimensions: {
        data: [
          {
            key: "nature",
            label: { en: "Nature", ar: "الطبيعة", fr: "Nature" },
            description: {},
            accent_hex: "#1f7d72",
          },
        ],
        error: null,
      },
      place_translations: {
        data: [
          {
            place_id: "place-1",
            locale: "en",
            title: "Oasis",
          },
          {
            place_id: "place-1",
            locale: "ar",
            title: "واحة",
          },
        ],
        error: null,
      },
      place_gallery: {
        data: [
          {
            place_id: "place-1",
            image_path: "gabes-media/places/gallery.jpg",
            captions: { en: "Palm grove", ar: "بستان نخيل", fr: "Palmeraie" },
          },
        ],
        error: null,
      },
    };
  });

  it("maps localized records, English fallbacks, and public image URLs", async () => {
    const content = await getPublicContent("ar");

    expect(content.delegations[0]).toMatchObject({
      name: { en: "Gabes", ar: "قابس", fr: "Gabès" },
      center: { lat: 33.88, lng: 10.1 },
    });
    expect(content.dimensions[0]).toMatchObject({
      key: "nature",
      label: { en: "Nature", ar: "الطبيعة", fr: "Nature" },
    });
    expect(content.places[0]).toMatchObject({
      id: "place-1",
      slug: "gabes-oasis",
      title: { en: "Oasis", ar: "واحة", fr: "Oasis" },
      image: "https://cdn.example/places/main.jpg",
      gallery: [
        {
          src: "https://cdn.example/places/gallery.jpg",
          caption: { en: "Palm grove", ar: "بستان نخيل", fr: "Palmeraie" },
        },
      ],
    });
  });
});
