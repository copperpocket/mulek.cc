---
title: "Homelab Overview"
description: "The network, servers and services I run at home, and what I've learned building them."
pubDate: 2025-10-19
category: "Infrastructure"
tags: ["Proxmox", "TrueNAS", "OPNsense"]
---

My homelab is where I run my own services, try new tools before I use them at work, and host the game servers I run for friends and family. It's one Proxmox host, one TrueNAS storage server, and a network built around a dedicated OPNsense firewall.

I don't publish addresses or a full service list. This page covers the design and the parts I'm proudest of.

## Firewall and internet

The firewall is an Intel N100 fanless mini PC with four ports, the kind sold as a "pfSense router" on AliExpress. It shipped with no RAM, so I added 64GB of DDR5. It runs [OPNsense](https://opnsense.org/) on its own hardware instead of in a virtual machine, so the network stays up when I'm rebooting or breaking things on Proxmox.

My internet is 1000/1000 fiber. The first port is the WAN. The other three are bundled into a LAGG that connects to the switch. Traffic between VLANs all passes through the firewall, so bundling the links means it isn't squeezed down to a single gigabit link.

## Switches and Wi-Fi

- **MikroTik CRS326-24G-2S+RM:** my main switch, with 24 gigabit ports and two SFP+ ports, which is how I'm leaving room to move to faster links later. I chose MikroTik because of the good reviews and because it cost far less than the Cisco options. RouterOS is complicated and unlike other switch software, but I like working in it. I actually ordered the CSS326, which runs the simpler SwOS. The seller sent the CRS326 by mistake and let me keep it, so I got RouterOS for free.
- **TP-Link TL-SG1210MPE:** a small switch I use only for PoE. The cameras and access points plug into it, and it powers them.
- **Access points:** two Ubiquiti UAP-AC-PRO units, managed by a UniFi controller running in a container on Proxmox.

## VLANs

The network is split into seven segments, so a problem on one device can't reach the rest. Everything is blocked by default, and each segment is allowed only what it needs. Most segments use my own DNS server, AdGuard Home. Guest uses a public one.

| Segment | What lives there |
| :--- | :--- |
| Trusted | The household's own devices: PCs, laptops, phones, tablets, the Steam Deck and VPN clients. They reach the internet, DNS and my apps through the reverse proxy, and nothing else directly apart from a few named rules, such as file shares, the Minecraft server and administration from one machine. |
| Guest | Visitors' devices, plus the work laptops Chelsea and I use from home, so employer-managed devices stay off my own network. It reaches the internet through a public DNS server and nothing else. |
| IoT | Smart home devices. They reach the internet, DNS and the reverse proxy on its web ports. They can't reach Trusted, Management or Security. |
| Servers | Home Assistant, Docker hosts and the apps behind my reverse proxy. It can reach IoT and the DMZ. Into Management and Security, only Caddy, my dashboard and my monitoring are allowed, each on the ports it needs. |
| Security | The cameras and the [Frigate](https://frigate.video/) recorder. They get DNS and nothing else: no internet at all. The only way to the Frigate page is through the reverse proxy, and from outside my network the only way in is the VPN. |
| DMZ | Everything meant to be reached from the internet: n8n (my YouTube upload workflow, which needs a public domain name), Jellyfin, Gitea, Authelia, a file browser and the game servers. They reach the internet and DNS, and no other segment. |
| Management | Switches, access points, the NAS, and the Proxmox and OPNsense management pages. Nothing reaches it except Caddy, my dashboard, my monitoring and a few named administration rules. It starts few connections of its own: DNS, time sync, updates, backups, and the access points reaching their controller. |

Most web pages are administered through the reverse proxy. The switches can't be proxied, so one named rule lets my own PC, and nothing else, reach them and the other management pages directly.

## Servers

- **Proxmox:** one host with an AMD Ryzen 7 5700G (8 cores, 16 threads) and 64GB of RAM. Most services are lightweight Linux containers (LXCs), with virtual machines where I want full isolation. Snapshots run nightly.
- **TrueNAS:** a separate machine with an AMD Ryzen 5 4600G (6 cores, 12 threads) for storage and backups.

## Reverse proxy and DNS

- **Caddy, twice:** an internal [Caddy](https://caddyserver.com/) runs in a Proxmox container for services at home. A second Caddy runs on a VPS for the services that need to be reachable from the internet.
- **AdGuard Home:** DNS filtering for the whole network, blocking ads and trackers. It runs as a container on Proxmox. It replaced Pi-hole.

## What runs where

Almost everything runs at home. The exceptions are mulek.cc and the external Caddy, which run on a VPS so a problem with the public site can't reach my home network. I used to host it in the lab. Pushing to the `master` branch on GitHub redeploys it through Dokploy.

## More from the lab

- [Quackshire](/projects/minecraft): the Minecraft server.
- [Duckcraft](/projects/warcraft): the World of Warcraft server.
- [Mailcow](/projects/mailcow): my mail server.
- [mulek.cc](/projects/portfolio): this site.

## Why I do it

I like knowing how a system works under the hood, and a homelab is a safe place to break things and learn from it.
