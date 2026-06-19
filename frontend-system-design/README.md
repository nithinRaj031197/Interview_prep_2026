# Frontend System Design — Learning Path

A structured curriculum for **senior frontend engineers** and **solution architects** who need to reason about UI at scale: not just components and hooks, but **boundaries, data flow, performance budgets, security, and organizational tradeoffs**.

This repo is **markdown-first** — read it on GitHub, in your editor, or offline. No build step required.

---

## Start here: 2-month plan

**New to the curriculum?** Follow the week-by-week schedule:

**[LEARNING_PATH.md](./LEARNING_PATH.md)** — 8-week plan from foundations → architect level, with daily routine, project milestones, and interview prep strategy.

---

## Who this is for

| Audience | What you'll gain |
|----------|------------------|
| **Mid → Senior FE** | Vocabulary and patterns for architecture discussions |
| **Staff / Principal FE** | Framework for cross-team design reviews |
| **Solution architects** | Bridge between product, backend, and client constraints |
| **Interview prep** | Structured answers for system design rounds (FE-focused) |

---

## Learning path: beginner → architect

Follow folders **in order** for a linear path, or jump by interest. The four phases align with [LEARNING_PATH.md](./LEARNING_PATH.md).

```
┌─────────────────────────────────────────────────────────────────────────┐
│  PHASE 1 — FOUNDATIONS (Weeks 1–2)                                      │
│  foundations → component-architecture → design-patterns                 │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  PHASE 2 — REACT & ARCHITECTURE (Weeks 3–4)                             │
│  state-management → performance → data-layer → security → testing       │
│  → accessibility                                                        │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  PHASE 3 — SYSTEM DESIGN CORE (Weeks 5–6)                               │
│  rendering-strategies → tooling → design-system → scalability           │
│  → advanced-topics                                                      │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  PHASE 4 — ARCHITECT LEVEL (Weeks 7–8)                                  │
│  observability → deployment → case-studies                              │
└─────────────────────────────────────────────────────────────────────────┘
```

### Phase 1 — Think in systems, not screens

1. **[foundations](./foundations/README.md)** — Requirements, constraints, non-functional goals, FE vs BE boundaries
2. **[component-architecture](./component-architecture/README.md)** — Composition, state ownership, module boundaries
3. **[design-patterns](./design-patterns/README.md)** — Container/presentational, compound components, adapters

### Phase 2 — Ship reliable products

4. **[state-management](./state-management/README.md)** — Local vs global, Context, Zustand, server state
5. **[performance](./performance/README.md)** — Core Web Vitals, rendering, caching, bundle strategy
6. **[data-layer](./data-layer/README.md)** — Fetching, normalization, optimistic UI, real-time
7. **[security](./security/README.md)** — XSS, CSP, auth tokens, supply chain
8. **[testing](./testing/README.md)** — Pyramid, contract tests, visual regression, E2E strategy
9. **[accessibility](./accessibility/README.md)** — WCAG, keyboard, screen readers, inclusive design

### Phase 3 — Scale teams and codebases

10. **[rendering-strategies](./rendering-strategies/README.md)** — CSR, SSR, SSG, ISR, streaming, tradeoffs
11. **[tooling](./tooling/README.md)** — Monorepos, CI/CD, feature flags
12. **[design-system](./design-system/README.md)** — Tokens, components, governance, adoption
13. **[scalability](./scalability/README.md)** — Micro-frontends, federation, org topology
14. **[advanced-topics](./advanced-topics/README.md)** — Offline-first, i18n, edge, AI UX

### Phase 4 — Operate and design at scale

15. **[observability](./observability/README.md)** — RUM, errors, Web Vitals, session replay
16. **[deployment](./deployment/README.md)** — Pipelines, CDN, preview, canary, rollback
17. **[case-studies](./case-studies/README.md)** — E-commerce, social feed, mock interview walkthroughs

---

## Topic index (17 topics)

