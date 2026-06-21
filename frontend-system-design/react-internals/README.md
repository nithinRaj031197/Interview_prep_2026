# React Internals & Deep Mastery

## Overview

Senior React is not "more hooks" — it is understanding **reconciliation**, **scheduling**, and **when React becomes the bottleneck**. This topic goes under the hood beyond day-to-day component code.

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | Explain render vs commit phase |
| **Intermediate** | Describe why keys matter in lists; when Context re-renders all consumers |
| **Advanced** | Discuss Concurrent features, transitions, Suspense boundaries |
| **Expert** | Decide when NOT to use React (static pages, embed widgets, canvas-heavy) |

---

## Reconciliation & Fiber

- **Fiber:** Unit of work; enables interruptible rendering
- **Render phase:** Pure, can be paused — builds effect list
- **Commit phase:** DOM mutations, layout effects, passive effects — synchronous

```
State update → schedule render → reconcile (diff) → commit to DOM → run effects
```

---

## Concurrent React

| Feature | Use case |
|---------|----------|
| **`useTransition`** | Keep UI responsive during heavy updates |
| **`useDeferredValue`** | Lag non-urgent display (search results) |
| **Suspense** | Loading boundaries for async UI / streaming |
| **Automatic batching** | Multiple setStates → one render (React 18+) |

---

## State & composition

| Pattern | When |
|---------|------|
| **Controlled vs uncontrolled** | Controlled for validation/sync; uncontrolled for simple forms |
| **Context** | Theme, locale — avoid high-frequency updates |
| **Colocation** | State closest to where it is used — see [component-architecture](../component-architecture/README.md) |
| **Lifting state** | Only when siblings must share |

---

## Advanced patterns (system level)

See [design-patterns](../design-patterns/README.md) for depth:

- Compound components
- Render props / HOCs (legacy but interview-relevant)
- Custom hooks as logic layer
- Headless components (Radix-style) — behavior without opinionated UI

---

## Tradeoffs

| Question | Tradeoff |
|----------|----------|
| **Memo everything?** | CPU vs missed re-renders — measure first |
| **Global Context for user?** | Simple vs re-render storm |
| **Client-only SPA** | DX vs SEO/TTFB — see [rendering-strategies](../rendering-strategies/README.md) |
| **Replace React with Preact?** | Bundle size vs ecosystem risk |

---

## Interview questions

1. **(Easy)** What happens when you call `setState`?
2. **(Medium)** Why `key={index}` is risky in dynamic lists?
3. **(Medium)** Context vs Zustand — when which?
4. **(Hard)** Design searchable table with 10k rows in React.
5. **(Hard)** When would you choose not to use React?

---

## Related topics

- [design-patterns](../design-patterns/README.md)
- [state-management](../state-management/README.md)
- [performance](../performance/README.md)
- [nextjs-framework](../nextjs-framework/README.md)
