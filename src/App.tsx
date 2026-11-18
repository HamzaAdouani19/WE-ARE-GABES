import { useEffect, useState } from 'react';
import { GlobeJourney } from './components/GlobeJourney';
import { GabesMapExplorer } from './components/GabesMapExplorer';
import { AboutModal } from './components/AboutModal';
import { UI_COPY } from './data/gabesData';
import type { AppView, DimensionKey, Language } from './types/gabes';

const LANG_OPTIONS: Array<{ code: Language; label: string }> = [
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'العربية' },
  { code: 'fr', label: 'FR' },
];

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [view, setView] = useState<AppView>('globe');
  const [initialDimension, setInitialDimension] = useState<DimensionKey>('all');
  const [modalMode, setModalMode] = useState<'about' | 'dimensions' | null>(null);

  const copy = UI_COPY[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const handleOpenDimension = (dim: DimensionKey) => {
    setInitialDimension(dim);
    setView('map');
  };

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      {/* Top Bar Contract: Zone 1 (Brand) — Zone 2 (4 concise nav links) — Zone 3 (1 action) */}
      <header className="flex shrink-0 items-center justify-between gap-8 border-b border-white/10 bg-[#060b14] px-6 py-2.5 text-stone-100">
        {/* Zone 1: Brand SVG Logo */}
        <button
          type="button"
          onClick={() => setView('globe')}
          aria-label={copy.brand}
          className="shrink-0 cursor-pointer transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-[#5eead4]"
        >
          <img
            src="/public/logo.blanc.svg.svg"
            alt={copy.brand}
            className="h-15 w-auto sm:h-15"
          />
        </button>

        {/* Zone 2: 4 single-line navigation links */}
        <nav className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium overflow-x-auto">
          <button
            type="button"
            onClick={() => setView('globe')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:underline underline-offset-4 ${
              view === 'globe' ? 'text-[#5eead4]' : 'text-stone-300 hover:text-white'
            }`}
          >
            {copy.navGlobe}
          </button>
          <button
            type="button"
            onClick={() => {
              setInitialDimension('all');
              setView('map');
            }}
            className={`whitespace-nowrap shrink-0 transition-colors hover:underline underline-offset-4 ${
              view === 'map' ? 'text-[#5eead4]' : 'text-stone-300 hover:text-white'
            }`}
          >
            {copy.navMap}
          </button>
          <button
            type="button"
            onClick={() => setModalMode('dimensions')}
            className="hidden sm:inline-block whitespace-nowrap shrink-0 text-stone-300 transition-colors hover:text-white hover:underline underline-offset-4"
          >
            {copy.navDimensions}
          </button>
          <button
            type="button"
            onClick={() => setModalMode('about')}
            className="whitespace-nowrap shrink-0 text-stone-300 transition-colors hover:text-white hover:underline underline-offset-4"
          >
            {copy.navAbout}
          </button>
        </nav>

        {/* Zone 3: Single primary selector control */}
        <div className="shrink-0">
          <label htmlFor="lang-switcher" className="sr-only">
            Language
          </label>
          <select
            id="lang-switcher"
            value={lang}
            onChange={(e) => setLang(e.target.value as Language)}
            className="cursor-pointer rounded-lg border border-white/20 bg-[#0d172a] px-3 py-1.5 text-xs font-semibold text-stone-100 transition-colors hover:border-white/40 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#5eead4]"
          >
            {LANG_OPTIONS.map((opt) => (
              <option key={opt.code} value={opt.code}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Main Spatial Viewport */}
      <main className="relative min-h-0 flex-1">
        {view === 'globe' ? (
          <GlobeJourney
            lang={lang}
            onEnterGabes={() => {
              setInitialDimension('all');
              setView('map');
            }}
          />
        ) : (
          <GabesMapExplorer
            lang={lang}
            initialDimension={initialDimension}
            onBackToGlobe={() => setView('globe')}
          />
        )}
      </main>

      <AboutModal
        open={modalMode !== null}
        mode={modalMode ?? 'about'}
        lang={lang}
        onClose={() => setModalMode(null)}
        onSelectDimension={handleOpenDimension}
      />
    </div>
  );
}