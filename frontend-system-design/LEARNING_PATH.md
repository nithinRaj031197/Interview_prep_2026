# 🚀 Frontend Engineer → Architect (2 Month Plan)

## 🎯 Goal

Become interview-ready for **Senior Frontend Engineer / Frontend Architect** roles in **8 weeks**.

This plan maps directly to folders in this repo. Each week: **learn → build → write → explain**.

> **Golden rule:** Don't just code — **explain your decisions** (tradeoffs, alternatives, why not X).

---

## How this repo fits

| Phase | Weeks | Primary folders |
|-------|-------|-----------------|
| Foundations | 1–2 | [foundations](./foundations/), [component-architecture](./component-architecture/), JS basics |
| React + architecture | 3–4 | [design-patterns](./design-patterns/), [state-management](./state-management/) |
| System design core | 5–6 | [rendering-strategies](./rendering-strategies/), [performance](./performance/), [data-layer](./data-layer/), [security](./security/) |
| Architect level | 7–8 | [design-system](./design-system/), [scalability](./scalability/), [observability](./observability/), [deployment](./deployment/), [case-studies](./case-studies/) |

**Start reading:** [README.md](./README.md) for the full topic index.

---

# 🗓️ Phase 1 (Week 1–2): Strong Foundations

## Topics

| Area | What to learn | Repo links |
|------|---------------|------------|
| HTML | Semantics, forms, accessibility basics | [accessibility](./accessibility/README.md) (intro sections) |
| CSS | Flexbox, grid, responsiveness | [foundations](./foundations/README.md) |
| JavaScript | Closures, event loop, promises, memory | [../JS/](../JS/) practice hub |
| System thinking | NFRs, constraints, FE/BE boundaries | [foundations](./foundations/README.md) |

### Deep dive checklist

- [ ] Closures — [makeCounter](../JS/makeCounter/), [debounce](../JS/debounce/)
- [ ] Event loop — draw call stack + task queue on paper
- [ ] Promises / async-await — error handling, cancellation patterns
- [ ] Memory — closures holding references, detached DOM leaks

## Weekly schedule

| Week | Mon–Wed | Thu–Fri | Weekend |
|------|---------|---------|---------|
| **1** | HTML/CSS semantics + a11y basics | JS closures & HOFs | Build **modal** (focus trap, escape) |
| **2** | Event loop + async | Memory & debugging | Build **dropdown** + **form** (validation) |

## Output (deliverables)

- [ ] 3 small components in [React_Machine_Coding](../React_Machine_Coding/) or a scratch folder
- [ ] Short markdown note per component: *requirements → approach → tradeoffs*
- [ ] 2 mock answers from [foundations](./foundations/README.md) interview section

---

# 🗓️ Phase 2 (Week 3–4): React + Architecture Basics

## Topics

| Area | What to learn | Repo links |
|------|---------------|------------|
| Component design | Composition, boundaries, props API | [component-architecture](./component-architecture/README.md) |
| Patterns | Container/presentational, compound components | [design-patterns](./design-patterns/README.md) |
| State | Local vs lifted vs global | [state-management](./state-management/README.md) |
| Structure | Feature folders, colocation | [component-architecture](./component-architecture/README.md) |

## Weekly schedule

| Week | Mon–Wed | Thu–Fri | Weekend |
|------|---------|---------|---------|
| **3** | Component architecture + hooks | Custom hooks (data, UI) | **Todo app** — clean folder structure |
| **4** | State management tradeoffs | Testing basics | **Dashboard UI** — filters, tables, empty states |

## Output (deliverables)

- [ ] **Todo app** — feature-based folders, typed props, no prop drilling hell
- [ ] **Dashboard UI** — at least 3 widgets, loading/error/empty states
- [ ] README per project: architecture diagram (ASCII) + state ownership table
- [ ] Explain aloud: *"Why not Redux here?"* using [state-management](./state-management/README.md) tradeoffs

---

# 🗓️ Phase 3 (Week 5–6): System Design Core

## Topics

| Area | What to learn | Repo links |
|------|---------------|------------|
| Rendering | CSR, SSR, SSG, ISR, streaming | [rendering-strategies](./rendering-strategies/README.md) |
| Performance | CWV, splitting, virtualization | [performance](./performance/README.md) |
| Data | React Query, cache, optimistic UI | [data-layer](./data-layer/README.md) |
| Security | XSS, CSP, auth on client | [security](./security/README.md) |

## Weekly schedule

| Week | Mon–Wed | Thu–Fri | Weekend |
|------|---------|---------|---------|
| **5** | Rendering strategies + when to use what | Data fetching & caching | Add **React Query** to Todo/Dashboard |
| **6** | Performance budgets + lazy loading | Security basics | Optimize previous apps (measure before/after) |

