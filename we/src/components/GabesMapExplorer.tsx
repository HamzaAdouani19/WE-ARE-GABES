import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Compass,
  Globe2,
  Layers,
  MapPin,
  Mountain,
  Pause,
  Play,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import {
  CULTURAL_DIMENSIONS,
  DELEGATIONS,
  GABES_CENTER,
  PLACES,
  UI_COPY,
  normalizeSearch,
} from "../data/gabesData";
import { GABES_CULTURAL_ROUTE } from "../data/worldGeo";
import type {
  DimensionKey,
  GalleryPhoto,
  Language,
  PlaceStory,
} from "../types/gabes";
import tunisia from "../data/tunisia.geo.json";

interface GabesMapExplorerProps {
  lang: Language;
  initialDimension?: DimensionKey;
  onBackToGlobe: () => void;
}

type MapStyleMode = "hybrid" | "map" | "satellite";

function readPlaceSlug(): string | null {
  const match = window.location.hash.match(/^#\/place\/(.+)$/);
  return match?.[1] ?? null;
}

function goToPlace(slug: string | null) {
  const nextHash = slug ? `#/place/${encodeURIComponent(slug)}` : "#/map";
  if (window.location.hash !== nextHash) window.location.hash = nextHash;
}

function getMapStyle(
  mode: MapStyleMode,
): string | maplibregl.StyleSpecification {
  if (mode === "map") {
    return "https://tiles.openfreemap.org/styles/liberty";
  }

  const layers: maplibregl.LayerSpecification[] = [
    {
      id: "bg",
      type: "background",
      paint: { "background-color": "#09111d" },
    },
    {
      id: "satellite",
      type: "raster",
      source: "satellite",
      paint: {
        "raster-contrast": 0.06,
        "raster-saturation": 0.08,
      },
    },
  ];

  const sources: Record<string, maplibregl.SourceSpecification> = {
    satellite: {
      type: "raster",
      tiles: [
        "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      maxzoom: 19,
      attribution: "Imagery © Esri, Maxar, Earthstar Geographics",
    },
  };

  if (mode === "hybrid") {
    sources["hybrid-labels"] = {
      type: "raster",
      tiles: [
        "https://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      maxzoom: 16,
    };
    layers.push({
      id: "hybrid-labels",
      type: "raster",
      source: "hybrid-labels",
      paint: {
        "raster-opacity": 0.92,
      },
    });
  }

  return {
    version: 8,
    sky: {
      "sky-color": "#88b4e3",
      "horizon-color": "#e8dfd1",
      "fog-color": "#d8d2c7",
      "sky-horizon-blend": 0.65,
      "horizon-fog-blend": 0.75,
      "fog-ground-blend": 0.3,
    },
    sources,
    layers,
  };
}

function getDimensionAccent(dim: PlaceStory["dimension"]): string {
  return CULTURAL_DIMENSIONS.find((d) => d.key === dim)?.accentHex ?? "#1f7d72";
}

function getDimensionLabel(
  dim: PlaceStory["dimension"],
  lang: Language,
): string {
  return CULTURAL_DIMENSIONS.find((d) => d.key === dim)?.label[lang] ?? dim;
}

function applyTerrainAndRouteOverlay(
  map: maplibregl.Map,
  enableTerrain: boolean,
) {
  // 1. Add real 3D elevation DEM source (Terrarium)
  if (!map.getSource("terrain-dem")) {
    map.addSource("terrain-dem", {
      type: "raster-dem",
      tiles: [
        "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
      ],
      encoding: "terrarium",
      tileSize: 256,
      maxzoom: 14,
      attribution: "Terrain © Mapzen / AWS Open Data",
    });
  }

  if (enableTerrain) {
    map.setTerrain({ source: "terrain-dem", exaggeration: 1.55 });
  } else {
    map.setTerrain(null);
  }

  map.addSource("tunisia", {
    type: "geojson",
    data: tunisia as unknown as maplibregl.GeoJSONSourceSpecification["data"],
  });

  if (!map.getLayer("tunisia-outline")) {
    map.addLayer({
      id: "tunisia-outline",
      type: "line",
      source: "tunisia",
      paint: {
        "line-color": "#5eead4",
        "line-width": 1.5,
        "line-opacity": 0.9,
      },
      layout: { "line-join": "round", "line-cap": "round" },
    });
  }

  // 2. Add Cultural Corridor Route Line
  const sourceId = "gabes-cultural-route";
  if (!map.getSource(sourceId)) {
    map.addSource(sourceId, {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: GABES_CULTURAL_ROUTE,
        },
      },
    });

    map.addLayer({
      id: "gabes-route-glow",
      type: "line",
      source: sourceId,
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#5eead4",
        "line-width": 6,
        "line-opacity": 0.22,
      },
    });

    map.addLayer({
      id: "gabes-route-line",
      type: "line",
      source: sourceId,
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#5eead4",
        "line-width": 2.2,
        "line-dasharray": [2.5, 2],
        "line-opacity": 0.9,
      },
    });
  }
}

