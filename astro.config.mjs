// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import node from "@astrojs/node";
import { readdirSync } from "node:fs";

// Old URLs, sent to their current home with a 301. Project write-ups used to be blog posts, and blog URLs
// used to end in .md.
const slugs = (dir) => readdirSync(new URL(`./src/content/${dir}`, import.meta.url)).filter((f) => f.endsWith(".md")).map((f) => f.slice(0, -3));
const redirects = {};
for (const slug of slugs("blog")) redirects[`/blog/${slug}.md`] = { status: 301, destination: `/blog/${slug}` };
for (const slug of slugs("projects")) {
  redirects[`/blog/${slug}`] = { status: 301, destination: `/projects/${slug}` };
  redirects[`/blog/${slug}.md`] = { status: 301, destination: `/projects/${slug}` };
}

// Tables with three or more columns turn into stacked cards on phones (see .table-stack in global.css). Each cell
// carries its column's heading in data-label so the card can show it.
const textOf = (node) => (node.value ?? "") + (node.children ?? []).map(textOf).join("");
const rowsOf = (node) => (node.children ?? []).filter((c) => c.tagName === "tr");
const cellsOf = (row) => (row.children ?? []).filter((c) => c.tagName === "th" || c.tagName === "td");
function labelTables(node) {
  if (node.tagName === "table") {
    const sections = (node.children ?? []).filter((c) => c.tagName === "thead" || c.tagName === "tbody");
    const head = sections.find((s) => s.tagName === "thead");
    const labels = head && rowsOf(head)[0] ? cellsOf(rowsOf(head)[0]).map((c) => textOf(c).trim()) : [];
    if (labels.length >= 3) {
      node.properties = { ...node.properties, className: [...(node.properties?.className ?? []), "table-stack"] };
      for (const section of sections.filter((s) => s.tagName === "tbody")) {
        for (const row of rowsOf(section)) cellsOf(row).forEach((cell, i) => (cell.properties = { ...cell.properties, "data-label": labels[i] ?? "" }));
      }
    }
  }
  (node.children ?? []).forEach(labelTables);
}
const rehypeTableLabels = () => labelTables;

// https://astro.build/config
export default defineConfig({
  site: "https://mulek.cc",
  redirects,

  markdown: {
    rehypePlugins: [rehypeTableLabels],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  output: 'server',
  adapter: node({
    mode: "standalone",
  }),
  server: {
    host: true, // Same as --host 0.0.0.0
    allowedHosts: ['mulek.cc'],
  },
});