## Output (deliverables)

- [ ] Lazy routes + code splitting on dashboard
- [ ] React Query (or equivalent) with stale/cache config documented
- [ ] Lighthouse before/after screenshot + 3 bullet summary
- [ ] One 45-min mock: *"Design YouTube frontend"* — outline using [case-studies](./case-studies/README.md)

---

# 🗓️ Phase 4 (Week 7–8): Architect Level

## Topics

| Area | What to learn | Repo links |
|------|---------------|------------|
| Design systems | Tokens, governance, adoption | [design-system](./design-system/README.md) |
| Scale | Monorepo, micro-frontends | [scalability](./scalability/README.md) |
| Observability | RUM, errors, session replay | [observability](./observability/README.md) |
| Delivery | CI/CD, preview envs, flags | [deployment](./deployment/README.md) |
| Case studies | End-to-end designs | [case-studies](./case-studies/README.md) |

## Weekly schedule

| Week | Mon–Wed | Thu–Fri | Weekend |
|------|---------|---------|---------|
| **7** | Design system + observability | Deployment pipelines | **E-commerce system design** (paper) |
| **8** | Scalability + advanced topics | Mock interviews | **Social feed system design** (paper) |

## Output (deliverables)

- [ ] **E-commerce frontend** — diagram: PLP → PDP → cart → checkout (data, cache, perf)
- [ ] **Social media feed** — infinite scroll, real-time, media, moderation UX
- [ ] Present each design in 35 min: context → diagram → deep dives → tradeoffs → rollout
- [ ] CI sketch for frontend (lint, test, build, preview, canary) — see [deployment](./deployment/README.md)

---

# 📚 Daily Routine

## Weekdays (2–3 hours)

| Block | Time | Activity |
|-------|------|----------|
| **Learn** | 1 hr | Read one README section OR one JS topic |
| **Build** | 1 hr | Code toward weekly milestone |
| **Write** | 30 min | Notes, tradeoff table, or mock answer in repo |

## Weekends (4–6 hours)

| Activity | Focus |
|----------|--------|
| **Build project** | Weekly deliverable (components → apps → system designs) |
| **Revise system design** | Re-read tradeoffs; sketch from memory |
| **Mock (optional)** | Record yourself explaining one design |

---

# 🎤 Interview Prep Strategy

## What interviewers score

1. **Clarify requirements** — users, scale, constraints, NFRs
2. **High-level diagram** — boxes, data flow, client vs server
3. **Deep dives** — 2–3 areas they pick (perf, state, real-time, etc.)
4. **Tradeoffs** — always name alternative and why you rejected it
5. **Rollout** — phases, metrics, risk mitigation

## Practice prompts (rotate weekly)

| Prompt | Key folders |
|--------|-------------|
| "Design YouTube frontend" | [rendering-strategies](./rendering-strategies/), [performance](./performance/), [data-layer](./data-layer/) |
| "How to optimize a large list?" | [performance](./performance/), [design-patterns](./design-patterns/) |
| "Design e-commerce checkout" | [security](./security/), [data-layer](./data-layer/), [case-studies](./case-studies/) |
| "Multi-team frontend at scale" | [scalability](./scalability/), [design-system](./design-system/) |
| "How do you debug prod slowness?" | [observability](./observability/), [performance](./performance/) |

## Mock answer template

```
1. Clarify (2 min)     → users, devices, SEO, real-time?, team size
2. Overview (5 min)    → ASCII diagram + narrative
3. Deep dive (15 min)  → data layer OR perf OR auth (their choice)
4. Tradeoffs (5 min)   → table: option A vs B
5. Evolution (3 min)   → MVP → v2 → scale
```

---

# 🏁 Final Outcome (Week 8)

You should be able to:

- [ ] Build scalable React apps with clear architecture
- [ ] Choose rendering strategy with justification
- [ ] Design client data layer (cache, invalidation, optimistic UI)
- [ ] Explain performance and observability in production
- [ ] Present 2 complete system designs (e-commerce + social feed)
- [ ] Answer senior-level FE system design questions with tradeoffs

---

# 📊 Progress tracker

Copy into your notes and check weekly:

| Week | Phase | Built | Read | Mock done |
|------|-------|-------|------|-----------|
| 1 | Foundations | | | |
| 2 | Foundations | | | |
| 3 | React + arch | | | |
| 4 | React + arch | | | |
| 5 | System design | | | |
| 6 | System design | | | |
| 7 | Architect | | | |
| 8 | Architect | | | |

---

**Next step:** [foundations/README.md](./foundations/README.md) → then follow weeks in order above.