const gallerySlideVariants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? 44 : -44,
    opacity: 0,
    scale: 1.03,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? -44 : 44,
    opacity: 0,
    scale: 0.98,
  }),
};

function StoryGallery({
  photos,
  title,
  lang,
  placeId,
}: {
  photos: GalleryPhoto[];
  title: string;
  lang: Language;
  placeId: string;
}) {
  const safePhotos = photos.length > 0 ? photos : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isHovered, setIsHovered] = useState(false);
  const [failedSrcs, setFailedSrcs] = useState<Record<string, boolean>>({});
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(() => {
    if (typeof window === "undefined") return true;
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) setIsAutoPlaying(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    setActiveIndex(0);
    setDirection(1);
    setFailedSrcs({});
  }, [placeId]);

  const total = safePhotos.length;

  const goTo = useCallback(
    (nextIndex: number, dir?: 1 | -1) => {
      if (total <= 1) return;
      const wrapped = ((nextIndex % total) + total) % total;
      if (wrapped === activeIndex) return;
      const computedDir: 1 | -1 = dir ?? (wrapped > activeIndex ? 1 : -1);
      setDirection(computedDir);
      setActiveIndex(wrapped);
    },
    [activeIndex, total],
  );

  const handleNext = useCallback(() => {
    goTo(activeIndex + 1, 1);
  }, [activeIndex, goTo]);

  const handlePrev = useCallback(() => {
    goTo(activeIndex - 1, -1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (!isAutoPlaying || isHovered || total <= 1) return;
    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [isAutoPlaying, isHovered, total]);

  if (total === 0) return null;

  const currentPhoto = safePhotos[activeIndex] ?? safePhotos[0];
  const currentFailed = Boolean(failedSrcs[currentPhoto.src]);
  const prevLabel =
    lang === "ar"
      ? "الصورة السابقة"
      : lang === "fr"
        ? "Photo précédente"
        : "Previous photo";
  const nextLabel =
    lang === "ar"
      ? "الصورة التالية"
      : lang === "fr"
        ? "Photo suivante"
        : "Next photo";
  const toggleLabel = isAutoPlaying
    ? lang === "ar"
      ? "إيقاف العرض التلقائي"
      : lang === "fr"
        ? "Mettre en pause"
        : "Pause slideshow"
    : lang === "ar"
      ? "تشغيل العرض التلقائي"
      : lang === "fr"
        ? "Lecture automatique"
        : "Play slideshow";

  return (
    <div
      className="select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          handleNext();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          handlePrev();
        }
      }}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label={title}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-stone-900 shadow-sm">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          {currentFailed ? (
            <motion.div
              key={`fallback-${activeIndex}`}
              custom={direction}
              variants={gallerySlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.35 }}
              className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-stone-200 via-stone-100 to-amber-50 p-6 text-center"
            >
              <Compass className="mb-2 h-7 w-7 text-[#1f7d72]" />
              <p className="font-display text-lg font-semibold text-stone-800">
                {title}
              </p>
            </motion.div>
          ) : (
            <motion.img
              key={`${placeId}-${activeIndex}-${currentPhoto.src}`}
              src={currentPhoto.src}
              alt={`${title} — ${currentPhoto.caption[lang]}`}
              referrerPolicy="no-referrer"
              custom={direction}
              variants={gallerySlideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              onError={() =>
                setFailedSrcs((prev) => ({ ...prev, [currentPhoto.src]: true }))
              }
              className="h-full w-full object-cover"
            />
          )}
        </AnimatePresence>

        {/* Subtle Top & Bottom Scrim for WCAG AA Overlay Controls */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/55" />

        {/* Top Bar: Counter & Auto-Play Toggle */}
        {total > 1 && (
          <div className="absolute inset-x-3 top-3 z-10 flex items-center justify-between gap-2">
            <span className="font-mono-tabular rounded-md border border-white/20 bg-black/55 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
              {activeIndex + 1} / {total}
            </span>
            <button
              type="button"
              onClick={() => setIsAutoPlaying((prev) => !prev)}
              aria-label={toggleLabel}
              title={toggleLabel}
              className="inline-flex items-center gap-1 rounded-md border border-white/20 bg-black/55 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/80 whitespace-nowrap"
            >
              {isAutoPlaying ? (
                <Pause className="h-3 w-3" />
              ) : (
                <Play className="h-3 w-3" />
              )}
              <span>
                {isAutoPlaying
                  ? lang === "ar"
                    ? "إيقاف"
                    : lang === "fr"
                      ? "Pause"
                      : "Pause"
                  : lang === "ar"
                    ? "تلقائي"
                    : lang === "fr"
                      ? "Auto"
                      : "Auto"}
              </span>
            </button>
          </div>
        )}

        {/* Prev / Next Navigation Buttons */}
        {total > 1 && (
          <div
            dir="ltr"
            className="pointer-events-none absolute inset-x-2.5 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between"
          >
            <button
              type="button"
              onClick={handlePrev}
              aria-label={prevLabel}
              className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-black/55 text-white backdrop-blur-sm transition-transform duration-150 hover:scale-105 hover:bg-black/80"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label={nextLabel}
              className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-black/55 text-white backdrop-blur-sm transition-transform duration-150 hover:scale-105 hover:bg-black/80"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Bottom Progress Segment Indicators */}
        {total > 1 && (
          <div className="absolute inset-x-3 bottom-3 z-10 flex items-center gap-1.5">
            {safePhotos.map((photo, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={`${photo.src}-${idx}`}
                  type="button"
                  onClick={() => goTo(idx)}
                  aria-label={`${title} ${idx + 1}`}
                  className="group relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/35 transition-colors hover:bg-white/60"
                >
                  {isActive && (
                    <motion.span
                      layoutId={`gallery-bar-${placeId}`}
                      transition={{
                        duration: prefersReducedMotion ? 0.01 : 0.25,
                      }}
                      className="absolute inset-0 rounded-full bg-white"
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Animated Caption */}
      <div className="mt-2.5 min-h-[2.25rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={`${placeId}-caption-${activeIndex}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.22 }}
            className="font-serif text-xs italic leading-relaxed text-stone-600"
          >
            {currentPhoto.caption[lang]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Interactive Thumbnail Strip */}
      {total > 1 && (
        <div className="mt-2 grid grid-cols-3 gap-2">
          {safePhotos.map((photo, idx) => {
            const isActive = idx === activeIndex;
            const thumbFailed = Boolean(failedSrcs[photo.src]);
            return (
              <button
                key={`thumb-${photo.src}-${idx}`}
                type="button"
                onClick={() => goTo(idx)}
                className={`group relative aspect-[16/10] overflow-hidden rounded-lg border transition-all duration-200 ${
                  isActive
                    ? "border-[#1f7d72] ring-2 ring-[#1f7d72]/35"
                    : "border-stone-200 opacity-70 hover:opacity-100"
                }`}
              >
                {thumbFailed ? (
                  <div className="flex h-full w-full items-center justify-center bg-stone-200">
                    <Compass className="h-4 w-4 text-stone-500" />
                  </div>
                ) : (
                  <img
                    src={photo.src}
                    alt={photo.caption[lang]}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setFailedSrcs((prev) => ({ ...prev, [photo.src]: true }))
                    }
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function GabesMapExplorer({
  lang,
  initialDimension = "all",
  onBackToGlobe,
}: GabesMapExplorerProps) {
  const copy = UI_COPY[lang];
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const delegationMarkersRef = useRef<maplibregl.Marker[]>([]);
  const is3DRef = useRef(true);
  const delegationHandlerRef = useRef<(id: string) => void>(() => {});

  const [selectedDimension, setSelectedDimension] =
    useState<DimensionKey>(initialDimension);
  const [selectedDelegationId, setSelectedDelegationId] =
    useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [routeSlug, setRouteSlug] = useState(readPlaceSlug);
  const [mapMode, setMapMode] = useState<MapStyleMode>("hybrid");
  const [is3DTerrain, setIs3DTerrain] = useState(true);
  const [mapReady, setMapReady] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const placeCountByDelegation = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of PLACES) {
      counts[p.delegationId] = (counts[p.delegationId] ?? 0) + 1;
    }
    return counts;
  }, []);

  is3DRef.current = is3DTerrain;

  const selectedPlaceId = useMemo(
    () => PLACES.find((place) => place.slug === routeSlug)?.id ?? null,
    [routeSlug],
  );

  useEffect(() => {
    setSelectedDimension(initialDimension);
  }, [initialDimension]);

  useEffect(() => {
    const handleHashChange = () => setRouteSlug(readPlaceSlug());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (routeSlug && !selectedPlaceId) goToPlace(null);
  }, [routeSlug, selectedPlaceId]);

  const filteredPlaces = useMemo(() => {
    const q = normalizeSearch(searchQuery.trim());
    return PLACES.filter((place) => {
      const matchesDimension =
        selectedDimension === "all" ||
        place.dimension === selectedDimension ||
        place.secondaryDimensions.includes(selectedDimension);

      const matchesDelegation =
        selectedDelegationId === "all" ||
        place.delegationId === selectedDelegationId;

      if (!matchesDimension || !matchesDelegation) return false;
      if (!q) return true;

      const delegation = DELEGATIONS.find((d) => d.id === place.delegationId);
      const haystack = [
        place.title.en,
        place.title.ar,
        place.title.fr,
        place.subtitle.en,
        place.subtitle.ar,
        place.subtitle.fr,
        place.summary.en,
        place.summary.ar,
        place.summary.fr,
        delegation?.name.en ?? "",
        delegation?.name.ar ?? "",
        delegation?.name.fr ?? "",
      ].join(" ");

      return normalizeSearch(haystack).includes(q);
    });
  }, [selectedDimension, selectedDelegationId, searchQuery]);

  const activePlace = useMemo(
    () => PLACES.find((p) => p.id === selectedPlaceId) ?? null,
    [selectedPlaceId],
  );

  // Initialize MapLibre GL JS with Real Hybrid Satellite & 3D Terrain
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    const map = new maplibregl.Map({
      container,
      style: getMapStyle("hybrid"),
      center: [GABES_CENTER.lng, GABES_CENTER.lat - 0.1],
      zoom: 9.7,
      pitch: 38,
      bearing: -10,
      maxPitch: 70,
      attributionControl: false,
    });

    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-right",
    );
    map.addControl(
      new maplibregl.NavigationControl({ visualizePitch: true }),
      "bottom-right",
    );

    map.on("styleimagemissing", (e: { id: string }) => {
      if (!map.hasImage(e.id)) {
        map.addImage(e.id, { width: 1, height: 1, data: new Uint8Array(4) });
      }
    });

    map.on("style.load", () => {
      try {
        applyTerrainAndRouteOverlay(map, is3DRef.current);
      } catch {
        // ignore if style resets
      }
    });

    map.once("load", () => {
      map.resize();
      setMapReady(true);
    });

    const resizeObserver = new ResizeObserver(() => {
      map.resize();
    });
    resizeObserver.observe(container);

    mapRef.current = map;

    return () => {
      resizeObserver.disconnect();
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      delegationMarkersRef.current.forEach((m) => m.remove());
      delegationMarkersRef.current = [];
      map.remove();
      mapRef.current = null;
      setMapReady(false);
    };
  }, []);

  // Switch Map Style (Hybrid Satellite / Relief Map / Pure Satellite)
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;
    map.setStyle(getMapStyle(mapMode));
  }, [mapMode, mapReady]);

  // Toggle 3D Terrain Elevation & Pitch
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;
    try {
      if (map.getSource("terrain-dem")) {
        map.setTerrain(
          is3DTerrain ? { source: "terrain-dem", exaggeration: 1.55 } : null,
        );
      }
    } catch {
      // ignore if style transitioning
    }
    map.easeTo({
      pitch: is3DTerrain ? 44 : 0,
      bearing: is3DTerrain ? -10 : 0,
      duration: 650,
    });
  }, [is3DTerrain, mapReady]);

  // Subtle Geographic Delegation Labels on Map
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    delegationMarkersRef.current.forEach((m) => m.remove());
    delegationMarkersRef.current = [];

    // Show delegation anchors that are distinct from primary photo pins or highlight selected delegation
    const anchorDelegations = DELEGATIONS.filter((d) =>
      ["ghannouch", "el-metouia", "mareth", "gabes-ville"].includes(d.id),
    );

    anchorDelegations.forEach((del) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = del.name[lang];
      btn.className =
        "cursor-pointer rounded bg-[#0b1322]/75 px-2 py-0.5 text-[10px] font-medium tracking-wide text-stone-200 border border-white/20 shadow hover:bg-[#1f7d72] hover:text-white transition-colors";
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        delegationHandlerRef.current(del.id);
      });

      const marker = new maplibregl.Marker({ element: btn, anchor: "center" })
        .setLngLat([del.center.lng, del.center.lat])
        .addTo(map);
      delegationMarkersRef.current.push(marker);
    });
  }, [lang]);

  // Render Professional Photo-Card Map Pins
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    filteredPlaces.forEach((place) => {
      const isSelected = place.id === selectedPlaceId;
      const accent = getDimensionAccent(place.dimension);

      const wrapper = document.createElement("button");
      wrapper.type = "button";
      wrapper.setAttribute("aria-label", place.title[lang]);
      wrapper.className =
        "group relative flex flex-col items-center cursor-pointer focus:outline-none";
      wrapper.style.zIndex = isSelected ? "30" : "10";

      // Floating Title Badge (visible on hover or active)
      const badge = document.createElement("div");
      badge.className =
        "mb-1.5 flex items-center gap-1.5 rounded-md bg-[#111827]/95 px-2 py-1 text-[11px] font-semibold text-white shadow-lg border border-white/20 whitespace-nowrap transition-opacity duration-150 pointer-events-none";
      badge.style.opacity = isSelected ? "1" : "0";
      badge.innerHTML = `
        <span>${place.title[lang]}</span>
        <span class="font-mono text-[10px] text-[#5eead4]">${place.elevationMeters}m</span>
      `;

      // Framed Thumbnail Pin
      const frame = document.createElement("div");
      frame.style.cssText = `
        width: ${isSelected ? "48px" : "40px"};
        height: ${isSelected ? "48px" : "40px"};
        border-radius: 10px;
        overflow: hidden;
        border: 2.5px solid ${isSelected ? "#f59e0b" : "#ffffff"};
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
        background: #1c1917;
        transition: transform 150ms ease, border-color 150ms ease;
        transform: ${isSelected ? "scale(1.1)" : "scale(1)"};
      `;

      const img = document.createElement("img");
      img.src = place.image;
      img.alt = place.title[lang];
      img.referrerPolicy = "no-referrer";
      img.style.cssText =
        "width: 100%; height: 100%; object-fit: cover; display: block;";
      frame.appendChild(img);

      // Pin Stem + Anchor Dot
      const stem = document.createElement("div");
      stem.style.cssText = `
        width: 2px;
        height: 8px;
        background: ${isSelected ? "#f59e0b" : "#ffffff"};
        box-shadow: 0 2px 4px rgba(0,0,0,0.4);
      `;

      const anchorDot = document.createElement("div");
      anchorDot.style.cssText = `
        width: 8px;
        height: 8px;
        border-radius: 9999px;
        background: ${isSelected ? "#f59e0b" : accent};
        border: 1.5px solid #ffffff;
        box-shadow: 0 2px 6px rgba(0,0,0,0.45);
      `;

      wrapper.addEventListener("mouseenter", () => {
        badge.style.opacity = "1";
        frame.style.transform = "scale(1.12)";
        wrapper.style.zIndex = "40";
      });
      wrapper.addEventListener("mouseleave", () => {
        if (!isSelected) {
          badge.style.opacity = "0";
          frame.style.transform = "scale(1)";
          wrapper.style.zIndex = "10";
        }
      });
      wrapper.addEventListener("click", (e) => {
        e.stopPropagation();
        handleSelectPlace(place);
      });

      wrapper.appendChild(badge);
      wrapper.appendChild(frame);
      wrapper.appendChild(stem);
      wrapper.appendChild(anchorDot);

      const marker = new maplibregl.Marker({
        element: wrapper,
        anchor: "bottom",
      })
        .setLngLat([place.coordinates.lng, place.coordinates.lat])
        .addTo(map);

      markersRef.current.push(marker);
    });
  }, [filteredPlaces, selectedPlaceId, lang]);

  const handleSelectPlace = (place: PlaceStory) => {
    goToPlace(place.slug);
  };

  const handleDelegationChange = (delegationId: string) => {
    setSelectedDelegationId(delegationId);
    goToPlace(null);
    const map = mapRef.current;
    if (!map) return;

    if (delegationId === "all") {
      map.flyTo({
        center: [GABES_CENTER.lng, GABES_CENTER.lat - 0.1],
        zoom: 9.7,
        pitch: is3DTerrain ? 38 : 0,
        bearing: -10,
        duration: 850,
      });
      return;
    }

    const del = DELEGATIONS.find((d) => d.id === delegationId);
    if (del) {
      map.flyTo({
        center: [del.center.lng, del.center.lat],
        zoom: 12.6,
        pitch: is3DTerrain ? 46 : 18,
        duration: 900,
      });
    }
  };

  const handleResetView = () => {
    goToPlace(null);
    setSelectedDelegationId("all");
    setSelectedDimension("all");
    setSearchQuery("");
    mapRef.current?.flyTo({
      center: [GABES_CENTER.lng, GABES_CENTER.lat - 0.1],
      zoom: 9.7,
      pitch: is3DTerrain ? 38 : 0,
      bearing: -10,
      duration: 900,
    });
  };

  const activeIndex = activePlace
    ? filteredPlaces.findIndex((p) => p.id === activePlace.id)
    : -1;

  const handleStepStory = (direction: -1 | 1) => {
    if (filteredPlaces.length === 0) return;
    const baseIdx = activeIndex === -1 ? 0 : activeIndex;
    const nextIdx =
      (baseIdx + direction + filteredPlaces.length) % filteredPlaces.length;
    handleSelectPlace(filteredPlaces[nextIdx]);
  };

  const activeDelegation = activePlace
    ? DELEGATIONS.find((d) => d.id === activePlace.delegationId)
    : DELEGATIONS.find((d) => d.id === selectedDelegationId);

  delegationHandlerRef.current = handleDelegationChange;

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady || !activePlace) return;
    map.flyTo({
      center: [activePlace.coordinates.lng, activePlace.coordinates.lat],
      zoom: Math.max(map.getZoom(), 13.4),
      pitch: is3DRef.current ? 50 : 24,
      bearing: -12,
      duration: 1050,
      essential: true,
    });
  }, [activePlace?.id, mapReady]);

  useEffect(() => {
    document.title = activePlace
      ? `${activePlace.title[lang]} — ${copy.brand}`
      : copy.brand;
    return () => {
      document.title = copy.brand;
    };
  }, [activePlace, lang, copy.brand]);

  return (
    <div className="flex h-full w-full flex-col bg-[#FBF9F5] text-stone-900 lg:flex-row">
      {/* Editorial Explorer / Story Panel */}
      <aside className="flex h-[52%] w-full flex-col border-b border-stone-200 bg-[#FBF9F5] lg:h-full lg:w-[460px] lg:shrink-0 lg:border-b-0 lg:border-e">
        {!activePlace ? (
          <>
            <div className="border-b border-stone-200 p-3.5 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-mono-tabular text-[11px] uppercase tracking-widest text-[#1f7d72]">
                    {lang === "ar"
                      ? "ولاية قابس · تونس"
                      : lang === "fr"
                        ? "Gouvernorat de Gabès · Tunisie"
                        : "Gabès Governorate · Tunisia"}
                  </p>
                  <h1 className="font-display mt-0.5 text-xl sm:text-2xl font-semibold text-stone-900">
                    {copy.brand}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono-tabular text-xs text-stone-500">
                    {copy.placesCount(filteredPlaces.length)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen((v) => !v)}
                    aria-expanded={mobileFiltersOpen}
                    className="inline-flex items-center gap-1 rounded-lg border border-stone-300 bg-white px-2.5 py-1.5 text-xs font-medium text-stone-700 lg:hidden"
                  >
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    <span>{mobileFiltersOpen ? "−" : "+"}</span>
                    <span>
                      {lang === "ar"
                        ? "تصفية"
                        : lang === "fr"
                          ? "Filtres"
                          : "Filters"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Search + Delegation (collapsible on mobile, always visible on desktop) */}
              <div
                className={`${mobileFiltersOpen ? "block" : "hidden"} lg:block`}
              >
                {/* Search */}
                <div className="relative mt-3 sm:mt-4">
                  <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={copy.searchPlaces}
                    className="w-full rounded-lg border border-stone-300 bg-white py-2 ps-9 pe-3 text-sm text-stone-900 placeholder:text-stone-400 focus:border-[#1f7d72] focus:outline-none"
                  />
                </div>

                {/* Delegation Dropdown with place counts */}
                <div className="mt-2.5 sm:mt-3">
                  <label className="sr-only" htmlFor="delegation-select">
                    {copy.delegationLabel}
                  </label>
                  <select
                    id="delegation-select"
                    value={selectedDelegationId}
                    onChange={(e) => handleDelegationChange(e.target.value)}
                    className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs font-medium text-stone-800 focus:border-[#1f7d72] focus:outline-none"
                  >
                    <option value="all">
                      {copy.allDelegations} ({PLACES.length})
                    </option>
                    {DELEGATIONS.map((d) => {
                      const count = placeCountByDelegation[d.id] ?? 0;
                      return (
                        <option key={d.id} value={d.id}>
                          {d.name[lang]} — {d.landscape[lang]} ({count})
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {/* 7 Cultural Dimensions: single horizontal scroll row on mobile, wrap on desktop */}
              <div
                className="mt-3 flex flex-nowrap gap-1.5 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible lg:pb-0"
                role="tablist"
                aria-label={copy.navDimensions}
              >
                <button
                  type="button"
                  onClick={() => setSelectedDimension("all")}
                  className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    selectedDimension === "all"
                      ? "bg-stone-900 text-white"
                      : "bg-stone-200/70 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {copy.allDimensions}
                </button>
                {CULTURAL_DIMENSIONS.map((dim) => {
                  const active = selectedDimension === dim.key;
                  return (
                    <button
                      key={dim.key}
                      type="button"
                      onClick={() => setSelectedDimension(dim.key)}
                      className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                        active
                          ? "bg-[#1f7d72] text-white"
                          : "bg-stone-200/70 text-stone-700 hover:bg-stone-200"
                      }`}
                    >
                      {dim.label[lang]}
                    </button>
                  );
                })}
              </div>
            </div>

            {activeDelegation && (
              <div className="border-b border-stone-200 bg-stone-100/70 px-5 py-3">
                <p className="text-xs font-semibold text-stone-800">
                  {activeDelegation.name[lang]} ·{" "}
                  {activeDelegation.landscape[lang]}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-stone-600">
                  {activeDelegation.summary[lang]}
                </p>
              </div>
            )}

            {/* Scrollable Places List */}
            <div className="gabes-scroll flex-1 overflow-y-auto overscroll-contain p-5">
              {filteredPlaces.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-sm text-stone-600">{copy.noResults}</p>
                  <button
                    type="button"
                    onClick={handleResetView}
                    className="mt-3 rounded-lg border border-stone-300 px-3.5 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-100"
                  >
                    {copy.clearFilters}
                  </button>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {filteredPlaces.map((place) => {
                    const delegation = DELEGATIONS.find(
                      (d) => d.id === place.delegationId,
                    );
                    return (
                      <article
                        key={place.id}
                        role="button"
                        tabIndex={0}
                        className="group cursor-pointer rounded-xl border border-stone-200 bg-white p-3.5 transition-colors hover:border-stone-400 focus-visible:outline-2 focus-visible:outline-[#1f7d72]"
                        onClick={() => handleSelectPlace(place)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleSelectPlace(place);
                          }
                        }}
                      >
                        <div className="flex gap-3.5">
                          <div className="h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-stone-200">
                            <img
                              src={place.image}
                              alt={place.title[lang]}
                              referrerPolicy="no-referrer"
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                              <span
                                className="font-semibold"
                                style={{
                                  color: getDimensionAccent(place.dimension),
                                }}
                              >
                                {getDimensionLabel(place.dimension, lang)}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="truncate">
                                {delegation?.name[lang]}
                              </span>
                            </div>
                            <h2 className="font-display mt-0.5 truncate text-lg font-semibold text-stone-900">
                              {place.title[lang]}
                            </h2>
                            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-600">
                              {place.summary[lang]}
                            </p>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        ) : (
          /* 05. Discover Stories — Editorial Reader View */
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-stone-200 px-5 py-3.5">
              <button
                type="button"
                onClick={() => goToPlace(null)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-950"
              >
                <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                <span>{copy.backToList}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleStepStory(-1)}
                  className="rounded-md border border-stone-300 px-2.5 py-1 text-xs font-medium text-stone-700 hover:bg-stone-100"
                >
                  {copy.previousStory}
                </button>
                <button
                  type="button"
                  onClick={() => handleStepStory(1)}
                  className="rounded-md border border-stone-300 px-2.5 py-1 text-xs font-medium text-stone-700 hover:bg-stone-100"
                >
                  {copy.nextStory}
                </button>
              </div>
            </div>

            <div className="gabes-scroll flex-1 overflow-y-auto overscroll-contain p-5">
              <StoryGallery
                photos={
                  activePlace.gallery?.length
                    ? activePlace.gallery
                    : [
                        {
                          src: activePlace.image,
                          caption: activePlace.imageCaption,
                        },
                      ]
                }
                title={activePlace.title[lang]}
                lang={lang}
                placeId={activePlace.id}
              />

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-stone-500">
                <span
                  className="font-semibold"
                  style={{ color: getDimensionAccent(activePlace.dimension) }}
                >
                  {getDimensionLabel(activePlace.dimension, lang)}
                </span>
                <span aria-hidden="true">·</span>
                <span>{activeDelegation?.name[lang]}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular">
                  {activePlace.coordinates.lat.toFixed(4)}° N,{" "}
                  {activePlace.coordinates.lng.toFixed(4)}° E
                </span>
              </div>

              <h2
                className="font-display mt-2 text-3xl font-semibold leading-tight text-stone-900"
                style={{ textWrap: "balance" }}
              >
                {activePlace.title[lang]}
              </h2>
              <p className="mt-1.5 text-sm font-medium text-stone-600">
                {activePlace.subtitle[lang]}
              </p>

              <div className="my-5 border-b border-stone-200" />

              <p
                className={`text-[15px] leading-relaxed text-stone-800 ${
                  lang !== "ar"
                    ? "first-letter:float-start first-letter:me-2.5 first-letter:font-display first-letter:text-4xl first-letter:font-bold first-letter:leading-none first-letter:text-[#1f7d72]"
                    : ""
                }`}
              >
                {activePlace.storyLead[lang]}
              </p>

              <div className="mt-5">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                  {copy.storyHistory}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-700">
                  {activePlace.storyBody[lang]}
                </p>
              </div>

              <div className="mt-5 border-t border-stone-200 pt-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                  {copy.culturalIdentity}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-700">
                  {activePlace.culturalNote[lang]}
                </p>
              </div>

              <div className="mt-5 border-t border-stone-200 pt-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                  {copy.localLifeHeading}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-700">
                  {activePlace.localLife[lang]}
                </p>
              </div>

              <div className="mt-5 rounded-xl border border-stone-200 bg-white p-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                  {copy.visitingInfoHeading}
                </h3>
                <dl className="mt-3 divide-y divide-stone-100 text-xs">
                  <div className="flex justify-between gap-4 py-2">
                    <dt className="text-stone-500">{copy.bestSeasonLabel}</dt>
                    <dd className="text-end font-medium text-stone-900">
                      {activePlace.visitingInfo.bestSeason[lang]}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 py-2">
                    <dt className="text-stone-500">{copy.accessLabel}</dt>
                    <dd className="text-end font-medium text-stone-900">
                      {activePlace.visitingInfo.access[lang]}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 py-2">
                    <dt className="text-stone-500">{copy.highlightLabel}</dt>
                    <dd className="text-end font-medium text-stone-900">
                      {activePlace.visitingInfo.highlight[lang]}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 py-2">
                    <dt className="text-stone-500">{copy.elevationLabel}</dt>
                    <dd className="font-mono-tabular text-end font-medium text-stone-900">
                      {activePlace.elevationMeters} m
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main MapLibre Interactive 3D Satellite Viewport */}
      <div className="relative h-[48%] flex-1 lg:h-full">
        <div ref={mapContainerRef} className="h-full w-full" />

        {/* Floating Map Controls */}
        <div className="pointer-events-none absolute inset-x-4 top-4 z-10 flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={onBackToGlobe}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-[#FBF9F5]/95 px-3.5 py-2 text-xs font-semibold text-stone-900 shadow-md transition-colors hover:bg-white whitespace-nowrap shrink-0"
          >
            <Globe2 className="h-4 w-4 text-[#1f7d72]" />
            <span>{copy.backToGlobe}</span>
          </button>

          <div className="pointer-events-auto flex flex-wrap items-center gap-1 rounded-lg border border-stone-300 bg-[#FBF9F5]/95 p-1 shadow-md">
            <button
              type="button"
              onClick={() => setMapMode("hybrid")}
              className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                mapMode === "hybrid"
                  ? "bg-stone-900 text-white"
                  : "text-stone-700 hover:bg-stone-200/70"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>{copy.layerHybrid}</span>
            </button>
            <button
              type="button"
              onClick={() => setMapMode("map")}
              className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                mapMode === "map"
                  ? "bg-stone-900 text-white"
                  : "text-stone-700 hover:bg-stone-200/70"
              }`}
            >
              <MapPin className="h-3.5 w-3.5" />
              <span>{copy.layerMap}</span>
            </button>
            <button
              type="button"
              onClick={() => setMapMode("satellite")}
              className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                mapMode === "satellite"
                  ? "bg-stone-900 text-white"
                  : "text-stone-700 hover:bg-stone-200/70"
              }`}
            >
              <Compass className="h-3.5 w-3.5" />
              <span>{copy.layerSatellite}</span>
            </button>
            <span className="h-4 w-px bg-stone-300" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setIs3DTerrain((v) => !v)}
              className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                is3DTerrain
                  ? "bg-[#1f7d72] text-white"
                  : "text-stone-700 hover:bg-stone-200/70"
              }`}
            >
              <Mountain className="h-3.5 w-3.5" />
              <span>{copy.tilt3D}</span>
            </button>
            <button
              type="button"
              onClick={handleResetView}
              title={copy.resetView}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-200/70 whitespace-nowrap shrink-0"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{copy.resetView}</span>
            </button>
          </div>
        </div>

        {/* Bottom-Left Quick Story Stepper on Map */}
        {!activePlace && filteredPlaces.length > 0 && (
          <div className="pointer-events-none absolute bottom-4 start-4 z-10 hidden sm:block">
            <button
              type="button"
              onClick={() => handleSelectPlace(filteredPlaces[0])}
              className="pointer-events-auto inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-[#FBF9F5]/95 px-3.5 py-2 text-xs font-semibold text-stone-900 shadow-md transition-colors hover:bg-white"
            >
              <span>{filteredPlaces[0].title[lang]}</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#1f7d72] rtl:rotate-180" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
