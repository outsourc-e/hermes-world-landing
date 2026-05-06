# hermes-world.ai Landing

Production landing page for **HermesWorld** — the Agentic MMO.

Live: <https://hermes-world.ai>

## What this repo is

A static landing site (single `index.html` + assets) deployed to Cloudflare Pages.

```
public/
├── index.html              # Main landing
├── early-access.html       # Backup early-access entry
├── hermes-world.html       # Backup landing variant
├── _headers                # Cloudflare Pages headers
├── _redirects              # Cloudflare Pages redirects
├── manifest.json           # PWA manifest
├── favicon.svg
├── hermesworld-logo.svg
├── apple-touch-icon.png
├── social-preview.png
├── robots.txt
└── assets/hermesworld/
    ├── art/                # Logos, sigils, hero/world graphics
    ├── video/              # Hero/preview videos
    └── zones/              # Zone screenshots (Agora, Forge, etc.)
```

## Local preview

```bash
cd public && python3 -m http.server 5173
# open http://localhost:5173
```

Or with any static server:

```bash
npx serve public
```

## Deploy

Connected to **Cloudflare Pages** project `hermes-world` deploying from `main`.

- **Production:** `hermes-world.ai` (apex + `www` → CNAME `hermes-world.pages.dev`)
- **Preview:** `*.hermes-world.pages.dev`
- **Build command:** *(none — static)*
- **Output directory:** `public`

## How to contribute

1. Fork this repo or create a branch off `main`.
2. Edit `public/index.html` and/or assets in `public/assets/hermesworld/`.
3. Open a PR. Each PR gets a Cloudflare Pages preview URL automatically.
4. After review, we merge to `main` → live in ~30s.

### Style references

The HermesWorld visual system uses:

- **Palette:**
  - GOLD `#F1C56D`
  - BRONZE `#B8862B`
  - PARCHMENT `#F4E9D3`
  - VERDIGRIS `#2E6A63`
  - MIDNIGHT `#0F1622`
  - SLATE `#1B2433`
  - STONE `#8A8F98`
  - OBSIDIAN `#0A0D12`
- **Type:** Canela / Instrument Serif (display) + Inter / Söhne (UI)
- **Vibe:** premium dark fantasy MMO, warm golden-hour, verdigris glow, no off-palette neons or pure flat black.

### Notes for collaborators

- This repo is **landing-only**. The actual game runs on a separate origin and is embedded via the `Play` CTA.
- Keep changes static. No build pipeline yet — if you want to add Tailwind / a bundler, propose it in an issue first so we agree on the toolchain.
- Don't commit private keys or environment-specific URLs. Use placeholders if needed.

---

Maintained by [@outsourc-e](https://github.com/outsourc-e). Issues / suggestions welcome.
