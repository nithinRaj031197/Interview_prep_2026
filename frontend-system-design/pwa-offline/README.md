# PWA & Offline

## Overview

Progressive Web Apps add **installability, offline resilience, and push** — optional for every product, but critical for field apps, emerging markets, and reliability-minded UX.

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | List Service Worker lifecycle states |
| **Intermediate** | Choose cache-first vs network-first strategies |
| **Advanced** | Design offline read + sync queue |
| **Expert** | Evaluate PWA vs native for product constraints |

---

## Core pieces

| Piece | Role |
|-------|------|
| **Web App Manifest** | Install prompt, icons, theme |
| **Service Worker** | Intercept network; cache assets |
| **Cache Storage API** | Versioned static caches |
| **IndexedDB** | Structured offline data |
| **Background Sync** | Flush queue when online (where supported) |

---

## Cache strategies

```
Static assets (JS/CSS)  → cache-first, hash in filename
HTML shell              → network-first or stale-while-revalidate
API reads               → network-first + offline fallback
API writes              → queue locally, sync later
```

---

## Tradeoffs

| Approach | Pros | Cons |
|----------|------|------|
| **Full offline** | Resilient | Stale data, conflict resolution |
| **Read-only offline** | Simpler | No edits offline |
| **App shell only** | Fast repeat visits | First visit still needs network |
| **Native app instead** | Full OS APIs | Store friction, two codebases |

---

## Interview questions

1. **(Easy)** What does a Service Worker do?
2. **(Medium)** Cache-first vs network-first — when which?
3. **(Medium)** Offline form submissions — design?
4. **(Hard)** Sync conflicts when user edits same record offline.
5. **(Hard)** PWA for e-commerce checkout — worth it?

---

## Related topics

- [advanced-topics](../advanced-topics/README.md)
- [data-layer](../data-layer/README.md)
- [performance](../performance/README.md)
