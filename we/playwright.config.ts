import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4179",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 4179 --strictPort",
    url: "http://127.0.0.1:4179",
    reuseExistingServer: false,
    timeout: 30_000,
    env: {
      DISABLE_HMR: "true",
      VITE_SUPABASE_URL: "https://phase4-test.supabase.co",
      VITE_SUPABASE_ANON_KEY: "phase4-test-anon-key",
    },
  },
});
