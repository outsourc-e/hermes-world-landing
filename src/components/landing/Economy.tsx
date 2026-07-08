import { Coins, Pickaxe, ShoppingBag, Sprout } from "lucide-react";
import farmImage from "@/assets/zone-demeters-rest.jpg";
import forgeImage from "@/assets/zone-forgehollow.jpg";

const loops = [
  { icon: Sprout, title: "Farm", body: "Harvest fields and reagents in Demeter’s Rest." },
  { icon: Pickaxe, title: "Gather", body: "Mine, forage, and bring materials back from the wild." },
  { icon: ShoppingBag, title: "Trade", body: "Move goods through vendors, players, and market systems." },
  { icon: Coins, title: "Build value", body: "Craft gear, upgrade tools, and make the economy feel real." },
];

export function Economy() {
  return (
    <section id="economy" className="border-t border-gold/10 bg-[#020608] py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="relative min-h-[560px] overflow-hidden rounded-[2rem] border border-gold/20 bg-black shadow-[0_40px_140px_-50px_rgba(241,196,109,0.35)]">
          <img src={farmImage} alt="HermesWorld farming district" className="absolute inset-0 h-2/3 w-full object-cover" />
          <img src={forgeImage} alt="HermesWorld forge district" className="absolute bottom-0 right-0 h-1/2 w-3/4 rounded-tl-[2rem] border-l border-t border-gold/20 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020608]/30 to-[#020608]" />
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-gold/20 bg-black/62 p-5 backdrop-blur-md">
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">Economy hook</div>
            <p className="mt-2 text-sm leading-6 text-parchment/78">
              Farming is not scenery. It feeds crafting, trading, upgrades, and the social reason to return tomorrow.
            </p>
          </div>
        </div>

        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold">Farming + player economy</div>
          <h2 className="mt-4 font-display text-[42px] leading-none text-parchment lg:text-[66px]">
            The cozy loop that makes the MMO stick.
          </h2>
          <p className="mt-6 text-[15px] leading-7 text-parchment/68">
            Between mythic fights, players need a reason to linger: harvest routes, crafting stations,
            vendors, trade, and progression that feels earned. HermesWorld’s economy pitch stays in-world —
            resources, gear, land, services, and players doing useful things.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {loops.map((l) => {
              const Icon = l.icon;
              return (
                <div key={l.title} className="rounded-2xl border border-gold/15 bg-parchment/[0.035] p-5">
                  <Icon className="h-5 w-5 text-gold" />
                  <h3 className="mt-4 text-xl font-semibold text-parchment">{l.title}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-parchment/62">{l.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
