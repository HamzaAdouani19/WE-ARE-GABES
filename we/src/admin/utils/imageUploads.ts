import type { Language } from "../../types/gabes";

const LANGUAGE_STORAGE_KEY = "we-are-gabes-language";
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
] as const;
type AllowedImageType = (typeof ALLOWED_IMAGE_TYPES)[number];

const ALLOWED_IMAGE_TYPE_SET = new Set<string>(ALLOWED_IMAGE_TYPES);
const IMAGE_EXTENSIONS: Record<AllowedImageType, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

export const MAX_IMAGE_UPLOAD_BYTES = 5 * 1024 * 1024;
export const IMAGE_UPLOAD_ACCEPT = ALLOWED_IMAGE_TYPES.join(",");

export type ImageUploadValidationError = "unsupportedType" | "tooLarge";

const UPLOAD_ERROR_MESSAGES: Record<
  Language,
  Record<ImageUploadValidationError, string>
> = {
  en: {
    unsupportedType:
      "Unsupported image type. Choose a JPEG, PNG, WebP, or AVIF image.",
    tooLarge: "Image is too large. Maximum size is 5 MB.",
  },
  ar: {
    unsupportedType:
      "نوع الصورة غير مدعوم. اختر صورة بصيغة JPEG أو PNG أو WebP أو AVIF.",
    tooLarge: "حجم الصورة كبير جدًا. الحد الأقصى هو 5 ميغابايت.",
  },
  fr: {
    unsupportedType:
      "Type d’image non pris en charge. Choisissez une image JPEG, PNG, WebP ou AVIF.",
    tooLarge: "L’image est trop volumineuse. La taille maximale est de 5 Mo.",
  },
};

function isLanguage(value: string | null): value is Language {
  return value === "en" || value === "ar" || value === "fr";
}

function isAllowedImageType(type: string): type is AllowedImageType {
  return ALLOWED_IMAGE_TYPE_SET.has(type);
}

function getErrorLanguage(): Language {
  try {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isLanguage(savedLanguage)) return savedLanguage;
  } catch {
    // Storage may be disabled by the browser.
  }

  const browserLanguages =
    typeof navigator === "undefined"
      ? []
      : navigator.languages.length > 0
        ? navigator.languages
        : [navigator.language];

  for (const browserLanguage of browserLanguages) {
    const language = browserLanguage.toLowerCase().split(/[-_]/, 1)[0];
    if (isLanguage(language)) return language;
  }

  return "en";
}

export function validateImageUpload(
  file: File,
): ImageUploadValidationError | null {
  if (!isAllowedImageType(file.type)) return "unsupportedType";
  if (file.size > MAX_IMAGE_UPLOAD_BYTES) return "tooLarge";
  return null;
}

export function getImageUploadErrorMessage(
  error: ImageUploadValidationError,
): string {
  return UPLOAD_ERROR_MESSAGES[getErrorLanguage()][error];
}

export function createImageStorageName(file: File): string {
  const type = file.type;
  if (!isAllowedImageType(type)) {
    throw new TypeError("Cannot create a storage name for an unsupported image.");
  }

  const extension = IMAGE_EXTENSIONS[type];
  const baseName =
    file.name
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\.[^.]*$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80)
      .replace(/-+$/g, "") || "image";
  const randomSuffix = crypto.randomUUID().replace(/-/g, "");

  return `${baseName}-${randomSuffix}.${extension}`;
}
