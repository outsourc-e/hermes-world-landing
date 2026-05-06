import agentsImg from "@/assets/agents-section.png";

export function Agents() {
  return (
    <section id="agents" className="relative w-full bg-[#0a0f1a]">
      <div className="relative w-full max-w-[1536px] mx-auto">
        <img
          src={agentsImg}
          alt="Your agents live in the world with you — Agent Companions, Autonomous Actions, Offline Progression"
          className="w-full h-auto block"
          draggable={false}
        />

        {/* Manage Agents button overlay */}
        <a
          href="#agents"
          className="absolute cursor-pointer"
          style={{ top: "82%", left: "30%", width: "30%", height: "6%" }}
          aria-label="Manage Agents"
        />
      </div>
    </section>
  );
}
