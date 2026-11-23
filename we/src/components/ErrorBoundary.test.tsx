import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";

import { ErrorBoundary } from "./ErrorBoundary";

function CrashingChild(): ReactElement {
  throw new Error("Component failed.");
}

describe("ErrorBoundary", () => {
  beforeEach(() => {
    document.documentElement.lang = "ar";
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("shows a localized recovery message and reload action", () => {
    render(
      <ErrorBoundary app="public">
        <CrashingChild />
      </ErrorBoundary>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("حدث خطأ ما");
    expect(screen.getByRole("button", { name: "إعادة تحميل الصفحة" }))
      .toBeVisible();
  });
});
