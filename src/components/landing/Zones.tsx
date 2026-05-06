import zonesImg from "@/assets/zones-section.png";

export function Zones() {
  return (
    <section id="world" className="relative w-full bg-[#0a0f1a]">
      <div className="relative w-full max-w-[1536px] mx-auto">
        <img
          src={zonesImg}
          alt="Six zones. One persistent agent world — Training Grounds, Forge, Agora, Grove, Oracle, Arena"
          className="w-full h-auto block"
          draggable={false}
        />

        {/* Explore the Map button overlay */}
        <a
          href="#world"
          className="absolute cursor-pointer"
          style={{ top: "63%", left: "3%", width: "22%", height: "6%" }}
          aria-label="Explore the Map"
        />
      </div>
    </section>
  );
}
