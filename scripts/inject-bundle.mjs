import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";

const distClient = resolve("dist/client");
const indexHtml = resolve(distClient, "index.html");

const assets = readdirSync(resolve(distClient, "assets"));
const indexBundles = assets
  .filter((f) => /^index-[A-Za-z0-9_-]+\.js$/.test(f))
  .map((f) => ({
    name: f,
    size: statSync(resolve(distClient, "assets", f)).size,
  }));

if (indexBundles.length === 0) {
  console.error("No index-*.js bundle found");
  process.exit(1);
}

indexBundles.sort((a, b) => b.size - a.size);
const entryBundle = indexBundles[0].name;

let html = readFileSync(indexHtml, "utf-8");
html = html.replace(
  /<script[^>]+src="\/src\/main\.tsx"[^>]*><\/script>/,
  `<script type="module" src="/assets/${entryBundle}"></script>`,
);
html = html.replace(
  "</head>",
  `    <link rel="modulepreload" href="/assets/${entryBundle}" />\n  </head>`,
);

writeFileSync(indexHtml, html, "utf-8");
console.log(`✓ index.html rewired to /assets/${entryBundle}`);
