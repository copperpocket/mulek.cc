---
title: "[AI] Dev Log #2: Site Menu, Pet Photos, and a New Projects Page"
description: "A new site menu, a random photo for each pet with all metadata stripped, the sky on every page, and a redesigned Projects page."
pubDate: 2026-10-17
tags: ["dev-log", "design", "starfield", "security", "content", "tooling"]
---

## Summary

- **Dates:** October 17, 2026
- **Commits:** 15, across PR #10 and the `dev` branch
- **Files changed:** 71 (+963 / −555 lines)
- **Status:** PR #10 merged to `master` and deployed; the rest ships with the PR that publishes this post

This round finished the sky, replaced the old phone menu, added pet photos with location data stripped out, and redesigned the Projects page.

---

## What changed

### Sky

- Every visit rolls 1–6 constellations and 2–8 nebulas on the home page, and 1–6 and 3–10 on other pages
- Sub-pages get the same sky as the home page, without the sun
- Sky settings for the home page and the other pages live in one file, `src/config/sky.js`
- Nebulas show right away instead of fading in
- Comets come every 8–20 seconds; sometimes two fly together, and rarely a small meteor shower
- The home panels' edge is now 4px

### Site menu

- One button opens the site links, outside links and the theme toggle
- Full screen on phones, a small card under the button on wider screens
- Used on the home page at every width, and on other pages on phones; desktop keeps the header nav bar
- The icon is drawn as lines and folds into an X in two steps
- Works from the keyboard: Escape closes it, and Tab stays inside while it's open

### Colors

- Dark mode's pink is now an orchid pink, close to the lavender's brightness
- The About page avatar has the same orchid-to-lavender ring as the panels
- External link arrows all behave the same, and the theme toggle turns pink on hover
- Buttons show the pointing-hand cursor

### Pet photos

- Clicking a pet's name shows a random photo from that pet's pool, never the same one twice in a row
- Salem and Oliver have photos now; 33 photos in total
- Photos are added with `yarn pet-photos`, which removes all metadata before anything reaches the repo

### Projects page

- The whole card opens the write-up; the big "View Details" buttons are gone
- The current project is a wide featured card at the top
- Each card shows `CATEGORY · YEAR` and its tools as plain text
- Filter buttons match each other and show a count
- Categories renamed: Web, Infrastructure and Games

### Fixes and cleanup

- The home page no longer scrolls slightly on phones
- The two TypeScript config files are now plain JavaScript

---

## What we learned

- **`100vh` is taller than the screen on phones.** It's the height with the address bar hidden, so the page scrolled by about the bar's height; `100dvh` is the height you can actually see.
- **Desktop "mobile mode" doesn't show it.** It has no address bar that slides in and out, so this bug only appeared on real phones.
- **Phone photos can carry GPS location.** The repo is public, so originals never go in it; the script saves each photo as a new file with no metadata and checks every photo on the site.
- **Scripts that run more than once need to remember what they've done.** Running the photo script again added 31 duplicates, because the originals were still in the inbox; it now moves each one aside after adding it.
- **Tailwind v4 dropped the hand cursor on buttons.** One rule in `global.css` brings it back everywhere.
- **The dev server can hold on to old files.** After renaming files or changing the content schema, pages failed or went missing until `yarn dev` was restarted.
- **A color can work in one place and clash in another.** The sun's bright top pink looked washed out next to the lavender in dark mode; matching their brightness fixed it.
- **A whole card can be a link without hiding the links inside it.** The title's link is stretched over the card, and the Live and GitHub links sit above it.
- **Progress labels go stale.** "Active" and "In progress" were never quite true when every project gets tinkered with, so the cards show the category and year instead.

---

## Commits

### PR #10 (merged)

| Commit | Message |
| --- | --- |
| `4b96940` | feat(home): vary the number of constellations and nebulas on every visit |
| `567ccc3` | chore(home): remove the dev-only sky switcher |
| `bde3573` | feat(starfield): bring the sky to every page and send comets more often |
| `c3a6be9` | feat(starfield): configure the home and sub-page skies separately |
| `688abe5` | style(about): ring the avatar with the orchid-to-lavender edge |
| `99bf39e` | style(theme): use an orchid pink for dark-mode highlights |
| `027121d` | style(home): make the external-link arrows behave the same |
| `8d55753` | feat(menu): replace the hamburger overlay with a site menu |
| `37afb70` | feat(about): show a random photo from a pool for each pet, with metadata stripped |
| `c5e18e0` | docs: document the site menu and pet photo workflow |
| `7e54b3c` | docs(blog): list PR #9 in Dev Log #1 |

### On `dev` (ships with this post)

| Commit | Message |
| --- | --- |
| `df91386` | refactor: convert the two TypeScript config files to JavaScript |
| `152f7fd` | fix(home): stop the page scrolling slightly on phones |
| `7f3ab89` | feat(projects): redesign the Projects page |

Plus the commit that adds this post: `docs(blog): add Dev Log #2`.

---

## Next up

- Rework the phone layout so the sun still shows
- Make the page headings consistent
- Ease in each new sun stripe so it doesn't start as a sharp line
- Flesh out the project write-ups

> 🔗 **Repository:** [github.com/copperpocket/mulek.cc](https://github.com/copperpocket/mulek.cc)
