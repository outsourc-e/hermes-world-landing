import zoneAgora from "../../assets/zone-agora.jpg";
import zoneForge from "../../assets/zone-forge.jpg";
import zoneGrove from "../../assets/zone-grove.jpg";
import zoneTrident from "../../assets/zone-tridentlanding.jpg";

// HW_LANDINGV2: the actual game loop, shown not told.
const STEPS = [
  {
    n: "01",
    title: "Venture",
    desc: "Cross Hermes Harbor into the wilds — mist-cloaked forests, spider dens, bridge caves. Every region hand-built, every mob a fight.",
    img: zoneTrident,
  },
  {
    n: "02",
    title: "Harvest & Craft",
    desc: "Copper veins, timber stands, wild fiber. Pull resources from the world and forge them into gear at the anvil.",
    img: zoneForge,
  },
  {
    n: "03",
    title: "Trade",
    desc: "Auction house, merchants, player-to-player deals. A real economy with real scarcity — gold means something here.",
    img: zoneAgora,
  },
  {
    n: "04",
    title: "Walk with Gods",
    desc: "Zeus, Athena, Hermes, Hades — the Olympians hold court in the world. Earn their favor. Or their attention.",
    img: zoneGrove,
  },
];

export function GameLoop() {
  return (
    <section id="gameloop" className="relative bg-[#03090d] py-20 lg:py-28">
      <div className="mx-auto max-w-[1160px] px-4 lg:px-8">
        <div className="text-center">
          <div className="font-body text-[11px] font-bold uppercase tracking-[0.42em] text-gold/80">
            The loop
          </div>
          <h2 className="mt-4 font-display text-[36px] leading-[1.05] text-parchment lg:text-[54px]">
            A living world, not a lobby
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="group relative overflow-hidden rounded-2xl border border-gold/20 bg-[#020608]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(2,6,8,0.05) 30%, rgba(2,6,8,0.55) 68%, rgba(2,6,8,0.96) 100%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="font-mono text-[11px] tracking-[0.3em] text-gold/70">{s.n}</div>
                  <div className="mt-1 font-display text-[24px] text-parchment">{s.title}</div>
                  <p className="mt-2 font-body text-[12.5px] leading-relaxed text-parchment/70">
                    {s.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
