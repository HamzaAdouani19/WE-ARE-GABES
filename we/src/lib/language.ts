import type { Language } from "../types/gabes";

export const LANGUAGE_STORAGE_KEY = "we-are-gabes-language";

export function isLanguage(value: string | null): value is Language {
  return value === "en" || value === "ar" || value === "fr";
}

function getSafeStorage(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

function getBrowserLanguages(): readonly string[] {
  if (typeof navigator === "undefined") return [];
  return navigator.languages.length > 0
    ? navigator.languages
    : [navigator.language];
}

export function getInitialLanguage(
  storage: Pick<Storage, "getItem"> | null = getSafeStorage(),
  browserLanguages: readonly string[] = getBrowserLanguages(),
): Language {
  try {
    const savedLanguage = storage?.getItem(LANGUAGE_STORAGE_KEY) ?? null;
    if (isLanguage(savedLanguage)) return savedLanguage;
  } catch {
    // Storage may be disabled by the browser.
  }

  for (const browserLanguage of browserLanguages) {
    const language = browserLanguage.toLowerCase().split(/[-_]/, 1)[0];
    if (isLanguage(language)) return language;
  }

  return "en";
}

export function persistLanguage(
  language: Language,
  storage: Pick<Storage, "setItem"> | null = getSafeStorage(),
): void {
  try {
    storage?.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Storage may be disabled by the browser.
  }
}
