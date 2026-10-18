---
title: "[AI] Dev Log #3: Cleanup, Matching Titles, and the Phone Layout"
description: "A cleanup round: one theme setup, links defined once, no third-party requests, unused files deleted, matching page titles, and the phone panel set just below the sun."
pubDate: 2026-10-17
tags: ["dev-log", "design", "starfield", "tooling"]
---

## Summary

- **Dates:** October 17, 2026
- **Commits:** 8, all on the `dev` branch
- **Files changed:** 37 (+193 / −744 lines)
- **Status:** PR #11 merged to `master` and deployed; everything here ships with the PR that publishes this post

A smaller round: the site's code got cleaned up, the page titles now match, and the phone layout is settled.

---

## What changed

### Design

- Every page title uses one style: large, extra-bold, in the plain text color
- On phones the "Michael Mulek" panel starts 8px below the sun, at any screen height
- New stripes on the sun fade in instead of starting as a sharp line

### Theme

- The theme is set in one place, before the page appears
- Pages no longer flash dark for visitors whose system is set to light
- The theme toggle's animation is part of the site instead of being loaded from jsDelivr

### Cleanup

- The nav links and the GitHub, Bluesky and RSS links are defined once, in `src/config/links.js`
- On a project page, the menu now marks Projects as the current section, like the header
- Deleted 19 unused files: old components, config, scripts and logo images
- `README.md` lists the current folders

---

## What we learned

- **Lavender means "click me" on this site.** Page titles in lavender looked like links, so titles use the plain text color.
- **A percentage can't keep two things together on every screen.** The panel's distance from the sun changed with screen height; anchoring it to the horizon, always halfway down, fixed that.
- **Copies of the same logic drift apart.** The theme was set in three places, and one of them started every page dark; the nav links lived in two files and had been out of sync before.
- **Every outside request is a privacy question.** The theme toggle's CSS came from a third-party server on every page load; a local copy works the same.
- **Files staged earlier ride along with the next commit.** Deleted files slipped into the wrong commit; since it wasn't pushed yet, the commits were redone, one change each.
- **Some choices can only be made on a real phone.** The gap was picked with a temporary switch at the top of the screen, since Astro's dev toolbar covers the bottom.

---

## Commits

### On `dev` (ships with this post)

| Commit | Message |
| --- | --- |
| `d6436a0` | style: give every page title the same look |
| `b41d14b` | fix(starfield): ease in new sun stripes instead of starting them as a crisp line |
| `aa146ed` | fix(theme): set the theme in one place and bundle the toggle's CSS |
| `a76db3c` | refactor: define the nav and outside links once |
| `9fa5218` | chore: delete unused components, config, scripts and old logo files |
| `72fc383` | docs: update CLAUDE.md, README and ROADMAP for the cleanup |
| `9c8255d` | style(home): start the phone panel just below the sun at any screen height |

Plus the commit that adds this post: `docs(blog): add Dev Log #3`.

---

## Next up

- Put the `>m_` logo on the home page and in the menu
- Move the shared page shell (header, footer, background) into the main layout
- Pre-render pages at build time for faster loads
- Flesh out the project write-ups

> 🔗 **Repository:** [github.com/copperpocket/mulek.cc](https://github.com/copperpocket/mulek.cc)
