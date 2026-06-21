# System Design Interviews (RADIO Framework)

## Overview

Interviewers evaluate **what you say**, not what you think. If you do not explain tradeoffs out loud, it does not count — even if your mental model is correct.

This topic is your **step-by-step backbone** for frontend system design rounds (Meta-style and similar). Use it with [case-studies](../case-studies/README.md) and [React_Machine_Coding/](../../React_Machine_Coding/) for practice.

> **Golden rule:** Think out loud like a senior architect.

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | Run RADIO in order without skipping Requirements |
| **Intermediate** | Give 2+ options with tradeoffs for every major decision |
| **Advanced** | Time-box each RADIO phase in a 45-minute round |
| **Expert** | Adapt RADIO to vague prompts (feed, chat, dashboard) instantly |

---

## 1. Core mindset (most important)

| Signal | What it means |
|--------|----------------|
| **Say it aloud** | Silent brilliance = rejection |
| **Tradeoffs** | One solution = junior; compare options = senior |
| **Structure** | Random depth = unprepared |

**Mental model for any question:**

```
Understand → Break → Model → Connect → Optimize → Explain
```

Long-term decision thinking lives in [architect-mindset](../architect-mindset/README.md). Technical NFRs live in [foundations](../foundations/README.md).

---

## 2. RADIO framework (your backbone)

### R — Requirements exploration

**Goal:** Reduce ambiguity before designing.

**You must:**
- Ask clarifying questions
- Define scope (MVP vs full product)
- Split **functional** vs **non-functional** requirements

**Example questions:**

| Area | Ask |
|------|-----|
| Users | Who? Mobile vs desktop? |
| Scale | 1k vs 10M DAU? |
| Real-time | Live updates or refresh OK? |
| Platforms | Web only? SEO needed? |
| Performance | p95 latency? offline? |

**Pro tip:** Strong candidates invest time here — they do not rush to diagrams.

---

### A — Architecture / high-level design

