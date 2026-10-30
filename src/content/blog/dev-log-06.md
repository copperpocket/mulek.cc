---
title: "[AI] Dev Log #6: One Structure for Every Project Write-up"
description: "Every project write-up now follows the same four parts, with real decisions and a next step on each page."
pubDate: 2026-10-30
tags: ["dev-log", "content", "tooling"]
---

## Summary

- **Dates:** October 29–30, 2026
- **Commits:** 4, all on the `dev` branch
- **Files changed:** 10 (+213 / −126 lines)
- **Status:** PR #14 (Dev Log #5) is merged to `master` and deployed; everything here ships with the PR that publishes this post

This round gave the six project write-ups one shared structure, so each page says what the project is, how it runs, why it is built that way and where to pick it up again.

---

## What changed

### Content

- Every project write-up has the same four required parts: What it is, Setup, Key decisions and Next, with any extra sections in the middle
- What it is holds the labelled facts: who it's for, how to get access and the status
- Key decisions replaces Lessons Learned with a short list of "I chose X because Y"
- Next says where to pick the project up again: what's planned or what's left undone
- Mailcow is rewritten around how mail actually flows: incoming mail arrives through the VPS over WireGuard, outgoing mail goes through SMTP2GO, and Uptime Kuma sends its alerts with an SMTP-only app password
- Quackshire and Duckcraft are rewritten in the same plain voice, and Quackshire's tag now says PaperMC
- The Homelab Overview follows the structure too, with its hardware sections under Setup
- Echo Protocol's "How it works" is now Setup, and the page is marked archived under Next

### Tooling

- The project template and the project notes in `CLAUDE.md` describe the new structure
- `ROADMAP.md` gains the Quackshire server site, and its stale write-up item now asks only for the homelab network diagram

---

## What we learned

- **List choices, not faults.** A public list of what went wrong read oddly, while "I chose X because Y" shows the reasoning without it.
- **A required Next makes a project easy to resume.** Each page now ends with where to pick it up.
- **Write only decisions that are true.** The template says so, since a decision that was never made would be filler.
- **Matching edges make pages easy to compare.** Fixed first and last sections leave the middle free for what is specific to each project.
- **Line endings can hide a failed edit.** The project files use CRLF, so a scripted replace written with `\n` matched nothing and said nothing; normalizing first and checking the result catches it.

---

## Commits

### On `dev` (ships with this post)

| Commit | Message |
| --- | --- |
| `e45cc2c` | docs(projects): give every write-up the same four-part structure |
| `c4a0389` | docs(roadmap): add the Quackshire server site |

Plus two more commits: one that adds this post, `docs(blog): add Dev Log #6`, and one that updates the roadmap item for the write-ups.

---

## Next up

- Per-project link preview images
- A real homelab network diagram
- A "How this site deploys" write-up
- The Quackshire server site

> 🔗 **Repository:** [github.com/copperpocket/mulek.cc](https://github.com/copperpocket/mulek.cc)
