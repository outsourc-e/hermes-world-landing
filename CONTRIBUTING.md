# Contributing to hermes-world.ai

## Quick start

```bash
git clone https://github.com/outsourc-e/hermes-world-landing.git
cd hermes-world-landing
cd public && python3 -m http.server 5173
# open http://localhost:5173
```

## Workflow

1. Branch from `main`: `git checkout -b feat/your-change`
2. Edit `public/index.html` and/or assets in `public/assets/hermesworld/`
3. Push branch: `git push -u origin feat/your-change`
4. Open a PR. Cloudflare Pages auto-deploys a preview URL on every PR.
5. After 1 approval → merge → live in ~30s.

## Style system

- Palette + typography in `README.md`.
- Vibe: premium dark fantasy MMO, warm golden-hour, verdigris glow.
- Avoid neon, pure black, generic SaaS dashboards, off-palette accents.

## Asset guidelines

- Use existing assets from `public/assets/hermesworld/art/` when possible.
- New assets should be optimized: PNG via `pngquant`/`oxipng`, JPEG quality 80-85, video H.264 1-3 Mbps.
- Hero/preview videos belong in `public/assets/hermesworld/video/`.

## What NOT to do

- Don't commit secrets or environment URLs.
- Don't add a build pipeline without proposing in an issue first.
- Don't refactor `public/index.html` into a framework without alignment.

## Questions

Open an issue with the `question` label or reach out via Discord.
