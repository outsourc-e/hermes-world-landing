// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import fs from "node:fs";
import path from "node:path";

/**
 * Dev middleware: serve /play/ from public/play/ before TanStack router
 * intercepts the route. In production, Cloudflare Pages serves
 * public/play/index.html directly.
 */
function playPassthrough() {
  return {
    name: "play-passthrough",
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        const url = req.url || "";
        if (url === "/play" || url === "/play/") {
          const html = fs.readFileSync(
            path.resolve(__dirname, "public/play/index.html"),
            "utf-8",
          );
          res.setHeader("content-type", "text/html; charset=utf-8");
          res.end(html);
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  vite: {
    plugins: [playPassthrough()],
    server: {
      // Allow public tunnels (cloudflared, ngrok, etc.) to proxy the dev site
      allowedHosts: [
        ".trycloudflare.com",
        ".ngrok.io",
        ".ngrok-free.app",
        ".loca.lt",
        "localhost",
        "127.0.0.1",
      ],
    },
  },
});
