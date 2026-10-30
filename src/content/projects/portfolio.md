---
title: "Portfolio Site v2"
description: "Behind the design and development of mulek.cc, my personal website."
pubDate: 2025-10-06
category: "Web"
tags: ["Astro.js", "TailwindCSS"]
url: "https://mulek.cc"
github: "https://github.com/copperpocket/mulek.cc"
current: true
---

This site, [mulek.cc](https://mulek.cc), is my personal portfolio and the place I write up my projects. I built it from scratch, and I keep it simple on purpose: fast pages, readable text, and nothing that gets in the way.

## What it is

- **Pages:** a home page, About, Projects, Blog and Contact, all sharing one layout.
- **Look:** a dark-first theme with a light option, and a starfield background with twinkling stars, comets, constellations and nebulas. The home page adds a synthwave grid and a setting sun.
- **Content:** projects and blog posts are plain Markdown files, and the site builds the pages, the RSS feed and the sitemap from them.
- **Contact form:** protected by hCaptcha, rate-limited per visitor, and sent through SMTP. It's the only part that runs on a server.

## Tech stack

The site is built with [Astro](https://astro.build/) and styled with [Tailwind CSS](https://tailwindcss.com/). Pages are built ahead of time and served as plain files, so they load quickly. Fonts are bundled with the site, so it makes no requests to outside services.

It runs in a container on a VPS, kept apart from my home network. Pushing to the `master` branch on GitHub rebuilds and redeploys it automatically through Dokploy.

## Open source

The code is public: [github.com/copperpocket/mulek.cc](https://github.com/copperpocket/mulek.cc). The code is MIT licensed. The text and images are not.

## The background

The starfield is one canvas, drawn by a small script I wrote. Stars, comets, constellations and nebulas are all random, so no two visits look the same. It's the part I've spent the most time tuning, and the part that has caused the most surprises.

## Lessons from the build

- **A resizing canvas looks like a bug.** On phones, the address bar sliding in and out changed the screen height, which resized the canvas and re-placed every constellation. Sizing it to the full screen height fixed it.
- **Pre-rendered pages can't know who is visiting.** Once pages were built ahead of time, anything depending on the visit (the random sky, the year, the pets' ages) had to move into the browser, or it would freeze at build time.
- **Photos carry hidden data.** Phone photos include location, camera and dates. The site's pet photos are re-encoded through a script that strips all of it before they're published.
- **Trying options beats debating them.** The fonts, the stroke weights and the hover timing were all settled by looking at a few variants side by side.

## Next

More project write-ups, a network diagram of my homelab, and a short post on how this site deploys.
