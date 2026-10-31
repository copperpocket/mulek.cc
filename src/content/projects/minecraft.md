---
title: "Quackshire - Minecraft"
description: "A private Minecraft server that hosts builds from my friends and family."
pubDate: 2025-10-15
category: "Games"
tags: ["Java", "PaperMC"]
github: "https://github.com/copperpocket/quackshire"
image: "/images/projects/minecraft.png"
---

**Quackshire** is the Minecraft server I run for friends and family. It's private and whitelisted, and it's where my partner and I keep our main survival world.

## What it is

- **Game:** Minecraft, survival. The main world began as a creative build and is now survival. It uses server-side plugins only, so nobody has to install client mods. The plugins cover quality-of-life tools, build protections and light role-based permissions.
- **Who it's for:** friends and family only, by whitelist.
- **How you join:** by name, `mc.mulek.cc`, with no IP address or port number to remember.
- **Status:** running.

## Setup

The server runs on [PaperMC](https://papermc.io/), a performance-focused fork of Spigot with strong plugin support. Paper lets me tune performance and adjust gameplay with small mechanics, commands and custom tools, while staying light enough to run around the clock in my homelab.

[Crafty Controller](https://craftycontrol.com/) runs and manages the server, with automated restarts. It lives in the DMZ segment of my [homelab](/projects/homelab-overview), so it can reach the internet and DNS and nothing else on my network. OPNsense controls what it can reach, and AdGuard Home handles DNS.

Players connect through a DNS SRV record, a type of DNS entry that carries a port as well as an address. The record points `mc.mulek.cc` at the server, so nobody types a port, and if the server's address ever changes, only the record has to change.

Its container is backed up every night with the rest of my services, so the world is protected like everything else I run.

## Key decisions

- **Server-side plugins only.** Nobody has to install client mods, so anyone can join with an unmodified Minecraft client.
- **A DNS SRV record for joining.** Players use `mc.mulek.cc` with no port, and if the server's address changes, only the record changes.
- **A DMZ segment.** The server can reach the internet and DNS and nothing else on my network.

## Next

A small server site is planned, with a guide to joining, a page to request whitelisting and a role such as builder or moderator, and server news. This page will link to it once it exists.
