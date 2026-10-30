---
title: "Mailcow"
description: "A self-hosted Mailcow instance for domain-based email and automated system notifications."
pubDate: 2024-10-19
category: "Infrastructure"
tags: ["Docker", "Postfix", "SMTP2GO"]
---

**Mailcow** is the mail server for my domain, mulek.cc. It's a self-hosted, Docker-based mail system that runs my own mailboxes and receives the alerts my servers send.

## What it is

- **What it does:** mailboxes on my own domain, plus a home for system mail such as Proxmox backup reports and Uptime Kuma alerts.
- **Who it's for:** me and the systems I run.
- **Why:** full control and visibility over my own mail, and a place to practice SPF, DKIM and DMARC.
- **Status:** running.

## Setup

[Mailcow](https://mailcow.email/) runs as a Docker stack in its own virtual machine on Proxmox, in the DMZ segment of my [homelab](/projects/homelab-overview).

**Incoming mail.** The public mail server name points at the VPS, not at my home network. Postfix there accepts mail for my domain and relays it to Mailcow through a WireGuard tunnel, so no ports are forwarded to the virtual machine and Mailcow is never exposed to the internet directly. DNS carries the MX, SPF, DKIM and DMARC records that make the mail deliverable and authenticated.

**Outgoing mail.** Mailcow relays outgoing mail through [SMTP2GO](https://www.smtp2go.com/) on their free tier, which fits a low-volume sender: system alerts and personal mail. The path is Mailcow's Postfix, then SMTP2GO, then the recipient.

**System mail.** Proxmox emails its backup reports to a Mailcow mailbox. Uptime Kuma sends its alerts through Mailcow's submission port with an app password that only allows SMTP, so a leaked password can't read the mailbox.

All mail is stored on the virtual machine, which is backed up every night with the rest of my services.

## Key decisions

- **System mail sends from a real mailbox.** Mailcow rejects mail from a domain that doesn't exist, and from my own domain without a real mailbox behind it, so my servers rewrite their sender to one that exists.
- **Outgoing mail goes through a relay.** Gmail refuses mail sent straight from a home connection for failing SPF and DKIM, so SMTP2GO carries it out.
- **Incoming mail arrives through the VPS.** No ports are forwarded to the virtual machine, so Mailcow is never exposed to the internet directly.
- **Uptime Kuma gets an SMTP-only app password.** A leaked password can't read the mailbox.
- **Mail logs are rotated.** A stuck queue once grew the relay's log to 3 GB, so it is now size-managed.

## Next

- Get Crafty Controller's update emails delivering through Mailcow, which means giving it a sender Mailcow accepts.
