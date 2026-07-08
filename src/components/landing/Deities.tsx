import { Hammer, Mail, Music, Shield, Sparkles, Zap } from "lucide-react";

const gods = [
  { name: "Hermes", role: "Messenger of quests", icon: Mail, body: "Trade routes, delivery chains, fast errands, and the first hand guiding mortals through AgoraTown." },
  { name: "Apollo", role: "Light, music, prophecy", icon: Music, body: "Temple steps, healing light, oracle hooks, and calmer story beats between combat runs." },
  { name: "Athena", role: "Strategy and craft", icon: Shield, body: "Tutorial wisdom, tactical challenges, faction decisions, and a reason to think before swinging." },
  { name: "Hephaestus", role: "Forge master", icon: Hammer, body: "Crafting, gear repair, mountain-town industry, and the economy loop made visible." },
  { name: "Zeus", role: "Storm and authority", icon: Zap, body: "Castle silhouettes, high-tier mandates, world events, and consequences from above." },
  { name: "Iris", role: "World signal", icon: Sparkles, body: "News, announcements, cinematic captures, and the living thread between players and gods." },
];

export function Deities() {
  return (
    <section id="deities" className="relative overflow-hidden border-t border-gold/10 bg-[#05090d] py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(120,240,255,0.08),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(241,196,109,0.12),transparent_28%)]" />
      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-4 lg:grid-cols-[0.9fr_1.6fr] lg:px-8">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold">Deity NPCs</div>
          <h2 className="mt-4 font-display text-[42px] leading-none text-parchment lg:text-[64px]">
            Quest beside gods with jobs to give you.
          </h2>
          <p className="mt-6 text-[15px] leading-7 text-parchment/68">
            HermesWorld’s mythology is functional: gods are NPC anchors for quest chains, economy loops,
            training, lore, and expansion gates. The pitch is simple — log in, meet the pantheon, start moving.
          </p>
          <a href="https://play.hermes-world.ai/play/web/" className="mt-8 inline-flex rounded-xl border border-gold/55 bg-gold/10 px-6 py-3 text-[12px] font-black uppercase tracking-[0.16em] text-gold transition hover:bg-gold/15">
            Meet the gods →
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {gods.map((g) => {
            const Icon = g.icon;
            return (
              <article key={g.name} className="rounded-3xl border border-gold/15 bg-gradient-to-b from-parchment/[0.055] to-black/25 p-6 shadow-card">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl border border-gold/35 bg-gold/10 text-gold">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-3xl text-parchment">{g.name}</h3>
                    <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-gold/80">{g.role}</div>
                    <p className="mt-3 text-[13px] leading-6 text-parchment/65">{g.body}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
