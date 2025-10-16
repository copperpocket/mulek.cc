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

export const collections = {
  blog: blogCollection,
};
// You can define more collections here if needed