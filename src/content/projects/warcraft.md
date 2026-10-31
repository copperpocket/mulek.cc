---
title: "Duckcraft - World of Warcraft"
description: "A private Wrath of the Lich King server built on AzerothCore, with playerbots and custom addons."
pubDate: 2025-10-19
category: "Games"
tags: ["AzerothCore", "C++"]
image: "/images/projects/warcraft.png"
---

**Duckcraft** is the World of Warcraft server I run for solo and small-group play. It's a private **Wrath of the Lich King (3.3.5a)** world on [AzerothCore](https://www.azerothcore.org/), with the playerbots module so the world feels alive.

## What it is

- **Game:** Wrath of the Lich King 3.3.5a, on AzerothCore, an open-source framework that recreates the original game.
- **Who it's for:** invite-only. To join, use the [contact page](/contact) and I'll send you an invite and set up your account.
- **Playerbots:** AI-controlled characters who join groups and raids, level alongside players, fill missing roles like tank or healer, and take part in PvP.
- **Custom work:** my own client addons and server modules, described below.
- **Status:** running.

## Setup

Duckcraft runs in its own virtual machine on Proxmox. I installed it with AzerothCore's own install script, not Docker, and running it on its own VM gives me full control over the database and configuration.

Like my other game servers, it sits in the DMZ segment of my [homelab](/projects/homelab-overview), where OPNsense limits what it can reach. The VM is backed up every night with the rest of my services, so a bad update can be undone. The server restarts on a schedule.

## Custom work

I build for both sides of the game: the client players see, and the server that runs the world.

### Client addons

- [StockPlusUI](https://github.com/copperpocket/StockPlusUI): an overhaul of the default game interface. Action bars fade when idle and return during combat, on a new target or when the mouse is over them, and a menu entry opens its settings.
- My fork of [VoiceOver](https://github.com/copperpocket/wow-voiceover/tree/feature/text-display): it shows the quest text on screen, so players can keep reading along after they walk away from the quest giver.

### Server modules

- [mod-level-rewards](https://github.com/copperpocket/mod-level-rewards): a custom module that gives gold, spells and reward chests at level milestones. The chests come in four quality tiers, and their loot is weighted by class, armor type and level range. Rewards go to the mail if a player's bags are full, and playerbot accounts are skipped.
- My version of [ChallengeModes](https://github.com/copperpocket/mod-challenge-modes): a popular module that lets players opt in to extra rules at level 1, such as hardcore or slower XP, and stack the ones that work together.

## Key decisions

- **Updates are manual.** AzerothCore and the playerbots module change often, and automatic updates have broken things before, so I only update when I'm working on it.
- **Its own virtual machine.** Full control over the database and configuration, and a nightly backup that can undo a bad update.
- **Installed without Docker.** I used AzerothCore's own install script.
- **A DMZ segment.** Like the other game servers, it can reach only the internet and DNS.

## Next

- Bring AzerothCore and the playerbots module up to date, then retest the custom modules and addons against them.
