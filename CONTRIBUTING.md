# Contributing to hermes-world.ai

## Workflow

1. Branch from `main`.
2. Make changes in the Lovable/TanStack source under `src/`.
3. Run local checks:

```bash
npm install
npm run lint
npm run build
```

4. Push your branch and open a PR against `outsourc-e/hermes-world-landing:main`.
5. Use the Cloudflare Pages PR preview for visual review.
6. Merge only after review/approval. Do not push directly to `main`.

## Local development

```bash
npm install
npm run dev
# open http://localhost:5173
```

## Style system

- Vibe: premium dark fantasy MMO, warm golden-hour, verdigris glow.
- Avoid generic SaaS visuals, off-palette neon, and pure flat black.
- Keep the landing-page CTAs pointed at the playable world: `https://hermes-world.ai/play/`.

## Assets

- Lovable-exported section artwork lives in `src/assets/`.
- Existing production/social/brand assets are retained in `public/assets/hermesworld/` for stable URLs.
- Optimize new large assets before committing.

## What not to do

- Do not commit secrets, private keys, or local environment files.
- Do not merge your own PR without review.
- Do not change Cloudflare production settings as part of ordinary content/design changes unless explicitly agreed in review.
