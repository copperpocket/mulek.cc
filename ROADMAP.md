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

## Cleanup

- [ ] Delete dead code: `ImageMod`, `Logo`, `ThemeSwitcher`, `layouts/Layout.astro`, `src/config/*.json`, `astro.svg`, and the stale duplicates in `src/scripts/` and `src/assets/`
- [ ] Define the navigation links once (they're currently in `Header.astro` and `index.astro`, and the mobile menu has drifted)
- [ ] Run the theme setup in one place instead of three (`MainLayout`, `index.astro`, `Theme.astro`)
- [ ] Bundle the theme toggle CSS locally instead of loading it from jsDelivr
- [ ] Move the shared page shell (header, footer, background, global CSS) into `MainLayout`
- [ ] Fix the `Header.astro` scroll listener piling up on every page navigation

## Performance

- [ ] Pre-render pages at build time and keep only `/api/contact` server-rendered

## SEO and sharing

- [ ] Open Graph and Twitter preview tags, plus canonical URLs
- [ ] Sitemap and `robots.txt`
- [ ] Pick one favicon (there are currently three)

## Accessibility

- [ ] Make the hamburger menu keyboard-accessible, with proper ARIA labels

## Contact form

- [ ] Rate limiting and maximum lengths for name, email, and message
- [ ] Return a generic error to visitors instead of the raw error message
- [ ] Clear startup error when SMTP or hCaptcha settings are missing
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
