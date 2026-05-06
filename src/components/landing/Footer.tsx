import { Sigil, WordmarkHorizontal } from "./Sigil";
import { Twitter, Github, MessageCircle } from "lucide-react";

const cols: Array<{
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}> = [
  {
    title: "World",
    links: [
      { label: "Enter the World", href: "https://hermes-world.ai/play/", external: true },
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
    <footer id="updates" className="border-t border-[#F1C56D]/10 bg-[#080910]">
      <div className="max-w-[1240px] mx-auto px-6 py-12 grid md:grid-cols-[1.2fr_1fr_1fr_1fr_1fr] gap-8 items-start">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <Sigil size={24} />
            <WordmarkHorizontal height={16} />
          </div>
          <p className="text-[11px] text-parchment/40 leading-relaxed font-body font-normal">
            Where invisible progress becomes play.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-[10px] uppercase tracking-[0.2em] text-gold font-semibold font-body mb-3">
              {c.title}
            </div>
            {c.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="block text-[12px] text-parchment/50 hover:text-gold transition-colors mb-1.5 font-body font-normal"
              >
                {l.label}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t border-[#F1C56D]/10 py-5 max-w-[1240px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="text-[10px] text-parchment/35 font-body">
          © 2026 HermesWorld. All rights reserved.
        </div>
        <div className="flex gap-4 text-parchment/40">
          <a href="https://discord.gg/clawd" target="_blank" rel="noreferrer" aria-label="Discord">
            <MessageCircle className="w-4 h-4 hover:text-gold transition-colors" />
          </a>
          <a href="https://x.com/buildingthefuture" target="_blank" rel="noreferrer" aria-label="X">
            <Twitter className="w-4 h-4 hover:text-gold transition-colors" />
          </a>
          <a
            href="https://github.com/outsourc-e"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4 hover:text-gold transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
}
