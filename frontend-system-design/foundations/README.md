# Foundations of Frontend System Design

## Overview

Frontend system design is the practice of **defining how a client application meets product goals under real constraints**: latency, device diversity, team size, compliance, and change velocity. For senior engineers and solution architects, it means translating vague requirements ("fast, accessible checkout") into **architectural decisions** with measurable tradeoffs — before writing production code.

**Why it matters:** Backend system design gets most of the spotlight, but users experience your product through the browser. Poor FE architecture shows up as slow TTI, inconsistent UX across squads, security incidents from XSS, and rewrites that cost quarters.

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | Clarify functional vs non-functional requirements; draw a simple client–server diagram |
| **Intermediate** | Define SLIs/SLOs for Core Web Vitals; identify state ownership boundaries |
| **Advanced** | Facilitate architecture reviews; choose SSR/CSR/ISR with justification; plan phased rollouts |
| **Expert** | Align FE platform strategy with org topology; negotiate API contracts with backend/platform teams |

---

## Core concepts (simple terms)

### Functional vs non-functional requirements

- **Functional:** What the user can *do* (add to cart, filter dashboard by date).
- **Non-functional (NFRs):** How well the system behaves — performance, accessibility, security, maintainability, offline tolerance.

Senior designs start with NFRs because they constrain everything else.

### The FE system design canvas

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Product    │────▶│   Client     │────▶│   Backend    │
│  requirements│     │  (browser/   │     │  APIs / BFF  │
│  & personas  │     │   native)    │     │  / services  │
└──────────────┘     └──────────────┘     └──────────────┘
        │                    │                    │
        ▼                    ▼                    ▼
   User journeys      Rendering model       Data contracts
   Success metrics    State & caching       Auth & rate limits
```

### Constraints that shape FE architecture

| Constraint | Typical impact |
|------------|----------------|
| **Mobile-first, emerging markets** | Smaller bundles, image optimization, graceful degradation |
| **SEO / shareability** | SSR, SSG, or hybrid rendering |
| **Real-time collaboration** | WebSockets, CRDTs, optimistic UI |
| **Regulated industries** | CSP, audit logs, PII minimization on client |
| **Large eng org** | Design system, module federation, strict API versioning |

### Rendering models (high level)

- **CSR (Client-Side Rendering):** Server sends shell + JS; good for authenticated apps, bad for SEO/cold start.
- **SSR (Server-Side Rendering):** HTML per request; good for SEO and first paint, adds server cost/complexity.
- **SSG / ISR:** Pre-built or revalidated static pages; great for marketing/catalog, stale data tradeoffs.

---

## Real-world examples

### E-commerce product listing

**Scenario:** 50k SKUs, filters, sort, SEO for category pages.

| Decision | Rationale |
|----------|-----------|
| SSG/ISR for category URLs | Crawlable, fast LCP |
| CSR for authenticated "recommended for you" | Personalization after login |
| Faceted search via API + URL sync | Shareable filter state |

### Analytics dashboard

**Scenario:** 20 widgets, live metrics, role-based views.

- NFRs: sub-3s interactive on corporate laptops; read-only for viewers.
- Architecture sketch: shell loads once; widgets lazy-load; WebSocket for live tiles; RBAC enforced server-side (never trust client-only hiding).

### Social feed

**Scenario:** Infinite scroll, media-heavy, offline read cache.

- Prioritize **perceived performance** (skeleton UI, virtualized list) over raw API latency.
- Define **consistency model**: eventual for likes count vs strong for post ownership.

---

## Code snippets (illustrative)

### URL as state for shareable UI (dashboard filters)

```javascript
// Sync filter state with URL — single source of truth for deep links
function useDashboardFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    from: searchParams.get('from') ?? defaultFrom,
    to: searchParams.get('to') ?? defaultTo,
    team: searchParams.get('team') ?? 'all',
  };

  function setFilters(partial) {
    setSearchParams({ ...filters, ...partial }, { replace: true });
  }

  return { filters, setFilters };
}
```

### Defining a performance budget (conceptual)

```json
{
  "budgets": [
    { "resourceType": "script", "budget": 200 },
    { "resourceType": "total", "budget": 350 }
  ],
  "timings": {
    "LCP": 2500,
    "INP": 200,
    "CLS": 0.1
  }
}
```

---

## Tradeoffs

| Option | Pros | Cons | When to choose |
|--------|------|------|----------------|
| **CSR SPA** | Rich interactivity, simpler deploy | Slow FCP on low-end devices | Logged-in tools, admin panels |
| **SSR** | Fast first paint, SEO | Server load, hydration cost | Marketing, public catalog |
| **SSG + ISR** | Edge-cached, cheap scale | Staleness, rebuild complexity | Content-heavy, semi-static pages |
| **BFF (Backend for Frontend)** | Tailored payloads, fewer round trips | Another service to operate | Mobile + web divergent needs |
| **GraphQL on client** | Flexible queries | Bundle size, caching complexity | Many views over same graph |

---

## Architecture diagram: checkout flow

```
User                Browser App              BFF/API              Payment
 │                      │                      │                    │
 │── View cart ────────▶│                      │                    │
 │                      │── GET /cart ────────▶│                    │
 │                      │◀── cart JSON ────────│                    │
 │── Checkout ─────────▶│                      │                    │
 │                      │── POST /checkout ───▶│── authorize ──────▶│
 │                      │◀── clientSecret ─────│◀───────────────────│
 │◀── Stripe Elements ──│                      │                    │
 │── Confirm payment ──▶│── POST /confirm ────▶│                    │
