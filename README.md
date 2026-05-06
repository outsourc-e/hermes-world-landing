# hermes-world.ai Landing

Lovable-exported landing page for **HermesWorld** — the Agentic MMO.

Live: <https://hermes-world.ai>

## What this repo is

This repo contains the marketing landing page for HermesWorld. The current implementation is a Lovable export built with TanStack Start, React 19, Vite, Tailwind CSS v4, and shadcn/Radix components.

The landing-page CTAs point users to the live playable world at:

- <https://hermes-world.ai/play/>

## Stack

- **Framework:** TanStack Start / TanStack Router
- **UI:** React 19, shadcn/ui, Radix primitives, lucide-react
- **Styling:** Tailwind CSS v4
- **Build:** Vite
- **Deploy target:** Cloudflare Pages / Cloudflare Workers-compatible build output

## Project structure

```text
src/
├── assets/          # Lovable-exported section artwork
├── components/
│   ├── landing/     # Landing page sections and clickable overlays
│   └── ui/          # shadcn/ui primitives
├── hooks/           # Shared hooks
├── lib/             # Utilities
├── routes/          # TanStack file routes
├── styles.css       # Design tokens and Tailwind theme
└── router.tsx       # Router configuration

public/
├── _headers         # Cloudflare Pages headers for static assets
├── assets/          # Legacy/prod static assets retained for social/brand paths
└── favicon.ico
```

## Local development

```bash
npm install
npm run dev
# open http://localhost:5173
```

## Checks

```bash
npm run lint
npm run build
```

## Cloudflare preview flow

The upstream repo is connected to Cloudflare Pages. Open changes as a PR against `outsourc-e/hermes-world-landing:main`; Cloudflare should attach a preview deployment to the PR for review before merge.

Do not push directly to `main`.

## Notes for collaborators

- This repo is landing-only. The playable world remains behind the `https://hermes-world.ai/play/` CTA.
- Keep private keys, tokens, and environment-specific secrets out of the repo.
- If deployment settings need adjustment, make them part of PR review rather than bypassing the protected `main` flow.
