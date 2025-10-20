---
title: "World of Warcraft Server"
description: "A private Wrath of the Lich King server powered by AzerothCore and enhanced with playerbots."
pubDate: 2025-10-19
author: "Michael Mulek"
tags: ["world of warcraft", "azerothcore", "gaming", "projects"]
image: "/images/warcraft.jpg" # optional, remove if not needed
---

My **World of Warcraft server**, called **Duckcraft**, is a private **Wrath of the Lich King (3.3.5a)** world powered by **AzerothCore**. It’s designed for solo and small-group play, featuring the **playerbots module** so the world always feels alive — even when playing alone.

## Technical Setup

Duckcraft runs on top of **AzerothCore**, an open-source MMO framework that recreates the authentic WotLK experience with modern stability and configurability.  
The server is hosted in my **home lab** on dedicated hardware under **Proxmox**, alongside supporting infrastructure like **Authelia**, **Pi-hole**, and **Grafana** for monitoring.

This setup provides:
- Full control over database and configuration tuning  
- Automated snapshots and rollbacks through Proxmox  
- Custom firewall rules and VLAN isolation via **OPNSense**

## Gameplay and Playerbots

The **playerbots module** is the heart of Duckcraft. It populates the world with AI-controlled characters who can:
- Join groups and raids  
- Level alongside players  
- Fill missing roles like tanks or healers  
- Engage in PvP or follow scripted commands

This makes Duckcraft ideal for casual solo play or small-scale co-op without needing a large playerbase. Every quest, dungeon, and battleground remains accessible — with or without real players.

## Management and Configuration

All components are managed through **Docker containers** and **AzerothCore build scripts**, ensuring reproducible setups and easy updates.  
Databases and configs are version-controlled with **Git**, while **Grafana + Prometheus** track system metrics such as CPU load, uptime, and player activity.

Periodic maintenance includes:
- Weekly database backups  
- Core updates from the latest AzerothCore branch  
- Automated cleanup of inactive characters  

## Access and Accounts

Duckcraft is **private and invite-only**. New players receive manual account creation after approval.  
In the future, I plan to integrate account management into a **self-service web panel** secured behind **Authelia SSO**, streamlining registration and login.

## Future Plans

Planned features include:
- Web-based character viewer and realm status  
- Automated daily server restarts and patch syncing  
- Custom events or expansions (e.g., progressive WotLK phases)  

---

A world reborn — forged in code and kept alive through engineering.
