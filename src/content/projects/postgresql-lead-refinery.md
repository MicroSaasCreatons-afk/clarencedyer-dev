---
title: AI Lead Refinery PostgreSQL Data Engine
status: live
tag: Data Pipeline
icon: "🗄️"
category: automation
problem: Scraped business data worthless without verification, scoring, and multi-buyer routing
solution: 25-table PostgreSQL refinery on Contabo running Phil Smith lead scoring, Reoon email verification, multi-market segmentation, and v_sendable clean pool views. Same lead sold 3 to 5 times to different buyer categories.
outcome: 4716 total leads — 25 database tables — Multi-buyer routing architecture
techStack: ["PostgreSQL", "Python", "n8n", "Reoon API", "Docker"]
featured: false
order: 4
---

The refinery transforms raw scraped business contacts into a verified, segmented, and scored lead universe. Phil Smith scoring assigns each lead to one of five financial segments. The v_sendable view ensures only verified, opted-in contacts ever reach the outreach pipeline.
