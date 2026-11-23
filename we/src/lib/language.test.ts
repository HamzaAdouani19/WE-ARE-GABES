import { describe, expect, it, vi } from "vitest";

import {
  getInitialLanguage,
  LANGUAGE_STORAGE_KEY,
  persistLanguage,
} from "./language";

describe("language preference", () => {
  it("uses a saved language before browser preferences", () => {
    const storage: Pick<Storage, "getItem"> = {
      getItem: () => "ar",
    };

    expect(getInitialLanguage(storage, ["fr-CA"])).toBe("ar");
  });

  it("matches regional browser languages and defaults to English", () => {
    expect(getInitialLanguage(null, ["fr-CA", "ar-TN"])).toBe("fr");
    expect(getInitialLanguage(null, ["de-DE"])).toBe("en");
  });

  it("continues when storage access fails and persists selections safely", () => {
    const unreadableStorage: Pick<Storage, "getItem"> = {
      getItem: () => {
        throw new Error("Storage is disabled.");
      },
    };
    const setItem = vi.fn();

    expect(getInitialLanguage(unreadableStorage, ["ar-TN"])).toBe("ar");
    persistLanguage("fr", { setItem });
    expect(setItem).toHaveBeenCalledWith(LANGUAGE_STORAGE_KEY, "fr");

    expect(() =>
      persistLanguage("ar", {
        setItem: () => {
          throw new Error("Storage is disabled.");
        },
      }),
    ).not.toThrow();
  });
});
