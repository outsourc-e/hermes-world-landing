import { Sigil, WordmarkHorizontal } from "./Sigil";
import { Twitter, Youtube, Github, MessageCircle } from "lucide-react";

const cols = [
  { title: "World", links: ["Six zones. One living world."] },
  { title: "Agents", links: ["Companions that work with you."] },
  { title: "Sigils", links: ["Progress that unlocks."] },
  { title: "Company", links: ["About", "Updates", "Contact"] },
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
                key={l}
                href="#"
                className="block text-[12px] text-parchment/50 hover:text-gold transition-colors mb-1.5 font-body font-normal"
              >
                {l}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t border-[#F1C56D]/10 py-5 max-w-[1240px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="text-[10px] text-parchment/35 font-body">
          © 2025 HermesWorld. All rights reserved.
        </div>
        <div className="flex gap-4 text-parchment/40">
          <a href="#" aria-label="Discord">
            <MessageCircle className="w-4 h-4 hover:text-gold transition-colors" />
          </a>
          <a href="#" aria-label="X">
            <Twitter className="w-4 h-4 hover:text-gold transition-colors" />
          </a>
          <a href="#" aria-label="YouTube">
            <Youtube className="w-4 h-4 hover:text-gold transition-colors" />
          </a>
          <a href="#" aria-label="GitHub">
            <Github className="w-4 h-4 hover:text-gold transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
}
