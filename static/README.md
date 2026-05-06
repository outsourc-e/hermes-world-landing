# HermesWorld Landing — Static

This is the production landing site for `hermes-world.ai`.

Deployed automatically by `.github/workflows/deploy.yml` to Cloudflare Pages
(project: `hermes-world`).

- `/` → landing page (`index.html`)
- `/play/` → playable game (`play/index.html` + `assets/play-standalone.js`)
- `/early-access.html` → name reservation
- `/hermes-world.html` → alias

To preview locally:

```bash
cd static
python3 -m http.server 5180
```

To deploy manually:

```bash
npx wrangler pages deploy static --project-name hermes-world --branch main
```
