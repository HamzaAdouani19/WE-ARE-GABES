# WE ARE GABÈS — Every place has a story

Plateforme géographique et culturelle interactive pour le **gouvernorat de Gabès (Tunisie)**.
Live : https://we-are-gabes-lime.vercel.app

## Expérience
1. **Globe** — globe satellite MapLibre GL avec voyage au scroll (`Monde → Afrique du Nord → Tunisie → Gabès`).
2. **Carte** — carte interactive (OpenFreeMap + imagerie Esri + relief 3D incliné).
3. **Lieux** — délégations de Gabès, filtrables selon 7 dimensions culturelles (Géographie, Nature, Culture, Patrimoine, Expériences, Vie locale, Histoires).
4. **Histoires** — lecteur éditorial synchronisé avec la carte, en **English**, **العربية** (RTL) et **Français**.

## Stack
React 19 · Vite 8 · TypeScript · Tailwind CSS 4 · MapLibre GL · Motion · lucide-react

## Développement
```bash
cd we
npm install
npm run dev      # http://localhost:3000
npm run check    # typecheck + build
```
Le projet vit dans le dossier `we/` (sur Vercel : *Root Directory = `we`*).

## Structure
- `src/data/gabesData.ts` — contenu trilingue (délégations, lieux, histoires, textes d'interface)
- `src/components/` — `GlobeJourney`, `GabesMapExplorer`, `AboutModal`, `ErrorBoundary`
- `public/images/` — photos en WebP (`*.webp` + miniatures `*-thumb.webp`)
- `scripts/build-tunisia.mjs` — génération de `src/data/tunisia.geo.json`

## Crédits
Cartes © Esri, Maxar, Earthstar Geographics · © OpenStreetMap contributors / OpenFreeMap · Terrain © Mapzen / AWS Open Data.
Les photographies du site doivent être créditées dans `AboutModal` avec leur auteur et leur licence.

© Hamza Adouani — tous droits réservés.
