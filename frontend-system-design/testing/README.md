# Testing Strategy for Frontend Systems

## Overview

Testing at scale is an **architecture decision**: what confidence you need, how fast feedback loops run, and who owns which layer. Senior engineers design a **testing pyramid** aligned with release cadence — not 100% E2E nor zero tests on design systems.

Goal: **ship refactors without fear** and catch regressions before users.

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | Distinguish unit, integration, E2E; write a component test |
| **Intermediate** | Mock API layer; test hooks and accessibility |
| **Advanced** | Design contract tests, visual regression, CI parallelization |
| **Expert** | Define org testing standards, flake budgets, quality gates |

---

## Core concepts

### Testing pyramid (FE adaptation)

```
                    ┌─────────┐
                    │   E2E   │  Few — critical journeys
                   ┌┴─────────┴┐
                   │ Integration │  Component + API mock
                  ┌┴─────────────┴┐
                  │  Unit / Hook   │  Many — fast, cheap
                  └────────────────┘
```

### What to test where

| Layer | Targets | Tools (examples) |
|-------|---------|------------------|
| **Unit** | Pure functions, reducers, formatters | Vitest, Jest |
| **Component** | UI behavior, a11y roles | Testing Library, Vitest |
| **Integration** | Feature flows with MSW | RTL + MSW |
| **E2E** | Checkout, login, publish | Playwright, Cypress |
| **Visual** | Design system, layout | Chromatic, Percy |
| **Contract** | API schema stability | Pact, OpenAPI diff |

### Testing Library philosophy

Test **behavior users see**, not implementation details — queries by role/label, not class names.

---

## Real-world examples

### E-commerce checkout E2E

- Happy path: add item → guest checkout → payment stub → confirmation
- Edge: out-of-stock during checkout shows recovery
- Run in CI on staging with test payment provider

### Dashboard widget integration

- MSW mocks `/metrics` with latency/error scenarios
- Assert skeleton → data → error retry without full browser farm

### Design system visual regression

- Storybook stories as source of truth
- Chromatic catches 2px padding drift on `Button` — blocks merge

---

## Code snippets

### Component test (accessible queries)

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartButton } from './CartButton';

test('shows item count and announces to screen readers', async () => {
  render(<CartButton count={3} onClick={() => {}} />);
  expect(screen.getByRole('button', { name: /cart, 3 items/i })).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button'));
});
```

### MSW handler for data layer

```typescript
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/products', () => {
    return HttpResponse.json([{ id: '1', name: 'Widget', price: 999 }]);
  }),
  http.post('/api/cart', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ id: 'line-1', ...body }, { status: 201 });
  }),
];
```

### Playwright critical path

```typescript
test('user completes purchase', async ({ page }) => {
  await page.goto('/products/sku-42');
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await page.getByRole('link', { name: 'Checkout' }).click();
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByRole('button', { name: 'Pay now' }).click();
  await expect(page.getByRole('heading', { name: 'Order confirmed' })).toBeVisible();
});
```

---

## Tradeoffs

| Strategy | Pros | Cons | When |
|----------|------|------|------|
| **Heavy unit** | Fast CI | Miss integration bugs | Utils, hooks |
| **Heavy E2E** | High confidence | Slow, flaky | Revenue paths only |
| **Snapshot tests** | Easy to add | Noise, false confidence | Static markup only |
| **Visual regression** | Catches CSS drift | Baseline maintenance | Design system |
| **MSW** | Realistic without backend | Handlers drift from API | Feature integration |
| **Contract tests** | Catch breaking API early | Setup cost | Microservices + FE |

---

## Diagram: CI test pipeline

```
 PR opened
     │
     ▼
┌─────────────┐    fail fast
│ Lint + Type │──────────▶ block merge
└──────┬──────┘
       ▼
┌─────────────┐
│ Unit + Comp │  (parallel shards)
└──────┬──────┘
       ▼
┌─────────────┐
│ Integration │  MSW + RTL
└──────┬──────┘
       ▼
┌─────────────┐
│ E2E smoke   │  3–5 journeys (staging)
└──────┬──────┘
       ▼
┌─────────────┐
│ Visual diff │  design-system package only
└─────────────┘
```

---

## Interview questions & answers

### 1. (Easy) What belongs in unit vs E2E tests?

**Answer:** Unit: pure logic, formatters, reducers — fast, many cases. E2E: few critical user journeys end-to-end through real browser — slow, catch wiring issues. Most UI behavior fits integration tests with mocked network.

### 2. (Easy) Why avoid testing implementation details?

**Answer:** Tests break on refactors that don't change behavior; they encourage brittle coupling to state variable names. Test outcomes users experience — visible text, roles, URLs.

### 3. (Medium) How do you test components that fetch data?

**Answer:** MSW or mock fetch to return fixtures; wrap with QueryClientProvider; assert loading skeleton then content; test error and empty states. Optionally test hook separately with `@testing-library/react-hooks` patterns.

### 4. (Medium) E2E tests are flaky. System-level fixes?

**Answer:** Deterministic test accounts/data; avoid arbitrary `sleep` — use auto-wait assertions; isolate tests; run against stable staging; quarantine flaky tests with SLA to fix; parallelize carefully; trace videos on failure; limit scope — not every case needs E2E.

### 5. (Hard) Design testing strategy for a design system used by 10 apps.

**Answer:** Unit tests for logic hooks; RTL for interaction and a11y; Storybook for docs; visual regression on all stories; semver with breaking change detection; consumer contract tests optional; document migration codemods; perf benchmarks for heavy components; don't E2E each consumer — sample reference app.

### 6. (Hard) How test accessibility systematically?

**Answer:** axe in CI on key routes; manual screen reader spot checks for complex widgets; keyboard-only test scripts; enforce eslint-plugin-jsx-a11y; test focus management in modals/menus; include disabled users in research; track a11y bugs like functional defects.

---

## Further reading

- [Testing Library — Guiding Principles](https://testing-library.com/docs/guiding-principles/)
- [Playwright docs](https://playwright.dev/docs/intro)
- [MSW — Mock Service Worker](https://mswjs.io/docs/)
- [Vitest](https://vitest.dev/)

---

## Related topics

- [component-architecture](../component-architecture/README.md) — testable boundaries
- [design-system](../design-system/README.md) — visual regression scope
- [accessibility](../accessibility/README.md) — a11y testing overlap
- [tooling](../tooling/README.md) — CI integration
- [data-layer](../data-layer/README.md) — mocking API contracts
