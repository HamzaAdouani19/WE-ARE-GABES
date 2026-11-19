import { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import { ArrowRight, ChevronDown, ChevronUp, Compass } from 'lucide-react';
import { GABES_CENTER, JOURNEY_STAGES, UI_COPY } from '../data/gabesData';
import { TUNISIA_BORDER } from '../data/worldGeo';
import type { Language } from '../types/gabes';

interface GlobeJourneyProps {
  lang: Language;
  onEnterGabes: () => void;
}

const GLOBE_STAGES = [
  { ...JOURNEY_STAGES[0], zoom: 1.65, pitch: 0, bearing: 0 },
  { ...JOURNEY_STAGES[1], zoom: 3.7, pitch: 18, bearing: -4 },
  { ...JOURNEY_STAGES[2], zoom: 6.2, pitch: 32, bearing: -8 },
  { ...JOURNEY_STAGES[3], zoom: 9.3, pitch: 48, bearing: -12 },
];

function gabesLabel(lang: Language) {
  if (lang === 'ar') return 'قابس، تونس';
  if (lang === 'fr') return 'Gabès, Tunisie';
  return 'Gabès, Tunisia';
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function interpolateGlobePose(progress: number) {
  const clamped = Math.max(0, Math.min(1, progress));
  for (let i = 0; i < GLOBE_STAGES.length - 1; i++) {
    const curr = GLOBE_STAGES[i];
    const next = GLOBE_STAGES[i + 1];
    if (clamped >= curr.progress && clamped <= next.progress) {
      const localT = (clamped - curr.progress) / (next.progress - curr.progress);
      const smooth = localT * localT * (3 - 2 * localT);
      return {
        lat: lerp(curr.lat, next.lat, smooth),
        lng: lerp(curr.lng, next.lng, smooth),
        zoom: lerp(curr.zoom, next.zoom, smooth),
        pitch: lerp(curr.pitch, next.pitch, smooth),
        bearing: lerp(curr.bearing, next.bearing, smooth),
        stageIndex: localT > 0.55 ? i + 1 : i,
      };
    }
  }
  const last = GLOBE_STAGES[GLOBE_STAGES.length - 1];
  return {
    lat: last.lat,
    lng: last.lng,
    zoom: last.zoom,
    pitch: last.pitch,
    bearing: last.bearing,
    stageIndex: GLOBE_STAGES.length - 1,
  };
}

function buildSatelliteGlobeStyle(): maplibregl.StyleSpecification {
  return {
    version: 8,
    projection: { type: 'globe' },
    sky: {
      'sky-color': '#030814',
      'horizon-color': '#2b5f9e',
      'fog-color': '#132744',
      'sky-horizon-blend': 0.55,
      'horizon-fog-blend': 0.7,
      'fog-ground-blend': 0.4,
      'atmosphere-blend': ['interpolate', ['linear'], ['zoom'], 0, 1, 5, 0.9, 8, 0.35],
    },
    sources: {
      'esri-satellite': {
        type: 'raster',
        tiles: [
          'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        ],
        tileSize: 256,
        maxzoom: 19,
        attribution: 'Imagery © Esri, Maxar, Earthstar Geographics',
      },
      'esri-labels': {
        type: 'raster',
        tiles: [
          'https://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
        ],
        tileSize: 256,
        maxzoom: 16,
      },
      'tunisia-outline': {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: TUNISIA_BORDER,
          },
        },
      },
    },
    layers: [
      {
        id: 'earth-satellite',
        type: 'raster',
        source: 'esri-satellite',
        paint: {
          'raster-contrast': 0.08,
          'raster-saturation': 0.06,
        },
      },
      {
        id: 'earth-labels',
        type: 'raster',
        source: 'esri-labels',
        paint: {
          'raster-opacity': 0.85,
        },
      },
      {
        id: 'tunisia-border-glow',
        type: 'line',
        source: 'tunisia-outline',
        paint: {
          'line-color': '#5eead4',
          'line-width': 2.2,
          'line-opacity': 0.85,
        },
      },
    ],
  };
}

export function GlobeJourney({ lang, onEnterGabes }: GlobeJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const onEnterRef = useRef(onEnterGabes);
  onEnterRef.current = onEnterGabes;

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const journeyActiveRef = useRef(false);
  const autoSpinRef = useRef(true);
  const enteredRef = useRef(false);
  const markerLabelRef = useRef<HTMLSpanElement | null>(null);
  const langRef = useRef(lang);
  const [progressUI, setProgressUI] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);
  const [dockCollapsed, setDockCollapsed] = useState(false);
  const [globeFailed, setGlobeFailed] = useState(false);

  const copy = UI_COPY[lang];
  langRef.current = lang;

  const jumpToStage = (targetProgress: number) => {
    autoSpinRef.current = false;
    journeyActiveRef.current = true;
    const clamped = Math.max(0, Math.min(1, targetProgress));
    targetProgressRef.current = clamped;
    setProgressUI(clamped);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      autoSpinRef.current = false;
    }

    let map: maplibregl.Map;
    try {
      map = new maplibregl.Map({
        container,
        style: buildSatelliteGlobeStyle(),
        center: [GLOBE_STAGES[0].lng, GLOBE_STAGES[0].lat],
        zoom: GLOBE_STAGES[0].zoom,
        pitch: 0,
        bearing: 0,
        maxPitch: 68,
        attributionControl: false,
      });
    } catch {
      setGlobeFailed(true);
      return;
    }

    mapRef.current = map;
    map.scrollZoom.disable();
    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');

    const markerEl = document.createElement('button');
    markerEl.type = 'button';
    markerEl.setAttribute('aria-label', 'Gabès, Tunisia');
    markerEl.className = 'group flex items-center gap-2 cursor-pointer focus:outline-none';
    markerEl.innerHTML = `
      <span class="relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#1f7d72] shadow-lg transition-transform duration-150 group-hover:scale-125"></span>
      <span class="rounded-md border border-white/25 bg-[#07111f]/90 px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg whitespace-nowrap">
        <span data-role="label" class="text-[#5eead4]"></span>
        <span class="mx-1 text-stone-400">·</span>
        <span class="font-mono text-[10px] text-stone-300">33.88° N</span>
      </span>
    `;
    markerLabelRef.current = markerEl.querySelector<HTMLSpanElement>('[data-role="label"]');
    if (markerLabelRef.current) markerLabelRef.current.textContent = gabesLabel(langRef.current);
    markerEl.addEventListener('click', (e) => {
      e.stopPropagation();
      onEnterRef.current();
    });

    const gabesMarker = new maplibregl.Marker({ element: markerEl, anchor: 'left' })
      .setLngLat([GABES_CENTER.lng, GABES_CENTER.lat])
      .addTo(map);

    const stopAutoSpin = () => {
      autoSpinRef.current = false;
      journeyActiveRef.current = false;
    };
    map.on('dragstart', stopAutoSpin);
    map.on('touchstart', () => {
      autoSpinRef.current = false;
    });

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      autoSpinRef.current = false;
      journeyActiveRef.current = true;
      const delta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 140) * 0.00125;
      const next = Math.max(0, Math.min(1, targetProgressRef.current + delta));
      targetProgressRef.current = next;
      setProgressUI(next);

      if (next >= 0.99 && !enteredRef.current) {
        enteredRef.current = true;
        window.setTimeout(() => {
          onEnterRef.current();
        }, 420);
      }
    };
    container.addEventListener('wheel', handleWheel, { passive: false });

    const resizeObserver = new ResizeObserver(() => {
      map.resize();
    });
    resizeObserver.observe(container);

    let rafId = 0;
    let lastTime = performance.now();
    let lastUiStage = 0;

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (journeyActiveRef.current) {
        const alpha = 1 - Math.exp(-5.2 * dt);
        currentProgressRef.current = lerp(
          currentProgressRef.current,
          targetProgressRef.current,
          alpha
        );
        const pose = interpolateGlobePose(currentProgressRef.current);
        if (pose.stageIndex !== lastUiStage) {
          lastUiStage = pose.stageIndex;
          setStageIdx(pose.stageIndex);
        }
        map.jumpTo({
          center: [pose.lng, pose.lat],
          zoom: pose.zoom,
          pitch: pose.pitch,
          bearing: pose.bearing,
        });

        if (Math.abs(currentProgressRef.current - targetProgressRef.current) < 0.0015) {
          currentProgressRef.current = targetProgressRef.current;
          if (targetProgressRef.current === 0) {
            journeyActiveRef.current = false;
          }
        }
      } else if (autoSpinRef.current && !map.isMoving()) {
        const center = map.getCenter();
        const nextLng = center.lng + dt * 3.8;
        map.jumpTo({
          center: [nextLng > 180 ? nextLng - 360 : nextLng, center.lat],
        });
      }

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      container.removeEventListener('wheel', handleWheel);
      gabesMarker.remove();
      map.remove();
      mapRef.current = null;
      markerLabelRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (markerLabelRef.current) {
      markerLabelRef.current.textContent = gabesLabel(lang);
    }
  }, [lang]);

  return (
    <section className="relative h-full w-full overflow-hidden bg-[#030814] text-stone-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(1px 1px at 15% 25%, #e2e8f0 100%, transparent), radial-gradient(1px 1px at 45% 12%, #cbd5e1 100%, transparent), radial-gradient(1.5px 1.5px at 78% 18%, #f8fafc 100%, transparent), radial-gradient(1px 1px at 85% 65%, #94a3b8 100%, transparent), radial-gradient(1px 1px at 22% 78%, #cbd5e1 100%, transparent), radial-gradient(1.5px 1.5px at 62% 84%, #e2e8f0 100%, transparent)',
        }}
      />

      <div ref={containerRef} className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing" />

      {globeFailed && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#030814] p-8 text-center">
          <Compass className="mb-3 h-10 w-10 text-[#5eead4]" />
          <p className="font-display text-2xl font-semibold text-white">{copy.brand}</p>
          <p className="mt-2 max-w-md text-sm text-stone-300">{copy.tagline}</p>
          <button
            type="button"
            onClick={onEnterGabes}
            className="mt-6 rounded-lg bg-[#1f7d72] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#19665d]"
          >
            {copy.enterGabes}
          </button>
        </div>
      )}

      {/* Top-Left Brand SVG Logo Overlay */}
      <div className="pointer-events-none absolute inset-x-0 top-6 z-10 mx-auto flex max-w-6xl items-start justify-between px-6">
        <div className="pointer-events-auto">
          <img
            src="/logo.blanc.svg.svg"
            alt="WE ARE GABÈS"
            className="h-16 w-auto sm:h-24 drop-shadow-[0_6px_18px_rgba(0,0,0,0.65)]"
          />
        </div>

        <div className="pointer-events-auto hidden sm:block">
          <button
            type="button"
            onClick={onEnterGabes}
            className="inline-flex items-center gap-2 rounded-lg bg-[#1f7d72] px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#18685e] focus-visible:outline-2 focus-visible:outline-white whitespace-nowrap shrink-0"
          >
            <span>{copy.enterGabes}</span>
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </button>
        </div>
      </div>

      {/* Collapsible Bottom Journey Dock */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-20 flex flex-col items-center px-4">
        <button
          type="button"
          onClick={() => setDockCollapsed((v) => !v)}
          className="pointer-events-auto mb-2 inline-flex items-center gap-1.5 rounded-t-lg border border-white/15 bg-[#08101e]/95 px-3 py-1 text-[11px] font-medium text-stone-300 transition-colors hover:text-white"
        >
          {dockCollapsed ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          <span>{dockCollapsed ? copy.continueScrolling : copy.scrollHint}</span>
        </button>

        {!dockCollapsed && (
          <div className="pointer-events-auto w-full max-w-3xl rounded-xl border border-white/15 bg-[#08101e]/95 px-4 py-3 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Journey stages">
                {GLOBE_STAGES.map((stage, idx) => {
                  const active = idx === stageIdx;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => jumpToStage(stage.progress)}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-[#1f7d72] text-white'
                          : 'bg-white/5 text-stone-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className="font-mono-tabular opacity-75">{stage.stepNum}</span>
                      <span>{stage.title[lang]}</span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={onEnterGabes}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#5eead4]/40 bg-[#132930] px-3.5 py-1.5 text-xs font-semibold text-[#5eead4] transition-colors hover:bg-[#1f7d72] hover:text-white whitespace-nowrap shrink-0"
              >
                <span>{copy.enterGabes}</span>
                <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </button>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(progressUI * 100)}
                onChange={(e) => {
                  const val = Number(e.target.value) / 100;
                  jumpToStage(val);
                  if (val >= 0.99) {
                    onEnterGabes();
                  }
                }}
                aria-label="Travel from World to Gabès"
                className="h-1.5 w-full cursor-pointer accent-[#5eead4]"
              />
              <span className="font-mono-tabular w-10 text-right text-[11px] text-stone-400">
                {Math.round(progressUI * 100)}%
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}