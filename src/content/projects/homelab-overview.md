---
title: "Homelab Overview"
description: "The network, servers and services I run at home, and what I've learned building them."
pubDate: 2025-10-19
category: "Infrastructure"
tags: ["Proxmox", "TrueNAS", "OPNsense"]
---

## What it is

My homelab is where I run my own services and try new tools before I use them at work. It's also where the game servers for friends and family live. The core is one Proxmox host, one TrueNAS storage server and a network built around a dedicated OPNsense firewall.

This page covers how the homelab is put together: how the network is divided, how I reach the lab from outside and how everything is backed up. I leave out addresses and the full list of services.

## Setup

The hardware, from the internet connection to the servers.

### Firewall and internet

The firewall is a fanless Intel N100 mini PC (4 cores, 64GB of DDR5) with four network ports. It runs [OPNsense](https://opnsense.org/) on its own hardware instead of in a virtual machine, so the network stays up when I'm rebooting or breaking things on Proxmox.

My internet is 1000/1000 fiber. The first port is the WAN. The other three are bundled into a LAGG that connects to the switch. Traffic between VLANs all passes through the firewall, so bundling the links keeps that traffic from being squeezed down to a single gigabit link.

### Switches and Wi-Fi

- **MikroTik CRS326-24G-2S+RM:** the main switch. It has 24 gigabit ports and two SFP+ ports, and it carries all the VLANs.
- **TP-Link TL-SG1210MPE:** a small switch used only for PoE. It powers the cameras and the access points.
- **Access points:** two Ubiquiti UAP-AC-PRO units, managed by a UniFi controller running in a container on Proxmox.

### Servers

- **Proxmox:** one host with an AMD Ryzen 7 5700G (8 cores, 16 threads) and 64GB of RAM. Most services are lightweight Linux containers (LXCs), with virtual machines where I want full isolation.
- **TrueNAS:** a separate machine with an AMD Ryzen 5 4600G (6 cores, 12 threads) for storage and backups.

## Reverse proxy and DNS

- **Two reverse proxies:** an internal [Caddy](https://caddyserver.com/) runs in a Proxmox container for services at home. [Traefik](https://traefik.io/), managed by Dokploy on a small VPS (a rented server outside my home), fronts the services that need to be reachable from the internet and reaches the ones at home through WireGuard tunnels that those services open to the VPS.
- **AdGuard Home:** DNS filtering for the whole network, blocking ads and trackers. It runs as a container on Proxmox. It replaced Pi-hole.

## VLANs

The network is split into seven segments, so a problem on one device stays where it started. Everything is blocked by default, and each segment gets only what it needs. Most of them use my own DNS server, AdGuard Home. Guests get a public one.

| Segment | What lives there |
| :--- | :--- |
| Trusted | Our own computers, phones and tablets. They can reach the internet, DNS and my apps through the reverse proxy, plus a few named exceptions, like file shares. |
| Guest | Visitors' devices and the work laptops we use from home, so employer-managed devices stay off my own network. Internet and public DNS, nothing else. |
| IoT | Smart home devices. They get the internet, DNS and the web ports of the reverse proxy, and they can't reach anything sensitive. |
| Servers | The services I run at home and the hosts behind my reverse proxy. They can talk to IoT and the DMZ, and reach into Management and Security only for narrow jobs like monitoring, each on just the ports it needs. |
| Security | The cameras and their recorder. They get DNS and nothing else, with no internet at all. The recorder's page is reachable only through the reverse proxy, and from outside the only way in is my private tailnet (see Remote access). |
| DMZ | The services meant to be reached from the internet, including the game servers. They get the internet and DNS, and no other segment. |
| Management | The switches, access points, storage server, and the admin pages for the firewall and Proxmox. Very little can reach this segment, and it starts few connections of its own: DNS, time sync, updates and backups. |

Most admin pages are reached through the reverse proxy. The switches can't be proxied, so a single rule lets only my own PC reach them directly.

## Remote access

No management page is open to the internet, and the firewall has no inbound rules for administration. When I'm away I reach everything over a private network (a tailnet) built from [Tailscale](https://tailscale.com/) clients and a [Headscale](https://headscale.net/) coordination server that I host myself on the VPS, so no outside company holds the keys. Each device proves who it is with its own key.

A small container at home acts as the doorway. It advertises single hosts from the Servers segment instead of the whole segment, because traffic that stays inside one VLAN never passes the firewall and would skip the firewall's rules. The tailnet's DNS points at AdGuard Home, so ad blocking and my internal names work when I'm away from home. A wired break-glass port on the switch gets me into Management if the tailnet is ever down.

## Backups and monitoring

- **Containers:** Proxmox Backup Server snapshots every container each night onto TrueNAS.
- **The VPS:** each night it gathers the things I can't rebuild, such as the Headscale database and the Dokploy configuration. A dedicated backup container at home then pulls them into an encrypted [restic](https://restic.net/) repository. I chose pull over push so the VPS holds no credentials for my network. A weekly check reads back every byte of the repository, and I've done a test restore to prove the backups work.
- **Alerts:** [Uptime Kuma](https://uptime.kuma.pet/) watches the public site and both backup jobs, and emails me through my own Mailcow server if one fails or goes silent.

## What runs where

Almost everything runs at home. The VPS handles the pieces that face the internet or need to stay up when my home network is down: the public reverse proxy, the public mail relay, the Headscale server for remote access, and this site. Keeping them there keeps the exposed edge away from the lab.

The site deploys itself. Pushing to the `master` branch on GitHub makes Dokploy rebuild and redeploy it.

## More from the lab

- [Quackshire](/projects/minecraft): the Minecraft server.
- [Duckcraft](/projects/warcraft): the World of Warcraft server.
- [Mailcow](/projects/mailcow): my mail server.
- [mulek.cc](/projects/portfolio): this site.

## Why I do it

I've always enjoyed learning how things work, and a homelab lets me do that with real systems instead of just reading about them. It's also one of the best ways I've found to build my skills for my job, and building mine has given me real confidence in my IT skills.

I run the whole lab myself, mostly on open source software, so I know what's running and who can reach each part. That's why security shapes the design, from a firewall that blocks everything by default to management that never touches the internet.

## Key decisions

- **A dedicated firewall instead of a virtual one.** The network stays up while I reboot or break things on Proxmox.
- **Blocked by default.** Each VLAN gets only what it needs, and management never touches the internet.
- **Pull backups instead of push.** The VPS holds no credentials for my network, and a dedicated container at home fetches what it needs.
- **Single hosts through the tailnet.** The doorway advertises individual hosts, not whole segments, because traffic inside one VLAN would skip the firewall's rules.
- **Self-hosted remote access.** I run Headscale myself, so no outside company holds the keys.
- **Restores are tested.** I restored the Headscale database from a snapshot to prove the backups work.

## Next

- Rebuild the Wi-Fi so one network name covers every kind of device.
- Add an offsite copy of the backups.
- Draw a real network diagram for this page.
