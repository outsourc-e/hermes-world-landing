// HW_LANDINGV2: Play-your-way section — Web / Windows / Mac as equal citizens.
// Version labels come from one constant so they can't silently rot; when the
// launcher/manifest ships, swap VERSIONS for a fetch of the release manifest.

const VERSIONS = {
  web: "v2.0",
  windows: "v2.0",
  mac: "v2.0",
};

const CARDS = [
  {
    key: "web",
    title: "Play in Browser",
    version: VERSIONS.web,
    desc: "No download, no install. Your legend starts in seconds — straight from this page.",
    href: "/play/",
    cta: "Play Now",
    highlight: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 0 1 0 18M12 3a15.3 15.3 0 0 0 0 18" />
      </svg>
    ),
  },
  {
    key: "windows",
    title: "Windows Client",
    version: VERSIONS.windows,
    desc: "Full native performance for serious sessions. DX12, uncapped framerate.",
    href: "https://download.hermes-world.ai/HermesWorld-Setup-v1.3.exe",
    cta: "Download for Windows",
    highlight: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 5.5 10.5 4.4v7.1H3zM12 4.2 21 3v8.5h-9zM3 13.5h7.5v7.1L3 19.5zM12 13.5h9V21l-9-1.2z" />
      </svg>
    ),
  },
  {
    key: "mac",
    title: "Mac Client",
    version: VERSIONS.mac,
    desc: "Apple Silicon native. Right-click → Open on first launch.",
    href: "https://download.hermes-world.ai/mac/HermesWorld-Mac-v2.0.dmg",
    cta: "Download for Mac",
    highlight: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth="1.5">
        <path d="M15.5 8.5c-1.8 0-2.6 1.1-3.9 1.1-1.3 0-2.3-1.1-3.9-1.1C5.7 8.5 4 10.2 4 13c0 3.6 2.6 7.5 4.6 7.5 1 0 1.6-.7 3-.7s1.9.7 3 .7c2 0 4.4-3.8 4.4-6.6-2.5-1.2-2.9-4.4-.5-5.6-.9-1.2-2.1-1.8-3-1.8z" />
        <path d="M14.8 3.2c.5-.7.9-1.6.7-2.7-.9.1-1.9.7-2.5 1.4-.5.7-.9 1.6-.7 2.6 1 0 1.9-.6 2.5-1.3z" />
      </svg>
    ),
  },
];

export function PlayYourWay() {
  return (
    <section id="play-your-way" className="relative bg-[#020608] py-20 lg:py-28">
      <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
        <div className="text-center">
          <div className="font-body text-[11px] font-bold uppercase tracking-[0.42em] text-gold/80">
            One world · three doors
          </div>
          <h2 className="mt-4 font-display text-[36px] leading-[1.05] text-parchment lg:text-[54px]">
            Play your way
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] font-body text-[15px] leading-relaxed text-parchment/70">
            Same world, same character, same economy — whether you step in from a browser tab or a
            native client.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {CARDS.map((c) => (
            <a
              key={c.key}
              href={c.href}
              className={`group relative flex flex-col rounded-2xl border p-7 transition ${
                c.highlight
                  ? "border-gold/60 bg-gold/[0.07] shadow-[0_0_60px_rgba(241,197,109,0.14)] hover:bg-gold/[0.11]"
                  : "border-gold/20 bg-white/[0.02] hover:border-gold/40 hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gold/5 text-gold">
                  {c.icon}
                </div>
                <span className="rounded-full border border-gold/30 bg-[#020608]/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-gold/90">
                  {c.version}
                </span>
              </div>
              <div className="mt-5 font-display text-[22px] text-parchment">{c.title}</div>
              <p className="mt-2 flex-1 font-body text-[13px] leading-relaxed text-parchment/65">
                {c.desc}
              </p>
              <div
                className={`mt-6 inline-flex h-11 items-center justify-center rounded-xl border font-body text-[12px] font-black uppercase tracking-[0.12em] transition ${
                  c.highlight
                    ? "border-gold/70 bg-gradient-to-b from-[#ffe6a4] via-[#e9aa3c] to-[#a95d18] text-[#160f07]"
                    : "border-gold/40 bg-gold/10 text-gold group-hover:bg-gold/15"
                }`}
              >
                {c.cta} →
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