```

Key FE decisions: where payment UI lives (PCI scope), idempotency keys, optimistic "processing" UI, error recovery.

---

## Interview questions & answers

### 1. (Easy) What is frontend system design?

**Answer:** It's designing how a client application is structured to meet product and non-functional requirements — including rendering strategy, state management, data fetching, security, performance budgets, and team boundaries — not just picking a UI library.

### 2. (Easy) How do functional requirements differ from non-functional ones? Give FE examples.

**Answer:** Functional = features (user can reset password). Non-functional = quality attributes (reset flow completes in &lt;2s on 3G, works with keyboard only, resists CSRF). NFRs often drive architecture more than feature lists.

### 3. (Medium) When would you choose SSR over a pure SPA?

**Answer:** When SEO, social preview cards, or first-contentful-paint on cold traffic matter — e.g. public product pages. Also when users on low-end devices need meaningful HTML before JS executes. Tradeoff: server cost, hydration bugs, and more complex caching. For authenticated dashboards with no SEO need, CSR is often sufficient.

### 4. (Medium) How do you define success metrics for a frontend redesign?

**Answer:** Align with business KPIs (conversion, retention) and technical SLIs: LCP, INP, CLS, error rate, API p95. Establish baselines, set targets, instrument before/after. Include qualitative metrics (support tickets, task completion in user tests). Avoid optimizing a single metric in isolation (e.g. tiny bundle but broken accessibility).

### 5. (Hard) Design the high-level architecture for a multi-region e-commerce storefront.

**Answer:** Start with personas and NFRs (SEO, payment compliance, catalog size). Use CDN + edge for static assets; ISR/SSR for category/product pages with regional pricing from geo-aware BFF. Cart/checkout as CSR or hybrid with SSR shell. API layer: product read heavily cached; inventory/pricing short TTL; checkout strong consistency. Client: code-split by route, image CDN with responsive srcset, i18n/currency modules. Observability: RUM per region, synthetic checks. Rollout: feature flags for payment methods per region; fall back to degraded catalog if API slow.

### 6. (Hard) What questions do you ask in the first 10 minutes of an FE system design interview?

**Answer:** Who are the users and devices? Read vs write ratio? SEO/offline needs? Expected scale (DAU, concurrent)? Latency/consistency requirements? Existing stack/constraints? Team structure? Compliance? Success metrics? These narrow rendering model, data layer, and decomposition before drawing boxes.

---

## Further reading

- [web.dev — Core Web Vitals](https://web.dev/articles/vitals)
- [MDN — Web performance](https://developer.mozilla.org/en-US/docs/Learn/Performance)
- [React — Choosing the App Architecture](https://react.dev/learn/start-a-new-react-project)
- [Google SRE — SLIs, SLAs, SLOs](https://sre.google/sre-book/service-level-objectives/)

---

## Related topics in this repo

- Next: [component-architecture](../component-architecture/README.md) — turn requirements into component boundaries
- [performance](../performance/README.md) — quantify NFRs like LCP and bundle size
- [data-layer](../data-layer/README.md) — how the client talks to backend services
- [scalability](../scalability/README.md) — when one app becomes many teams' problem