| # | Folder | One-line focus |
|---|--------|----------------|
| 1 | [foundations](./foundations/README.md) | Problem framing & NFRs |
| 2 | [component-architecture](./component-architecture/README.md) | Structure & boundaries |
| 3 | [design-patterns](./design-patterns/README.md) | Reusable interaction models |
| 4 | [state-management](./state-management/README.md) | Local, global & server state |
| 5 | [performance](./performance/README.md) | Speed & resource budgets |
| 6 | [data-layer](./data-layer/README.md) | Client data architecture |
| 7 | [security](./security/README.md) | Threat model for the browser |
| 8 | [testing](./testing/README.md) | Confidence at scale |
| 9 | [accessibility](./accessibility/README.md) | Usable by everyone |
| 10 | [rendering-strategies](./rendering-strategies/README.md) | CSR, SSR, SSG, ISR |
| 11 | [tooling](./tooling/README.md) | Developer experience & delivery |
| 12 | [design-system](./design-system/README.md) | Shared UI platform |
| 13 | [scalability](./scalability/README.md) | Many teams, one product |
| 14 | [advanced-topics](./advanced-topics/README.md) | Specialized architectures |
| 15 | [observability](./observability/README.md) | Production visibility |
| 16 | [deployment](./deployment/README.md) | Safe, frequent releases |
| 17 | [case-studies](./case-studies/README.md) | End-to-end system designs |

---

## How to use this repo

1. **Follow [LEARNING_PATH.md](./LEARNING_PATH.md)** if you want a structured 8-week schedule.
2. **Read one topic per session** — skim headers first, then deep-dive sections for your level.
3. **Sketch while reading** — boxes-and-arrows for data flow beat memorizing bullet lists.
4. **Apply to a product you know** — replace generic "e-commerce" examples with your domain.
5. **Practice aloud** — use interview Q&A sections as mock prompts (45–60 min each).
6. **Cross-link deliberately** — each README points to related folders; follow those threads.

---

## Suggested capstone exercises

After Phase 2, pick **one** scenario — or use the full walkthroughs in **[case-studies](./case-studies/README.md)**:

| Scenario | Forces you to combine |
|----------|------------------------|
| **E-commerce checkout** | [rendering-strategies](./rendering-strategies/README.md), [data-layer](./data-layer/README.md), [security](./security/README.md), [performance](./performance/README.md) |
| **Real-time analytics dashboard** | [performance](./performance/README.md), [data-layer](./data-layer/README.md), [observability](./observability/README.md) |
| **Social feed (infinite scroll)** | [performance](./performance/README.md), [state-management](./state-management/README.md), [accessibility](./accessibility/README.md) |
| **Multi-tenant admin portal** | [scalability](./scalability/README.md), [design-system](./design-system/README.md), [security](./security/README.md) |

Present your design using: **context → constraints → high-level diagram → deep dives → tradeoffs → rollout plan**.

---

## Relationship to other folders in this workspace

- **[JS/](../JS/)** — JavaScript fundamentals (closures, debounce, etc.)
- **[React_Machine_Coding/](../React_Machine_Coding/)** — Hands-on UI implementation under time pressure
- **frontend-system-design/** (this folder) — **why and how** to architect frontend systems at product scale

Machine coding tests *building*; system design tests *deciding*. Use both.

---

## Further reading (curriculum-level)

- [web.dev — Learn Performance](https://web.dev/learn-core-web-vitals/)
- [MDN — Web architecture](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Design_and_accessibility)
- [React — Thinking in React](https://react.dev/learn/thinking-in-react)
- [Patterns.dev](https://www.patterns.dev/) — Modern web patterns
- [System Design Primer (general)](https://github.com/donnemartin/system-design-primer) — complement with FE-specific topics here

---

**Start here:** [LEARNING_PATH.md](./LEARNING_PATH.md) · [foundations/README.md](./foundations/README.md)
