import { Play } from "lucide-react";

export function FinalCTA() {
  return (
    <section
      id="updates"
      className="relative w-full overflow-hidden border-t border-gold/15 bg-gradient-to-b from-[#061116] via-[#040b10] to-[#020608] py-24 lg:py-32"
    >
      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-40 left-[10%] h-[500px] w-[500px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(241,197,109,0.4) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 right-[10%] h-[500px] w-[500px] rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(120,240,255,0.4) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-[1100px] mx-auto px-4 lg:px-8 text-center">
        <div className="text-[11px] uppercase tracking-[0.24em] text-gold font-body font-bold">
          Final Call to Adventure
        </div>
        <h2 className="mt-4 font-display text-[40px] lg:text-[64px] leading-[1.04] text-parchment">
          Build with agents in a world,
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-[#F8DE9A] via-[#E8B85C] to-[#B68A4A] bg-clip-text text-transparent">
            not a chat box.
          </span>
        </h2>
        <p className="mt-6 mx-auto max-w-2xl text-[16px] lg:text-[18px] text-parchment/70 font-body leading-relaxed">
          Enter HermesWorld and explore the first playable layer of Hermes
          Workspace: zones, quests, companions, sigils, and persistent agent
          progression.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/play/"
            className="group inline-flex items-center gap-2 rounded-md border border-gold bg-gradient-to-r from-[#F6D98A] via-[#E8B85C] to-[#B68A4A] px-7 py-4 text-[12px] uppercase tracking-[0.14em] font-body font-bold text-obsidian shadow-[0_8px_30px_-8px_rgba(241,196,109,0.7)] transition-all hover:brightness-110 hover:shadow-[0_8px_40px_-6px_rgba(241,196,109,0.9)]"
          >
            Play Now →
          </a>
          <a
            href="#preview"
            className="inline-flex items-center gap-2 rounded-md border border-parchment/30 bg-parchment/5 px-6 py-4 text-[12px] uppercase tracking-[0.14em] font-body font-semibold text-parchment backdrop-blur-sm transition-colors hover:bg-parchment/10"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            Watch Preview
          </a>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-3 gap-3 max-w-[420px] mx-auto">
          <div className="rounded-xl border border-parchment/10 bg-parchment/[0.03] p-4">
            <div className="font-display text-[26px] text-parchment">6</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.14em] font-body font-bold text-parchment/50">
              Launch zones
            </div>
          </div>
          <div className="rounded-xl border border-parchment/10 bg-parchment/[0.03] p-4">
            <div className="font-display text-[26px] text-parchment">3</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.14em] font-body font-bold text-parchment/50">
              Agent roles
            </div>
          </div>
          <div className="rounded-xl border border-parchment/10 bg-parchment/[0.03] p-4">
            <div className="font-display text-[26px] text-parchment">∞</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.14em] font-body font-bold text-parchment/50">
              Quest loops
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
