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

## Cleanup

- [ ] Delete dead code: `ImageMod`, `Logo`, `ThemeSwitcher`, `layouts/Layout.astro`, `src/config/*.json`, `astro.svg`, and the stale duplicates in `src/scripts/` and `src/assets/`
- [ ] Define the navigation links once (they're currently in `Header.astro` and `index.astro`, and the mobile menu has drifted)
- [ ] Run the theme setup in one place instead of three (`MainLayout`, `index.astro`, `Theme.astro`)
- [ ] Bundle the theme toggle CSS locally instead of loading it from jsDelivr
- [ ] Move the shared page shell (header, footer, background, global CSS) into `MainLayout`

## Performance

- [ ] Pre-render pages at build time and keep only `/api/contact` server-rendered

## SEO and sharing

- [ ] Per-project preview images (set `image` in the frontmatter; the default card is used otherwise)
- [ ] Delete the old logo files (`public/images/favicon.png`, `logo.png`, `logo-darkmode.png`, `mm.png`, and the copies in `src/assets/`) along with the other dead code
- [ ] Use the logo on the home page (it has no header) and in the mobile menu

## Accessibility

- [ ] Make the hamburger menu keyboard-accessible, with proper ARIA labels

## Contact form

- [ ] Move the rate limit to the reverse proxy or a shared store if the site ever runs more than one instance (it's in memory today and resets on restart)
- [ ] Add a Matrix or Fediverse link once the account exists

## Content

- [ ] Flesh out the project write-ups (overview, setup, lessons learned), including a real homelab network diagram
- [ ] "How this site deploys" write-up (Astro, Docker, Dokploy, auto-deploy from `master`)
- [ ] First real blog post
- [ ] Blog features: cover images, reading time, tag pages, next/previous links, consistent date format
- [ ] Project card images
- [ ] `/uses` page (hardware, homelab stack, tools) and `/now` page
- [ ] Downloadable résumé, plus certifications and skills on About
- [ ] Live homelab status widget (uptime, Grafana stats)
