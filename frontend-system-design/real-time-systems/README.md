# Real-Time Systems

## Overview

Chat, live notifications, collaborative docs, and live dashboards need **push or poll strategies** with clear failure modes. This topic covers WebSockets, SSE, and when each wins.

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | Compare polling vs push |
| **Intermediate** | Design reconnect + heartbeat for WebSockets |
| **Advanced** | Choose SSE vs WebSocket for one-way streams |
| **Expert** | Plan presence, ordering, and offline queue |

---

## Transport options

| Transport | Direction | Best for |
|-----------|-----------|----------|
| **Polling** | Client pulls | Low frequency, simple |
| **Long polling** | Simulated push | Legacy compatibility |
| **SSE (Server-Sent Events)** | Server → client | Live feeds, notifications |
| **WebSocket** | Bidirectional | Chat, games, collab editing |

```
        Client                          Server
           │◀────── SSE (one-way) ────────│  stock ticker
           │◀────── WebSocket ───────────▶│  chat
           │────── REST poll ────────────▶│  fallback
```

---

## Frontend architecture

- **Connection manager:** single WS per tab; exponential backoff reconnect
- **Message schema:** versioned events `{ type, payload, ts }`
- **State merge:** optimistic UI + server ack — [data-layer](../data-layer/README.md)
- **Battery / mobile:** pause WS when tab hidden (optional)

---

## Tradeoffs

| Choice | Pros | Cons |
|--------|------|------|
| **WebSocket** | Low latency, bidirectional | Infra complexity, sticky sessions |
| **SSE** | Simple, HTTP-friendly | One-way only |
| **Polling 5s** | Easy | Wasted requests, lag |
| **CRDT / OT** | True collab | High complexity |

---

## Interview questions

1. **(Easy)** SSE vs WebSocket?
2. **(Medium)** WS drops on mobile — fallback plan?
3. **(Medium)** Design notification bell with unread count.
4. **(Hard)** Google Docs-style collab — high level.
5. **(Hard)** 1M concurrent WS connections — FE + BE split?

---

## Related topics

- [data-layer](../data-layer/README.md)
- [ui-system-patterns](../ui-system-patterns/README.md)
- [observability](../observability/README.md)
