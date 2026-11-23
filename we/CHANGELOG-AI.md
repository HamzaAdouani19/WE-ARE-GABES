# AI Change Log

## Phase 1: Quick bug fixes

### Done
- Fixed the favicon URL and social preview image URLs in `index.html`; removed the placeholder portfolio URL from JSON-LD.
- Added `scripts/generate-og.mjs` and generated `public/og.jpg` (1200×630) from the existing Chenini oasis photo.
- Added browser-language detection for English, Arabic, and French; the selected language is persisted when browser storage is available, and `<html lang>`/`dir` follow the active language.
- Removed the unused `autoprefixer` and `tsx` direct dependencies. The other requested packages and `GEMINI_API_KEY`/`APP_URL` were already absent from app source/manifests and `.env.example`.
- Removed the two patch files, ignored `*.patch`, and corrected the `clean` script so it only removes `dist`.

### Skipped
- No Supabase project or production data was accessed; no SQL was run or changed.
- No environment-example keys needed removal because neither key was present.

### Manual steps
- After deployment, verify the favicon and social preview at the public site URL.

## Phase 2: Security

### Done
- Added route-wide Vercel security headers and documented the CSP sources in `docs/CSP.md`.
- Added repeatable storage and coordinate/slug constraint migrations; no migration was applied.
- Enforced an image MIME allowlist and 5 MB maximum in admin uploads, with sanitized random filenames and EN/AR/FR validation errors.
- Added Dependabot for npm and GitHub Actions and documented manual Supabase security steps.

### Skipped
- Supabase dashboard settings and repository secret-history checks were not changed or run because they require owner review.
- No migration was applied and no production data was accessed.

### Manual steps
- Complete the Supabase Auth and `.env.local` history checks in `docs/SECURITY-MANUAL-STEPS.md`.
- Review and manually apply the two Phase 2 migrations through the chosen Supabase migration workflow.

## Phase 3: Database and backend

### Done
- Added repeatable `updated_at` triggers, an admin-readable audit log with trigger-only writes, and simple-config full-text search for place translations.
- Added an idempotent sample seed with one delegation, one dimension, one draft place, and EN/AR/FR translations, plus Supabase setup and first-admin instructions.
- Added comment headers to the Phase 2 migrations so all migrations have a header.

### Admin profile decision
- Kept `admin_profiles` out of audit enrichment. Authorization uses JWT `app_metadata.role`, display names come from the authenticated user's `user_metadata`, and the audit log records `auth.uid()` as the stable actor identifier. The table remains referenced by the Settings connection check; no profile synchronization or name join is needed.

### Skipped
- No migration or seed was applied, and no Supabase project or production data was accessed.

### Manual steps
- Follow `supabase/README.md` to initialize the local Supabase CLI config, run migrations/seed locally, and create the first admin.

## Phase 4: Tooling, tests, and CI

### Done
- Enabled TypeScript strict mode and added ESLint with `typescript-eslint` and React Hooks rules; retained `npm run lint` as the TypeScript check.
- Added Vitest/Testing Library coverage for public-content mapping, language detection and persistence, coordinate/slug validation, and the localized ErrorBoundary.
- Added a Playwright smoke test for the home page, Arabic RTL switching, and rejected admin login. All Supabase requests use a dummy host and are intercepted.
- Added CI for type-checking, ESLint, unit and browser tests, production build, and the high-severity npm audit.
- Added localized public/admin error boundaries with a reload action.
- Moved the compiler from TypeScript 7.0.2 to 6.0.3 because `typescript-eslint` currently rejects TypeScript 7.

### Skipped
- No Supabase project or production data was accessed. The recording helper could not safely establish a Supabase mock for a separate admin recording; the repository Playwright smoke test covers that flow with explicit network mocks.

### Manual steps
- Run `npx playwright install chromium` once before the local browser test if Playwright's browser is not already installed. CI installs Chromium automatically.
