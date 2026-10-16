import { z, defineCollection } from "astro:content";

// Define the "blog" collection
const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default("Michael Mulek"),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(), // optional image field
  }),
});

// Filter buttons on /projects appear in this order
export const projectCategories = ["WebDev", "DevOps", "GameDev"] as const;

// Define the "projects" collection: card info in frontmatter, write-up in the body
const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(), // shown on the card and as the meta description
    pubDate: z.date(),
    category: z.enum(projectCategories),
    tags: z.array(z.string()), // tech stack chips
    url: z.string().url().optional(), // live site, if there is one
    github: z.string().url().optional(),
    image: z.string().optional(), // card image, path under public/
    current: z.boolean().optional(), // shown as "Current Project" on the home page
  }),
});

export const collections = {
  blog: blogCollection,
  projects: projectsCollection,
};
