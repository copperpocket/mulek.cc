---
title: "[AI] Dev Log #4: Fonts, Logos, and Smoother Hovers"
description: "Outfit and Lexend as the site's fonts, the wordmark on the home page and the >m_ mark in the footer and 404 page, and every hover easing in."
pubDate: 2026-10-17
tags: ["dev-log", "design", "content"]
---

## Summary

- **Dates:** October 17, 2026
- **Commits:** 10, all on the `dev` branch
- **Files changed:** 23 (+231 / −35 lines)
- **Status:** PR #12 merged to `master` and deployed; everything here ships with the PR that publishes this post

This round was about the site's identity: its fonts, where the logos go, and how hovers feel.

---

## What changed

### Fonts

- Headings, the header nav and the menu use Outfit, which matches the wordmark's round letters
- Everything you read uses Lexend
- Code-style text (the clock, `git clone`, card labels) uses JetBrains Mono
- All three are bundled with the site, so there are no outside font requests
- The header nav links are semibold, like the menu's

### Logos

- The `mulek✦cc` wordmark sits top left on the home page too, and is a little smaller on phones everywhere
- The wordmark swaps its colors on hover: pink letters, a lavender star
- The `>m_` mark sits in the footer, and large on the 404 page with a blinking cursor
- The menu button and theme toggle are lavender, like the wordmark

### Hovers

- Every link, button and icon eases its hover color over 0.4 seconds instead of snapping
- Cards lift at the same speed
- Links inside posts and project write-ups are lavender and turn pink on hover

### Content

- The site uses "Michael Mulek", without the middle name
- Pet names stay on the same line as their punctuation, and the `git clone` arrow stays with its address

---

## What we learned

- **The site never set a font.** It used each device's own: Segoe UI on Windows, Roboto on Android, San Francisco on Apple devices, so it looked different everywhere.
- **What looked like a different font was a different weight.** The header nav was regular while other links were semibold.
- **Fonts can be bundled instead of loaded from Google.** Fontsource packages ship the font files with the site, and browsers only download the parts a page uses.
- **Two fonts can split the work.** Outfit carries the brand in headings, and Lexend, made for easy reading, handles paragraphs.
- **A logo should stay put.** Showing the wordmark or the mark at random would have kept visitors from learning either; each now has its own place.
- **A transition has to be asked for.** Only some elements eased their hovers; one base rule now covers every link and button.
- **Spacing can hide in the markup.** The footer's odd gap came from the logo's built-in padding and a line break that the text kept as a blank line.
- **New fonts change where lines wrap.** Wider letters pushed a comma and an arrow onto lines of their own, so those now stay with the word before them.

---

## Commits

### On `dev` (ships with this post)

| Commit | Message |
| --- | --- |
| `c9915a6` | feat(brand): put the wordmark on the home page and the >m_ mark in the footer and on the 404 page |
| `22e91ef` | style: ease every hover over 400ms, and swap the wordmark's colors on hover |
| `42bf0ac` | chore: use Michael Mulek, without the middle name |
| `bed82cb` | docs: document the logos and hover changes |
| `ff642a6` | style(projects): use the shared hover speed for the Read more arrow |
| `aad1c7a` | style(header): make the nav links semibold, like the menu's |
| `5466158` | fix(about): keep each pet's punctuation and the git clone arrow from wrapping onto their own line |
| `826eb0e` | feat(fonts): use Outfit for headings and Lexend for text, bundled locally |
| `f935ece` | docs: document the fonts |

Plus the commit that adds this post: `docs(blog): add Dev Log #4`.

---

## Next up

- Move the shared page shell (header, footer, background) into the main layout
- Pre-render pages at build time for faster loads
- Per-project link preview images
- Flesh out the project write-ups

> 🔗 **Repository:** [github.com/copperpocket/mulek.cc](https://github.com/copperpocket/mulek.cc)
