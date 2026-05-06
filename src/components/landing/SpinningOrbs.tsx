// Decorative animated orbs for the HermesWorld hero.
// Pure CSS — three layered gradient discs, slow counter-rotating, gold/cyan glow.

export function SpinningOrbs() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Big gold orb, top-right of hero */}
      <div
        className="absolute -top-[10%] right-[-8%] h-[55vw] w-[55vw] max-h-[700px] max-w-[700px] rounded-full opacity-[0.42] blur-[6px] mix-blend-screen"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(241,197,109,0.0) 0deg, rgba(241,197,109,0.85) 60deg, rgba(184,134,43,0.55) 140deg, rgba(241,197,109,0.0) 220deg, rgba(241,197,109,0.0) 360deg)",
          animation: "hw-orb-spin 38s linear infinite",
          filter: "blur(40px)",
        }}
      />

      {/* Cyan/verdigris orb, lower-left */}
      <div
        className="absolute bottom-[-12%] left-[-10%] h-[48vw] w-[48vw] max-h-[620px] max-w-[620px] rounded-full opacity-[0.38] blur-[4px] mix-blend-screen"
        style={{
          background:
            "conic-gradient(from 180deg, rgba(46,106,99,0.0) 0deg, rgba(46,106,99,0.95) 90deg, rgba(98,192,182,0.65) 180deg, rgba(46,106,99,0.0) 280deg)",
          animation: "hw-orb-spin-rev 52s linear infinite",
          filter: "blur(50px)",
        }}
      />

      {/* Tight inner shimmer orb, behind hero text */}
      <div
        className="absolute left-1/2 top-1/2 h-[28vw] w-[28vw] max-h-[360px] max-w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.28] mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(241,197,109,0.55) 0%, rgba(241,197,109,0.10) 40%, rgba(46,106,99,0.0) 70%)",
          animation: "hw-orb-pulse 7s ease-in-out infinite",
          filter: "blur(10px)",
        }}
      />

      {/* keyframes injected once */}
      <style>{`
        @keyframes hw-orb-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes hw-orb-spin-rev {
          to { transform: rotate(-360deg); }
        }
        @keyframes hw-orb-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1);   opacity: 0.28; }
          50%      { transform: translate(-50%, -50%) scale(1.12); opacity: 0.40; }
        }
      `}</style>
    </div>
  );
}
