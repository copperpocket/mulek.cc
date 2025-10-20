---
title: "Mail Server"
description: "A self-hosted Mailcow instance for domain-based email and automated system notifications."
pubDate: 2025-10-19
author: "Michael Mulek"
tags: ["mailcow", "email", "infrastructure", "self-hosting"]
image: "/images/mail.jpg" # optional, remove if not needed
---

My **mail server** is powered by **Mailcow**, a complete mail system built on Docker that handles all mail-related services under my own domain — **mulek.cc**.  
It’s configured for both practicality and experimentation, serving as a private, self-managed alternative to third-party mail providers.

## Purpose

This setup allows me to:
- Use my **custom domain** for personal and system mail  
- Receive **automated update summaries** from my servers  
- Maintain **full control and visibility** over mail delivery  
- Experiment with **SPF, DKIM, and DMARC** configurations for deliverability

Beyond functionality, it’s also a **proof of concept** — demonstrating how a reliable, domain-based mail service can run entirely within my homelab.

## Sending Mail via SMTP2GO

Outgoing mail is relayed through **SMTP2GO**, using their free tier, which perfectly fits my current needs.  
This setup ensures consistent delivery and reputation while keeping outbound messages lightweight — primarily for system alerts, update reports, and low-volume personal mail.

**Mail delivery pipeline:**  
Postfix → SMTP2GO → Recipient Mailbox

This combination offloads outbound delivery to SMTP2GO’s infrastructure while maintaining complete control of the inbound mail flow through Mailcow.

## Receiving Mail

Mailcow handles all **incoming mail** for `@mulek.cc` addresses directly.  
DNS records (MX, SPF, DKIM, and DMARC) are configured to ensure reliable delivery and authentication. The setup supports multiple user mailboxes, including:
- Personal accounts  
- System and admin notifications  
- Dedicated alert inboxes for server events  

All mail is stored locally within my infrastructure, with automatic backups to my NAS.

## Automated Update Summaries

Each server in my network runs scheduled updates via **APT automation**, and uses **Postfix + SMTP2GO** to send an **update summary email** to my Mailcow inbox.  
This provides a centralized, at-a-glance view of all system maintenance across my homelab — no manual log checking required.

**Example subjects include:**  
    [Update Summary] office-pc-bazzite — 5 packages updated  
    [Update Summary] proxmox-node1 — system fully up to date

## Reliability and Maintenance

Mailcow runs as a **Docker stack** with automated updates and backup routines. Regular checks include:
- Monitoring queue health and message logs  
- Verifying DKIM signatures  
- Updating DNS and SSL certificates as needed  

---

A personal mail system — built for reliability, transparency, and control under my own domain.
