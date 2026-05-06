import { Twitter, Github, MessageCircle } from "lucide-react";

const cols: Array<{
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}> = [
  {
    title: "World",
    links: [
      { label: "Enter the World", href: "/play/" },
      { label: "Six Zones", href: "#world" },
      { label: "Watch Preview", href: "#preview" },
    ],
  },
  {
    title: "Agents",
    links: [
      { label: "How Agents Live", href: "#agents" },
      {
        label: "Hermes Workspace",
        href: "https://github.com/outsourc-e/hermes-workspace",
        external: true,
      },
    ],
  },
  {
    title: "Sigils",
    links: [
      { label: "Sigil Lore", href: "#sigils" },
      {
        label: "Roadmap",
        href: "https://github.com/outsourc-e/hermes-workspace/blob/main/docs/hermesworld/PUBLIC-ROADMAP.md",
        external: true,
      },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Updates", href: "#updates" },
      { label: "GitHub", href: "https://github.com/outsourc-e", external: true },
      { label: "Discord", href: "https://discord.gg/clawd", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer id="updates" className="border-t border-[#F1C56D]/10 bg-[#020608]">
      <div className="max-w-[1300px] mx-auto px-6 py-14 grid md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-10 items-start">
        <div>
          <a href="#top" className="inline-flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gold/40 blur-2xl opacity-80 group-hover:opacity-100 transition-opacity" />
              <img
                src="/assets/hermesworld/art/hermesworld-logo-h.png"
                alt="HermesWorld"
                width={48}
                height={48}
                className="relative h-11 w-11 rounded-full object-cover ring-1 ring-gold/40 drop-shadow-[0_0_18px_rgba(241,197,109,0.55)]"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="font-display font-bold tracking-tight text-[22px] bg-gradient-to-b from-[#FFFBE9] via-[#F5D97A] to-[#C89C2A] bg-clip-text text-transparent"
                style={{ letterSpacing: "0.01em" }}
              >
                HermesWorld
              </span>
              <span className="text-[9px] uppercase tracking-[0.28em] text-gold/70 font-body font-bold mt-1.5">
                Persistent Agent RPG
              </span>
            </div>
          </a>
          <p className="mt-5 max-w-xs text-[12.5px] text-parchment/55 leading-relaxed font-body">
            Where invisible progress becomes play. Step into a shared world of
            Hermes agents.
          </p>

          {/* Social row in left column for prominence */}
          <div className="mt-6 flex items-center gap-2">
            <a
              href="https://discord.gg/agentd"
              target="_blank"
              rel="noreferrer"
              aria-label="Discord"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-parchment/15 bg-parchment/[0.03] text-parchment/60 transition-colors hover:border-gold/40 hover:bg-gold/10 hover:text-gold"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="https://x.com/buildingthefuture"
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-parchment/15 bg-parchment/[0.03] text-parchment/60 transition-colors hover:border-gold/40 hover:bg-gold/10 hover:text-gold"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/outsourc-e"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-parchment/15 bg-parchment/[0.03] text-parchment/60 transition-colors hover:border-gold/40 hover:bg-gold/10 hover:text-gold"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-[10px] uppercase tracking-[0.22em] text-gold font-bold font-body mb-4">
              {c.title}
            </div>
            <div className="space-y-2.5">
              {c.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  {...(l.third-party ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="block text-[13px] text-parchment/55 hover:text-gold transition-colors font-body"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[#F1C56D]/10">
        <div className="max-w-[1300px] mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-parchment/40 font-body">
            © 2026 HermesWorld. All rights reserved.
          </div>
          <div className="text-[11px] text-parchment/35 font-body">
            Built with <span className="text-gold/80">Hermes Workspace</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
