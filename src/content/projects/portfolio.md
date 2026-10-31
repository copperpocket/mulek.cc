---
title: "Portfolio Site v2"
description: "Behind the design and development of mulek.cc, my personal website."
pubDate: 2025-10-06
category: "Web"
tags: ["Astro.js", "TailwindCSS"]
url: "https://mulek.cc"
github: "https://github.com/copperpocket/mulek.cc"
current: true
image: "/images/projects/portfolio.png"
---

This site, [mulek.cc](https://mulek.cc), is my personal portfolio and the place I write up my projects. I built it from scratch, and I keep it simple on purpose: fast pages, readable text, and nothing that gets in the way.

## What it is

- **Pages:** a home page, About, Projects, Blog and Contact, all sharing one layout.
- **Look:** a dark-first theme with a light option, and a starfield background with twinkling stars, comets, constellations and nebulas. The home page adds a synthwave grid and a setting sun.
- **Content:** projects and blog posts are plain Markdown files, and the site builds the pages, the RSS feed and the sitemap from them.
- **Contact form:** protected by hCaptcha, rate-limited per visitor, and sent through SMTP. It's the only part that runs on a server.
- **Open source:** the code is public at [github.com/copperpocket/mulek.cc](https://github.com/copperpocket/mulek.cc) and MIT licensed. The text and images are not.
- **Status:** live, and still changing.

## Setup

The site is built with [Astro](https://astro.build/) and styled with [Tailwind CSS](https://tailwindcss.com/). Pages are built ahead of time and served as plain files, so they load quickly. Fonts are bundled with the site, so it makes no requests to outside services.

It runs in a container on a VPS, kept apart from my home network. Pushing to the `master` branch on GitHub rebuilds and redeploys it automatically through Dokploy; [How This Site Deploys](/projects/site-deploy) has the details.

## The background

The starfield is one canvas, drawn by a small script I wrote. Stars, comets, constellations and nebulas are all random, so no two visits look the same. It's the part I've spent the most time tuning, and the part that has caused the most surprises.

## Key decisions

- **Pages are built ahead of time.** They load quickly, so anything that depends on the visit (the random sky, the year, the pets' ages) is set in the browser.
- **The canvas is sized to the full screen height.** The mobile address bar sliding in and out can't resize it and re-place every constellation.
- **Photos are stripped of metadata.** Location, camera and dates are removed by a script before any photo is published.
- **Fonts are bundled.** The site makes no requests to outside services.
- **Design choices are made by comparing variants.** Fonts, stroke weights and hover timing were settled by looking at a few side by side.

## Next

More project write-ups and a network diagram of my homelab.
