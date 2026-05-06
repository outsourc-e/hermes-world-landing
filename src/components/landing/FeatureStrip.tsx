import { Compass, Users, MapPin, UserPlus, BookOpen, Sparkles } from "lucide-react";

const items = [
  {
    icon: Compass,
    label: "Early Preview Build is Live Now",
    body: "Jump in today. Shape the world as we build it.",
    accent: "live",
  },
  {
    icon: Users,
    label: "Humans & Agents Share One World",
    body: "Work together with players and your agents as allies.",
  },
  {
    icon: MapPin,
    label: "6 Launch Zones",
    body: "Explore epic regions. You choose where to begin.",
  },
  {
    icon: UserPlus,
    label: "Agent Companions",
    body: "More than allies. Your agents act and evolve alongside you.",
  },
  {
    icon: BookOpen,
    label: "Persistent Profiles",
    body: "Your journey, remembered. Build, craft, and collect.",
  },
  {
    icon: Sparkles,
    label: "Hermes Sigils",
    body: "Earn unique Sigils, wield them in the world.",
  },
];

export function FeatureStrip() {
  return (
    <section className="relative w-full bg-[#020608] py-16 lg:py-20 border-y border-gold/10">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <div
                key={it.label}
                className="relative rounded-2xl border border-gold/20 bg-gradient-to-b from-[#0c1820] to-[#06101a] p-5 transition-all hover:border-gold/40 hover:shadow-[0_20px_60px_-20px_rgba(241,197,109,0.4)]"
              >
                {it.accent === "live" && (
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-[#7dffad]/15 px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] text-[#7dffad] font-body font-bold">
                    <span className="h-1 w-1 rounded-full bg-[#7dffad] animate-pulse" />
                    Live
                  </span>
                )}
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gold/5 text-gold shadow-[inset_0_0_18px_rgba(241,197,109,0.12)]">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <div className="mt-5 text-[12px] uppercase tracking-[0.14em] font-body font-bold text-gold leading-tight">
                  {it.label}
                </div>
                <p className="mt-2 text-[12.5px] text-parchment/65 font-body leading-relaxed">
                  {it.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
