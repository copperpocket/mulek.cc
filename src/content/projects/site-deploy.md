---
title: "How This Site Deploys"
description: "How a merge to master becomes the live site: Dokploy, Nixpacks and Traefik on a VPS."
pubDate: 2026-10-30
category: "Infrastructure"
tags: ["Dokploy", "Nixpacks", "Traefik", "GitHub"]
github: "https://github.com/copperpocket/mulek.cc"
---

Merging to the `master` branch on GitHub is the whole release process for [mulek.cc](/projects/portfolio). A webhook tells Dokploy, which builds the site and puts the new version live, with no manual steps in between.

## What it is

- **What it does:** turns a merge into a live deploy of this site.
- **Who it's for:** me, and anyone curious how a personal site gets from a commit to a page.
- **Parts:** GitHub, a webhook, [Dokploy](https://dokploy.com/), [Nixpacks](https://nixpacks.com/) and [Traefik](https://traefik.io/).
- **Status:** running.

## Setup

Dokploy runs on a small VPS, a rented server kept apart from my home network. It is the same VPS that hosts the public reverse proxy described in the [Homelab Overview](/projects/homelab-overview). The site is one Dokploy application that watches the `master` branch of the public repository.

There is no Dockerfile in the repository. Dokploy builds with Nixpacks, which reads the project, sees Node and Yarn, and uses the `build` and `start` scripts from `package.json` to make a container image. Traefik, which Dokploy manages, receives the traffic for mulek.cc and sends it to that container. It also gets and renews the HTTPS certificate automatically.

### What runs on the server

Almost nothing. Every page is built once during the deploy and served as a file, so the only code that runs on the server is the contact form's endpoint, through Astro's Node adapter.

## From commit to live

1. I work on the `dev` branch. Pushing to `dev` deploys nothing.
2. When a round of changes is ready, I open a pull request from `dev` to `master`. It follows a template with a plain-English title, the commit list and an after-deploy checklist.
3. I merge with a merge commit. That is the deploy.
4. GitHub sends a webhook to Dokploy, which pulls `master`, builds the image with Nixpacks and starts the new version.
5. After the deploy, I click through the changed pages in light and dark mode, and on a phone.

## When something goes wrong

If a deploy breaks the site, I can redeploy an earlier build from Dokploy. [Uptime Kuma](https://uptimekuma.org/) checks mulek.cc, and the nightly backup of the VPS includes the Dokploy configuration, so the setup can be rebuilt. The backup is covered in the [Homelab Overview](/projects/homelab-overview).

## Key decisions

- **Work happens on `dev`, and only `master` deploys.** The live site changes only when I merge a pull request, so unfinished work never goes out by accident.
- **The site runs on the VPS, not at home.** The part of my setup that faces the internet stays away from the lab.
- **The VPS is backed up by pulling.** A container at home fetches the Dokploy configuration, so the VPS holds no credentials for my network.

## Next

- Optional: add CrowdSec on the VPS, watching the Traefik, Postfix and SSH logs. Traefik is the doorway this site comes in through.
