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
