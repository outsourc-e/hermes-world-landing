import { useEffect, useState } from "react";

// HW_LANDINGV2: "The world is alive right now" strip — real data from the live game.
// Players endpoint: https://play.hermes-world.ai/api/players  {players, web, native}
type LiveStats = { players: number; web: number; native: number };

const FALLBACK: LiveStats = { players: 0, web: 0, native: 0 };

export function LiveWorld() {
  const [stats, setStats] = useState<LiveStats | null>(null);

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch("https://play.hermes-world.ai/api/players", { cache: "no-store" })
        .then((r) => r.json())
        .then((d) => alive && setStats({ ...FALLBACK, ...d }))
        .catch(() => alive && setStats(FALLBACK));
    load();
    const t = setInterval(load, 30_000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  const players = stats?.players ?? 0;

  return (
    <section className="relative border-y border-gold/15 bg-[#03090d]">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 py-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7dffad] opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#7dffad]" />
          </span>
          <span className="font-body text-[12px] font-bold uppercase tracking-[0.18em] text-[#7dffad]">
            World online
          </span>
        </div>

        <div className="font-body text-[13px] text-parchment/80">
          <span className="font-display text-[20px] text-gold">{players}</span>
          <span className="ml-2 uppercase tracking-[0.14em] text-[11px]">
            {players === 1 ? "adventurer in-world" : "adventurers in-world"}
          </span>
        </div>

        <div className="font-body text-[13px] text-parchment/80">
          <span className="font-display text-[20px] text-gold">4</span>
          <span className="ml-2 uppercase tracking-[0.14em] text-[11px]">regions live — US · SG · EU · HK</span>
        </div>

        <div className="font-body text-[13px] text-parchment/80">
          <span className="font-display text-[20px] text-gold">24/7</span>
          <span className="ml-2 uppercase tracking-[0.14em] text-[11px]">AI citizens walking the world</span>
        </div>
      </div>
    </section>
  );
}
