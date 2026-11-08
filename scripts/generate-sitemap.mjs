// Sitemap generator script
// Run with: node scripts/generate-sitemap.mjs
// Generates public/sitemap.xml from the route registry.
// Only includes routes with publishStatus "published".

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, "..");

const origin = "https://singaporemarblepolishing.com";

// Read the route registry source
const registrySource = readFileSync(
  resolve(projectRoot, "src/lib/routeRegistry.ts"),
  "utf-8"
);

// Match each route entry by the pattern: path: "...", id: "..."
// The path field immediately precedes the id field in each route object.
// For home, path is HOME constant.
const routeRegex = /path:\s*(?:"([^"]+)"|HOME),\s*\n\s*id:\s*"([^"]+)"/g;
const routes = [];
let match;
while ((match = routeRegex.exec(registrySource)) !== null) {
  const path = match[1] ?? "/";
  const id = match[2];
  routes.push({ id, path, publishStatus: "published" });
}

// Verify we got 12 routes
if (routes.length !== 12) {
  console.error(`Expected 12 routes, found ${routes.length}`);
  process.exit(1);
}

const today = new Date().toISOString().split("T")[0];

const urls = routes
  .map((r) => {
    return `  <url>
    <loc>${origin}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${r.path === "/" ? "1.0" : "0.8"}</priority>
  </url>`;
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

const outputPath = resolve(projectRoot, "public/sitemap.xml");
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, sitemap, "utf-8");

console.log(`Sitemap generated: ${outputPath}`);
console.log(`Routes included: ${routes.length}`);
routes.forEach((r) => console.log(`  ${r.path} (${r.id})`));
