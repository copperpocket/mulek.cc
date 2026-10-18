# Roadmap

A running list of improvements for mulek.cc. Check items off as they land, and add new ideas at the bottom of the matching section.

## Done

- [x] Clean blog URLs (`/blog/<name>`, no `.md`) with redirects from the old ones
- [x] Custom 404 page instead of a server error for unknown URLs
- [x] Remove placeholder `#` links, the sample blog post, and missing image references
- [x] Page titles and descriptions on every page
- [x] RSS feed at `/rss.xml`
- [x] Remove the LinkedIn link and the unused featured-projects slider
- [x] Rebuild the home page background as a single canvas (`Starfield.astro`)
- [x] Projects as a Markdown content collection with detail pages at `/projects/<name>`
- [x] Rare red and blue stars, plus an occasional comet, in the starfield
- [x] Home page panel: whole-year uptime, live time zone and status, automatic Current Project link, open-source note in place of the tags
- [x] MIT license for the code, with site content and images kept all rights reserved
- [x] Contact form: per-IP rate limit, length limits, generic error messages, and a clear log line when SMTP or hCaptcha settings are missing
- [x] Link previews (Open Graph and Twitter tags, a 1200x630 preview image), canonical URLs, sitemap, `robots.txt`, and a single favicon
- [x] New logo: the `>m_` prompt mark, an `m` tile for the favicon and iPhone icon, and the `mulek✦cc` wordmark
- [x] Header expands at the top of the page and turns compact, with the accent line, once you scroll (this also fixed the scroll listener piling up on every navigation)
- [x] Consistent page spacing: short pages center vertically when there's room, long pages start at the top
- [x] Readable colors in both themes: darker accent and secondary in light mode, dark text on accent buttons in dark mode, bolder light-mode stars, solid panels so the starfield doesn't show through, and stronger small labels on the home panel
- [x] Home page panels framed so stars never pass behind the text
- [x] First comet 3 to 5 seconds after page load, then one every 15 to 35 seconds
- [x] Pull request template (`.github/pull_request_template.md`)
- [x] Synthwave sun on the home page horizon, with striped gaps that fade in, centered between two equal-width panels
- [x] Home panels edged with the sun's own gradient (12px), fading out near the bottom like light falling off
- [x] Randomly shaped constellations that draw themselves in, one after the other, keeping clear of the panels and menu
- [x] Header icons the same size on the home page and sub-pages
- [x] The sun's pink across the site: hover color for links and buttons, category tags (teal before), the logo's star, and the header's scrolled line
- [x] Sub-page panels edged orchid to lavender, matching the home page panels
- [x] Even 32px spacing between page headings and the panels below them
- [x] First blog post: Dev Log #1, plus a template so every dev log has the same sections and tags
- [x] Nebulas as their own feature, separate from the constellation haze; each visit rolls 1-6 constellations and 2-8 nebulas, and the dev-only test switcher is gone
- [x] Sub-pages share the home page's sky (constellations and nebulas, no sun); nebulas show right away instead of fading in
- [x] Home panel edge thinned to 4px
- [x] Comets come twice as often, sometimes in pairs, and rarely as a small meteor shower
- [x] New site menu: one button that opens a card (full screen on phones) with the links, outside links and theme toggle; keyboard accessible, and used on the home page and on phones everywhere
- [x] Pet photos: a pool per pet, picked at random, added through `yarn pet-photos`, which strips all metadata (location, camera, dates)
- [x] Projects page redesign: whole-card links, a featured current project, `CATEGORY · YEAR` labels, tags as plain text, matching filter buttons with counts, and plainer category names (Web, Infrastructure, Games)
- [x] The home page no longer scrolls slightly on phones (`100dvh` instead of `100vh`)
- [x] No more TypeScript files: the two config files are plain JavaScript
- [x] Consistent page titles: one shared `page-title` style, large and extra-bold in the plain text color
- [x] New sun stripes ease in instead of starting as a crisp line
- [x] Cleanup: deleted unused components, the starter layout, old config and logo files, and stale duplicate scripts; nav and outside links defined once (`src/config/links.js`); the theme set in one place; the theme toggle's CSS bundled locally, so no third-party requests
- [x] Phone layout: the panel starts just below the horizon (8px under the sun) at any screen height
- [x] Logos in their places: the `mulek✦cc` wordmark top left on the home page too (smaller on phones, everywhere), and the `>m_` mark in the footer and on the 404 page, with a blinking cursor there
- [x] The menu button and theme toggle are lavender, like the wordmark and everything else you can click
- [x] The site uses "Michael Mulek", without the middle name
- [x] Fonts chosen and bundled locally: Outfit for headings, Lexend for reading, JetBrains Mono for code
- [x] Header nav links are semibold, like the menu's
- [x] Post dates show the right day (they were a day early in US time zones), and inline code no longer shows literal backticks

## Cleanup

- [ ] Move the shared page shell (header, footer, background, global CSS) into `MainLayout`

## Performance

- [ ] Pre-render pages at build time and keep only `/api/contact` server-rendered

## SEO and sharing

- [ ] Per-project preview images (set `image` in the frontmatter; the default card is used otherwise)

## Contact form

- [ ] Move the rate limit to the reverse proxy or a shared store if the site ever runs more than one instance (it's in memory today and resets on restart)
- [ ] Add a Matrix or Fediverse link once the account exists

## Content

- [ ] Flesh out the project write-ups (overview, setup, lessons learned), including a real homelab network diagram
- [ ] "How this site deploys" write-up (Astro, Docker, Dokploy, auto-deploy from `master`)
- [ ] Blog features: cover images, reading time, tag pages, next/previous links, consistent date format
- [ ] `/uses` page (hardware, homelab stack, tools) and `/now` page
- [ ] Downloadable résumé, plus certifications and skills on About
- [ ] Live homelab status widget (uptime, Grafana stats)
