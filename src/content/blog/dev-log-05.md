---
title: "[AI] Dev Log #5: Pre-rendered Pages, Panels for Reading, and an Updated Homelab Overview"
description: "Pages built once and served as files, write-ups on a panel, a steadier phone sky, a plainer About page, and a Homelab Overview that matches the network behind it."
pubDate: 2026-10-29
tags: ["dev-log", "performance", "design", "content", "tooling"]
---

## Summary

- **Dates:** October 18–29, 2026
- **Commits:** 15, all on the `dev` branch
- **Files changed:** 22 (+403 / −360 lines)
- **Status:** PR #13 (Dev Log #4) is merged to `master` and deployed; everything here ships with the PR that publishes this post

This round made the site lighter to serve, put the long reads on a panel, and brought the write-ups up to date with the homelab they describe.

---

## What changed

### Performance

- Pages are built once at deploy and served as files; only the contact form runs on the server
- Blog and project pages are generated at build time
- Anything that depends on the visit is set in the browser: the sky's random counts, the footer year, the pet ages and the years in the industry
- The canonical URL no longer ends in a slash, so it matches the sitemap

### Design

- Project write-ups and blog posts sit on a panel, so the text doesn't compete with the stars
- Outside links in them match the home page: semibold lavender, a small arrow, pink with an underline on hover
- The home page uses the About page's intro, with each pet's age and the birthday cake, and the cake also shows when the About page is opened directly
- On phones the sky no longer rearranges when the address bar hides or shows
- The pet photo popup fits short phone screens, so its close button is never pushed off the top

### Tooling

- Every page gets its sky, header and footer from one layout, so a page is just its content; the home page opts out because it brings its own sky and menu

### Content

- The About page leads with the job and explains what an MSP is, and the homelab paragraph names the tools I run
- The job title is Systems Engineer everywhere, and the CW Technology titles drop their level numerals
- The portfolio write-up is rewritten to match the current site
- The Homelab Overview is rewritten: the firewall, switches and seven VLANs, then remote access over a tailnet I host myself, how everything is backed up and monitored, and what runs on the VPS
- Posts published on the same day now sort by number, so Dev Log #4 sits above #3 and #2 on the blog and in the RSS feed

---

## What we learned

- **Pre-rendering freezes anything that depends on the visit.** A random roll or today's date would be stuck at build time, so those are set in the browser instead.
- **The mobile address bar changes the screen height.** Sizing the sky to the largest height (`lvh`) and the popup to the visible height (`dvh`) keeps both steady as the bar comes and goes.
- **Long text needs a panel.** On the busy starfield, a card behind the words made the write-ups easier to read.
- **A write-up goes stale when the setup changes.** The Homelab Overview had to be rewritten once remote access and backups changed.
- **Detail belongs on the page that owns it.** The VLAN table named specific devices and apps; it now describes roles, and the details live in the project write-ups.
- **Explain an idea before using it.** The page leaned on the reverse proxy and the VPS before introducing them, so the sections now run from hardware to software to network rules to access to backups.
- **A lone "it" needs one clear subject.** Several sentences used "it" for two different things.
- **Dates can tie.** Frontmatter dates are midnight UTC, so same-day posts had no order until the slug broke the tie.

---

## Commits

### On `dev` (ships with this post)

| Commit | Message |
| --- | --- |
| `4af357e` | fix: shared home and About intro, steady mobile sky, pet popup on short phones |
| `c787970` | docs: note the intro, lvh sky, dvh sizing and commit/dev-server workflow |
| `048921e` | refactor(layout): render the sky, header and footer from MainLayout |
| `6b2ed51` | feat(build): pre-render pages and set visit-dependent values in the browser |
| `d0cf8f3` | feat(about): plainer, more specific copy and consistent job title |
| `b64278c` | docs(projects): rewrite the portfolio write-up to match the current site |
| `a8ec7a8` | fix(about): drop the level numerals from the CW Technology job titles |
| `89c4d7f` | feat(style): put write-ups and posts on a panel and mark outside links with an arrow |
| `4204d34` | docs(projects): rewrite the homelab overview |
| `50907e9` | docs(projects): say the site runs on a VPS |
| `39801c4` | docs: note write-up panels, link arrows and world-building context |
| `ebc9867` | docs(projects): bring the homelab overview up to date |
| `2e1c727` | docs(roadmap): add an optional CrowdSec-on-the-VPS item |
| `1fac78c` | fix(blog): order posts from the same day by number |

Plus the commit that adds this post: `docs(blog): add Dev Log #5`.

---

## Next up

- Per-project link preview images
- Flesh out the remaining project write-ups, including a real homelab network diagram
- A "How this site deploys" write-up
- A live homelab status widget

> 🔗 **Repository:** [github.com/copperpocket/mulek.cc](https://github.com/copperpocket/mulek.cc)
