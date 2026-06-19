# Component Architecture

## Overview

Component architecture defines **how UI is decomposed, composed, and owned** across a codebase. Senior FE engineers and solution architects use it to answer: Where does state live? What is reusable vs product-specific? How do teams avoid a "big ball of mud" in React/Vue/Svelte?

Good architecture makes **change cheap** — swap a data source without rewriting views, add a feature without touching unrelated modules.

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | Draw a component tree; distinguish props vs local state |
| **Intermediate** | Apply container/presentational split; define feature modules |
| **Advanced** | Design slot/compound APIs; enforce dependency rules (eslint boundaries) |
| **Expert** | Govern architecture across squads; align folders with domain boundaries (DDD-lite) |

---

## Core concepts

### Atomic decomposition

```
App
├── Layout (shell, nav, error boundary)
│   └── Outlet / children
├── Feature: Cart
│   ├── CartProvider (state)
│   ├── CartList (container)
│   └── CartLineItem (presentational)
└── Feature: Catalog
    ├── ProductGrid
    └── ProductCard
```

### State ownership hierarchy

1. **Local UI state** — hover, open/closed (keep in component)
2. **Shared feature state** — cart items (context or feature store)
3. **Server/cache state** — product catalog (React Query, RTK Query, etc.)
4. **URL state** — filters, pagination (shareable, bookmarkable)

**Rule of thumb:** Lift state only as high as needed; push server state to a cache layer.

### Feature folders vs type folders

```
# Feature-first (preferred at scale)
src/features/checkout/
  components/
  hooks/
  api/
  types/

# Type-first (fine for small apps)
src/components/
src/hooks/
```

### Smart vs dumb components

| Smart (container) | Dumb (presentational) |
|-------------------|------------------------|
| Fetches data, handles events | Renders from props |
| Knows about routing/API | Pure, easy to snapshot test |
| `ProductListContainer` | `ProductListView` |

---

## Real-world examples

### E-commerce: Product detail page

- **ProductGallery** — presentational; receives images + alt text
- **AddToCartPanel** — container; calls cart API, handles stock errors
- **ReviewsSection** — lazy-loaded feature module with own data hook

Boundary: cart logic never imports review internals.

### Dashboard: Widget grid

- **DashboardShell** — layout + RBAC gate (which widgets user sees)
- **WidgetHost** — loads widget registry, suspense boundaries per widget
- Each widget is a **micro-feature** with isolated bundle (`React.lazy`)

### Social feed: Post composer

- Composer state local until "Post" — then optimistic append to feed cache
- Media upload sub-tree owns progress UI; parent only receives final URL

---

## Code snippets

### Compound component API (design-system-friendly)

```tsx
// Usage — flexible composition without prop explosion
<Select value={city} onChange={setCity}>
  <Select.Trigger aria-label="City" />
  <Select.Content>
    <Select.Item value="nyc">New York</Select.Item>
    <Select.Item value="ldn">London</Select.Item>
  </Select.Content>
</Select>
```

### Feature module public API (barrel export)

```typescript
// features/cart/index.ts — only export what other features need
export { CartButton } from './components/CartButton';
export { useCartItemCount } from './hooks/useCartItemCount';
// Do NOT export internal CartReducer
```

### Dependency rule (conceptual)

```
pages → features → shared/ui → shared/lib
         ↓
      (no feature → feature sideways imports without explicit interface)
```

---

## Tradeoffs

| Pattern | Pros | Cons | Use when |
|---------|------|------|----------|
| **Monolithic component tree** | Fast to start | Unmaintainable at scale | Prototypes |
| **Feature modules** | Clear ownership | Duplication risk | Multi-team products |
| **Micro-frontends** | Independent deploy | Runtime integration cost | Very large orgs ([scalability](../scalability/README.md)) |
| **Global store (Redux)** | Predictable, debuggable | Boilerplate, over-fetching | Complex client workflows |
| **Server state library (TanStack Query)** | Cache, dedupe, stale-while-revalidate | Learning curve | API-heavy apps |

---

## Diagram: data down, events up (with cache)

```
                    ┌─────────────────┐
                    │  Server (API)   │
                    └────────┬────────┘
                             │ fetch / mutate
                    ┌────────▼────────┐
                    │  Query Cache    │  ← server state
                    └────────┬────────┘
                             │ selectors
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        ProductList    CartPanel      SearchBar
              │              │              │
              └──────────────┴──────────────┘
                      events bubble up
                             │
                    ┌────────▼────────┐
                    │  Router / URL   │  ← shareable state
                    └─────────────────┘
```

---

## Interview questions & answers

### 1. (Easy) When should state be local vs global?

**Answer:** Local when only one subtree needs it (modal open, input draft). Global or URL when multiple distant components need it, or users must share/bookmark it (filters, auth session). Server-derived data belongs in a cache layer, not duplicated in global UI state.

### 2. (Easy) What is a presentational component?

**Answer:** A component that renders UI from props with minimal logic — no direct API calls. Easier to test, reuse in Storybook, and refactor when data sources change.

### 3. (Medium) How would you structure a large React app for 5 teams?

**Answer:** Feature-first folders with explicit public APIs; shared design system package; eslint import boundaries; route-based code splitting per feature; optional module federation if independent deploy required. Each team owns `features/<domain>` end-to-end (UI + hooks + API adapters).

### 4. (Medium) How do you prevent "prop drilling" without overusing context?

**Answer:** Context for stable, low-frequency data (theme, auth). Composition (children, render props, compound components) for flexible UI. Server state libraries for fetched data. Avoid putting fast-changing values in wide context — causes re-renders. Colocate state with the subtree that needs it.

### 5. (Hard) Refactor scenario: 2000-line `Dashboard.tsx`. Approach?

**Answer:** Map user journeys and data dependencies. Extract presentational chunks (WidgetCard, Header). Move each widget to lazy feature module with own hook. Introduce WidgetRegistry config driven by RBAC. URL-sync global filters. Add error boundaries per widget so one failure doesn't blank the page. Document module boundaries; add visual regression for layout shell.

### 6. (Hard) How do component boundaries affect performance?

**Answer:** Boundaries enable `React.memo`, lazy loading, and selective subscription. Poor boundaries — giant context or single store — cause wide re-renders. Splitting lets you virtualize lists independently, defer non-critical subtrees, and measure perf per feature in RUM.

---

## Further reading

- [React — Thinking in React](https://react.dev/learn/thinking-in-react)
- [React — Passing data deeply with context](https://react.dev/learn/passing-data-deeply-with-context)
- [Bulletproof React — Project structure](https://github.com/alan2207/bulletproof-react)
- [Patterns.dev — Composition pattern](https://www.patterns.dev/vanilla/composition-pattern/)

---

## Related topics

- [foundations](../foundations/README.md) — requirements that drive decomposition
- [design-patterns](../design-patterns/README.md) — compound components, HOCs, render props
- [state-management](../state-management/README.md) — where state lives in the tree
- [design-system](../design-system/README.md) — shared presentational layer
- [performance](../performance/README.md) — lazy loading and memoization boundaries
- [testing](../testing/README.md) — testing containers vs presentational components
