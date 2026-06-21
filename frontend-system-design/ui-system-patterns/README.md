# UI System Patterns (Interview Classics)

## Overview

These are **must-know frontend system design problems** — not trivia, but repeatable architectures with clear tradeoffs. Practice building them in [React_Machine_Coding/](../../React_Machine_Coding/).

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | Sketch data flow for autocomplete and infinite scroll |
| **Intermediate** | Design error/retry/loading for each pattern |
| **Advanced** | Compare virtualization vs pagination at scale |
| **Expert** | Present any pattern in 25 min interview format |

---

## Pattern catalog

### Infinite scroll

- **Intersection Observer** sentinel + cursor pagination
- **Virtualization** when list > ~100 DOM nodes — [performance](../performance/README.md)
- **URL state** for shareable position (optional)

### Autocomplete / typeahead

- Debounce input — [JS/debounce](../../JS/debounce/)
- Cancel in-flight requests (AbortController)
- Keyboard navigation + ARIA combobox
- Cache recent queries client-side

### File upload

- Chunked upload for large files; resume support
- Progress UI; presigned S3 URLs vs direct POST
- Client validation + server virus scan

### Data grid (Excel-like)

- Virtual rows **and** columns
- Cell editing, selection model, clipboard
- Server-side sort/filter/pagination for huge datasets

### Drag & drop builder

- Pointer events vs HTML5 DnD API
- Ghost preview, drop zones, accessibility alternative
- Persist layout schema (JSON) not DOM

### Real-time chat / notifications

- See [real-time-systems](../real-time-systems/README.md)
- Optimistic messages; unread counts; reconnect

### Dashboard systems

- Widget grid layout; lazy load per widget
- Role-based widget visibility
- Polling vs WebSocket for metrics

---

## Cross-cutting concerns

| Concern | Pattern |
|---------|---------|
| **Loading** | Skeleton > spinner; avoid CLS |
| **Errors** | Error boundaries + retry |
| **Empty states** | First-run UX |
| **Accessibility** | Keyboard, focus, live regions |

---

## Tradeoffs

| Pattern | Client-heavy | Server-heavy |
|---------|--------------|--------------|
| **Infinite scroll** | Virtual list + cache | Cursor API + CDN |
| **Data grid** | Virtualization | Server pagination only |
| **Autocomplete** | Local filter | Search API + debounce |

---

## Interview questions

1. **(Medium)** Design YouTube-style infinite feed.
2. **(Medium)** Autocomplete for 10M SKU catalog.
3. **(Hard)** Excel-like grid — 1M rows, editable cells.
4. **(Hard)** Drag-drop page builder — save/load layout.
5. **(Hard)** Dashboard with 20 widgets — load strategy?

---

## Related topics

- [case-studies](../case-studies/README.md)
- [performance](../performance/README.md)
- [state-management](../state-management/README.md)
- [React_Machine_Coding/](../../React_Machine_Coding/)
