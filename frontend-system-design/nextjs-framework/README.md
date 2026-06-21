# Next.js Framework

## Overview

Next.js is the **default production React framework** for SSR, SEO, and hybrid apps. Architects must know App Router, Server Components, and deployment models — not just `pages/` from tutorials.

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | Explain SSR vs SSG vs ISR |
| **Intermediate** | Place components in App Router (server vs client) |
| **Advanced** | Design caching with `fetch` options and revalidation |
| **Expert** | Choose edge vs Node runtime; plan migration from Pages Router |

---

## Rendering models in Next.js

| Mode | Next.js API | Use case |
|------|-------------|----------|
| **SSG** | Static generation | Marketing, docs |
| **SSR** | Dynamic server render | Personalized pages |
| **ISR** | `revalidate` | Large catalogs |
| **CSR** | Client components only | Heavy interactivity |
| **Streaming** | Suspense + streaming HTML | Slow data deps |

See also [rendering-strategies](../rendering-strategies/README.md).

---

## App Router essentials

```
app/
├── layout.tsx          # Shared shell (often Server Component)
├── page.tsx            # Route UI
├── loading.tsx         # Suspense fallback
├── error.tsx           # Error boundary
└── api/                # Route handlers (BFF)
```

### Server vs Client Components

| Server Component | Client Component |
|------------------|------------------|
| Fetch on server | `useState`, `useEffect` |
| Zero client JS for static parts | Event handlers, browser APIs |
| Secrets stay on server | `'use client'` directive |

### Data fetching

- `fetch(url, { next: { revalidate: 60 } })` — ISR-style
- React Query still valid in client islands for interactive views

---

## Edge & SEO

- **Edge runtime:** low latency geo; limited Node APIs
- **Metadata API:** `generateMetadata` for SEO
- **JSON-LD** in RSC for rich results

---

## Tradeoffs

| Choice | Pros | Cons |
|--------|------|------|
| **All RSC** | Small bundle | Interactivity boundaries |
| **Pages Router legacy** | Known patterns | Missing App Router features |
| **Vercel hosting** | Zero-config | Vendor coupling |
| **Self-host Node** | Control | Ops burden — [deployment](../deployment/README.md) |

---

## Interview questions

1. **(Easy)** When use `'use client'`?
2. **(Medium)** ISR vs SSR for product catalog?
3. **(Medium)** Where put auth check in App Router?
4. **(Hard)** Migrate CRA SPA to Next — phases?
5. **(Hard)** RSC + React Query together — split how?

---

## Related topics

- [rendering-strategies](../rendering-strategies/README.md)
- [data-layer](../data-layer/README.md)
- [deployment](../deployment/README.md)
- [performance](../performance/README.md)
