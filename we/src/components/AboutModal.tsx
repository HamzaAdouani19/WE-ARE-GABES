
import { useEffect, useRef } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { CULTURAL_DIMENSIONS, UI_COPY } from "../data/gabesData";
import type { DimensionKey, Language } from "../types/gabes";

interface AboutModalProps {
  open: boolean;
  mode: "about" | "dimensions";
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
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const copy = UI_COPY[lang];

  const googleFormsUrl = "https://docs.google.com/forms/d/e/1FAIpQLSePUGtbP5v4TBowjzZ37L3kyk20NOG4LEZNbN0sPkc4MFG4Gw/viewform";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto border border-white/10 bg-[#111] p-6 text-white shadow-2xl md:p-10"
        onClick={(event) => event.stopPropagation()}
      >
        {/* HEADER */}
        <div className="mb-8 flex items-start justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <p className="mb-3 text-xs tracking-[0.35em] text-[#c7a46a]">
              {copy.brand}
            </p>

            <h2
              id="about-modal-title"
              className="text-3xl font-semibold uppercase tracking-tight md:text-5xl"
            >
              {mode === "dimensions"
                ? copy.navDimensions
                : copy.aboutTitle}
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close"
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 transition hover:border-[#c7a46a] hover:text-[#c7a46a]"
          >
            <X size={20} />
          </button>
        </div>

        {/* DIMENSIONS */}
        {mode === "dimensions" ? (
          <div className="grid gap-4 md:grid-cols-2">
            {CULTURAL_DIMENSIONS.map((dimension) => (
              <button
                key={dimension.key}
                onClick={() => {
                  onSelectDimension(dimension.key);
                  onClose();
                }}
                className="group border border-white/10 p-6 text-left transition hover:border-[#c7a46a] hover:bg-white/[0.04]"
              >
             <h3 className="mb-3 text-xl font-semibold transition group-hover:text-[#c7a46a]">
  {dimension.label[lang]}
</h3>

<p className="text-sm leading-7 text-white/60">
  {dimension.description[lang]}
</p>

                <span className="mt-5 inline-flex items-center gap-2 text-xs tracking-widest text-[#c7a46a]">
                  EXPLORE <ArrowUpRight size={14} />
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-10">

            {/* ABOUT / MISSION */}
            <section>
              <p className="whitespace-pre-line text-base leading-8 text-white/75 md:text-lg">
                {copy.aboutMission}
              </p>

              <div className="mt-8 border-l-2 border-[#c7a46a] bg-white/[0.04] p-5 md:p-7">
                <p className="text-sm leading-7 tracking-wide text-[#c7a46a] md:text-base">
                  {copy.visionQuote}
                </p>
              </div>
            </section>

            {/* TARGET AUDIENCE */}
            <section>
              <div className="mb-6">
                <p className="mb-3 text-xs tracking-[0.3em] text-[#c7a46a]">
                  {copy.audienceHeading}
                </p>

                <p className="max-w-2xl text-sm leading-7 text-white/60 md:text-base">
                  {copy.audienceIntro}
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {copy.audiences.map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-4 border border-white/10 p-5 transition hover:border-[#c7a46a]/60"
                  >
                    <span className="text-sm font-semibold text-[#c7a46a]">
                      0{index + 1}
                    </span>

                    <p className="text-sm leading-7 text-white/75">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* JOIN INITIATIVE */}
            <section className="relative overflow-hidden border border-[#c7a46a]/30 bg-[#c7a46a]/[0.06] p-6 md:p-9">
              <p className="mb-4 text-xs tracking-[0.3em] text-[#c7a46a]">
                {copy.joinHeading}
              </p>

              <h3 className="mb-5 max-w-2xl text-2xl font-semibold leading-tight md:text-4xl">
                {copy.joinTitle}
              </h3>

              <p className="mb-4 max-w-2xl text-sm leading-7 text-white/70">
                {copy.joinDescription}
              </p>

              <p className="mb-6 max-w-2xl text-sm leading-7 text-white/60">
                {copy.joinDetails}
              </p>

              <p className="mb-7 text-sm italic text-[#c7a46a]">
                “{copy.joinQuote}”
              </p>

              <a
                href={googleFormsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#c7a46a] px-6 py-4 text-xs font-semibold tracking-[0.15em] text-black transition hover:bg-white"
              >
                {copy.joinButton}
                <ArrowUpRight size={16} />
              </a>

              <p className="mt-4 text-xs leading-6 text-white/40">
                {copy.joinSubtitle}
              </p>
            </section>

            {/* FOOTER */}
    <footer className="border-t border-white/10 pt-6 text-xs leading-6 text-white/40">
  <p>WE ARE GABÈS — A cultural identity initiative.</p>
  <p className="mt-2">© {new Date().getFullYear()} WE ARE GABÈS. All rights reserved.</p>
</footer>
          </div>
        )}
      </div>
    </div>
  );
}
