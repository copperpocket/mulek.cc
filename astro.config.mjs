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

// https://astro.build/config
export default defineConfig({
  site: "https://mulek.cc",
  redirects,

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