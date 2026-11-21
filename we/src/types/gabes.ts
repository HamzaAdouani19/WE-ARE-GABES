export type Language = 'en' | 'ar' | 'fr';

export type AppView = 'globe' | 'map';

export type JourneyStageId = 'world' | 'africa' | 'tunisia' | 'gabes';

export type DimensionKey =
  | 'all'
  | 'geography'
  | 'nature'
  | 'culture'
  | 'heritage'
  | 'experiences'
  | 'local_life'
  | 'stories';

export interface LocalizedText {
  en: string;
  ar: string;
  fr: string;
}

export interface Delegation {
  id: string;
  name: LocalizedText;
  center: { lat: number; lng: number };
  landscape: LocalizedText;
  summary: LocalizedText;
}

export interface GalleryPhoto {
  src: string;
  caption: LocalizedText;
}

export interface PlaceStory {
  id: string;
  slug: string;
  delegationId: string;
  dimension: Exclude<DimensionKey, 'all'>;
  secondaryDimensions: Exclude<DimensionKey, 'all'>[];
  title: LocalizedText;
  subtitle: LocalizedText;
  coordinates: { lat: number; lng: number };
  elevationMeters: number;
  image: string;
  imageCaption: LocalizedText;
  gallery: GalleryPhoto[];
  summary: LocalizedText;
  storyLead: LocalizedText;
  storyBody: LocalizedText;
  culturalNote: LocalizedText;
  localLife: LocalizedText;
  visitingInfo: {
    bestSeason: LocalizedText;
    access: LocalizedText;
    highlight: LocalizedText;
  };
}

export interface CulturalDimension {
  key: Exclude<DimensionKey, 'all'>;
  label: LocalizedText;
  description: LocalizedText;
  accentHex: string;
}


export interface AdminProfile {
  id: string;
  email: string;
  displayName: string;
}

