import footerImg from "@/assets/footer-section.png";

export function FinalCTA() {
  return (
    <section id="updates" className="relative w-full bg-[#0a0f1a]">
      <div className="relative w-full max-w-[1536px] mx-auto">
        <img
          src={footerImg}
          alt="Build with agents in a world, not a chat box — HermesWorld"
          className="w-full h-auto block"
          draggable={false}
        />

        {/* Play Now button overlay */}
        <a
          href="https://hermes-world.ai/play/"
          className="absolute cursor-pointer"
          style={{ top: "40%", left: "30%", width: "18%", height: "9%" }}
          aria-label="Play Now"
        />

        {/* Watch Preview button overlay */}
        <a
          href="#preview"
          className="absolute cursor-pointer"
          style={{ top: "40%", left: "50%", width: "18%", height: "9%" }}
          aria-label="Watch Preview"
        />
      </div>
    </section>
  );
}
