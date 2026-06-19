# Data Layer Architecture

## Overview

The **client data layer** is how your UI acquires, caches, synchronizes, and mutates application state from APIs, WebSockets, and local storage. Senior architects design it so features don't each invent their own fetch/error/loading patterns — and so **consistency, offline behavior, and optimistic UX** are first-class.

Bad data architecture → request waterfalls, stale UI, duplicate sources of truth, and impossible debugging.

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | Diagram read vs write paths; explain loading/error states |
| **Intermediate** | Choose REST vs GraphQL vs BFF; use normalized cache |
| **Advanced** | Design optimistic updates, invalidation graphs, pagination |
| **Expert** | Define sync strategies (strong vs eventual); real-time + CRDT tradeoffs |

---

## Core concepts

### Layers

```
UI Components
     │
     ▼
Hooks / ViewModels  (useOrder, useFeed)
     │
     ▼
Cache / Store       (TanStack Query, Apollo, RTK Query)
     │
     ▼
API Client          (fetch wrapper, auth, retries)
     │
     ▼
Transport           REST / GraphQL / WebSocket / SSE
```

### Server state vs client state

| Server state | Client state |
|--------------|--------------|
| Authoritative on server | UI-only or session ephemeral |
| Cacheable, invalidatable | Cart draft, wizard step |
| Product list, user profile | Modal open, hover |

**Don't put server data in Redux unless you need complex client orchestration** — use a server-state library.

### Normalization

Store entities by ID to avoid duplication:

```
{
  products: { "p1": { id: "p1", name: "..." }, "p2": ... },
  cart: { lineItems: ["li1"], entities: { li1: { productId: "p1", qty: 2 } } }
}
```

### Consistency models (client view)

- **Strong:** Read your writes immediately (checkout confirmation)
- **Eventual:** Likes count, view counts — OK to lag briefly
- **Optimistic:** Assume success, rollback on error (toggle follow)

---

## Real-world examples

### E-commerce cart

- GET cart on app load; mutations debounced for quantity changes
- Optimistic UI for "Add to cart"; server reconciles inventory conflicts
- Idempotency-Key header on checkout POST

### Dashboard metrics

- Parallel queries per widget (avoid waterfall — batch API or GraphQL)
- StaleTime 30s; background refetch; show "Updated 2m ago"
- WebSocket push for alert tiles only

### Social feed

- Cursor-based pagination (`?cursor=abc`) not offset (stable under inserts)
- Prefetch next page; merge into infinite query cache
- Real-time: append new posts via SSE; dedupe by ID

---

## Code snippets

### TanStack Query: parallel + dependent queries

```typescript
// Parallel
const user = useQuery({ queryKey: ['user', id], queryFn: () => fetchUser(id) });
const orders = useQuery({ queryKey: ['orders', id], queryFn: () => fetchOrders(id) });

// Dependent — orders wait for user
const orders = useQuery({
  queryKey: ['orders', user.data?.id],
  queryFn: () => fetchOrders(user.data!.id),
  enabled: !!user.data?.id,
});
```

### Optimistic mutation with rollback

```typescript
const mutation = useMutation({
  mutationFn: toggleLike,
  onMutate: async (postId) => {
    await queryClient.cancelQueries({ queryKey: ['feed'] });
    const previous = queryClient.getQueryData(['feed']);
    queryClient.setQueryData(['feed'], (old) => optimisticToggle(old, postId));
    return { previous };
  },
  onError: (_err, _vars, ctx) => queryClient.setQueryData(['feed'], ctx.previous),
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['feed'] }),
});
```

### API client with cross-cutting concerns

```typescript
async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
      ...init?.headers,
    },
  });
  if (res.status === 401) { await refreshToken(); /* retry once */ }
  if (!res.ok) throw new ApiError(res.status, await res.text());
  return res.json();
}
```

---

## Tradeoffs

| Approach | Pros | Cons | When |
|----------|------|------|------|
| **REST + TanStack Query** | Simple, great caching | Over/under-fetching | Most SPAs |
| **GraphQL + Apollo** | Flexible queries | Cache complexity, bundle | Many views, mobile+web |
| **BFF** | Tailored payloads | Extra service | Divergent clients |
| **Redux for everything** | Single store | Boilerplate, stale server data | Legacy / offline-first editors |
| **WebSockets** | Real-time | Connection mgmt, scale | Chat, live dashboards |
| **SSE** | One-way push, simpler | No binary, IE legacy | Live feeds, notifications |

---

## Diagram: mutation invalidation graph

```
                    ┌──────────────┐
                    │ POST /orders │
                    └──────┬───────┘
                           │ onSuccess
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
    invalidate      invalidate      invalidate
    ['orders']      ['cart']        ['user', 'points']
           │               │               │
           ▼               ▼               ▼
    OrdersList        CartBadge      ProfileHeader
```

Design invalidation explicitly — avoid blanket `refetchAll`.

---

## Interview questions & answers

### 1. (Easy) What is the difference between server state and client state?

**Answer:** Server state is owned by the backend, cached on client, and can become stale — needs refetch/invalidation. Client state is local UI concerns (form drafts, toggles) with no server source of truth.

### 2. (Easy) What is stale-while-revalidate?

**Answer:** Show cached data immediately while fetching fresh data in background. Improves perceived performance; user may briefly see stale content until refresh completes.

### 3. (Medium) How do you avoid request waterfalls on a dashboard?

**Answer:** Parallelize independent fetches; use a batch/BFF endpoint; GraphQL single round trip; SSR loader that prefetches in parallel; Suspense boundaries with streaming. Profile network waterfall in DevTools.

### 4. (Medium) Design pagination for a social feed.

**Answer:** Cursor-based pagination keyed by `(createdAt, id)` for stable ordering under new posts. Infinite query cache with pages merged; dedupe by ID on realtime inserts; prefetch next cursor; handle "gap" if user refreshes mid-scroll; empty/end states; retry on failure without duplicating pages.

### 5. (Hard) Optimistic update fails mid-checkout. UX and data strategy?

**Answer:** Roll back optimistic cart state; show clear error with retry; never double-charge — idempotency keys on payment API; disable confirm button during mutation; log correlation ID; if partial success (order created, payment failed), poll order status or show recovery flow; invalidate cart and orders caches on settle.

### 6. (Hard) When would you introduce a BFF vs calling microservices from the browser?

**Answer:** BFF when client needs aggregated tailored payloads, hides internal service topology, centralizes auth/token exchange, or mobile/web need different shapes. Avoid BFF when team is tiny and adds latency/ops. Never expose all microservices directly to browser — security and chatty networks.

---

## Further reading

- [TanStack Query docs](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Redux — RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [GraphQL — Best practices](https://graphql.org/learn/best-practices/)
- [web.dev — Client-side storage](https://web.dev/articles/storage-for-the-web)

---

## Related topics

- [foundations](../foundations/README.md) — consistency and NFR requirements
- [component-architecture](../component-architecture/README.md) — hooks as view layer
- [state-management](../state-management/README.md) — client vs server state split
- [design-patterns](../design-patterns/README.md) — adapter/repository for API clients
- [performance](../performance/README.md) — caching and prefetch
- [rendering-strategies](../rendering-strategies/README.md) — fetch on server vs client
- [security](../security/README.md) — token handling in API layer
- [advanced-topics](../advanced-topics/README.md) — offline-first, sync engines
