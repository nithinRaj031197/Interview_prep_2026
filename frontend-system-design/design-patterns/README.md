# Design Patterns for Frontend Systems

## Overview

Design patterns are **repeatable solutions to recurring UI architecture problems** — not GoF class diagrams transplanted blindly, but pragmatic models for composition, extensibility, and integration. Solution architects use them to keep products consistent while allowing teams to move independently.

This topic focuses on **system-level** patterns: how users extend behavior, how features plug together, and how you isolate third-party APIs.

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | Name container/presentational and controlled vs uncontrolled inputs |
| **Intermediate** | Implement compound components and custom hooks as logic reuse |
| **Advanced** | Choose adapter/facade for third-party SDKs; design plugin registries |
| **Expert** | Document pattern catalog for org; evaluate micro-frontend integration patterns |

---

## Core concepts

### Pattern catalog (FE-relevant)

| Pattern | Problem solved |
|---------|----------------|
| **Container / Presentational** | Separate data from UI |
| **Compound components** | Flexible API without prop drilling |
| **Custom hooks** | Share stateful logic |
| **Controlled / Uncontrolled** | Who owns input state |
| **Adapter** | Swap implementations (maps, payments, analytics) |
| **Observer / Pub-Sub** | Cross-feature events without tight coupling |
| **Strategy** | Pluggable algorithms (sort, pricing rules) |
| **Facade** | Simple API over complex subsystem |

### Controlled vs uncontrolled

```
Controlled:     Parent owns value ──▶ input displays value ──▶ onChange updates parent
Uncontrolled:   DOM owns value ──▶ ref.read on submit
```

Use controlled when validation, instant sync, or multi-field forms need single source of truth.

### Compound components mental model

```
<Menu>                    ← context provider (shared implicit state)
  <Menu.Button />         ← reads/writes context
  <Menu.List>
    <Menu.Item />         ← keyboard roving tabindex
  </Menu.List>
</Menu>
```

---

## Real-world examples

### E-commerce: Payment methods (Strategy + Adapter)

```typescript
interface PaymentAdapter {
  renderCheckout(container: HTMLElement, amount: Money): Promise<PaymentResult>;
}

class StripeAdapter implements PaymentAdapter { /* ... */ }
class PayPalAdapter implements PaymentAdapter { /* ... */ }

function checkout(method: 'stripe' | 'paypal', amount: Money) {
  const adapter = registry.get(method);
  return adapter.renderCheckout(container, amount);
}
```

Teams add PayPal without rewriting checkout UI — only a new adapter.

### Dashboard: Widget plugin registry

- Config JSON lists widget `type`, `props`, permissions
- `WidgetRenderer` maps type → lazy import
- New squad ships widget bundle + registry entry

### Social feed: Infinite list (Virtualization + Observer)

- Intersection Observer triggers next page fetch
- Windowing pattern renders only visible posts
- Optimistic update pattern for like/unlike

---

## Code snippets

### Adapter isolating analytics SDK

```typescript
// analytics/facade.ts — rest of app never imports vendor directly
export const analytics = {
  track(event: string, props?: Record<string, unknown>) {
    if (import.meta.env.PROD) {
      window.amplitude?.track(event, props);
    } else {
      console.debug('[analytics]', event, props);
    }
  },
};
```

### Render props / headless hook (modern equivalent)

```tsx
function useCombobox(options: string[]) {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  // keyboard nav, filtering...
  return { value, setValue, open, setOpen, filtered: /* ... */ };
}

// Consumer chooses markup — accessible listbox vs native datalist
```

### Observer for decoupled cart badge

```typescript
type Listener = () => void;
const cartEvents = {
  listeners: new Set<Listener>(),
  subscribe(fn: Listener) { this.listeners.add(fn); return () => this.listeners.delete(fn); },
  emit() { this.listeners.forEach(fn => fn()); },
};
// Cart feature emits after mutation; header badge subscribes
```

---

