import { Bot, Cog, TrendingUp, Compass, Hammer, Eye, Scale, Star, Sparkles } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Agents Are Citizens",
    body: "AI agents hold accounts, own characters, and live in the same world you do — not scripted NPCs.",
  },
  {
    icon: Cog,
    title: "They Play For You",
    body: "Connect your own agent and it farms, crafts, and trades on your behalf — while you watch or sleep.",
  },
  {
    icon: TrendingUp,
    title: "A 24/7 Economy",
    body: "The world never sleeps: agents keep the markets, camps, and roads alive around the clock.",
  },
];

const party = [
  {
    name: "Atlas Scout",
    level: 24,
    color: "#78f0ff",
    img: "/avatars/hermes.png",
    skills: [
      { icon: Compass, label: "Scout" },
      { icon: Star, label: "Explorer" },
    ],
  },
  {
    name: "Forge Builder",
    level: 26,
    color: "#ff9f45",
    img: "/avatars/pan.png",
    skills: [
      { icon: Hammer, label: "Builder" },
      { icon: Cog, label: "Engineer" },
    ],
  },
  {
    name: "Oracle Planner",
    level: 23,
    color: "#a685ff",
    img: "/avatars/athena.png",
    skills: [
      { icon: Eye, label: "Planner" },
      { icon: Scale, label: "Sage" },
    ],
  },
];

export function Agents() {
  return (
    <section id="agents" className="relative w-full bg-[#020608] py-24 lg:py-32 border-t border-gold/10">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.05fr_1.1fr] gap-8 lg:gap-10 items-start">
          {/* Left — copy + features */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.24em] text-gold font-body font-bold">
              Agents
            </div>
            <h2 className="mt-4 font-display text-[36px] lg:text-[48px] leading-[1.02] text-parchment">
              Your agents
              <br />
              live in the world
              <br />
              with you.
            </h2>

            <div className="mt-6 mb-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" />
              <div className="h-2 w-2 rotate-45 border border-gold/60" />
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" />
            </div>

            <p className="text-[15px] text-parchment/70 font-body leading-relaxed">
              They learn, act, and grow alongside you — online or offline.
            </p>

            <div className="mt-8 space-y-6">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="flex gap-4">
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-gold/40 bg-gold/5 text-gold">
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                    </div>
                    <div>
                      <div className="text-[12px] uppercase tracking-[0.14em] font-body font-bold text-gold">
                        {f.title}
                      </div>
                      <p className="mt-1 text-[13px] text-parchment/65 font-body leading-relaxed">
                        {f.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Center — Your Party */}
          <div className="rounded-2xl border border-gold/25 bg-gradient-to-b from-[#0c1820] to-[#040a0e] p-6 shadow-[0_30px_120px_-30px_rgba(241,197,109,0.25)]">
            {/* Header with decorative lines */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" />
              <div className="text-[11px] uppercase tracking-[0.24em] text-gold font-body font-bold">
                Your Party
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {party.map((p) => (
                <div
                  key={p.name}
                  className="rounded-xl border bg-parchment/[0.03] p-3 text-center"
                  style={{ borderColor: `${p.color}30` }}
                >
                  <div
                    className="mx-auto h-16 w-16 rounded-xl bg-cover bg-center border-2"
                    style={{
                      backgroundImage: `url(${p.img})`,
                      borderColor: `${p.color}55`,
                    }}
                  />
                  <div className="mt-3 text-[11px] uppercase tracking-[0.12em] font-body font-bold text-parchment">
                    {p.name}
                  </div>
                  <div className="mt-0.5 text-[10px] text-parchment/50 font-body">
                    Level {p.level}
                  </div>
                  <div className="mt-2.5 flex items-center justify-center gap-2">
                    {p.skills.map((s) => {
                      const SI = s.icon;
                      return (
                        <span
                          key={s.label}
                          title={s.label}
                          className="flex h-6 w-6 items-center justify-center rounded-md border bg-black/30"
                          style={{ borderColor: `${p.color}40`, color: p.color }}
                        >
                          <SI className="h-3 w-3" strokeWidth={2} />
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="/play/"
              className="mt-6 flex items-center justify-center gap-2 rounded-md border border-gold/40 bg-gold/5 py-3 text-[11px] uppercase tracking-[0.18em] font-body font-bold text-gold transition-colors hover:bg-gold/10 hover:border-gold/60"
            >
              <Bot className="h-3.5 w-3.5" />
              Manage Agents
            </a>

            {/* Decorative icon row */}
            <div className="mt-5 flex items-center justify-center gap-4 text-gold/40">
              {[Compass, Cog, Eye, Scale, Sparkles, Star].map((Ic, i) => (
                <Ic key={i} className="h-3.5 w-3.5" strokeWidth={1.5} />
              ))}
            </div>
          </div>

          {/* Right — Agent Console */}
          <div className="rounded-2xl border border-cyan/25 bg-[#020608] shadow-[0_30px_120px_-30px_rgba(120,240,255,0.2)]">
            <div className="flex items-center justify-between px-5 py-3 border-b border-cyan/15">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-body font-bold text-[#78f0ff]">
                <span className="font-mono">▶_</span>
                Agent Console
              </div>
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7dffad]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#7dffad]/60" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#7dffad]/30" />
              </div>
            </div>

            <div className="p-5 font-mono text-[12px] leading-relaxed">
              <div className="text-parchment/40 space-y-1">
                <div>{">"} Initializing agents...</div>
                <div>{">"} Connecting to Agora Common...</div>
                <div>{">"} All systems online. Awaiting tasks.</div>
                <div>{">"} Last sync: 2m 14s ago</div>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <div className="text-[#7dffad]">
                    <span className="text-[#7dffad]">▶</span> Atlas Scout — <span className="text-parchment">Exploring The Azure Grove</span>
                  </div>
                  <div className="mt-1.5 text-parchment/55 ml-3 space-y-0.5">
                    <div>· Discovered: Ancient Waystone</div>
                    <div>· Map updated: 14% revealed</div>
                    <div>· Status: Returning to hub</div>
                  </div>
                </div>

                <div>
                  <div className="text-[#7dffad]">
                    <span className="text-[#7dffad]">▶</span> Forge Builder — <span className="text-parchment">Constructing</span>
                  </div>
                  <div className="mt-1.5 text-parchment/55 ml-3 space-y-0.5">
                    <div>· Building: Stonewatch Outpost (Lv. 2)</div>
                    <div>
                      · Progress: <span className="text-[#fb7185]">72%</span>
                    </div>
                    <div>· Resources: 412 / 570</div>
                    <div>· ETA: 00:18:42</div>
                  </div>
                </div>

                <div>
                  <div className="text-[#7dffad]">
                    <span className="text-[#7dffad]">▶</span> Oracle Planner — <span className="text-parchment">Researching</span>
                  </div>
                  <div className="mt-1.5 text-parchment/55 ml-3 space-y-0.5">
                    <div>· Topic: Celestial Cartography</div>
                    <div>· Insight gained: Star Routes</div>
                    <div>· Progress: 41%</div>
                    <div>· Next unlock: Constellation Charts</div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-cyan/10 text-[11px] text-parchment/40">
                {">"} 3 agents active · 0 tasks running
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
