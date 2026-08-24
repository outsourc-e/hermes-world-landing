import { useEffect, useState } from "react";

// HW_LANDINGV2_CINEMATIC: Mistfall-style full-viewport cinematic landing.
// The page IS the game: fullscreen video, minimal chrome, one play panel.

type LiveStats = { players: number; web: number; native: number };

const TOKEN_CA = "2YF1qxgYVY9x6UWVfampZp9er7PHXRYRDKi3isFnYhH9";

const NAV_ITEMS = [
  { label: "WORLD", href: "/world/" },
  { label: "AGENTS", href: "/agents/" },
  { label: "ECONOMY", href: "/economy/" },
  { label: "TOKEN", href: "/token/" },
  { label: "DOWNLOAD", href: "/download/" },
  { label: "GUIDE", href: "/guide/" },
];

const SOCIALS = [
  { label: "X", href: "https://x.com/HermesWorldAI", glyph: "𝕏" },
  { label: "Discord", href: "https://discord.gg/agentd", glyph: "◈" },
  {
    label: "Steam",
    href: "https://store.steampowered.com/app/4841120/HermesWorld/",
    glyph: "◉",
  },
];

export function CinematicHero() {
  const [players, setPlayers] = useState<number | null>(null);
  const [caCopied, setCaCopied] = useState(false);

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch("https://play.hermes-world.ai/api/players", { cache: "no-store" })
        .then((r) => r.json())
        .then((d: LiveStats) => alive && setPlayers(d.players ?? 0))
        .catch(() => alive && setPlayers(null));
    load();
    const t = setInterval(load, 30_000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  return (
    <section id="top" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Fullscreen cinematic video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/assets/hermesworld/video/cinematic-hero.mp4"
        poster="/assets/hermesworld/video/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Cinematic grade: subtle vignette, NO heavy scrim — let the art breathe */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 55%, rgba(0,0,0,0.45) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.6), transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.65), transparent)" }}
      />

      {/* Crest — small, top-left */}
      <a href="#top" className="absolute left-6 top-5 z-20 flex items-center gap-3">
        <img
          src="/assets/hermesworld/art/hermesworld-crest.png"
          alt="HermesWorld"
          className="h-12 w-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
        />
        <div className="hidden sm:block">
          <div
            className="font-display text-[17px] leading-none text-parchment"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}
          >
            HermesWorld
          </div>
          <div className="mt-1 font-body text-[8.5px] font-bold uppercase tracking-[0.34em] text-gold/90">
            The Agent MMO
          </div>
        </div>
      </a>

      {/* Top nav — horizontal, center */}
      <nav className="absolute left-1/2 top-7 z-20 hidden -translate-x-1/2 md:block">
        <ul className="flex items-center gap-9">
          {NAV_ITEMS.map((n) => (
            <li key={n.label}>
              <a
                href={n.href}
                className="font-body text-[12px] font-bold uppercase tracking-[0.26em] text-parchment/75 transition hover:text-gold"
                style={{ textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Socials — top-right, quiet icons */}
      <div className="absolute right-6 top-6 z-20 flex items-center gap-4">
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 text-[15px] text-parchment/80 backdrop-blur-sm transition hover:border-gold/60 hover:text-gold"
          >
            {s.glyph}
          </a>
        ))}
        <a
          href="/auth/signin"
          className="ml-1 hidden h-9 items-center rounded-full border border-white/25 bg-black/30 px-4 font-body text-[11px] font-bold uppercase tracking-[0.14em] text-parchment/90 backdrop-blur-sm transition hover:border-gold/60 hover:text-gold sm:flex"
        >
          Sign In
        </a>
      </div>

      {/* Play panel — floating bottom-right (the Mistfall move, with our three doors) */}
      <div className="absolute bottom-24 right-6 z-20 w-[300px] rounded-lg border border-white/15 bg-black/45 p-5 backdrop-blur-md sm:right-10">
        <div className="text-center">
          <div className="relative inline-block">
            <span className="font-display text-[19px] text-parchment">Play Now</span>
            <span className="absolute -bottom-1 left-1/2 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>
        </div>
        <a
          href="/play/"
          className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-md border border-gold/70 bg-gradient-to-b from-[#ffe6a4] via-[#e9aa3c] to-[#a95d18] font-body text-[12px] font-black uppercase tracking-[0.14em] text-[#160f07] shadow-[0_8px_30px_rgba(244,166,54,0.35)] transition hover:brightness-110"
        >
          ▶ Play in Browser
        </a>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <a
            href="https://download.hermes-world.ai/HermesWorld-Win-v2.3.zip"
            className="flex h-10 items-center justify-center gap-1.5 rounded-md border border-white/20 bg-white/5 font-body text-[10.5px] font-bold uppercase tracking-[0.1em] text-parchment/85 transition hover:border-gold/50 hover:text-gold"
          >
            Windows
          </a>
          <a
            href="https://download.hermes-world.ai/HermesWorld-Mac-v2.2.dmg"
            className="flex h-10 items-center justify-center gap-1.5 rounded-md border border-white/20 bg-white/5 font-body text-[10.5px] font-bold uppercase tracking-[0.1em] text-parchment/85 transition hover:border-gold/50 hover:text-gold"
          >
            Mac
          </a>
        </div>
        <div className="mt-3 text-center font-body text-[10px] uppercase tracking-[0.16em] text-parchment/50">
          Free · no install in browser
        </div>
      </div>

      {/* Live banner — bottom-center gold ribbon */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <div
          className="flex items-center gap-3 border border-gold/50 bg-black/60 px-7 py-2.5 backdrop-blur-sm"
          style={{
            clipPath:
              "polygon(14px 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 14px 100%, 0 50%)",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7dffad] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7dffad]" />
          </span>
          <span className="font-body text-[11.5px] font-black uppercase tracking-[0.22em] text-gold">
            {players !== null && players > 0
              ? `The world is live — ${players} in-world`
              : "The world is live — v2.0"}
          </span>
        </div>

        {/* $HERMESWORLD CA — click to copy */}
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(TOKEN_CA).then(() => {
              setCaCopied(true);
              setTimeout(() => setCaCopied(false), 1600);
            });
          }}
          className="group mx-auto mt-2.5 flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-4 py-1.5 backdrop-blur-sm transition hover:border-gold/50"
          title="Copy contract address"
        >
          <span className="font-body text-[9.5px] font-black uppercase tracking-[0.2em] text-gold/90">
            $HERMESWORLD CA
          </span>
          <code className="font-mono text-[10px] text-parchment/75 group-hover:text-parchment">
            {caCopied ? "Copied ✓" : `${TOKEN_CA.slice(0, 6)}…${TOKEN_CA.slice(-6)}`}
          </code>
          <a
            href={`https://pump.fun/coin/${TOKEN_CA}`}
            onClick={(e) => e.stopPropagation()}
            className="font-body text-[9.5px] font-bold uppercase tracking-[0.14em] text-parchment/50 transition hover:text-gold"
          >
            Chart ↗
          </a>
        </button>
      </div>

    </section>
  );
}
