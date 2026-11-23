import { expect, test } from "@playwright/test";

test("home language and admin login smoke flow", async ({ page }) => {
  await page.route(
    "https://phase4-test.supabase.co/**",
    async (route) => {
      const request = route.request();
      const corsHeaders = {
        "access-control-allow-origin":
          request.headers().origin ?? "*",
        "access-control-allow-headers":
          "apikey, authorization, content-type, x-client-info",
        "access-control-allow-methods": "GET, POST, OPTIONS",
      };

      if (request.method() === "OPTIONS") {
        await route.fulfill({
          status: 204,
          headers: corsHeaders,
          body: "",
        });
        return;
      }

      if (
        request.method() === "POST" &&
        new URL(request.url()).pathname === "/auth/v1/token"
      ) {
        await route.fulfill({
          status: 400,
          contentType: "application/json",
          headers: corsHeaders,
          body: JSON.stringify({
            code: "invalid_credentials",
            msg: "Invalid login credentials",
          }),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        headers: corsHeaders,
        body: JSON.stringify({}),
      });
    },
  );

  await page.goto("/");
  await expect(page.getByRole("group", { name: "Language" })).toBeVisible();
  await page.getByRole("button", { name: "العربية" }).click();
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

  await page.goto("/admin");
  await expect(page.getByLabel("Email address")).toBeVisible();
  await page.getByLabel("Email address").fill("admin@example.test");
  await page.getByRole("textbox", { name: "Password" }).fill(
    "incorrect-password",
  );
  await page.getByRole("button", { name: "Sign in to dashboard" }).click();
  await expect(page.getByRole("alert")).toContainText(
    "Invalid login credentials",
  );
});
