import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { GlobeJourney } from "./components/GlobeJourney";
import { AboutModal } from "./components/AboutModal";
import Footer from "./components/Footer";
import { UI_COPY } from "./data/gabesData";
import type { AppView, DimensionKey, Language } from "./types/gabes";

const AdminApp = lazy(() => import("./admin/AdminApp"));

const GabesMapExplorer = lazy(() =>
  import("./components/GabesMapExplorer").then((m) => ({
    default: m.GabesMapExplorer,
  })),
);

const LANG_OPTIONS: Array<{ code: Language; label: string }> = [
  { code: "en", label: "EN" },
  { code: "ar", label: "العربية" },
  { code: "fr", label: "FR" },
];

export default function App() {
  // Keep the private CMS isolated from the existing public experience.
  if (window.location.pathname.replace(/\/+$/, "") === "/admin") {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen grid place-items-center bg-[#f5f6f8] text-sm text-slate-500">
            Loading CMS…
          </div>
        }
      >
        <AdminApp />
      </Suspense>
    );
  }

  return <PublicApp />;
}

function PublicApp() {
  const [lang, setLang] = useState<Language>("en");
  const [hash, setHash] = useState(() => window.location.hash);
  const [initialDimension, setInitialDimension] = useState<DimensionKey>("all");
  const [modalMode, setModalMode] = useState<"about" | "dimensions" | null>(
    null,
  );

  const copy = UI_COPY[lang];
  const view: AppView =
    hash.startsWith("#/map") || hash.startsWith("#/place/") ? "map" : "globe";

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const setView = useCallback((next: AppView) => {
    const nextHash = next === "map" ? "#/map" : "";
    if (window.location.hash !== nextHash) window.location.hash = nextHash;
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    const titles: Record<Language, string> = {
      en: "WE ARE GABÈS — Discover Gabès",
      ar: "نحن قابس — اكتشف ولاية قابس",
      fr: "WE ARE GABÈS — Découvrez Gabès",
    };
    const descriptions: Record<Language, string> = {
      en: "Explore Gabès through places, delegations, cultural stories and interactive maps.",
      ar: "اكتشف ولاية قابس من خلال الأماكن والمعتمديات والقصص الثقافية والخرائط التفاعلية.",
      fr: "Explorez Gabès à travers ses lieux, délégations, histoires culturelles et cartes interactives.",
    };

    document.title = titles[lang];
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", descriptions[lang]);
  }, [lang]);

  const handleOpenDimension = (dim: DimensionKey) => {
    setInitialDimension(dim);
    setView("map");
  };

  return (
    <div className="flex h-dvh w-screen flex-col overflow-hidden bg-[#060b14]">
      <header className="public-header flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-[#060b14] px-3 py-2 text-stone-100 sm:gap-8 sm:px-6">
        <button
          type="button"
          onClick={() => setView("globe")}
          aria-label={copy.brand}
          className="shrink-0 cursor-pointer transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-[#5eead4]"
        >
          <img
            src="/logo.blanc.svg"
            alt={copy.brand}
            className="h-9 w-auto sm:h-11"
          />
        </button>
        <nav className="flex items-center gap-3 overflow-x-auto text-xs font-medium sm:gap-6 sm:text-sm">
          <button
            type="button"
            onClick={() => setView("globe")}
            className={`shrink-0 whitespace-nowrap underline-offset-4 transition-colors hover:underline ${view === "globe" ? "text-[#5eead4]" : "text-stone-300 hover:text-white"}`}
          >
            {copy.navGlobe}
          </button>
          <button
            type="button"
            onClick={() => {
              setInitialDimension("all");
              setView("map");
            }}
            className={`shrink-0 whitespace-nowrap underline-offset-4 transition-colors hover:underline ${view === "map" ? "text-[#5eead4]" : "text-stone-300 hover:text-white"}`}
          >
            {copy.navMap}
          </button>
          <button
            type="button"
            onClick={() => setModalMode("dimensions")}
            className="hidden shrink-0 whitespace-nowrap text-stone-300 underline-offset-4 transition-colors hover:text-white hover:underline sm:inline-block"
          >
            {copy.navDimensions}
          </button>
          <button
            type="button"
            onClick={() => setModalMode("about")}
            className="shrink-0 whitespace-nowrap text-stone-300 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            {copy.navAbout}
          </button>
        </nav>
        <div
          role="group"
          aria-label="Language"
          className="flex shrink-0 items-center rounded-lg border border-white/15 bg-[#0d172a] p-0.5 text-[11px] font-semibold"
        >
          {LANG_OPTIONS.map((opt) => {
            const active = lang === opt.code;
            return (
              <button
                key={opt.code}
                type="button"
                aria-pressed={active}
                onClick={() => setLang(opt.code)}
                className={`cursor-pointer rounded-md px-2 py-1 whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-[#5eead4] ${active ? "bg-[#1f7d72] text-white" : "text-stone-300 hover:text-white"}`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </header>
      <main className="relative min-h-0 flex-1">
        {view === "globe" ? (
          <GlobeJourney
            lang={lang}
            onEnterGabes={() => {
              setInitialDimension("all");
              setView("map");
            }}
          />
        ) : (
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center bg-[#060b14] text-xs font-medium tracking-wider text-stone-300">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#5eead4]" />
                  <span>{copy.navMap}…</span>
                </span>
              </div>
            }
          >
            <GabesMapExplorer
              lang={lang}
              initialDimension={initialDimension}
              onBackToGlobe={() => setView("globe")}
            />
          </Suspense>
        )}
      </main>
      <AboutModal
        open={modalMode !== null}
        mode={modalMode ?? "about"}
        lang={lang}
        onClose={() => setModalMode(null)}
        onSelectDimension={handleOpenDimension}
      />
      <Footer />
    </div>
  );
}
