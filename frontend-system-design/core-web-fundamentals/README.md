# Core Web Fundamentals

## Overview

Architecture fails when fundamentals are weak. This topic covers **JavaScript runtime behavior**, **browser rendering**, and **networking** — the layer every FE decision sits on.

> **Hands-on:** Practice closures, event loop, debounce in [JS/](../../JS/). This doc explains *why* they matter for system design.

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | Explain call stack vs event loop; name critical rendering path steps |
| **Intermediate** | Reason about microtasks vs macrotasks; identify reflow triggers |
| **Advanced** | Tie async patterns to UI consistency; design cache headers for static assets |
| **Expert** | Debug production jank using Performance panel + network waterfall |

---

## JavaScript (deep, not surface)

| Concept | Architect lens |
|---------|----------------|
| **Execution context & call stack** | Sync work blocks paint; long tasks hurt INP |
| **Event loop** | Order: sync → microtasks (Promises) → macrotasks (setTimeout) |
| **Closures & scope** | Memory leaks from detached DOM + closures holding refs |
| **Prototypes** | Prefer composition; know when `class` hides complexity |
| **Async (Promises, async/await)** | Cancellation, error boundaries, race conditions |
| **Memory & GC** | WeakMap for caches; avoid global accumulators |
| **Immutability** | Predictable React updates; structural sharing in state |

---

## Browser internals

```
HTML → DOM     CSS → CSSOM     → Render Tree → Layout → Paint → Composite
                                              ↑
                                    reflow expensive here
```

| Term | Meaning |
|------|---------|
| **Reflow (layout)** | Geometry changed — expensive, avoid in loops |
| **Repaint** | Visual change without layout |
| **Composite** | GPU layers — `transform`, `opacity` often cheaper |
| **Critical rendering path** | Minimize blocking CSS/JS before first paint |

**Web APIs architects use:** `IntersectionObserver` (infinite scroll), `MutationObserver` (legacy integrations), History API (SPA routing), `requestIdleCallback` (non-urgent work).

---

## Networking basics

| Topic | FE impact |
|-------|-----------|
| **HTTP/HTTPS** | TLS handshake cost; HTTP/2 multiplexing |
| **REST vs GraphQL** | Over-fetching vs complexity; see [data-layer](../data-layer/README.md) |
| **Caching** | `Cache-Control`, ETag, CDN — see [deployment](../deployment/README.md) |
| **Cookies vs localStorage** | HttpOnly cookies for auth; never secrets in localStorage |
| **CORS** | Preflight; BFF pattern to same-origin |

---

## Tradeoffs

| Choice | Pros | Cons |
|--------|------|------|
| **Sync JSON parse on main thread** | Simple | Jank on large payloads |
| **Web Worker for parse** | Smooth UI | Serialization overhead |
| **Aggressive CDN cache** | Fast global | Stale HTML if misconfigured |
| **Third-party script** | Features fast | Main thread + privacy cost |

---

## Interview questions

1. **(Easy)** Microtask vs macrotask order?
2. **(Medium)** What causes layout thrashing?
3. **(Medium)** How does CORS protect users?
4. **(Hard)** Main thread blocked 200ms — debug plan?
5. **(Hard)** Design asset loading for slow 3G.

---

## Related topics

- [performance](../performance/README.md)
- [rendering-strategies](../rendering-strategies/README.md)
- [security](../security/README.md)
- [JS/](../../JS/)
