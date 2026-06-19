# State Management Architecture

## Overview

**State management** is deciding *what lives where* — component, URL, server cache, global store — and *how it flows*. Architects optimize for **predictability, debuggability, and team boundaries**, not maximum global state.

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | Classify UI vs server vs URL state |
| **Intermediate** | Choose local vs context vs query library |
| **Advanced** | Design multi-tab sync and optimistic updates |
| **Expert** | Define org standards (when Redux is allowed) |

---

## Core concepts

### State categories

```
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│ UI state       │  │ Server state   │  │ URL state      │
│ modal open     │  │ user profile   │  │ ?page=2&sort=  │
│ hover, focus   │  │ product list   │  │ shareable      │
└────────────────┘  └────────────────┘  └────────────────┘
        │                    │                    │
        └────────────────────┴────────────────────┘
                         Avoid duplicating
                    the same fact in 3 places
```

### Decision tree (simplified)

```
Is it server data? ──yes──▶ React Query / SWR / Apollo
        │
        no
        ▼
Should URL be shareable? ──yes──▶ URL params / router state
        │
        no
        ▼
Used by 2–3 nearby components? ──yes──▶ Lift state / composition
        │
        no
        ▼
App-wide cross-cutting? ──yes──▶ Context / Zustand / Redux (last resort)
        │
        no
        ▼
Keep local (useState / useReducer)
```

---

## Real-world examples

### Todo app (Phase 2 milestone)

| State | Where | Why |
|-------|-------|-----|
| Todo items | Local or React Query if API | Start local; migrate when API exists |
| Filter (all/active) | URL query | Shareable view |
| Editing id | Local | Ephemeral UI |

### Dashboard

| State | Where | Why |
|-------|-------|-----|
| Widget data | React Query | Cache, refetch, stale time |
| Date range filter | URL | Bookmarkable reports |
| Sidebar collapsed | localStorage | Persist UX preference |
| Current user | Context (thin) | Avoid prop drilling auth |

### E-commerce cart

| State | Where | Why |
|-------|-------|-----|
| Cart lines | Server + optimistic client | Source of truth on server |
| Mini-cart open | Local | UI only |
| Promo code | Form local until submit | Validation flow |

---

## Code snippets

### Custom hook for UI + server separation

```tsx
function useProductList(category: string) {
  return useQuery({
    queryKey: ['products', category],
    queryFn: () => fetchProducts(category),
    staleTime: 60_000,
  });
}

function ProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('cat') ?? 'all';
  const { data, isLoading } = useProductList(category);
  // UI state: dropdown open stays local
}
```

### useReducer for complex local flow

```tsx
type CheckoutAction =
  | { type: 'SET_STEP'; step: number }
  | { type: 'APPLY_COUPON'; code: string };

function checkoutReducer(state, action) { /* ... */ }
```

---

## Tradeoffs

| Approach | Pros | Cons | When |
|----------|------|------|------|
| **useState local** | Simple | Prop drilling | Leaf components |
| **Context** | No extra lib | Re-render all consumers | Theme, auth snapshot |
| **Zustand/Jotai** | Small API, selective sub | Another pattern to learn | Medium global UI |
| **Redux Toolkit** | DevTools, middleware, scale | Boilerplate | Large teams, complex workflows |
| **React Query** | Server cache built-in | Not for all UI state | Any remote data |
| **URL state** | Shareable, back button | Serialization limits | Filters, pagination |

---

## Diagram: data flow with React Query

```
 User action
     │
     ▼
┌─────────────┐     cache hit?     ┌─────────────┐
│ Component   │──────────────────▶│ Show cached │
└──────┬──────┘                   └─────────────┘
       │ miss / stale
       ▼
┌─────────────┐     JSON           ┌─────────────┐
│ useQuery    │◀───────────────────│ API         │
└─────────────┘                   └─────────────┘
       │
       ▼
  invalidate on mutation ──▶ refetch affected keys
```

---

## Interview questions & answers

### 1. (Easy) UI state vs server state?

**Answer:** UI state is ephemeral client-only (open modals). Server state originates from API and should use a cache layer (React Query) with loading/error/refetch semantics — don't copy into Redux manually.

### 2. (Easy) When is Context enough?

**Answer:** Infrequently changing, widely needed data (theme, locale, auth user snapshot). Not for high-frequency updates or large objects — causes broad re-renders.

### 3. (Medium) Todo app — Redux or not?

**Answer:** For local-only todos, useState/useReducer is enough. Add React Query when persisting to API. Redux if multiple features need time-travel debugging or complex middleware — justify the cost.

### 4. (Medium) How do you sync state across browser tabs?

**Answer:** `BroadcastChannel` or `storage` event for cart/auth signals; server remains source of truth; avoid dual-write to localStorage and server without conflict strategy.

### 5. (Hard) Optimistic add-to-cart — design rollback.

**Answer:** Apply optimistic UI immediately; track pending mutation id; on error revert line item + toast; on success reconcile server ids; handle race if user checks out before confirm — disable checkout or queue.

### 6. (Hard) 20 teams — one global store or not?

**Answer:** Prefer feature-owned caches (query keys per domain) + thin shared context. Global Redux only for true cross-app concerns. Document boundaries in ADR; federation may isolate stores per MFE.

---

## Further reading

- [React — Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [TanStack Query — Docs](https://tanstack.com/query/latest)
- [Redux Toolkit — When to use](https://redux.js.org/introduction/getting-started)

---

## Related topics

- [component-architecture](../component-architecture/README.md) — where state lives in tree
- [data-layer](../data-layer/README.md) — caching and normalization
- [design-patterns](../design-patterns/README.md) — container/presentational
- [performance](../performance/README.md) — re-render cost
- [LEARNING_PATH](../LEARNING_PATH.md) — Week 3–4 milestones
