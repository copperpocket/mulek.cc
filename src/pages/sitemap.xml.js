import { getCollection } from "astro:content";

export const prerender = true;

// Pages that aren't generated from a content collection
const staticPages = ["/", "/about", "/projects", "/blog", "/contact"];

export async function GET(context) {
  const posts = (await getCollection("blog")).map((post) => ({
    path: `/blog/${post.slug}`,
    lastmod: post.data.pubDate,
  }));

  const projects = (await getCollection("projects")).map((project) => ({
    path: `/projects/${project.slug}`,
    lastmod: project.data.pubDate,
  }));

  const entries = [...staticPages.map((path) => ({ path })), ...projects, ...posts]
    .map(({ path, lastmod }) => {
      const loc = `<loc>${new URL(path, context.site).href}</loc>`;
      const date = lastmod ? `<lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>` : "";
      return `  <url>${loc}${date}</url>`;
    })
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml" } },
  );
}
