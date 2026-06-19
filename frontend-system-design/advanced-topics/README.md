# Advanced Frontend System Design Topics

## Overview

Beyond the core curriculum, senior architects encounter **specialized domains**: internationalization, offline-first, SSR/streaming, edge compute, real-time collaboration, and emerging AI-assisted UX. Each forces explicit tradeoffs in consistency, latency, and complexity.

Use this module after completing [foundations](../foundations/README.md) through [scalability](../scalability/README.md).

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | Explain SSR vs SSG vs CSR tradeoffs |
| **Intermediate** | Plan i18n/l10n architecture; basic PWA offline |
| **Advanced** | Design streaming SSR, edge middleware, sync engines |
| **Expert** | Evaluate CRDTs, AI UX guardrails, multi-region FE strategy |

---

## Core concepts

### Rendering spectrum

| Model | Best for | Watch out |
|-------|----------|-----------|
| **CSR** | Interactive apps | SEO, TTI |
| **SSR** | Dynamic public pages | TTFB, server load |
| **SSG** | Static content | Rebuild time |
| **ISR** | Large semi-static catalogs | Stale content |
| **Streaming SSR** | Slow data dependencies | Suspense boundaries |
| **RSC (React)** | Reduce client JS | Mental model, caching |

### Internationalization (i18n) vs localization (l10n)

- **i18n:** System supports multiple locales (string extraction, plural rules, RTL)
- **l10n:** Translated content, currency, dates per market

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Locale det. │────▶│ Message cat.│────▶│ Formatters  │
│ URL/cookie  │     │ JSON/PO     │     │ date/currency│
└─────────────┘     └─────────────┘     └─────────────┘
```

### Offline-first & PWA

- **Service Worker:** cache strategies (cache-first static, network-first API)
- **IndexedDB:** structured offline storage
- **Background sync:** queue mutations when offline

### Real-time collaboration

- **OT/CRDT** for concurrent edits (Figma-like)
- **WebSocket/SSE** for presence, notifications
- Conflict resolution UX — never silent data loss

### AI-assisted UX (2020s+)

- Streaming tokens to UI; cancelation; citation of sources
- Guardrails: don't send PII to models; human review for high-stakes
- Fallback when model unavailable — degrade gracefully

---

## Real-world examples

### E-commerce global storefront

- Locale in URL `/de/products/...`
- Server formats price with `Intl.NumberFormat`
- RTL layout via logical CSS properties (`margin-inline-start`)
- CDN geo routing; legal copy per region

### Docs site (SSG + search)

- Build-time MDX; Algolia index on deploy
- ISR for changelog pages every 60s

### Collaborative whiteboard

- CRDT document in worker; WebSocket sync
- Optimistic strokes; reconcile on reconnect

### AI support chat widget

- Stream responses; rate limit; escalate to human
- Redact credit cards client-side before send

---

## Code snippets

### i18n with ICU plurals (conceptual)

```json
{
  "cart.items": "{count, plural, =0 {No items} one {# item} other {# items}}"
}
```

```typescript
t('cart.items', { count: cart.lineCount });
```

### Service worker cache strategy

```javascript
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'document') {
    event.respondWith(networkFirst(event.request));
  } else if (event.request.url.includes('/static/')) {
    event.respondWith(cacheFirst(event.request));
  }
});
```

### Streaming SSR boundary (React Suspense)

```tsx
// Server sends shell first, streams slow ProductRecommendations when ready
<Suspense fallback={<RecommendationsSkeleton />}>
  <ProductRecommendations userId={userId} />
</Suspense>
```

### Edge middleware (geo redirect)

```typescript
// runs at edge before origin
export function middleware(request: Request) {
  const country = request.headers.get('cf-ipcountry');
  if (country === 'DE' && !request.url.includes('/de')) {
    return Response.redirect(new URL('/de' + pathname, request.url));
  }
}
```

---

## Tradeoffs

| Topic | Option A | Option B | Guidance |
|-------|----------|----------|----------|
| **i18n** | Runtime fetch translations | Build-time bundles | Runtime for CMS; build for perf |
| **Offline** | Read-only cache | Full sync engine | Match use case complexity |
| **Real-time** | WebSocket | SSE | Bidirectional vs push-only |
| **SSR host** | Node server | Edge functions | Cold start vs compute limits |
| **AI UX** | Client calls API | Server proxies model | Never expose keys client-side |

| Sync model | Complexity | Use case |
|------------|------------|----------|
| **Last write wins** | Low | Profiles |
| **Operational transform** | High | Text docs |
| **CRDT** | High | Offline-first collab |

---

## Diagram: multi-layer caching at edge

```
User
 │
 ▼
