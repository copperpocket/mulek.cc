// Draws the link preview image (1200x630) for every project write-up into public/images/projects/<slug>.png.
// Run it with `yarn project-previews` after adding a project or changing a title or category. It needs
// Microsoft Edge or Chrome for the screenshot: set EDGE_PATH if the browser isn't in a usual place.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const projectsDir = join(root, "src/content/projects");
const outDir = join(root, "public/images/projects");
const font = (pkg, file) => pathToFileURL(join(root, "node_modules/@fontsource-variable", pkg, "files", file)).href;

const browser = [
  process.env.EDGE_PATH,
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((p) => p && existsSync(p));
if (!browser) throw new Error("No Edge or Chrome found. Set EDGE_PATH to its executable.");

// The logos, forced to their dark-mode colors (the screenshot browser reports a light color scheme)
const svg = (name) => readFileSync(join(root, "public/images/logo", name), "utf8").replace(/<style>[\s\S]*?<\/style>/, "");
const mark = svg("mark.svg");
const wordmark = svg("wordmark.svg");

function frontmatter(file) {
  const text = readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const block = text.match(/^---\n([\s\S]*?)\n---/)[1];
  const get = (key) => block.match(new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, "m"))?.[1];
  return { title: get("title"), category: get("category"), year: get("pubDate")?.slice(0, 4) };
}

// The same sky for the same slug every time, so rerunning doesn't change an image
function rng(seed) {
  let h = 1779033703 ^ seed.length;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 3432918353), (h = (h << 13) | (h >>> 19));
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

const HORIZON = 465;
function sky(slug) {
  const rand = rng(slug);
  let out = "";
  for (let i = 0; i < 170; i++) {
    const x = rand() * 1200;
    const y = rand() * (HORIZON - 10);
    const r = 0.5 + rand() * 1.1;
    const rare = rand();
    const color = rare > 0.93 ? "#b574d8" : rare > 0.88 ? "#9792e3" : "#cfcfd6";
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="${color}" opacity="${(0.15 + rand() * 0.6).toFixed(2)}"/>`;
  }
  // The grid: lines meeting at the horizon, and rows that bunch up toward it
  for (let i = -12; i <= 12; i++) out += `<line x1="600" y1="${HORIZON}" x2="${600 + i * 150}" y2="630" stroke="#9792e3" stroke-opacity="0.16"/>`;
  for (let t = 1; t <= 8; t++) {
    const y = HORIZON + 165 * (t / 8) ** 2;
    out += `<line x1="0" y1="${y.toFixed(1)}" x2="1200" y2="${y.toFixed(1)}" stroke="#9792e3" stroke-opacity="0.16"/>`;
  }
  return out;
}

function page({ slug, title, category, year }) {
  const size = title.length <= 22 ? 92 : title.length <= 32 ? 76 : 62;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Outfit; src: url("${font("outfit", "outfit-latin-wght-normal.woff2")}"); font-weight: 100 900; }
@font-face { font-family: Mono; src: url("${font("jetbrains-mono", "jetbrains-mono-latin-wght-normal.woff2")}"); font-weight: 100 800; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; overflow: hidden; background: #0c0c0c; position: relative; }
svg.sky { position: absolute; inset: 0; }
.text { position: absolute; left: 96px; right: 96px; top: 0; height: ${HORIZON}px; display: flex; flex-direction: column; justify-content: center; gap: 22px; }
.mark { height: 58px; }
.mark svg { height: 100%; display: block; }
.mark .ink, .wordmark .ink { stroke: #9792e3; } .mark .cursor, .wordmark .star { fill: oklch(65% 0.17 317.7); }
h1 { font: 700 ${size}px/1.05 Outfit; color: #f2f2f2; letter-spacing: -0.01em; text-wrap: balance; }
.meta { font: 500 26px Mono; letter-spacing: 0.12em; text-transform: uppercase; color: #9792e3; }
.wordmark { height: 40px; margin-top: 10px; }
.wordmark svg { height: 100%; display: block; }
</style></head><body>
<svg class="sky" width="1200" height="630" viewBox="0 0 1200 630">${sky(slug)}</svg>
<div class="text">
<div class="mark">${mark}</div>
<h1>${title.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</h1>
<div class="meta">${category} · ${year}</div>
<div class="wordmark">${wordmark}</div>
</div></body></html>`;
}

mkdirSync(outDir, { recursive: true });
const work = mkdtempSync(join(tmpdir(), "project-previews-"));
try {
  for (const name of readdirSync(projectsDir).filter((f) => f.endsWith(".md"))) {
    const slug = name.slice(0, -3);
    const meta = frontmatter(join(projectsDir, name));
    const html = join(work, `${slug}.html`);
    writeFileSync(html, page({ slug, ...meta }));
    execFileSync(browser, [
      "--headless",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      "--window-size=1200,630",
      "--virtual-time-budget=3000",
      `--screenshot=${join(outDir, `${slug}.png`)}`,
      pathToFileURL(html).href,
    ], { stdio: "ignore" });
    console.log(`public/images/projects/${slug}.png  (${meta.title})`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
