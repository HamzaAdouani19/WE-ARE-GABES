import { describe, expect, it } from "vitest";

import { areValidCoordinates, isValidSlug } from "./validation";

describe("slug validation", () => {
  it("accepts lowercase words separated by single hyphens", () => {
    expect(isValidSlug("gabes-oasis-2")).toBe(true);
  });

  it.each(["", "-gabes", "gabes-", "gabes--oasis", "Gabes", "gabes_oasis"])(
    "rejects invalid slug %j",
    (slug) => {
      expect(isValidSlug(slug)).toBe(false);
    },
  );
});

describe("coordinate validation", () => {
  it("accepts the inclusive latitude and longitude boundaries", () => {
    expect(areValidCoordinates("-90", "-180")).toBe(true);
    expect(areValidCoordinates("90", "180")).toBe(true);
  });

  it.each([
    ["", "0"],
    ["91", "0"],
    ["-91", "0"],
    ["0", "181"],
    ["0", "-181"],
    ["Infinity", "0"],
  ])("rejects invalid coordinates %j, %j", (latitude, longitude) => {
    expect(areValidCoordinates(latitude, longitude)).toBe(false);
  });
});
