# mulek.cc

A minimal, open-source portfolio website built with [Astro](https://astro.build).  
Designed to be clean, fast, and easy to maintain.

## ✨ Overview

**mulek.cc** is a personal portfolio and blog showcasing open-source projects and development work.  
It focuses on simplicity and performance — using Astro’s component-based architecture, server-rendered on Node, to keep things lightweight.

This site serves as both a home for documentation and a hub for ongoing experiments in design, infrastructure, and automation.

## 🧠 Tech Stack

- [Astro](https://astro.build) — Web framework, server-rendered via the [`@astrojs/node`](https://docs.astro.build/en/guides/integrations-guide/node/) adapter (standalone mode)  
- [Tailwind CSS](https://tailwindcss.com) — Utility-first styling  
- Markdown-based content collections for blog posts and projects  
- [Nodemailer](https://nodemailer.com) + [hCaptcha](https://www.hcaptcha.com) — Contact form API  

## 🧩 Project Structure

```text
/
├── public/           # Static assets (images, client scripts)
├── scripts/          # Maintenance scripts (yarn pet-photos)
├── src/
│   ├── components/   # UI components
│   ├── config/       # Site settings (links, sky)
│   ├── content/      # Markdown blog posts & projects + collection schema
│   ├── data/         # Generated data (the pet photo list)
│   ├── layouts/      # Page layouts
│   ├── pages/        # Routes, including the /api/contact endpoint
│   └── styles/       # Global styles
├── .gitignore
├── astro.config.mjs
├── package.json
├── README.md
└── tsconfig.json
```

## 🚀 Getting Started

Requires [Node.js](https://nodejs.org) and [Yarn](https://classic.yarnpkg.com) (`npm i -g yarn`).

```sh
yarn install
yarn dev        # dev server at http://localhost:4321
```

### Environment variables

The contact form needs these in a `.env` file at the project root. The rest of the site runs without them.

```env
PUBLIC_HCAPTCHA_SITE_KEY=
HCAPTCHA_SECRET_KEY=
SMTP_HOST=
SMTP_PORT=        # defaults to 2525
SMTP_USER=
SMTP_PASS=
```

### Production

```sh
yarn build
yarn start      # runs the standalone Node server from dist/server/entry.mjs
```

## 🧞 Commands

| Command        | Action                                        |
| -------------- | --------------------------------------------- |
| `yarn install` | Install dependencies                          |
| `yarn dev`     | Start the local dev server                    |
| `yarn build`   | Build the production server to `./dist/`      |
| `yarn start`   | Run the built server                          |
| `yarn preview` | Preview the build locally                     |

## 📄 License

The **code** in this repository is released under the [MIT License](LICENSE). Feel free to borrow anything useful; just keep the copyright notice.

The **content** is not covered by that license and remains © Michael Scott Mulek, all rights reserved. That means the writing in `src/content/` and the personal images in `public/images/` (photos, avatar artwork and logos). Please don't reuse it without asking.
