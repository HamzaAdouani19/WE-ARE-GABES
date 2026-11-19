import { useEffect } from 'react';
import { X } from 'lucide-react';
import { CULTURAL_DIMENSIONS, UI_COPY } from '../data/gabesData';
import type { DimensionKey, Language } from '../types/gabes';

interface AboutModalProps {
  open: boolean;
  mode: 'about' | 'dimensions';
  lang: Language;
  onClose: () => void;
  onSelectDimension: (dim: DimensionKey) => void;
}

export function AboutModal({
  open,
  mode,
  lang,
  onClose,
  onSelectDimension,
}: AboutModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const copy = UI_COPY[lang];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="gabes-scroll max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-stone-200 bg-[#FBF9F5] p-6 text-stone-900 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <p className="font-mono-tabular text-xs uppercase tracking-widest text-[#1f7d72]">
              {copy.brand}
            </p>
            <h2 className="font-display mt-1 text-3xl font-semibold text-stone-900">
              {mode === 'dimensions' ? copy.navDimensions : copy.aboutTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={copy.close}
            className="rounded-lg border border-stone-300 p-2 text-stone-600 transition-colors hover:bg-stone-200/70 hover:text-stone-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {mode === 'dimensions' ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {CULTURAL_DIMENSIONS.map((dim, idx) => (
              <button
                key={dim.key}
                type="button"
                onClick={() => {
                  onSelectDimension(dim.key);
                  onClose();
                }}
                className="flex flex-col items-start rounded-xl border border-stone-200 bg-white p-4 text-start transition-colors hover:border-[#1f7d72]"
              >
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span className="font-mono-tabular font-semibold" style={{ color: dim.accentHex }}>
                    0{idx + 1}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{copy.brand}</span>
                </div>
                <h3 className="font-display mt-1 text-xl font-semibold text-stone-900">
                  {dim.label[lang]}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-stone-600">
                  {dim.description[lang]}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            <p className="text-[15px] leading-relaxed text-stone-700">{copy.aboutMission}</p>

            <div className="border-y border-stone-200 py-4 text-center">
              <p className="font-display text-xl italic text-stone-800">{copy.visionQuote}</p>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                {copy.audienceHeading}
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-stone-700">
                {copy.audiences.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1f7d72]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* <div className="flex flex-wrap items-center justify-between gap-4 border-t border-stone-200 pt-5">
              <a
                href="/we-are-gabes-project.zip"
                download="we-are-gabes-project.zip"
                className="inline-flex items-center gap-2 rounded-lg bg-[#1f7d72] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#18685e]"
              >
                <Download className="h-4 w-4" />
                <span>{copy.downloadZipLabel}</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-stone-300 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100"
              >
                {copy.close}
              </button>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}