┌──────────────┐
│ CDN (static) │  assets, SSG HTML
└──────┬───────┘
       ▼
┌──────────────┐
│ Edge function│  auth cookie, geo, A/B
└──────┬───────┘
       ▼
┌──────────────┐
│ Origin SSR   │  personalized HTML stream
└──────┬───────┘
       ▼
┌──────────────┐
│ API / BFF    │  data
└──────────────┘
       │
 Client hydrates interactive islands only
```

---

## Interview questions & answers

### 1. (Easy) SSR vs SSG — when which?

**Answer:** SSG for content identical for all users at build time (blog, marketing). SSR when HTML must reflect request-specific data (auth, geo, A/B) or changes too fast for rebuild. Both improve FCP vs pure CSR; SSR adds server cost per request.

### 2. (Easy) What does a service worker enable?

**Answer:** Programmable network proxy — offline caching, background sync, push notifications (with permission). Turns site into installable PWA when combined with manifest.

### 3. (Medium) Design i18n for React app with 12 languages.

**Answer:** Locale in URL for SEO/shareability; lazy-load message catalogs per locale; ICU for plurals/gender; extract strings in CI; RTL CSS with logical properties; test pseudo-locale for layout overflow; server and client agree on locale; format dates/numbers with Intl API; translation workflow with TMS (Phrase, Lokalise).

### 4. (Medium) Offline-first todo app — architecture sketch.

**Answer:** IndexedDB local store as source for UI; queue mutations in outbox; service worker optional for assets; sync on reconnect with conflict policy (LWW or merge); optimistic UI; show sync status; handle schema migration; cap storage; test airplane mode E2E.

### 5. (Hard) Google Doc-style collaborative editor — FE considerations.

**Answer:** CRDT/OT library in worker to avoid blocking main thread; WebSocket with reconnect/backoff; presence cursors; versioning; undo/redo integrated with CRDT; lazy load document chunks; accessibility for live regions without spamming screen reader; permission model from server; snapshot + incremental updates; perf budget for large docs.

### 6. (Hard) Reduce TTFB for personalized SSR product page globally.

**Answer:** Edge cache anonymous shell; stream HTML; move personalization to edge with short TTL or client hydration islands; geo CDN; origin in multiple regions; BFF colocated; eliminate waterfall in loader — parallel data fetch; consider partial static generation for product catalog with client-side price overlay if business allows eventual consistency.

---

## Further reading

- [Next.js — Rendering](https://nextjs.org/docs/app/building-your-application/rendering)
- [web.dev — Progressive Web Apps](https://web.dev/explore/progressive-web-apps)
- [MDN — Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
- [Ink & Switch — Local-first software](https://www.inkandswitch.com/local-first/)
- [React — Server Components](https://react.dev/reference/rsc/server-components)

---

## Related topics

- [foundations](../foundations/README.md) — rendering model decisions
- [rendering-strategies](../rendering-strategies/README.md) — CSR, SSR, SSG, ISR deep dive
- [performance](../performance/README.md) — streaming, edge caching
- [data-layer](../data-layer/README.md) — offline sync, real-time
- [scalability](../scalability/README.md) — multi-region, MFE
- [security](../security/README.md) — AI data handling, edge auth
- [accessibility](../accessibility/README.md) — i18n + a11y overlap

---

## Capstone checklist

Before claiming "advanced" mastery, you should comfortably whiteboard:

- [ ] Global e-commerce: i18n, ISR catalog, edge auth, payment PCI scope
- [ ] Real-time dashboard: WebSocket fanout, stale metrics, RBAC widgets
- [ ] Offline field app: sync queue, conflict UX, PWA install
- [ ] Design system across 3 MFEs: versioning, theming, shared React

Return to [main curriculum README](../README.md) for the full learning path.
