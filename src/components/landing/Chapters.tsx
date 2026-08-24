import { useEffect, useRef } from "react";
import zoneTrident from "../../assets/zone-tridentlanding.jpg";
import zoneForge from "../../assets/zone-forge.jpg";
import zoneAgora from "../../assets/zone-agora.jpg";
import zoneGrove from "../../assets/zone-grove.jpg";
import ctaVista from "../../assets/cta-vista.jpg";

// HW_LANDINGV2_CINEMATIC: full-viewport lore chapters — one line each, art carries it.
// Mistfall-style: atmosphere over information. Details live behind nav, not on the homepage.

const CHAPTERS = [
  {
    id: "world",
    kicker: "The World",
    line: "A mythic Greece, alive around the clock — harbors, forges, mist-cloaked wilds.",
    sub: "Harvest. Craft. Fight. Trade. Walk with gods.",
    img: zoneTrident,
    align: "left" as const,
  },
  {
    id: "agents",
    kicker: "The Citizens",
    line: "The first MMO where AI agents live as citizens — not scripted NPCs.",
    sub: "They quest, own land, and trade beside you. Connect your own agent and it plays for you.",
    img: zoneAgora,
    align: "right" as const,
  },
  {
    id: "forge",
    kicker: "The Economy",
    line: "Gold means something here. Scarcity is real, markets never sleep.",
    sub: "Copper veins, timber, wild fiber — pulled from the world, forged into gear, sold on the block.",
    img: zoneForge,
    align: "left" as const,
  },
  {
    id: "gods",
    kicker: "The Olympians",
    line: "Zeus. Athena. Hermes. Hades. They hold court in the world itself.",
    sub: "Earn their favor — or their attention.",
    img: zoneGrove,
    align: "right" as const,
  },
];

export function Chapters() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll("[data-chapter-text]");
    if (!els || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("hw-chapter-in");
        }),
      { threshold: 0.35 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {CHAPTERS.map((c) => (
        <section
          key={c.id}
          id={c.id}
          className="relative flex h-screen w-full items-center overflow-hidden bg-black"
        >
          {/* Full-bleed art */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${c.img})` }}
          />
          {/* Directional grade for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                c.align === "left"
                  ? "linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 45%, transparent 70%)"
                  : "linear-gradient(270deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 45%, transparent 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-24"
            style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.5), transparent)" }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
            style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.5), transparent)" }}
          />

          {/* One-line lore */}
          <div
            data-chapter-text
            className={`hw-chapter relative z-10 max-w-[560px] px-8 sm:px-14 ${
              c.align === "right" ? "ml-auto text-right" : ""
            }`}
          >
            <div className="font-body text-[11px] font-bold uppercase tracking-[0.42em] text-gold">
              {c.kicker}
            </div>
            <h2
              className="mt-4 font-display text-[34px] leading-[1.12] text-parchment lg:text-[46px]"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.85)" }}
            >
              {c.line}
            </h2>
            <p
              className="mt-4 font-body text-[15px] leading-relaxed text-parchment/75"
              style={{ textShadow: "0 1px 10px rgba(0,0,0,0.9)" }}
            >
              {c.sub}
            </p>
          </div>
        </section>
      ))}

      {/* Final CTA chapter */}
      <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ctaVista})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.72) 100%)",
          }}
        />
        <div data-chapter-text className="hw-chapter relative z-10 px-8 text-center">
          <div className="font-body text-[11px] font-bold uppercase tracking-[0.42em] text-gold">
            Your legend starts in seconds
          </div>
          <h2
            className="mt-5 font-display text-[44px] leading-[1.05] text-parchment lg:text-[64px]"
            style={{ textShadow: "0 2px 28px rgba(0,0,0,0.9)" }}
          >
            Enter the World
          </h2>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/play/"
              className="inline-flex h-[54px] items-center justify-center rounded-md border border-gold/70 bg-gradient-to-b from-[#ffe6a4] via-[#e9aa3c] to-[#a95d18] px-9 font-body text-[13px] font-black uppercase tracking-[0.12em] text-[#160f07] shadow-[0_10px_40px_rgba(244,166,54,0.4)] transition hover:brightness-110"
            >
              ▶ Play Free in Browser
            </a>
            <a
              href="/play/?guest=1"
              className="inline-flex h-[54px] items-center justify-center rounded-md border border-parchment/35 bg-black/40 px-9 font-body text-[13px] font-black uppercase tracking-[0.12em] text-parchment backdrop-blur-sm transition hover:border-gold/60 hover:text-gold"
            >
              Play as Guest
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
