import { Download, Gamepad2, MonitorPlay, Star } from "lucide-react";
import heroArt from "../../assets/expansion-teaser-hero.png";

export function SteamCTA() {
  return (
    <section id="steam" className="relative overflow-hidden border-t border-gold/10 bg-[#05090d] py-24 lg:py-32">
      <div className="absolute inset-0 opacity-30">
        <img src={heroArt} alt="" className="h-full w-full object-cover blur-[2px]" />
        <div className="absolute inset-0 bg-[#020608]/80" />
      </div>
      <div className="relative mx-auto max-w-[1120px] px-4 text-center lg:px-8">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#78f0ff]/25 bg-[#061922]/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#bdf8ff]">
          <Star className="h-3.5 w-3.5 fill-current" /> Steam App 4841120
        </div>
        <h2 className="mt-6 font-display text-[46px] leading-none text-parchment lg:text-[78px]">
          Wishlist HermesWorld on Steam.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-8 text-parchment/70">
          Browser playable today, native Alpha downloadable now, Steam presence coming online for the next wave.
          If the pitch lands, the button should be obvious: play, download, wishlist.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="https://store.steampowered.com/app/4841120/HermesWorld/" className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-[#78f0ff]/45 bg-[#0b2230] px-7 text-[13px] font-black uppercase tracking-[0.12em] text-[#d8fbff] transition hover:border-[#78f0ff] hover:bg-[#0f2d3d]">
            <Star className="h-4 w-4" /> Wishlist on Steam
          </a>
          <a href="https://play.hermes-world.ai/play/web/" className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-gold/50 bg-gold/10 px-7 text-[13px] font-black uppercase tracking-[0.12em] text-gold transition hover:bg-gold/15">
            <MonitorPlay className="h-4 w-4" /> Play Browser
          </a>
          <a href="/download/" className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-parchment/20 bg-black/35 px-7 text-[13px] font-black uppercase tracking-[0.12em] text-parchment transition hover:border-parchment/45">
            <Download className="h-4 w-4" /> Download Alpha
          </a>
        </div>
        <div className="mt-8 inline-flex items-center gap-2 text-xs text-parchment/45">
          <Gamepad2 className="h-4 w-4" /> Greek myth MMORPG · WebGL + native Alpha · no token-first pitch
        </div>
      </div>
    </section>
  );
}