**Goal:** Break the system into components with clear responsibilities.

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Client UI  │────▶│  API / BFF  │────▶│   Backend   │
│  (React)    │     │             │     │  + cache    │
└─────────────┘     └─────────────┘     └─────────────┘
```

**Frontend layers to name:**

| Layer | Responsibility |
|-------|----------------|
| **UI** | Components, layout, a11y |
| **State** | Local vs server vs URL — [state-management](../state-management/README.md) |
| **API client** | Fetch, cache, errors — [data-layer](../data-layer/README.md) |
| **Routing** | SPA vs SSR — [rendering-strategies](../rendering-strategies/README.md) |

**Signal:** Can you design a system that could ship at a real company?

---

### D — Data model

**Goal:** Define entities, fields, and relationships.

**Example (social feed):**

```ts
User { id, name, avatarUrl }
Post { id, content, userId, createdAt, likeCount }
```

**Frontend angle:**

- State shape in client store
- **Normalized** vs nested (Redux-style vs denormalized cache)
- What to cache and invalidate — [data-layer](../data-layer/README.md)

---

### I — Interface definition (API design)

**Goal:** Define how components and services communicate.

**You must cover:**
- Endpoints or GraphQL operations
- Request/response shape
- Pagination, filtering, sorting
- Error format and client handling

**Example:**

```
GET  /posts?cursor=&limit=20
POST /posts        { content }
GET  /posts/:id
```

**Frontend focus:** REST vs GraphQL tradeoffs, loading/error/empty states, retry policy.

---

### O — Optimizations & deep dive

**Goal:** Show senior depth — interviewer often picks this section.

| Area | Topics to mention |
|------|-------------------|
| **Performance** | Lazy load, virtual lists, CWV — [performance](../performance/README.md) |
| **Accessibility** | Keyboard, ARIA — [accessibility](../accessibility/README.md) |
| **Security** | XSS, CSP, auth — [security](../security/README.md) |
| **Scalability** | Code split, CDN, MFE — [scalability](../scalability/README.md) |
| **UX** | Skeletons, optimistic UI, perceived speed |

---

## 3. What interviewers really look for

| # | Dimension | Strong signal |
|---|-----------|---------------|
| 1 | **Problem exploration** | Smart questions, clear scope |
| 2 | **Architecture** | Components + responsibilities + arrows |
| 3 | **Frontend depth** | Perf, a11y, security, rendering, i18n |
| 4 | **Tradeoffs** | Multiple options → compare → choose with context |
| 5 | **Product & UX** | Loading, errors, mobile, keyboard, skeletons |
| 6 | **Communication** | Structured, engaging, not rambling |

**Golden line:** *"There is no single best solution — it depends on constraints."*

**Tradeoff example (state):**

| Option | Pros | Cons |
|--------|------|------|
| Redux / RTK | Predictable, scalable teams | Boilerplate |
| Context | Simple, built-in | Re-render risk at scale |
| Zustand | Lightweight, fast to adopt | Less ecosystem |

---

## 4. Common mistakes (avoid)

| Mistake | Why it hurts |
|---------|--------------|
| No clarifying questions | Looks junior |
| Unstructured answer | Hard to follow = no hire |
| Only one solution | No tradeoffs |
| Silent thinking | Nothing to evaluate |
| Over-deep-dive too early | Wastes time budget |
| Buzzwords without detail | Instant red flag |

---

## 5. How to practice

1. **Pick a system** — Twitter feed, chat, YouTube, autocomplete
2. **Apply RADIO** — write or whiteboard each letter
3. **Speak out loud** — record yourself; painful but effective
4. **Always include** — tradeoffs, UX, performance, one metric for success

**Repo practice path:**

- Read [ui-system-patterns](../ui-system-patterns/README.md) + [case-studies](../case-studies/README.md)
- Build patterns in [React_Machine_Coding/](../../React_Machine_Coding/)

---

## 6. Interview script (memorize the transitions)

| Step | Say this |
|------|----------|
| Start | *"Let me clarify requirements before jumping into design."* |
| Architecture | *"I'll propose a high-level architecture and walk through components."* |
| Data | *"Let's define the core data model and client state shape."* |
| API | *"Here's how the UI talks to services — endpoints and error handling."* |
| Optimize | *"I'll cover optimizations, tradeoffs, and what I'd ship in MVP vs v2."* |

This structure alone signals staff-level communication.

---

## 7. Junior → architect (level framing)

| Level | Focus |
|-------|--------|
| **Junior** | Writes code |
| **Mid** | Builds features |
| **Senior** | Designs systems |
| **Architect** | Tradeoffs, scale, product + engineering balance |

---

## 8. Final cheat sheet

Always show:

- [ ] Requirements clarity (functional + non-functional)
- [ ] Structured thinking (RADIO)
- [ ] Component design with responsibilities
- [ ] Tradeoffs (≥2 options)
- [ ] UX awareness (loading, error, a11y)
- [ ] Clear communication (think out loud)

---

## Suggested time box (45 min)

| RADIO phase | Minutes |
|-------------|---------|
| **R** Requirements | 5 |
| **A** Architecture | 8 |
| **D** Data model | 5 |
| **I** Interface / API | 7 |
| **O** Optimizations + tradeoffs | 15 |
| Buffer / questions | 5 |

---

## Interview questions (self-drill)

1. **(Easy)** Walk through RADIO for a todo app.
2. **(Medium)** Where do most candidates fail in FE system design?
3. **(Medium)** How do you handle "design Twitter" in 45 minutes?
4. **(Hard)** Interviewer pushes back on your state choice — respond with tradeoffs.
5. **(Hard)** You have 10 minutes left — which RADIO sections do you skip or shorten?

---

## Related topics

- [architect-mindset](../architect-mindset/README.md) — long-term thinking & production
- [foundations](../foundations/README.md) — NFRs and constraints
- [case-studies](../case-studies/README.md) — full walkthroughs
- [ui-system-patterns](../ui-system-patterns/README.md) — classic UI problems
- [ROADMAP.md](../ROADMAP.md) — full skill checklist
