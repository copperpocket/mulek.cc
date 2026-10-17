---
title: "[AI] Dev Log #1: Cleanup, a New Logo, and a Synthwave Sky"
description: "Three days of work on mulek.cc: fixes, SEO, a new logo and header, and a home page sky with a sun, constellations and nebulas."
pubDate: 2026-10-17
tags: ["dev-log", "design", "starfield", "seo", "security"]
---

## Summary

- **Dates:** October 15–17, 2026
- **Commits:** 27, across PR #7, PR #8 and the `dev` branch
- **Files changed:** 59 (+2,516 / −1,380 lines)
- **Status:** PR #7 and PR #8 merged to `master` and deployed; the rest ships with the PR that publishes this post

The site got a cleanup pass first, then SEO and contact form hardening, a new logo, and a redesigned home page sky.

---

## What changed

### Cleanup

- Blog posts moved to clean URLs (`/blog/<name>`), with redirects from the old `.md` URLs
- Unknown URLs show a 404 page instead of a server error
- Removed placeholder links, a sample post, missing images and an unused slider
- Added an RSS feed at `/rss.xml`
- Project write-ups moved out of the blog into their own collection at `/projects/<name>`

### Background

- Replaced the SVG grid and dots with a single canvas
- Added rare red and blue stars and an occasional comet

### Home page

- The about panel updates itself: years of experience, local time and status, and the current project
- Added an MIT license for the code; site content and images stay all rights reserved

### Contact form

- Limits each IP to 5 messages per hour
- Field length limits on both the form and the server
- Visitors only see generic errors; details go to the server log

### SEO

- Link previews (Open Graph and Twitter tags) with a 1200×630 image
- Canonical URLs, a sitemap and `robots.txt`

### Brand and layout

- New logo: the `>m_` mark, an `m` favicon and the `mulek✦cc` wordmark
- The header is tall at the top of the page and turns compact on scroll
- Short pages center vertically; long pages start at the top
- Even 32px spacing between page headings and the panels below them

### Home page sky

- A large striped sun sits on the horizon behind the two hero panels
- Constellations draw themselves in one after another, anywhere in the open sky
- Soft haze around each constellation's stars
- Nebula clouds in their own colors: green, cyan, blue and amber
- The two hero panels are the same width and centered on the sun
- Their 12px edge follows the sun's gradient and fades out near the bottom

### Colors

- New highlight color, the sun's pink, used for hover states, category tags and the logo's ✦
- Sub-page panels get an orchid-to-lavender edge to match the home page
- Better contrast in both themes (at least 4.5:1 for text)

---

## What we learned

- **Environment variables are read at build time.** A variable missing during the build is baked in as `undefined`, and setting it later doesn't help.
- **Scripts must re-run after page transitions.** With Astro's `ClientRouter`, page scripts initialize on `astro:page-load`, not just on first load.
- **Tailwind only sees full class names.** Classes built from pieces of strings never get generated.
- **Canvas and CSS blend colors differently.** The canvas mixes in sRGB, so CSS gradients that need to match it use `in srgb`.
- **Fading to `transparent` turns gray.** Fading to the same color at zero opacity keeps it clean.
- **Partly see-through shapes leave seams where they meet.** Drawing the sun whole on its own layer, then erasing the gaps, avoids them.
- **Light colors look washed out on a light background.** In light mode the nebulas darken the sky like ink instead of being painted over it.
- **Redrawing every glow every frame was too slow.** With 8 or more constellations the animation stalled; painting each finished constellation's glow once and reusing it fixed that.
- **`git remote -v` only works inside a repository.** The home panel now shows `git clone`, which works anywhere.
- **Headless browser screenshots only run a frame or two of animation.** Testing anything animated needs time skipped ahead.

---

## Commits

### PR #7 (merged)

| Commit | Message |
| --- | --- |
| `df88a29` | chore(package): remove duplicate start script |
| `b5ba241` | fix(blog): serve posts at clean slugs and add 404 page |
| `79cb68d` | fix(projects): remove placeholder links and unused featured slider |
| `d9d4175` | chore(blog): remove sample post and missing cover image refs |
| `cc4f1e1` | feat(blog): add RSS feed |
| `27a93c4` | docs: correct README and add CLAUDE.md |
| `88f1758` | refactor(background): replace SVG grid and dot elements with a canvas starfield |
| `b32380e` | docs(claude): document the Starfield component |
| `47ee4a0` | feat(projects): move project write-ups into a projects content collection |
| `f63803b` | docs: update CLAUDE.md and README for the projects collection |
| `7c8ebc5` | docs: add ROADMAP.md as a running improvement list |

### PR #8 (merged)

| Commit | Message |
| --- | --- |
| `4ef60ae` | feat(starfield): add rare colored stars and occasional comets |
| `b6ff4aa` | feat(starfield): vary comet size, angle, and glow color |
| `b49f3a0` | feat(home): make the about panel self-updating and drop the tech tags |
| `2b95e8c` | chore(license): add MIT license for code, reserve rights to content |
| `068b458` | style(home): even out spacing around the about panel cards |

### On `dev` (ships with this post)

| Commit | Message |
| --- | --- |
| `da9cf6f` | feat(contact): add rate limiting, input limits, and generic errors |
| `5de25d0` | feat(seo): add link previews, canonical URLs, sitemap, and robots.txt |
| `0b6ff5c` | feat(brand): add the m favicon, prompt mark, and mulek✦cc wordmark |
| `33f231a` | feat(header): expand at the top of the page and compact on scroll |
| `7a1ff23` | style(layout): center short pages vertically and unify page spacing |
| `fe71afa` | chore(github): add a pull request template |
| `f64f1bb` | feat(home): add a synthwave sun, constellations and nebulas, and carry its colors site-wide |
| `30438a1` | feat(starfield): place constellations anywhere in the open sky and allow up to 12 of each |
| `9030dd2` | style(home): enlarge the right panel text and show a working git clone command |
| `cf6f172` | fix(blog): show post dates in UTC and drop backticks around inline code |

Plus the commit that adds this post: `docs(blog): add Dev Log #1 and a dev log template`.

---

## Next up

- Rework the phone layout so the sun still shows
- Pick the final number of constellations and nebulas, then remove the test switcher
- Make the page headings consistent
- First write-ups for the homelab projects

> 🔗 **Repository:** [github.com/copperpocket/mulek.cc](https://github.com/copperpocket/mulek.cc)
