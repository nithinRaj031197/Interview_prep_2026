# Frontend System Design Case Studies

## Overview

**Case studies** tie every topic together. Use them for **mock interviews**, **portfolio narratives**, and **Week 7–8 capstones** in the [LEARNING_PATH](../LEARNING_PATH.md). Each study follows: context → constraints → diagram → deep dives → tradeoffs → rollout.

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | Walk through a provided case end-to-end |
| **Intermediate** | Adapt a case to new requirements in interview |
| **Advanced** | Design two systems from scratch in 45 min |
| **Expert** | Critique and improve another team's design |

---

## How to use this folder

1. Read one case **without** looking at the solution outline.
2. Sketch your design in 25 minutes (timer).
3. Compare with the outline — note gaps.
4. Practice explaining aloud using **[RADIO](../system-design-interviews/README.md)** — Requirements → Architecture → Data → Interface → Optimizations.

---

# Case 1: E-commerce Frontend

## Context

Multi-category shop. 2M MAU. Mobile-heavy. SEO matters for PLP/PDP. Checkout must be secure and fast.

## Constraints

- Global CDN; peak Black Friday 10× traffic
- Teams: catalog, checkout, account
- Third-party payment SDK

## High-level diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        CDN / Edge                           │
└───────────────┬─────────────────────────────┬───────────────┘
                │                             │
         ┌──────▼──────┐               ┌──────▼──────┐
         │ SSG/ISR     │               │ CSR         │
         │ PLP / PDP   │               │ Cart/Acct   │
         └──────┬──────┘               └──────┬──────┘
                │                             │
                └──────────────┬──────────────┘
                               ▼
                        ┌─────────────┐
                        │ BFF / APIs  │
                        └─────────────┘
```

## Deep dives

| Area | Decision | Why |
|------|----------|-----|
| PLP | ISR 120s + client filter | SEO + fresh enough prices |
| PDP | ISR + client stock badge | SEO body; real-time inventory |
| Cart | Server source of truth | Sync across devices |
| Search | Debounced + URL state | Shareable, INP-friendly |
| Images | CDN WebP, explicit sizes | LCP, CLS |

## Tradeoffs discussed

- **Micro-frontends vs monolith:** Start monolith + module boundaries; split checkout only if team scale demands
- **Full SSR vs ISR:** ISR cheaper for catalog scale

## Rollout

1. MVP: PLP/PDP SSG, CSR cart
2. v2: React Query + optimistic cart
3. v3: ISR on-demand for CMS publishes
4. Metrics: conversion, checkout error rate, LCP p75

## Interview prompts

- "How handle sold-out during checkout?"
- "Design promo banner without hurting LCP"

---

# Case 2: Social Media Feed

## Context

Infinite scroll feed. Photos + short video. Real-time likes. 50M DAU. Mobile-first.

## Constraints

- Feed must feel instant; offline read last N items nice-to-have
- Moderation: hide toxic content quickly
- Ad slots every 5th item (CLS risk)

## High-level diagram

```
 Client                          Backend
┌──────────────┐                ┌──────────────┐
│ Feed shell   │◀── WebSocket ──│ Real-time    │
│ Virtual list │◀── REST/page ──│ Feed API     │
│ Media cache  │                │ Media CDN    │
└──────────────┘                └──────────────┘
```

## Deep dives

| Area | Decision | Why |
|------|----------|-----|
| List | Virtualization | DOM cap on long sessions |
| Media | Lazy + prefetch next page | Bandwidth vs scroll UX |
| Likes | Optimistic + WS confirm | Snappy UI |
| Ads | Reserved height slots | CLS budget |
| Compose | CSR modal | No SEO need |

## Tradeoffs

| Option | Pros | Cons |
|--------|------|------|
| Pull pagination | Simple | Less real-time feel |
| WebSocket feed | Live updates | Connection mgmt on mobile |
| Full offline PWA | Resilient | Stale, complex sync |

## Rollout

1. MVP: paginated REST + virtual list
2. v2: optimistic interactions
3. v3: WS for live counts; read cache offline

## Interview prompts

- "Design YouTube frontend" (extend to video player + recommendations)
- "Feed slows on low-end Android — debug plan"

---

# Case 3: YouTube-like Video Platform (Bonus)

## Clarifying questions

- Live vs VOD? Both.
- TV apps? Web focus first.
- Upload or watch-only? Watch + creator studio separate.

## Architecture sketch

```
┌────────────┐     ┌────────────┐     ┌────────────┐
│ Home/Rec   │     │ Watch page │     │ Search     │
│ ISR + CSR  │     │ SSR meta   │     │ CSR + deb  │
└─────┬──────┘     └─────┬──────┘     └─────┬──────┘
      │                  │                  │
      └──────────────────┼──────────────────┘
                         ▼
              Adaptive streaming (HLS/DASH)
              Thumbnail CDN, captions track
```

## Key decisions

- Watch page: SSR for `<title>`, description, thumbnail JSON-LD; player CSR
- Adaptive bitrate — not frontend-only but coordinate loading strategy
- Comments: paginated, separate bundle lazy load

---

## Mock interview checklist

Before any case, ask:

- [ ] Who are users? Which devices?
- [ ] SEO / shareability required?
- [ ] Real-time needs?
- [ ] Scale (DAU, regions)?
- [ ] Team structure?
- [ ] Offline / i18n?

Always end with:

- [ ] Tradeoff table (2 options)
- [ ] What you'd build in MVP vs v2
- [ ] Metrics to validate success

---

## Interview questions & answers

### 1. (Easy) First 3 questions you'd ask in any FE system design?

**Answer:** Users and scale; SEO vs app-only; real-time requirements. Then team size and timeline for MVP.

### 2. (Medium) E-commerce — where put search autocomplete?

**Answer:** Debounced client fetch; cache recent queries; keyboard a11y; cancel in-flight on new keystroke; rate limit API; show skeleton not layout shift.

### 3. (Medium) Social feed — how many items in DOM?

**Answer:** Virtualize — only visible + overscan (~20–40 nodes). Recycle measurements; stable keys; a11y focus management on scroll.

### 4. (Hard) Design frontend for Uber-like live map.

**Answer:** WebSocket driver locations; throttle marker updates; cluster at low zoom; separate layers (user, drivers, route); battery-aware poll interval on mobile; fallback polling if WS drops.

### 5. (Hard) Compare Netflix-style app vs news site architecture.

**Answer:** Netflix: CSR-heavy, prefetch next titles, DRM player, personalization APIs, no SEO on catalog. News: SSR/ISR for articles, aggressive CDN, ads CLS, AMP optional legacy — different rendering and cache defaults.

### 6. (Hard) You have 35 minutes — time allocation?

**Answer:** 3 min clarify, 7 min diagram + narrative, 15 min deep dive (they pick), 5 min tradeoffs, 5 min rollout/metrics. Leave buffer for questions.

---

## Further reading

- [System Design Primer](https://github.com/donnemartin/system-design-primer)
- [GreatFrontEnd — System design](https://www.greatfrontend.com/)
- All topic READMEs in this repo for deep dives

---

## Related topics

- [system-design-interviews](../system-design-interviews/README.md) — RADIO framework
- [rendering-strategies](../rendering-strategies/README.md)
- [performance](../performance/README.md)
- [data-layer](../data-layer/README.md)
- [scalability](../scalability/README.md)
- [LEARNING_PATH](../LEARNING_PATH.md) — 2-month plan
