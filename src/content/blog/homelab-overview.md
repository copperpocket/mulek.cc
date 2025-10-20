---
title: "Homelab Overview"
description: "A self-hosted ecosystem that powers my personal services, experiments, and development projects."
pubDate: 2025-10-19
author: "Michael Mulek"
tags: ["homelab", "self-hosting", "infrastructure", "projects"]
image: "/images/homelab.jpg"
---

My **homelab** is a self-contained environment designed to power my personal services, test new technologies, and host private projects. It’s a mix of practical infrastructure and ongoing experimentation — blending automation, virtualization, and network management into a compact, efficient setup.

## Purpose

The goal of this homelab is **autonomy** and **learning**. Every service I host — from authentication and DNS filtering to game servers and dashboards — teaches me more about system administration, networking, and automation.

It’s also a **sandbox for projects** like my Minecraft world (*Quackshire*), World of Warcraft private server (*Duckcraft*), and internal tools I develop or test before deploying elsewhere.

---

## Network Diagram

Here’s a simplified view of my home network layout, showing how each component fits together:

    ┌──────────────────────────────┐
    │           Internet           │
    └──────────────┬───────────────┘
                   │
               [ISP Modem]
                   │
         ┌─────────┴─────────┐
         │     OPNSense      │
         │ Firewall + Router │
         └─────────┬─────────┘
                   │
           ┌───────┼─────────────┐
           │       │             │
     [LAN Switch] [Wi-Fi AP] [IoT VLAN]
           │
    ┌──────┼────────────────────┐
    │      │                    │
    [Proxmox] [Pi-hole] [NAS / Backups]
    │
    ├─── Virtual Machines:
    │ • Authelia
    │ • Vaultwarden
    │ • Zammad
    │ • Caddy
    │ • Grafana
    │ • Prometheus
    │
    ├─── Game Servers:
    │ • Duckcraft (AzerothCore WoW)
    │ • Quackshire (PaperMC Minecraft)

---

## Core Infrastructure

- **Firewall & Router:**  
  [**OPNSense**](https://opnsense.org/) runs as my main gateway, handling VLANs, VPNs, and traffic shaping. It provides complete visibility and control over all network traffic.

- **DNS Filtering:**  
  [**Pi-hole**](https://pi-hole.net/) acts as a local DNS sinkhole to block ads, trackers, and telemetry. It keeps the network fast, clean, and secure.

- **Virtualization:**  
  [**Proxmox VE**](https://www.proxmox.com/en/) powers most of the lab’s workloads, running lightweight Linux containers (LXCs) and virtual machines for isolation and resource control.

---

## Services and Applications

- **Authelia**  
*Role:* Authentication Proxy  
*Notes:* Manages SSO and secure access to all internal services  

- **Vaultwarden**  
*Role:* Password Manager  
*Notes:* Self-hosted Bitwarden-compatible server  

- **Zammad**  
*Role:* Helpdesk  
*Notes:* Used for IT-style ticket management and experimentation  

- **Nginx Proxy Manager**  
*Role:* Reverse Proxy  
*Notes:* Simplifies SSL management and routing for web services  

- **Grafana + Prometheus**  
*Role:* Monitoring  
*Notes:* Tracks uptime, system load, and resource metrics  

- **Duckcraft**  
*Role:* WoW Server  
*Notes:* Private AzerothCore server with playerbot integration  

- **Quackshire**  
*Role:* Minecraft Server  
*Notes:* Private creative world hosted on PaperMC 

---

## Backup and Maintenance

Automated snapshots and rsync-based backups run nightly to my NAS. Configuration files are version-controlled through **GitHub**, and critical systems are monitored via Grafana alerts.

Regular maintenance tasks include:
- Updating containers and VMs weekly  
- Reviewing firewall and DNS logs  
- Testing backup restoration quarterly  

---

## Philosophy

This homelab isn’t just for convenience — it’s about **understanding systems deeply**. Every configuration, container, and VLAN teaches something new about networking, security, and infrastructure resilience.

It’s a living environment that evolves with my skills, providing a platform for both personal use and technical exploration.

---

A small, self-contained world — built for learning, reliability, and control.
