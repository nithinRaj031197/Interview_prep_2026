# TypeScript Architecture

## Overview

TypeScript is **mandatory at architect level** — not for typing `string`, but for **scalable contracts** between teams, APIs, and feature modules.

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | Use interfaces vs types appropriately |
| **Intermediate** | Apply generics and utility types (`Partial`, `Pick`, `Omit`) |
| **Advanced** | Design discriminated unions for UI states |
| **Expert** | Define module boundaries with shared `types` packages in monorepos |

---

## Core concepts

### Type layers in large apps

```
┌─────────────────────────────────────┐
│  API / DTO types (generated or shared) │
├─────────────────────────────────────┤
│  Domain models (normalized entities)   │
├─────────────────────────────────────┤
│  View models / component props         │
└─────────────────────────────────────┘
```

### Advanced patterns

| Pattern | Example use |
|---------|-------------|
| **Generics** | `ApiResponse<T>`, reusable hooks |
| **Discriminated unions** | `{ status: 'loading' } \| { status: 'success', data: T }` |
| **Type guards** | Narrow `unknown` from fetch |
| **Branded types** | `UserId` vs `OrderId` — prevent mix-ups |
| **`satisfies`** | Infer literal types while checking shape |

### Type-safe APIs

- Generate from OpenAPI/GraphQL schema
- Zod/io-ts for runtime validation at boundaries
- Never trust external JSON without parse step

---

## Tradeoffs

| Approach | Pros | Cons |
|----------|------|------|
| **Strict mode on** | Catches bugs early | Migration cost |
| **Codegen from API** | Single source of truth | Build step |
| **`any` at boundaries only** | Pragmatic | Discipline required |
| **Shared types package** | Consistency across MFEs | Versioning overhead |

---

## Interview questions

1. **(Easy)** `interface` vs `type`?
2. **(Medium)** Model async fetch states with types.
3. **(Medium)** How prevent `null` bugs in UI?
4. **(Hard)** Type-safe event bus across micro-frontends.
5. **(Hard)** When would you NOT use strict TypeScript?

---

## Related topics

- [data-layer](../data-layer/README.md)
- [tooling](../tooling/README.md)
- [scalability](../scalability/README.md)
