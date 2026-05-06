import sigilsImg from "@/assets/sigils-section.png";

export function Sigils() {
  return (
    <section id="sigils" className="relative w-full bg-[#0a0f1a]">
      <div className="relative w-full max-w-[1536px] mx-auto">
        <img
          src={sigilsImg}
          alt="Collect Hermes Sigils as you unlock the world — Unlocks, Agent Progression, Quests, Cosmetics + Lore"
          className="w-full h-auto block"
          draggable={false}
        />
      </div>
    </section>
  );
}
