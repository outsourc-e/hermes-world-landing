import { Unlock, Trophy, Scroll, Sparkles } from "lucide-react";
import sigilArt from "@/assets/sigil-pedestal.jpg";

const pillars = [
  {
    icon: Unlock,
    title: "Unlocks",
    body: "Open zones, panes, capabilities, and world systems as you progress.",
  },
  {
    icon: Trophy,
    title: "Agent Progression",
    body: "Upgrade companion abilities, tools, loadouts, and memory depth.",
  },
  {
    icon: Scroll,
    title: "Quests",
    body: "Convert goals into trackable quests with receipts, outcomes, and history.",
  },
  {
    icon: Sparkles,
    title: "Cosmetics + Lore",
    body: "Customize the player, companions, banners, and world profile.",
  },
];

export function Sigils() {
  return (
    <section id="sigils" className="relative w-full bg-[#0a0f1a] py-24 lg:py-32 border-t border-gold/10">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-center">
          {/* Left — copy */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.24em] text-gold font-body font-bold">
              In-world Progression
            </div>
            <h2 className="mt-4 font-display text-[40px] lg:text-[60px] leading-[1.04] text-parchment">
              Collect Hermes Sigils as you unlock the world.
            </h2>
            <p className="mt-5 text-[16px] text-parchment/70 font-body leading-relaxed">
              Hermes Sigils are progression artifacts earned through quests,
              agent upgrades, world exploration, and system mastery. They make
              invisible agent progress visible.
            </p>
            <p className="mt-3 text-[15px] text-parchment/55 font-body leading-relaxed">
              Game-native lore and progression — not financial promises. The
              point is to make work feel earned, remembered, and alive.
            </p>
          </div>

          {/* Right — sigil art */}
          <div className="relative">
            <div
              className="aspect-square w-full max-w-[500px] mx-auto rounded-full overflow-hidden border border-gold/40 shadow-[0_0_120px_rgba(241,197,109,0.35)]"
              style={{ background: "radial-gradient(circle at 36% 28%, #fff0ba, #e8ad44 38%, #8f541b 69%, #251407)" }}
            >
              <img
                src={sigilArt}
                alt="Hermes Sigil"
                className="h-full w-full object-cover opacity-70 mix-blend-multiply"
              />
            </div>
            {/* Glow ring */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="aspect-square w-full max-w-[480px] rounded-full border border-gold/20 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Pillars row */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-2xl border border-parchment/10 bg-parchment/[0.02] p-6 transition-colors hover:border-gold/30"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/30 bg-gold/5 text-gold shadow-[inset_0_0_18px_rgba(241,197,109,0.08)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-5 text-[12px] uppercase tracking-[0.14em] font-body font-bold text-gold">
                  {p.title}
                </div>
                <p className="mt-2 text-[13px] text-parchment/65 font-body leading-relaxed">
                  {p.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
