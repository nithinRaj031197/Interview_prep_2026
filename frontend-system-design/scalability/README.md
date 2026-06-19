# Scalability & Organizational Frontend Architecture

## Overview

Frontend scalability is about **many teams shipping one coherent product** — codebase scale, deploy independence, shared state across shells, and Conway's Law alignment. Solution architects choose between **modular monolith**, **monorepo**, and **micro-frontends** based on org topology, not hype.

The goal is **autonomy without chaos**.

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | Explain Conway's Law; route-based code splitting |
| **Intermediate** | Compare module federation vs npm packages |
| **Advanced** | Design shell app, routing federation, shared dependencies |
| **Expert** | Align platform strategy with acquisition integrations, multi-product |

---

## Core concepts

### Conway's Law

> Organizations design systems that mirror their communication structure.

If checkout and catalog are separate teams, your architecture will split there — intentionally or accidentally.

### Scaling dimensions

| Dimension | Tactics |
|-----------|---------|
| **Code** | Feature modules, boundaries, ownership |
| **Team** | CODEOWNERS, RFCs, platform guild |
| **Deploy** | Independent vs coordinated releases |
| **Runtime** | Single SPA vs micro-frontends |
| **Data** | Shared cache, event bus (sparingly) |

### Micro-frontend patterns

```
┌─────────────────────────────────────────────┐
│              Shell (host app)                │
│  Router │ Auth │ Layout │ Shared DS         │
├─────────────┬─────────────┬─────────────────┤
│  MFE: Store │ MFE: Account│ MFE: Support    │
│  (team A)   │  (team B)   │  (team C)       │
└─────────────┴─────────────┴─────────────────┘
```

**Integration styles:**
- **Build-time** — npm packages (simplest)
- **Runtime** — Module Federation, import maps
- **Server-side** — compose HTML fragments (SSI, edge)

### When NOT to micro-frontend

- Small team (&lt;10 FE)
- Tight UX coupling needed
- Can't invest in platform/shell team
- Duplicate React copies unacceptable

---

## Real-world examples

### E-commerce: team per domain

- **Catalog MFE** — search, PLP, PDP
- **Checkout MFE** — cart, payment ( stricter release controls )
- Shared `@shop/design-system` and auth shell
- Cross-MFE navigation via shell router; cart count via custom event or shared query client

### Dashboard suite (admin + analytics)

- Monorepo with apps `admin`, `analytics`, package `ui`
- Single deploy pipeline but independent feature flags per app

### Social platform post-acquisition

- Legacy feed remains iframe/MFE during migration
- Strangler fig: new profile in new stack, old messages in old until replaced

---

## Code snippets

### Module Federation host (webpack concept)

```javascript
// host webpack.config
new ModuleFederationPlugin({
  name: 'shell',
  remotes: {
    catalog: 'catalog@https://cdn.example.com/catalog/remoteEntry.js',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^19.0.0' },
    'react-dom': { singleton: true },
  },
});
```

```tsx
// shell route
const CatalogApp = lazy(() => import('catalog/App'));

<Route path="/shop/*" element={
  <Suspense fallback={<Spinner />}>
    <CatalogApp />
  </Suspense>
} />
```

### Import maps (native ES modules)

```html
<script type="importmap">
{
  "imports": {
    "react": "https://esm.example.com/react@19",
    "@app/catalog": "/mfe/catalog/index.js"
  }
}
</script>
```

### Cross-team API boundary

```typescript
// packages/shared-contracts — versioned types only
export interface CartSummary {
  itemCount: number;
  subtotalCents: number;
}
```

---

## Tradeoffs

| Architecture | Pros | Cons | When |
|--------------|------|------|------|
| **Modular monolith SPA** | Simple ops, one deploy | Merge conflicts at scale | &lt;15 FE, one product |
| **Monorepo multi-app** | Shared code, clear apps | Build CI complexity | Several related products |
| **Micro-frontends** | Independent deploy | UX jank, duplicate deps | Large org, clear domains |
| **Iframe integration** | Strong isolation | Poor UX, perf | Legacy migration only |
| **Single SPA + flags** | Fast iteration | Coupled releases | High cadence one team |

| Shared dependency strategy | Risk |
|----------------------------|------|
| **Singleton React (MF)** | Version mismatch breaks |
| **Each MFE bundles own** | Large downloads |
| **External CDN script** | Supply chain, caching |

---

## Diagram: strangler migration

```
Phase 1                    Phase 2                    Phase 3
┌──────────────┐          ┌──────────────┐          ┌──────────────┐
│ Legacy SPA   │          │ Shell + new  │          │ New platform │
│ 100% traffic │   ───▶   │ Catalog MFE  │   ───▶   │ 100% traffic │
│              │          │ Legacy rest  │          │              │
└──────────────┘          └──────────────┘          └──────────────┘
     │                           │                           │
     └──────── gradual route ────┴─────── migration ──────────┘
              by URL path (/shop → new, /account → old)
```

---

## Interview questions & answers

### 1. (Easy) What is a micro-frontend?

**Answer:** Architectural style where independently deployable frontend apps compose into one user-facing experience — often with a shell handling routing, auth, and shared UI.

### 2. (Easy) What is Conway's Law?

**Answer:** System design reflects org communication boundaries — split architecture along team lines deliberately or suffer accidental coupling.

### 3. (Medium) Monolith SPA vs micro-frontends for 8 teams?

**Answer:** 8 teams might justify MFE **if** domains are loosely coupled and release independence is critical. Otherwise modular monolith in monorepo with strong boundaries + CODEOWNERS often suffices with less operational pain. Ask: deploy frequency conflicts? different tech stacks required?

### 4. (Medium) How share authentication across MFEs?

**Answer:** Shell owns login/session; issues httpOnly cookie or token accessible to same-site subpaths; expose auth context via shared module (singleton) or props from shell; silent refresh in shell only; MFEs never implement own login page without coordination.

### 5. (Hard) Two MFEs use different React versions. Problems and fixes?

**Answer:** Hooks break across copies; context doesn't cross; bundle bloat. Fix: module federation `shared` singleton with enforced version; align upgrade cadence; platform team owns React bump; integration tests across MFE boundary; avoid multiple copies via external CDN only with governance.

### 6. (Hard) Design frontend platform for company acquiring startups quarterly.

**Answer:** Shell with stable routing/auth/DS; integration standard (MF or iframe bridge with TTL migration); shared observability and error reporting; contract-first APIs; design token mapping for brand overlay; feature flag per acquisition; document sunset process; platform team runs integration playbook; avoid N permanent stacks.

---

## Further reading

- [micro-frontends.org](https://micro-frontends.org/)
- [Module Federation docs](https://module-federation.io/)
- [Monorepo.tools](https://monorepo.tools/)
- [Martin Fowler — Micro Frontends](https://martinfowler.com/articles/micro-frontends.html)

---

## Related topics

- [component-architecture](../component-architecture/README.md) — feature module boundaries
- [design-system](../design-system/README.md) — shared UI across teams
- [tooling](../tooling/README.md) — monorepo CI
- [foundations](../foundations/README.md) — org constraints in design
- [advanced-topics](../advanced-topics/README.md) — edge, multi-region
