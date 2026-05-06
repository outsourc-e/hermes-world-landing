import { useEffect, useRef, useState } from "react";
import { Play, Maximize2 } from "lucide-react";

const VIDEO_SRC = "/assets/hermesworld/video/world-demo-720p.mp4";
const POSTER_SRC = "/assets/hermesworld/video/world-demo-poster.jpg";

const bullets = [
  {
    label: "Live systems",
    body:
      "Day/night cycles, persistent zones, real multiplayer presence. Walk in and the world is already moving.",
  },
  {
    label: "Real agents",
    body:
      "AI companions hold sessions, run quests, and respond in dialog you can actually have a conversation with.",
  },
  {
    label: "A world that reacts",
    body:
      "Build your sigil, claim your name, and progress carries with you across sessions and devices.",
  },
];

export function VideoPreview() {
  const [showModal, setShowModal] = useState(false);
  const inlineRef = useRef<HTMLVideoElement | null>(null);
  const modalRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!showModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", onKey);
    modalRef.current?.play().catch(() => undefined);
    return () => window.removeEventListener("keydown", onKey);
  }, [showModal]);

  useEffect(() => {
    if (showModal) inlineRef.current?.pause();
    else inlineRef.current?.play().catch(() => undefined);
  }, [showModal]);

  return (
    <>
      <section
        id="preview"
        className="relative w-full bg-[#0a0f1a] py-20 lg:py-32"
      >
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.18em] text-gold/80 font-body font-semibold">
              Preview
            </div>
            <h2 className="mt-3 font-display text-[36px] lg:text-[56px] leading-[1.05] text-parchment">
              See HermesWorld in action.
            </h2>
            <p className="mt-4 text-[16px] lg:text-[17px] text-parchment/70 font-body">
              Live systems, real agents, a world that reacts.
            </p>
          </div>

          {/* Video frame */}
          <div className="mt-12 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
            <div className="relative">
              <div className="relative overflow-hidden rounded-xl border border-gold/20 bg-black shadow-[0_30px_120px_-30px_rgba(241,197,109,0.35)]">
                <video
                  ref={inlineRef}
                  src={VIDEO_SRC}
                  poster={POSTER_SRC}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="block w-full aspect-video object-cover"
                />
                {/* Hover gradient + maximize */}
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="group absolute inset-0 flex items-end justify-end p-4"
                  aria-label="Open full-size preview with audio"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-2 rounded-md border border-gold/40 bg-black/60 backdrop-blur px-3 py-2 text-[11px] uppercase tracking-[0.14em] font-body font-semibold text-parchment">
                    <Maximize2 className="h-3.5 w-3.5" />
                    Full + Audio
                  </span>
                </button>
              </div>
              {/* Controls hint */}
              <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-parchment/40 font-body">
                <span>Auto-playing · muted</span>
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-1.5 text-gold/80 hover:text-gold transition-colors"
                >
                  <Play className="h-3 w-3 fill-current" /> Play with sound
                </button>
              </div>
            </div>

            {/* Right column bullets */}
            <ul className="space-y-7">
              {bullets.map((b) => (
                <li key={b.label} className="border-l-2 border-gold/30 pl-5">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-gold/80 font-body font-semibold">
                    {b.label}
                  </div>
                  <p className="mt-2 text-[15px] lg:text-[16px] text-parchment/80 font-body leading-relaxed">
                    {b.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Fullscreen modal — same source, with audio controls. */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="HermesWorld preview video"
        >
          <div
            className="relative w-full max-w-[1080px] aspect-video rounded-xl overflow-hidden border border-gold/30 shadow-[0_0_80px_rgba(241,197,109,0.18)] bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={modalRef}
              src={VIDEO_SRC}
              poster={POSTER_SRC}
              className="w-full h-full object-cover"
              controls
              autoPlay
              playsInline
              preload="auto"
            />
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/70 border border-gold/30 flex items-center justify-center text-parchment hover:bg-black/90 transition-colors text-lg"
              aria-label="Close video"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
