---
title: "My First Blog Post"
description: "This is an example post for the Astro blog."
pubDate: 2025-10-15
author: "Michael Mulek"
tags: ["astro", "blog"]
image: "/images/blog-placeholder.jpg" # optional
---

## Welcome to the Blog!

This is a simple paragraph written in **Markdown**.

Now that you have this file, your blog index (`src/pages/blog/index.astro`) should successfully fetch it and display a link.

### Quick Checklist:

1.  **File Location:** Is the file at **`src/pages/blog/first-post.md`**?
2.  **Layout Path:** Does the `layout` path (`../../layouts/BlogPostLayout.astro`) correctly point to your blog post layout component? If you don't have a specific blog post layout, you can temporarily change this to your main layout:
    ```markdown
    layout: ../../layouts/MainLayout.astro 
    ```
    (You might need to adjust the path based on where `MainLayout.astro` lives.)
3.  **Required Frontmatter:** The index page needs the **`title`**, **`description`**, and **`pubDate`** to be present in the frontmatter block (`---`).

Once this file is in place, you should be able to view your blog archive page at `/blog/` and click the link to see this post!