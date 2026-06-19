# Performance Engineering for Frontend Systems

## Overview

Frontend performance is a **system design concern**, not a late-stage optimization pass. Architects define **budgets**, **measurement**, and **architectural choices** (rendering, caching, splitting) so products stay fast on real devices and networks — not just on M3 MacBooks.

Users equate speed with quality; Core Web Vitals affect SEO and conversion.

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | Explain LCP, INP, CLS; use Lighthouse basics |
| **Intermediate** | Design code-splitting, lazy routes, image strategy |
| **Advanced** | Diagnose hydration cost, long tasks, layout thrashing |
| **Expert** | Set org-wide perf budgets, RUM dashboards, regression gates in CI |

---

## Core concepts

### Core Web Vitals (user-centric)

| Metric | Measures | Good target |
|--------|----------|-------------|
| **LCP** | Largest content paint | ≤ 2.5s |
| **INP** | Responsiveness to input | ≤ 200ms |
| **CLS** | Visual stability | ≤ 0.1 |

### Critical rendering path

```
HTML → parse → DOM
CSS  → parse → CSSOM
JS   → download → parse → execute (can block)
        ↓
   Layout → Paint → Composite
```

### Performance strategies (system level)

1. **Ship less** — tree shaking, route splitting, defer third parties
2. **Ship later** — lazy load below fold, idle callbacks
3. **Cache smarter** — HTTP cache, service worker, SWR on client
4. **Render less** — virtualization, memoization, server components (where applicable)
5. **Measure always** — RUM + lab, per route/feature

---

## Real-world examples

### E-commerce PLP (Product Listing Page)

- Hero LCP image: `fetchpriority="high"`, explicit width/height (CLS)
- Filters: debounced URL updates; don't refetch entire page
- Product grid: virtualize after 100 items; skeleton placeholders

### Dashboard with charts

- Initial shell + skeleton; charts `dynamic import()` per library (heavy)
- Web Worker for data aggregation if main thread blocked &gt; 50ms
- Stale-while-revalidate: show cached metrics, refresh quietly

### Social feed (media-heavy)

- Lazy load images (`loading="lazy"`), blur placeholders
- Prefetch next page when user 80% through list
- Cap autoplay video; intersection observer for play/pause

---

## Code snippets

### Route-based code splitting

```tsx
const AdminDashboard = lazy(() => import('./features/admin/Dashboard'));

function AppRoutes() {
  return (
    <Suspense fallback={<RouteSkeleton />}>
      <Routes>
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </Suspense>
  );
}
```

### Responsive images for LCP

```html
<img
  src="hero-800.webp"
  srcset="hero-400.webp 400w, hero-800.webp 800w, hero-1200.webp 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  width="800"
  height="600"
  alt="Product hero"
  fetchpriority="high"
/>
```

### Debounced search (INP)

```javascript
function useDebouncedValue(value, delayMs) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}
```

---

## Tradeoffs

| Technique | Pros | Cons | When |
|-----------|------|------|------|
| **CSR only** | Simple deploy | Poor cold start | Internal tools |
| **SSR/SSG** | Fast FCP, SEO | Hydration cost | Public pages |
| **Aggressive lazy load** | Smaller initial bundle | Loading flashes, complexity | Large apps |
| **React.memo everywhere** | Fewer re-renders | Maintenance, stale props | Hot paths only |
| **Virtualization** | Handles huge lists | Accessibility focus mgmt | Feeds, tables |
| **Service Worker cache** | Offline, repeat visits | Stale data, debug pain | PWA / repeat use |

---

## Diagram: performance budget flow

```
Product requirement: "Checkout LCP < 2.5s on 4G"
         │
         ▼
┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│ Budget define  │────▶│ Build analyze  │────▶│ CI gate        │
│ JS 180KB route │     │ webpack/vite   │     │ fail if over   │
└────────────────┘     └────────────────┘     └────────────────┘
         │                                              │
         ▼                                              ▼
┌────────────────┐                            ┌────────────────┐
│ RUM in prod    │◀───────────────────────────│ Release        │
│ p75 LCP by geo │                            │ canary 5%      │
└────────────────┘                            └────────────────┘
```

---

## Interview questions & answers

### 1. (Easy) What are Core Web Vitals and why do they matter?

**Answer:** Google's user-centric metrics — LCP (loading), INP (interactivity), CLS (visual stability). They correlate with UX and SEO ranking; they're measurable in field (RUM) and lab.

### 2. (Easy) What is code splitting?

**Answer:** Breaking JS bundles into smaller chunks loaded on demand (by route or dynamic import) so initial parse/execute time drops. Tradeoff: extra network requests and loading states.

### 3. (Medium) User reports "typing in search feels laggy." Debug approach?

**Answer:** Check INP/long tasks in DevTools Performance. Likely causes: search triggers expensive filter on every keystroke, large re-renders, sync API calls. Fix: debounce input, memoize filtered list, Web Worker for heavy filter, virtualize results, ensure input handler stays &lt;50ms.

### 4. (Medium) How do you set performance budgets for a multi-team app?

**Answer:** Per-route JS/CSS limits, LCP/INP SLOs by template, bundle analyzer in CI, ownership per feature team. Dashboard RUM by route. Block merges that regress budgets without exception process. Document third-party script allowance.

### 5. (Hard) SSR product page is fast FCP but TTI is slow. Why and fixes?

**Answer:** Hydration downloads/replays large React tree; duplicate data fetch (server + client); heavy third parties. Fixes: reduce client JS (server components/streaming where supported), pass serialized query cache to client, defer non-critical JS, split interactive islands, audit hydration mismatches causing double work.

### 6. (Hard) Design perf strategy for infinite scroll social feed on low-end Android.

**Answer:** Virtual list with stable item heights where possible; image CDN with WebP/AVIF; prefetch next page; skeleton rows; cap concurrent video decode; avoid layout thrashing from dynamic embeds; reserve space for ads (CLS); measure memory — recycle DOM nodes; offline read cache for last N items; degrade animations under `prefers-reduced-motion` and network save data.

---

## Further reading

- [web.dev — Learn Performance](https://web.dev/learn-core-web-vitals/)
- [web.dev — Optimize LCP](https://web.dev/articles/optimize-lcp)
- [MDN — Performance APIs](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API)
- [React — lazy](https://react.dev/reference/react/lazy)

---

## Related topics

- [foundations](../foundations/README.md) — NFRs and rendering model choice
- [component-architecture](../component-architecture/README.md) — lazy boundaries per feature
- [rendering-strategies](../rendering-strategies/README.md) — CSR vs SSR impact on CWV
- [data-layer](../data-layer/README.md) — caching and stale-while-revalidate
- [observability](../observability/README.md) — field CWV and RUM
- [tooling](../tooling/README.md) — CI bundle analysis
- [advanced-topics](../advanced-topics/README.md) — edge, streaming
