---
title: "Minecraft Server"
description: "A private Minecraft server that hosts builds from my friends and family."
pubDate: 2025-10-15
author: "Michael Mulek"
tags: ["minecraft", "gaming", "projects"]
image: "/images/minecraft.jpg" # optional, remove if not needed
---

My **Minecraft server**, called **Quackshire**, is a private creative world that I host myself for friends and family. It’s designed to be simple, stable, and always available — a small but personal online space for shared creativity.

## Technical Setup

The server runs on **PaperMC**, a high-performance fork of Spigot built for flexibility and plugin support. Paper allows me to fine-tune performance and maintain complete control over gameplay, while still keeping things lightweight enough to run 24/7 from my home lab.

I host the server directly on my own hardware, using **Linux** and managed through **OPNSense** for network control. A **Pi-hole** instance helps manage DNS and block unnecessary traffic, keeping the environment clean and secure.

## Customization and Plugins

Quackshire uses a curated set of **server-side plugins** to enhance the creative experience without requiring anyone to install client mods. This includes quality-of-life tools, build protections, and light role-based permissions for collaborative building.

Since PaperMC supports customization through its plugin ecosystem, I can adjust gameplay as needed — adding small mechanics, commands, or custom tools to improve how we play.

## Connecting with a Custom Domain

Instead of using a raw IP address, I configured a **DNS SRV record** that lets players join easily through a **fully qualified domain name (FQDN)**. This makes the connection cleaner and future-proofs access if the server ever changes addresses.  

Example: play.mulek.cc

This setup means players can connect seamlessly, no port numbers or IP memorization needed.

## Access and Whitelisting

The server is **whitelisted**, meaning only approved accounts can join. It’s kept small and personal — open to my friends and family. I’m also developing a lightweight **web interface** where visitors can **request whitelisting** and **apply for promotion** (e.g., builder or moderator roles).

That companion site will serve as a simple portal for server info, updates, and requests — keeping everything centralized and accessible.

## Always Online

Quackshire runs continuously with automated restarts and backups, ensuring uptime and data protection. If you’re curious about the technical side or want to know more about the setup, feel free to **reach out directly** — I’m always happy to talk about server architecture and hosting projects like this.

---

A world built for creativity — and kept running through a love of good engineering.

