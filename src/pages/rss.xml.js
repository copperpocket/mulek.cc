import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export const prerender = true;

export async function GET(context) {
  const posts = (await getCollection("blog")).map((post) => ({
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.pubDate,
    categories: post.data.tags,
    link: `/blog/${post.slug}`,
  }));

  const projects = (await getCollection("projects")).map((project) => ({
    title: project.data.title,
    description: project.data.description,
    pubDate: project.data.pubDate,
    categories: [project.data.category, ...project.data.tags],
    link: `/projects/${project.slug}`,
  }));

  return rss({
    title: "mulek.cc",
    description: "Blog posts and project write-ups on homelab infrastructure, self-hosting, and development by Michael Scott Mulek.",
    site: context.site,
    trailingSlash: false,
    items: [...posts, ...projects].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()),
  });
}
