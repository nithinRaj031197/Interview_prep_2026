# Rendering Strategies (CSR, SSR, SSG, ISR, Streaming)

## Overview

**Rendering strategy** is one of the highest-impact frontend architecture decisions. It affects SEO, time-to-first-byte, interactivity, infrastructure cost, and developer complexity. Senior engineers choose a **default per route type**, not one global answer for the whole app.

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | Define CSR, SSR, SSG, and hydration |
| **Intermediate** | Match strategy to page type (marketing vs app shell) |
| **Advanced** | Design hybrid apps with islands / streaming |
| **Expert** | Argue TCO (CDN, compute, DX) across regions and teams |

---

## Core concepts

### Strategy cheat sheet

| Strategy | HTML source | When HTML is built | Best for |
|----------|-------------|-------------------|----------|
| **CSR** | Empty shell + JS | Browser | Authenticated apps, dashboards |
| **SSR** | Server per request | Each request | Personalized, SEO pages |
| **SSG** | Pre-built at build | Build time | Docs, marketing, stable content |
| **ISR** | SSG + revalidate | Build + background refresh | Large catalog, semi-static |
| **Streaming SSR** | Server streams chunks | Request (partial) | Slow data dependencies |

### Hydration

Browser downloads JS, attaches event listeners, reconciles with server HTML.

```
Server HTML (fast paint)  +  Client JS (interactivity)  =  Hydrated app
                              ↑
                    Cost: duplicate work if data refetched
```

---

## Real-world examples

### E-commerce

| Route | Strategy | Why |
|-------|----------|-----|
| Homepage / PLP | ISR or SSG | SEO + CDN cache; revalidate every 60s |
| PDP (product) | ISR + client stock | SEO for product; real-time inventory via API |
| Cart / Checkout | CSR | Auth, no SEO; minimize server complexity |
| Account | CSR | Private, highly interactive |

### Social feed

- **SSR or streaming** for first paint of shell + skeleton
- **CSR** for infinite scroll and real-time updates after hydration
- **Edge** for auth cookie validation before SSR (optional)

### Internal admin dashboard

- **CSR only** — no SEO, VPN-only, heavy charts; simplify ops

---

## Code snippets

### Next.js-style mental model (pseudo)

```tsx
// SSG — build time
export async function generateStaticParams() { /* ... */ }

// SSR — every request
export const dynamic = 'force-dynamic';

// ISR — static + revalidate
export const revalidate = 60;
```

### Avoid double fetch (SSR + client)

```tsx
// Server: fetch and pass dehydrated state
<QueryClientProvider client={queryClient}>
  <HydrationBoundary state={dehydratedState}>
    <ProductPage id={id} />
  </HydrationBoundary>
</QueryClientProvider>
```

---

## Tradeoffs

| Strategy | Pros | Cons | When |
|----------|------|------|------|
| **CSR** | Simple deploy, rich interactivity | Slow FCP, poor SEO | Logged-in tools |
| **SSR** | SEO, fresh data | Server cost, TTFB variance | Personalized public pages |
| **SSG** | Cheapest at scale, fast edge | Stale until rebuild | Marketing, docs |
| **ISR** | Balance freshness + cache | Cache invalidation complexity | Catalogs, blogs |
| **Streaming** | Faster first byte | Complex debugging | Pages with slow sections |

---

## Diagram: hybrid app by route

```
                    ┌─────────────────────────────────┐
                    │         CDN / Edge              │
                    └───────────────┬─────────────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          ▼                         ▼                         ▼
   ┌─────────────┐          ┌─────────────┐          ┌─────────────┐
   │ SSG/ISR     │          │ SSR stream  │          │ CSR shell   │
   │ /blog /plp  │          │ /product    │          │ /app/*      │
   └─────────────┘          └─────────────┘          └─────────────┘
```

---

## Interview questions & answers

### 1. (Easy) CSR vs SSR — when do you pick each?

**Answer:** CSR when SEO and first paint matter less (dashboards). SSR when HTML must be meaningful on first response (public product pages, shareable links). Hybrid apps are normal.

### 2. (Easy) What is hydration?

**Answer:** Attaching client-side framework behavior to server-rendered HTML. Adds JS cost after HTML arrives; mismatches cause bugs and double work.

### 3. (Medium) Marketing site is fast in Lighthouse but app routes feel slow. Why?

**Answer:** Marketing may be SSG; app is CSR with large bundles. Fix: route-level splitting, defer non-critical JS, consider SSR/streaming for app shell only.

### 4. (Medium) How do you choose ISR revalidation time for a product catalog?

**Answer:** Balance freshness vs load. 60s–300s for price-sensitive; longer for stable metadata. On-demand revalidation on CMS publish for critical updates. Monitor stale complaint rate.

### 5. (Hard) Design rendering for a global news site with paywall.

**Answer:** SSG/ISR for articles (CDN); edge middleware for geo + auth cookie; SSR teaser for SEO; client hydrates paywall modal. Separate cache keys per edition. Avoid leaking full content in HTML for subscribers-only pieces.

### 6. (Hard) Micro-frontend with different frameworks — rendering impact?

**Answer:** Each MFE may SSR differently; shell must orchestrate stream order and shared layout. Risk: layout shift, duplicate runtime. Prefer client-only islands or single SSR framework for public SEO pages.

---

## Further reading

- [Next.js — Rendering](https://nextjs.org/docs/app/building-your-application/rendering)
- [web.dev — Rendering on the web](https://web.dev/articles/rendering-on-the-web)
- [React — Server Components](https://react.dev/reference/rsc/server-components)

---

## Related topics

- [performance](../performance/README.md) — CWV and bundle size
- [data-layer](../data-layer/README.md) — fetch on server vs client
- [deployment](../deployment/README.md) — CDN, edge, preview
- [case-studies](../case-studies/README.md) — full system walkthroughs
- [advanced-topics](../advanced-topics/README.md) — edge, offline
