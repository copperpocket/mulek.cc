---
title: "[AI] Dev Log #7: Link Previews, a Network Diagram, and Phone-Friendly Tables"
description: "Every project gets its own link preview, the homelab gets a real diagram, a new write-up covers deploys, and tables fit on phones."
pubDate: 2026-11-01
tags: ["dev-log", "design", "content", "seo", "tooling"]
---

## Summary

- **Dates:** October 30 – November 1, 2026
- **Commits:** 10, all on the `dev` branch
- **Files changed:** 29 (+535 / −63 lines)
- **Status:** PR #15 (Dev Log #6) is merged to `master` and deployed; everything here ships with the PR that publishes this post

This round finished the content items left over from Dev Log #6: the deploy write-up, the link preview images, and the homelab network diagram. It also fixed two ways write-ups could break on a phone.

---

## What changed

### Design

- Long links and code spans wrap instead of pushing the page wider than a phone screen
- On phones, a table with three or more columns turns into one card per row, with each cell labelled by its column
- The homelab diagram is drawn as inline SVG with the site's theme colors, so it follows light and dark mode

### Content

- New write-up: How This Site Deploys, which follows a merge to `master` through Dokploy, Nixpacks, and Traefik
- The Homelab Overview gains a network diagram, showing the firewall, the switches, the seven VLANs, the VPS, and the two paths in from outside
- The portfolio write-up links to the deploy write-up, and its Next section no longer lists work that's done
- The Homelab Overview now covers automatic updates, the daily report, and a full container restore
- Lists across the site's pages and posts use the Oxford comma, except quoted commit messages

### SEO

- Each of the seven project write-ups has its own 1200x630 link preview, showing its title, category, and year
- Every preview now sends its size and alt text, which only the default card did before

### Tooling

- `yarn project-previews` draws the preview images from each project's frontmatter
- The project template and `CLAUDE.md` describe how the previews work
- `ROADMAP.md` checks off the deploy write-up, the previews, and the diagram, and adds the next homelab server maintenance items

---

## What we learned

- **CSS can't read a table's headings.** A phone card needs each cell to know its column, so a small plugin copies the headings onto the cells when the site builds.
- **Images drawn from frontmatter stay honest.** One command redraws every preview, so a new title doesn't leave an old image behind.
- **The screenshot browser reports a light color scheme.** The preview script forces the logos to their dark-mode colors so they stay readable on the card.
- **Headless Edge can't test phone widths.** A narrow window crops the page instead of reflowing it, so a clipped screenshot there doesn't prove a mobile bug.
- **A search that finds nothing proves nothing.** A broken pattern reported no missing commas until a known example failed to appear, so test a search on something you know is there.
- **Finished work can linger on other pages.** The diagram came off the Homelab Overview's Next list but stayed on the portfolio page's until this post was checked against it.

---

## Commits

### On `dev` (ships with this post)

| Commit | Message |
| --- | --- |
| `0bf8b5c` | fix(style): wrap long links and stack wide tables on phones |
| `b1c40bb` | docs(projects): add the How This Site Deploys write-up |
| `2ffd8b4` | docs(roadmap): check off the deploy write-up |
| `6faf53b` | feat(projects): draw a link preview image for each project |
| `250ebf7` | feat(projects): add a network diagram to the homelab overview |

Plus five more commits: one that updates the homelab items in the roadmap, one that removes the finished diagram from the portfolio page's Next section, one that adds this post, `docs(blog): add Dev Log #7`, one that adds updates to the Homelab Overview, and one that applies the Oxford comma.

---

## Next up

- Blog features: cover images, reading time, tag pages, and next/previous links
- `/uses` and `/now` pages
- The Quackshire server site

> 🔗 **Repository:** [github.com/copperpocket/mulek.cc](https://github.com/copperpocket/mulek.cc)
