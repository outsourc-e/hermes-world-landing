# LANDING_PR_DRAFT

Suggested PR title: `[V1.0] /play-webgl coming-soon + Windows build link`

## Audit summary

- Landing repo found at `/Users/aurora/hermes-world-landing-repo`.
- Git remote: `https://github.com/outsourc-e/hermes-world-landing.git`.
- Current branch during audit: `feat/name-reservations`.
- `/play-webgl/index.html` is the active coming-soon / V1 shipping page.
  - File mtime: May 20 02:39:43 2026, matching Aurora's 02:39 EDT promotion note.
  - Page title: `HermesWorld - Coming Soon`.
  - Player-facing CTA currently points to `https://github.com/outsourc-e/hermes-world-landing/releases`.
- `/play-webgl/index.unity-loader.html` is preserved as the Unity WebGL loader page.
  - It still references `Build/HermesWorld.loader.js`, `.data.gz`, `.framework.js.gz`, `.wasm.gz`, and `StreamingAssets`.
  - The `Build/` and `StreamingAssets/` directories exist but are currently empty in this working tree.
- `/play/index.html` is still in place as the free browser/Three.js demo entrypoint.
  - It loads `/assets/play-standalone.js`.
  - It remains separate from `/play-webgl`.
- `/play-classic` was not present in this working tree during audit.
  - Proposed follow-up: add a tiny redirect or copy route only if product wants `/play-classic` as the explicit stable URL for the free Three.js demo.

## Proposed changes for PR

- Keep `/play-webgl/index.html` as the coming-soon page for WebGL.
- Keep `/play-webgl/index.unity-loader.html` checked in as the preserved Unity loader entrypoint for when WebGL artifacts are ready.
- Keep `/play/index.html` as the free Three.js browser demo.
- Update the Windows build CTA once the `latest/` Windows artifact is zipped and uploaded.
- Optional: add `/play-classic/index.html` as a redirect/alias to `/play/` if we want the distinction to be explicit in URLs.

## Windows build link TODO

- TODO: upload zipped Windows build artifact from `latest/`.
- Once uploaded, replace the current generic GitHub releases CTA in `public/play-webgl/index.html` line 48:
  - Current: `https://github.com/outsourc-e/hermes-world-landing/releases`
  - Target: direct URL to the uploaded `latest/` Windows zip artifact, or the canonical release asset URL if GitHub Releases remains the distribution channel.

## Validation performed

- Located repo candidates under `/Users/aurora` and selected `/Users/aurora/hermes-world-landing-repo` because it has remote `outsourc-e/hermes-world-landing` and contains `public/play-webgl` plus `public/play`.
- Read `public/play-webgl/index.html` and confirmed coming-soon content.
- Read `public/play-webgl/index.unity-loader.html` and confirmed Unity loader is preserved.
- Read `public/play/index.html` and confirmed free browser demo entrypoint remains.
- Checked relevant file mtimes and relevant working-tree status.

## Commit guidance

- Read-only audit only; no source changes committed or pushed.
- If turning this into a PR, keep changes small:
  1. one commit for Windows build CTA URL update
  2. optional one commit for `/play-classic` alias/redirect
