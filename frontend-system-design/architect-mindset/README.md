# Architect Mindset

## Overview

The jump from senior to architect is not more libraries — it is **structured thinking under uncertainty**. This is the most important module: how to decide, communicate, and defend tradeoffs.

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | Ask clarifying questions before designing |
| **Intermediate** | Present context → constraints → diagram → tradeoffs |
| **Advanced** | Anticipate failure modes and observability needs |
| **Expert** | Align technical choices with org and business constraints |

---

## Questions to always ask

1. **Who** are the users? Devices? Networks?
2. **What** are functional vs non-functional requirements?
3. **Scale** — DAU, requests/sec, data size, team count?
4. **SEO / shareability** required?
5. **Real-time** needs?
6. **Compliance** — PCI, HIPAA, GDPR?
7. **Timeline** — MVP vs v2?
8. **Team topology** — who owns what?

---

## The tradeoff framework

For every decision, document:

| Option A | Option B |
|----------|----------|
| Benefits | Benefits |
| Costs / risks | Costs / risks |
| When to choose | When to choose |

**Never** say "best practice" without context.

---

## What breaks first at scale?

| Layer | Often breaks first |
|-------|-------------------|
| **Frontend** | Bundle size, main thread, memory leaks |
| **API** | N+1 queries, payload size, rate limits |
| **Cache** | Stale data, invalidation bugs |
| **Org** | Unclear ownership, missing design system |
| **Ops** | No metrics, blind deploys |

Use [observability](../observability/README.md) and [deployment](../deployment/README.md) to close the loop.

---

## Interview time box (35–45 min)

Use the **[RADIO framework](../system-design-interviews/README.md)** for structured rounds:

| Phase | Time | Output |
|-------|------|--------|
| **R** Requirements | 5 min | Assumptions list |
| **A** Architecture | 8 min | Box diagram + narrative |
| **D** Data model | 5 min | Entities + client state |
| **I** Interface | 7 min | APIs + error handling |
| **O** Optimizations | 15 min | Tradeoffs + deep dive |

Practice with [case-studies](../case-studies/README.md).

---

## Production debugging mindset

- **Measure before optimize** — RUM, traces, repro steps
- **Hypothesis → experiment** — not random changes
- **Blast radius** — feature flags, canary, rollback
- **Postmortem** — blameless, action items

---

## Interview questions

1. **(Medium)** "Design Instagram frontend" — first 5 questions?
2. **(Medium)** Defend CSR when interviewer pushes SSR.
3. **(Hard)** Two teams want conflicting architectures — resolve how?
4. **(Hard)** CTO wants micro-frontends in 3 months — response?
5. **(Hard)** What metric proves your design succeeded?

---

## Related topics

- [system-design-interviews](../system-design-interviews/README.md) — RADIO framework for interviews
- [foundations](../foundations/README.md)
- [case-studies](../case-studies/README.md)
- [ROADMAP.md](../ROADMAP.md)
