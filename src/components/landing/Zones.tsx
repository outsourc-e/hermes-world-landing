import { Compass, Hammer, Users, TreePine, Eye, Swords, Wheat, Anchor, Castle } from "lucide-react";
import zoneTraining from "@/assets/zone-training.jpg";
import zoneForge from "@/assets/zone-forge.jpg";
import zoneAgora from "@/assets/zone-agora.jpg";
import zoneGrove from "@/assets/zone-grove.jpg";
import zoneOracle from "@/assets/zone-oracle.jpg";
import zoneArena from "@/assets/zone-arena.jpg";
import zoneDemetersRest from "@/assets/zone-demeters-rest.jpg";
import zoneTridentLanding from "@/assets/zone-tridentlanding.jpg";
import zoneForgeHollow from "@/assets/zone-forgehollow.jpg";

const zones = [
  {
    name: "Demeter's Rest",
    blurb: "Golden farmland east of the Agora. Harvest, trade, and earn your first deed. (New — in-game screenshot)",
    color: "#f4c66d",
    img: zoneDemetersRest,
    icon: Wheat,
  },
  {
    name: "TridentLanding",
    blurb: "Poseidon's harbor town. Boats, nets, a rowdy tavern — and Medusa in the coves. (New — in-game screenshot)",
    color: "#78f0ff",
    img: zoneTridentLanding,
    icon: Anchor,
  },
  {
    name: "ForgeHollow & Zeus's Castle",
    blurb: "Hephaestus' mountain town beneath the castle on the ridge. Ore, golems, and the Great Forge. (New — in-game screenshot)",
    color: "#ff9f45",
    img: zoneForgeHollow,
    icon: Castle,
  },
  {
    name: "Training Grounds",
    blurb: "Train your agent. Master skills and refine your craft.",
    color: "#78f0ff",
    img: zoneTraining,
    icon: Compass,
  },
  {
    name: "Forge",
    blurb: "Forge tools and upgrade gear. Equip for deeper runs.",
    color: "#ff9f45",
    img: zoneForge,
    icon: Hammer,
  },
  {
    name: "Agora",
    blurb: "Meet, trade, and form alliances within the world.",
    color: "#f4c66d",
    img: zoneAgora,
    icon: Users,
  },
  {
    name: "Grove",
    blurb: "Gather resources, harvest reagents, and craft with care.",
    color: "#7dffad",
    img: zoneGrove,
    icon: TreePine,
  },
  {
    name: "Oracle",
    blurb: "Seek insight, unlock lore, and reveal what lies ahead.",
    color: "#a685ff",
    img: zoneOracle,
    icon: Eye,
  },
  {
    name: "Arena",
    blurb: "Hone skills, and compete in challenges that test mastery.",
    color: "#ff7d56",
    img: zoneArena,
    icon: Swords,
  },
];

export function Zones() {
  return (
    <section id="world" className="relative w-full bg-[#020608] py-24 lg:py-32 border-t border-gold/15">
      {/* Decorative top diamond */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rotate-45 border border-gold/40 bg-[#020608]" />

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16">
          {/* Left sidebar */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="text-[11px] uppercase tracking-[0.24em] text-gold font-body font-bold">
              Six Zones · One World
            </div>
            <h2 className="mt-4 font-display text-[36px] lg:text-[52px] leading-[1.04] text-parchment">
              Six zones.
              <br />
              One persistent
              <br />
              agent world.
            </h2>

            {/* Diamond divider */}
            <div className="mt-7 mb-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" />
              <div className="h-2 w-2 rotate-45 border border-gold/60" />
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" />
            </div>

            <p className="text-[15px] text-parchment/70 font-body leading-relaxed">
              Each zone has its own systems, NPCs, quests, and mood. Travel
              between them — your sigil progress carries everywhere.
            </p>

            <a
              href="/play/"
              className="mt-8 inline-flex items-center gap-2 rounded-md border border-gold/40 bg-gold/5 px-6 py-3.5 text-[12px] uppercase tracking-[0.14em] font-body font-bold text-gold backdrop-blur-sm transition-colors hover:bg-gold/10 hover:border-gold/60"
            >
              <Compass className="h-4 w-4" />
              Explore the Map
            </a>
          </div>

          {/* Right grid 2x3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {zones.map((z) => {
              const Icon = z.icon;
              return (
                <div
                  key={z.name}
                  className="group relative overflow-hidden rounded-2xl border bg-[#091319] min-h-[320px]"
                  style={{ borderColor: `${z.color}33` }}
                >
                  <img
                    src={z.img}
                    alt={z.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    style={{ filter: "saturate(1.05) brightness(0.7)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/90" />
                  <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-end p-5">
                    <div
                      className="inline-flex items-center gap-2 mb-3"
                      style={{ color: z.color }}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                      <span className="text-[10px] uppercase tracking-[0.18em] font-body font-bold">
                        Zone
                      </span>
                    </div>
                    <h3
                      className="font-display text-[22px] uppercase leading-[1.05] tracking-wide"
                      style={{ color: z.color }}
                    >
                      {z.name}
                    </h3>
                    <p className="mt-2 text-[12.5px] text-parchment/75 font-body leading-relaxed">
                      {z.blurb}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Decorative bottom diamond */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-3 w-3 rotate-45 border border-gold/40 bg-[#020608]" />
    </section>
  );
}
