# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Deployment and git workflow

- **Pushing to `master` deploys to production.** A Dokploy instance rebuilds mulek.cc whenever `master` changes. Day-to-day work happens on `dev`, which gets merged into `master` through PRs.
- **Don't commit, branch, or push unless the user explicitly asks.** Leave changes in the working tree.
- **`ROADMAP.md` is the running improvement list.** Check items off, or add new ones, as part of the same change.
- **Commit messages use Conventional Commits:** `type(scope): short description`, where type is `feat`, `fix`, `docs`, `style`, `refactor`, `test` or `chore`. See `.git-commit-template.txt`.

## Commands

The project uses Yarn 1; there's a `yarn.lock` and no `package-lock.json`. Run these from the repo root.

```sh
yarn install
yarn dev        # dev server on http://localhost:4321 (binds 0.0.0.0)
yarn build      # builds the Node server into dist/
yarn start      # runs dist/server/entry.mjs
yarn preview
```

There is no test suite, linter, or formatter configured.

## Environment

The `/api/contact` endpoint needs a `.env` file, which is gitignored. The rest of the site works without one.

- `PUBLIC_HCAPTCHA_SITE_KEY` is read in `src/pages/contact.astro` and exposed to the browser.
- `HCAPTCHA_SECRET_KEY`, `SMTP_HOST`, `SMTP_PORT` (default 2525), `SMTP_USER` and `SMTP_PASS` are server-only and read in `src/pages/api/contact.js`.
- These are `import.meta.env` reads, so they must exist at **build** time as well as at runtime. Astro compiles a variable that's present during the build into a runtime `process.env` lookup, but bakes in `undefined` for one that's missing, and setting it later won't help. If any are missing, the endpoint logs one `[contact] Contact form is disabled` line and answers every request with a generic 503.
- The endpoint rate-limits valid submissions to 5 per IP per hour, in memory. It takes the client IP from the last `X-Forwarded-For` entry (the one Dokploy's proxy adds). Field limits are mirrored as `maxlength` in `contact.astro`. Visitors only ever see generic error messages; details go to the server log.

`astro.config.mjs` sets `server.allowedHosts: ['mulek.cc']` on purpose: the user reaches the dev/preview server through that hostname.

## Architecture

- **Rendering:** `output: 'server'` with the `@astrojs/node` standalone adapter, so every page is rendered on each request. Anything random generated in frontmatter changes on every page load.
- **Styling:** Tailwind v4 via `@tailwindcss/vite`, with no `tailwind.config` file. Theme tokens (`accent`, `body`, `body-dark` and others), custom variants and shared component classes all live in `src/styles/global.css`:
  - Dark mode is class-based: `@custom-variant dark (&:where(.dark, .dark *))`.
  - Height-based variants `xshort`, `short`, `tall` and `xtall` exist alongside the usual width breakpoints.
  - `@tailwindcss/typography` styles blog post bodies through `prose`.
- **Import alias:** `@/*` resolves to `src/*`, set in `tsconfig.json`.
- **Page layouts:**
  - `MainLayout.astro` holds `<head>`, including the canonical URL and the Open Graph/Twitter preview tags (props: `image`, a path under `public/` defaulting to `/og.png`; `type`, set to `article` on posts and projects; `noindex` for the 404 page), the inline theme setup script that prevents a flash of the wrong theme, and Astro's `<ClientRouter />` page transitions.
  - Pages compose their own shell, usually `<Starfield />`, `<Header />`, content and `<Footer />`, and each imports `global.css` itself.
  - The content wrapper uses one of two shared classes from `global.css`, never its own padding: `.page-main` for short pages (Projects, Blog, Contact, 404), which center in any spare height on tall screens, or `.page-article` for long reading pages (About, write-ups, posts), which always start at the top. Both are mobile first. On `/projects` the results area is locked to its full height so filtering doesn't shift the centered page.
  - `Header.astro` is `fixed`, with a spacer element below it holding its place. A bundled script sets `data-scrolled` once the page scrolls past 24px; the scoped `<style>` switches between the tall, transparent top state and the compact scrolled state (solid background, accent line). The script runs once per full load, so it doesn't stack listeners across `ClientRouter` navigations.
  - The home page (`index.astro`) is the exception: it has no `Header`. It renders its own theme toggle, hamburger menu and `#hidden-menu` overlay, so nav links are defined there as well as in `Header.astro`.
  - `layouts/Layout.astro` is unused leftover Astro starter code.
- **Client scripts and page transitions:** because of `ClientRouter`, page scripts must initialize on `document.addEventListener('astro:page-load', ...)`, not on the initial run alone. There are two ways scripts are loaded:
  - Bundled `<script>` tags inside components.
  - Plain modules in `public/scripts/` imported by absolute path, for example `import "/scripts/menu-toggle.js"`. These are the copies actually served; the files in `src/scripts/` are stale duplicates.
- **Theme:** `localStorage.theme` is either `light` or `dark`, falling back to `prefers-color-scheme`, and `html.dark` is toggled to match. That logic is duplicated in `MainLayout`, `index.astro` and `components/Theme.astro`. The toggle dispatches a `themechange` event.
- **Content collections** (`src/content/config.ts`): both are legacy `type: "content"` collections, so `entry.id` includes `.md` and `entry.slug` doesn't. Routes and links always use `slug`. Unknown slugs rewrite to `pages/404.astro`.
  - **Blog** (`src/content/blog/`, served at `/blog/<slug>`): `title`, `description` and `pubDate` are required; `author`, `tags` and `image` are optional. It's currently empty; `.gitkeep` keeps the folder in git, and Astro warns about the empty collection during builds. `pages/blog/[slug].astro` 301-redirects old `/blog/<name>.md` URLs, and redirects old `/blog/<name>` URLs to `/projects/<name>` when that project exists, because the project write-ups used to be blog posts. New posts start from `src/content/blog-post-template.md`.
  - **Projects** (`src/content/projects/`, served at `/projects/<slug>`): the frontmatter is the card (`title`, `description`, `pubDate`, `category`, `tags`, plus optional `url`, `github` and `image`) and the body is the write-up. An optional `current: true` makes a project the home page's "Current Project" (otherwise the newest is used), computed in `AboutSummary.astro`. `category` must be one of `projectCategories` in `config.ts`, which also sets the filter-button order on `/projects`. New projects start from `src/content/project-template.md`.
  - **Sitemap:** `/sitemap.xml` (`pages/sitemap.xml.js`) lists the fixed pages from a `staticPages` array plus every blog post and project. Add new top-level pages to that array. `public/robots.txt` points to it.
  - **RSS:** `/rss.xml` (`pages/rss.xml.js`) combines blog posts and projects, newest first. It's generated at build time and uses `site` from `astro.config.mjs` for absolute links.
- **Logo:** the `>m_` prompt mark and the `mulek✦cc` wordmark are hand-built SVGs that share one set of letter shapes (5-unit round strokes, the same x-height). Masters live in `public/images/logo/` (`mark.svg`, `tile.svg`, `wordmark.svg`). The tile is just the `m` on a lavender rounded square, because the full `>m_` didn't read at 16px; `public/favicon.svg` is a copy of it. `components/Wordmark.astro` (used in `Header.astro`) and `components/LogoMark.astro` inline them, colored by `--logo-ink` and `--logo-star` in `global.css`. `public/og.png` (the link preview) and `public/apple-touch-icon.png` are screenshots; if the logo changes, regenerate them from a temporary page.
- **Unused code:** `src/config/*.json` (only the unused `ThemeSwitcher.astro` reads it), `ImageMod` and `Logo`. Check whether something is actually imported before you edit it.
- **Background (`Starfield.astro`):** a single `<canvas>` draws twinkling stars (a few rare red and blue ones), an occasional comet, and, with `grid`, the scrolling synthwave grid below a horizon. It's the home page's only background. It's fixed to the viewport by default; the home page passes `fixed={false}` so it fills the hero instead. Colors come from the `--starfield-*` variables in `global.css` and are re-read on the `themechange` event. Grid proportions, star color odds and comet timing are constants at the top of its script. Headless browser screenshots only run a frame or two of animation, so comets never show up in them unless you temporarily force one. With `prefers-reduced-motion` it draws one still frame.
- **Dev helper:** `TwSizeIndicator` shows the current Tailwind breakpoint, but only in development.
