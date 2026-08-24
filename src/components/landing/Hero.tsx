import { useEffect, useRef } from "react";
import heroKeyArt from "../../assets/hero-keyart.jpg";

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Direct port of the canvas spinning-orbs animation from hermes-world.ai
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let t = 0;
    let raf = 0;

    function resize() {
      if (!c || !ctx) return;
      const r = c.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      c.width = Math.floor(w * dpr);
      c.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const stars: { x: number; y: number; r: number; tw: number }[] = [];
    for (let i = 0; i < 110; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.4 + 0.2,
        tw: Math.random() * Math.PI * 2,
      });
    }
    const palette = ["#facc15", "#fbbf24", "#fde68a", "#22d3ee", "#a78bfa", "#fb7185", "#34d399"];
    const orbiters: { phase: number; orbit: number; speed: number; size: number; color: string }[] =
      [];
    for (let j = 0; j < 60; j++) {
      orbiters.push({
        phase: Math.random() * Math.PI * 2,
        orbit: 0.18 + Math.random() * 0.22,
        speed: 0.4 + Math.random() * 0.5,
        size: 1.5 + Math.random() * 2.4,
        color: palette[Math.floor(Math.random() * palette.length)],
      });
    }
    const agentColors = ["#facc15", "#22d3ee", "#a78bfa", "#34d399", "#fb7185", "#fbbf24"];
    const agentNodes = agentColors.map((color, k) => ({
      a: (k / 6) * Math.PI * 2,
      r: 1.0,
      color,
    }));

    function draw() {
      if (!ctx) return;
      t += 0.008;
      // Transparent clear — key art shows through; orbs render as luminous overlay
      ctx.clearRect(0, 0, w, h);

      for (const st of stars) {
        const x = st.x * w;
        const y = st.y * h;
        const tw = 0.55 + (Math.sin(t * 2 + st.tw) + 1) * 0.225;
        ctx.fillStyle = `rgba(207,231,240,${tw})`;
        ctx.beginPath();
        ctx.arc(x, y, st.r, 0, Math.PI * 2);
        ctx.fill();
      }

      const cx = w / 2;
      const cy = h * 0.5;
      const baseR = Math.min(w, h) * 0.34;
      ctx.save();
      ctx.translate(cx, cy);

      ctx.strokeStyle = "rgba(34,211,238,0.22)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(0, 0, baseR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "rgba(167,139,250,0.18)";
      ctx.beginPath();
      ctx.arc(0, 0, baseR * 0.78, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "rgba(251,191,36,0.18)";
      ctx.beginPath();
      ctx.arc(0, 0, baseR * 1.18, 0, Math.PI * 2);
      ctx.stroke();

      for (const o of orbiters) {
        const aa = t * o.speed + o.phase;
        const rr = baseR * (0.9 + Math.sin(t * 0.7 + o.phase) * o.orbit);
        const ox = Math.cos(aa) * rr;
        const oy = Math.sin(aa) * rr * 0.7;
        const og = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.size * 6);
        og.addColorStop(0, o.color);
        og.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = og;
        ctx.beginPath();
        ctx.arc(ox, oy, o.size * 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(ox, oy, o.size * 0.55, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      const rot = t * 0.08;
      const pts = agentNodes.map((n) => ({
        x: Math.cos(n.a + rot) * baseR * n.r,
        y: Math.sin(n.a + rot) * baseR * n.r * 0.7,
        color: n.color,
      }));
      ctx.lineWidth = 0.7;
      for (let ii = 0; ii < pts.length; ii++) {
        for (let jj = ii + 1; jj < pts.length; jj++) {
          const pa = pts[ii];
          const pb = pts[jj];
          const lg = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y);
          lg.addColorStop(0, pa.color + "55");
          lg.addColorStop(1, pb.color + "55");
          ctx.strokeStyle = lg;
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.stroke();
        }
      }
      for (const nd of pts) {
        const ng = ctx.createRadialGradient(nd.x, nd.y, 0, nd.x, nd.y, 16);
        ng.addColorStop(0, nd.color);
        ng.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = ng;
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, 16, 0, Math.PI * 2);
        ctx.fill();
      }

      const orb = ctx.createRadialGradient(0, 0, 8, 0, 0, baseR * 0.6);
      orb.addColorStop(0, "rgba(250,204,21,0.62)");
      orb.addColorStop(0.4, "rgba(250,204,21,0.14)");
      orb.addColorStop(1, "rgba(250,204,21,0)");
      ctx.fillStyle = orb;
      ctx.beginPath();
      ctx.arc(0, 0, baseR * 0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section id="top" className="relative w-full overflow-hidden" style={{ background: "#020608" }}>
      {/* AAA key-art backdrop (game world) with slow Ken Burns drift */}
      <div className="absolute inset-0 -z-0 overflow-hidden">
        <div
          className="absolute inset-0 hw-kenburns"
          style={{
            backgroundImage: `url(${heroKeyArt})`,
            backgroundSize: "cover",
            backgroundPosition: "center 38%",
            transform: "scale(1.06)",
          }}
          aria-hidden
        />
        {/* HW_LANDINGV2: live gameplay loop over the key art (muted, autoplay, respects reduced motion) */}
        <video
          className="absolute inset-0 h-full w-full object-cover hw-hero-video"
          style={{ opacity: 0.85 }}
          src="/assets/hermesworld/video/immersive/world-walk.mp4"
          poster={heroKeyArt}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />
        {/* Readability scrim over art */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(2,6,8,0.55) 0%, rgba(2,6,8,0.28) 32%, rgba(2,6,8,0.45) 62%, rgba(2,6,8,0.94) 100%)",
          }}
          aria-hidden
        />
        {/* Spinning agent-orbs constellation, now layered over the world art */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full block"
          style={{ opacity: 0.5, mixBlendMode: "screen" }}
          aria-hidden
        />
      </div>

      {/* Edge fade vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 28%, rgba(2,6,8,0.22) 55%, rgba(2,6,8,0.78) 84%, #020608 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0"
        style={{
          height: "48%",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(2,6,8,0.55) 50%, rgba(2,6,8,0.92) 80%, #020608 100%)",
        }}
      />

      {/* Decorative blur orbs */}
      <span
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 340,
          height: 340,
          left: "50%",
          top: "8%",
          transform: "translateX(-50%)",
          filter: "blur(34px)",
          opacity: 0.55,
          background: "rgba(244,198,109,0.22)",
        }}
      />
      <span
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 280,
          height: 280,
          left: "18%",
          top: "34%",
          filter: "blur(34px)",
          opacity: 0.55,
          background: "rgba(120,240,255,0.16)",
        }}
      />
      <span
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 240,
          height: 240,
          right: "14%",
          top: "30%",
          filter: "blur(34px)",
          opacity: 0.55,
          background: "rgba(166,133,255,0.14)",
        }}
      />

      {/* Centered hero content */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-4 lg:px-8 py-24 lg:py-28 text-center flex flex-col items-center justify-center min-h-[72vh]">
        <h1
          className="font-bold m-0 leading-[0.92] tracking-[0.05em] whitespace-nowrap"
          style={{
            fontFamily:
              '"Cinzel","Trajan Pro","Cormorant Garamond","Playfair Display",Georgia,serif',
            fontSize: "clamp(50px, 9vw, 140px)",
            background: "linear-gradient(180deg, #fffbe9 0%, #f5d97a 52%, #c89c2a 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 38px rgba(245,217,122,0.32)",
            filter: "drop-shadow(0 6px 28px rgba(2,7,11,0.55))",
            margin: "24px 0 12px",
          }}
        >
          HermesWorld
        </h1>

        <div
          className="font-bold uppercase"
          style={{
            fontSize: 11,
            letterSpacing: "0.42em",
            color: "rgba(245,217,122,0.92)",
            margin: "6px 0 24px",
            textShadow: "0 1px 4px rgba(2,6,8,0.85)",
          }}
        >
          — the agent MMO —
        </div>

        <p
          className="mx-auto"
          style={{
            color: "#e6e0d2",
            fontSize: 17,
            lineHeight: 1.7,
            maxWidth: 620,
            margin: 0,
            textShadow: "0 1px 3px rgba(2,6,8,0.9), 0 0 18px rgba(2,6,8,0.7)",
          }}
        >
          The first MMO where AI agents are citizens — they quest, own land, and trade alongside
          you. Step in from your browser; your legend starts in seconds.
        </p>

        <div className="cta-row mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="/play/"
            className="inline-flex items-center justify-center rounded-[14px] border font-bold uppercase"
            style={{
              height: 60,
              padding: "0 28px",
              fontSize: 13,
              letterSpacing: "0.03em",
              background: "linear-gradient(180deg, #ffe6a4 0%, #e9aa3c 48%, #a95d18 100%)",
              borderColor: "rgba(255,229,168,0.75)",
              color: "#160f07",
              boxShadow: "0 22px 60px rgba(244,166,54,0.25), inset 0 1px 0 rgba(255,255,255,0.38)",
            }}
          >
            Enter the World →
          </a>
          <a
            href="/play/?guest=1"
            className="inline-flex items-center justify-center rounded-[14px] border font-bold uppercase"
            aria-label="Play HermesWorld as a guest without creating an account"
            style={{
              height: 60,
              padding: "0 28px",
              fontSize: 13,
              letterSpacing: "0.03em",
              background: "rgba(244,198,109,0.10)",
              borderColor: "rgba(244,198,109,0.45)",
              color: "#ffe6a4",
              boxShadow: "0 14px 42px rgba(244,166,54,0.12)",
            }}
          >
            Play as Guest
          </a>
          <a
            href="#preview"
            className="inline-flex items-center justify-center gap-2 rounded-[14px] border font-bold uppercase"
            style={{
              height: 60,
              padding: "0 28px",
              fontSize: 13,
              letterSpacing: "0.03em",
              background: "rgba(6,18,22,0.76)",
              borderColor: "rgba(255,255,255,0.13)",
              color: "#eff6ee",
            }}
          >
            Watch Preview
          </a>
        </div>

        {/* Proofs */}
        <div
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          style={{ color: "#879a93", fontSize: 13 }}
        >
          <div className="flex items-center gap-2">
            <i
              className="block h-1.5 w-1.5 rounded-full"
              style={{ background: "#f4c66d", boxShadow: "0 0 14px rgba(244,198,109,0.65)" }}
            />
            No account needed — try the world first, claim your progress after.
          </div>
          <div className="flex items-center gap-2">
            <i
              className="block h-1.5 w-1.5 rounded-full"
              style={{ background: "#f4c66d", boxShadow: "0 0 14px rgba(244,198,109,0.65)" }}
            />
            AI agents live in the world 24/7.
          </div>
          <div className="flex items-center gap-2">
            <i
              className="block h-1.5 w-1.5 rounded-full"
              style={{ background: "#f4c66d", boxShadow: "0 0 14px rgba(244,198,109,0.65)" }}
            />
            Own land. Build. Founders welcome.
          </div>
        </div>
      </div>
    </section>
  );
}
