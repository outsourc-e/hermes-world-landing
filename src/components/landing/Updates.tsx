import { Sparkles, MessageCircle, Twitter, ArrowRight } from "lucide-react";

type Update = {
  date: string;
  tag: "shipped" | "live" | "announce";
  title: string;
  body: string;
  links?: { label: string; href: string }[];
};

const tagStyles: Record<Update["tag"], { color: string; label: string }> = {
  shipped: { color: "#7dffad", label: "Shipped" },
  live: { color: "#78f0ff", label: "Live" },
  announce: { color: "#f4c66d", label: "Announce" },
};

const updates: Update[] = [
  {
    date: "May 6, 2026",
    tag: "shipped",
    title: "v0.2 — Mobile HUD, Touch Controls, Admin Studio",
    body:
      "Joystick + camera buckets on mobile, mobile-friendly HUD, live admin date picker, Founders Vault skeleton, and the start of public name reservations.",
    links: [
      {
        label: "Roadmap",
        href: "https://github.com/outsourc-e/hermes-workspace/blob/main/docs/hermesworld/PUBLIC-ROADMAP.md",
      },
    ],
  },
  {
    date: "May 5, 2026",
    tag: "live",
    title: "Public Playable Drops — hermes-world.ai/play",
    body:
      "First playable layer of HermesWorld is live. Six zones, Athena's onboarding quest, persistent sigils, and shared multiplayer presence — all in your browser.",
    links: [{ label: "Play now →", href: "/play/" }],
  },
  {
    date: "May 4, 2026",
    tag: "announce",
    title: "HermesWorld is the Agent MMO",
    body:
      "Day = you play. Night = your agent plays. We're building a persistent shared world where humans and AI agents quest, craft, and progress together.",
  },
];

export function Updates() {
  return (
    <section
      id="updates"
      className="relative w-full bg-[#020608] py-24 lg:py-32 border-t border-gold/15"
    >
      {/* Decorative top diamond */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rotate-45 border border-gold/40 bg-[#020608]" />

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16">
          {/* Left sidebar */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="text-[11px] uppercase tracking-[0.24em] text-gold font-body font-bold">
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5" />
                Updates · Build in Public
              </span>
            </div>
            <h2 className="mt-4 font-display text-[36px] lg:text-[52px] leading-[1.04] text-parchment">
              Building
              <br />
              HermesWorld
              <br />
              in the open.
            </h2>

            <div className="mt-7 mb-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" />
              <div className="h-2 w-2 rotate-45 border border-gold/60" />
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" />
            </div>

            <p className="text-[15px] text-parchment/70 font-body leading-relaxed">
              Every system, zone, and patch shipped publicly. Join the Discord
              for daily progress, vote on features, and become a Founder.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              <a
                href="https://discord.gg/mATfwmrsWx"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-gold/40 bg-gold/5 px-5 py-3 text-[12px] uppercase tracking-[0.14em] font-body font-bold text-gold backdrop-blur-sm transition-colors hover:bg-gold/10 hover:border-gold/60"
              >
                <MessageCircle className="h-4 w-4" />
                Join Discord
              </a>
              <a
                href="https://x.com/buildingthefuture"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-parchment/20 bg-parchment/[0.03] px-5 py-3 text-[12px] uppercase tracking-[0.14em] font-body font-semibold text-parchment/80 backdrop-blur-sm transition-colors hover:bg-parchment/10 hover:text-parchment"
              >
                <Twitter className="h-4 w-4" />
                Follow @buildingthefuture
              </a>
            </div>
          </div>

          {/* Right — updates feed */}
          <div className="space-y-4">
            {updates.map((u, i) => {
              const style = tagStyles[u.tag];
              return (
                <article
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-parchment/10 bg-gradient-to-b from-[#0c1820] to-[#06101a] p-6 transition-colors hover:border-gold/30"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] font-body font-bold"
                      style={{
                        background: `${style.color}15`,
                        color: style.color,
                        border: `1px solid ${style.color}40`,
                      }}
                    >
                      <span
                        className="h-1 w-1 rounded-full"
                        style={{ background: style.color }}
                      />
                      {style.label}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-parchment/45 font-body font-semibold">
                      {u.date}
                    </span>
                  </div>

                  <h3 className="font-display text-[22px] lg:text-[26px] leading-[1.15] text-parchment">
                    {u.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] text-parchment/70 font-body leading-relaxed">
                    {u.body}
                  </p>

                  {u.links && u.links.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {u.links.map((l) => (
                        <a
                          key={l.label}
                          href={l.href}
                          target={l.href.startsWith("http") ? "_blank" : undefined}
                          rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                          className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.12em] font-body font-bold text-gold hover:text-gold/80 transition-colors"
                        >
                          {l.label}
                          <ArrowRight className="h-3 w-3" />
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}

            <div className="pt-4 text-center">
              <a
                href="https://discord.gg/mATfwmrsWx"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.16em] text-parchment/50 hover:text-gold transition-colors font-body font-semibold"
              >
                See more in Discord
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