## Tradeoffs

| Pattern | Pros | Cons | Prefer when |
|---------|------|------|-------------|
| **HOC** | Cross-cutting concerns (auth, logging) | Wrapper hell, typing pain | Legacy codebases |
| **Render props** | Explicit data flow | Nested pyramid | Pre-hooks era / rare today |
| **Custom hooks** | Reuse logic, clean trees | Hidden dependencies if overused | Default for React logic reuse |
| **Compound components** | Ergonomic flexible API | Requires context discipline | Design systems, complex widgets |
| **Global event bus** | Loose coupling | Hard to trace, test | Prefer domain events + typed channels |
| **Micro-frontend orchestrator** | Team autonomy | Shared dependency/version pain | Org scale ([scalability](../scalability/README.md)) |

---

## Diagram: Adapter layer for third-party SDKs

```
┌─────────────────────────────────────────────────────────┐
│                    Application Features                  │
│   Checkout    Dashboard    Onboarding                   │
└───────────────────────────┬─────────────────────────────┘
                            │
              ┌─────────────▼─────────────┐
              │      Facade / Ports       │
              │  Payments  Maps  Analytics │
              └─────────────┬─────────────┘
         ┌──────────────────┼──────────────────┐
         ▼                  ▼                  ▼
   StripeAdapter      MapboxAdapter      SegmentAdapter
         │                  │                  │
         ▼                  ▼                  ▼
   [ Stripe.js ]       [ Mapbox GL ]      [ analytics.js ]
```

Swap vendors by changing adapter wiring, not every feature.

---

## Interview questions & answers

### 1. (Easy) What is the container/presentational pattern?

**Answer:** Containers fetch data and handle side effects; presentational components render UI from props. It separates concerns so UI can be tested and redesigned independently of data sources.

### 2. (Easy) Controlled vs uncontrolled form inputs — when which?

**Answer:** Controlled when you need live validation, dependent fields, or resetting from parent state. Uncontrolled when simple forms, file inputs, or integrating with non-React libs — read values via refs on submit.

### 3. (Medium) Explain compound components with an example.

**Answer:** Parent provides context; children coordinate implicitly — e.g. `<Tabs><Tabs.List/><Tabs.Panel/></Tabs>`. Avoids exporting dozens of props from one monolithic component while keeping accessibility relationships (ARIA) internal.

### 4. (Medium) Why use an adapter for third-party services?

**Answer:** Vendors change (Stripe → Adyen), SDKs bloat bundles, and APIs differ. Adapters give a stable internal interface, centralize loading/error handling, and simplify testing with mocks.

### 5. (Hard) Design a notification system for a multi-feature SPA.

**Answer:** Define `NotificationService` facade with typed events (success, error, persistent). Features emit domain events; service maps to toast UI. Queue + dedupe identical errors. SSR-safe (no window on server). Optional persistence for critical alerts. Test via mock facade. Avoid global stringly-typed event bus without schemas.

### 6. (Hard) Compare plugin registry vs micro-frontends for extensibility.

**Answer:** Plugin registry: same build/deploy, dynamic import map, good for widget-style extensions within one app — simpler ops. Micro-frontends: separate repos/deploys, runtime integration — better for org boundaries, worse for consistency and shared state. Choose based on team topology and release independence needs, not hype.

---

## Further reading

- [Patterns.dev](https://www.patterns.dev/)
- [React — Reusing logic with custom hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [Headless UI principles](https://www.w3.org/WAI/ARIA/apg/) — behavior without prescribing markup
- [Martin Fowler — GUI Architectures](https://martinfowler.com/eaaDev/uiArchs.html)

---

## Related topics

- [component-architecture](../component-architecture/README.md) — where patterns live in folder structure
- [design-system](../design-system/README.md) — compound components in shared libraries
- [data-layer](../data-layer/README.md) — repository/adapter for API clients
- [scalability](../scalability/README.md) — micro-frontend integration patterns
