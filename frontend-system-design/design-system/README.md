# Design System Architecture

## Overview

A **design system** is the shared frontend platform: tokens, components, patterns, and governance that let many teams ship **consistent, accessible UI** without reinventing buttons. For solution architects, it's a **product** with adopters, versioning, and measurable ROI.

Poor design systems become unused libraries; great ones reduce decision fatigue and defect rates.

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | Distinguish tokens vs components vs patterns |
| **Intermediate** | Structure package API, Storybook, semver |
| **Advanced** | Plan multi-brand theming, composition APIs |
| **Expert** | Run adoption program, contribution model, deprecation policy |

---

## Core concepts

### Layers

```
Tokens (design decisions)
   color.primary.500, spacing.md, font.body
        │
        ▼
Primitives (Button, Input, Stack)
        │
        ▼
Patterns (Form layout, empty states, page shells)
        │
        ▼
Product features (domain-specific)
```

### Design tokens

- **Primitive:** raw palette values
- **Semantic:** `color.text.primary` maps to primitive per theme
- **Component:** `button.primary.background`

Delivery: CSS variables, JS object, or Style Dictionary → multi-platform.

### Component API design

- **Composable** over configurable (avoid 40 boolean props)
- **Accessible by default** — consumer shouldn't fix ARIA
- **Stable semver** — breaking changes are expensive across apps

### Governance model

| Model | Description |
|-------|-------------|
| **Central team owns all** | Quality high, bottleneck risk |
| **Federated** | Domain teams contribute, DS reviews |
| **Adopt/adapt** | Fork allowed with sync expectations |

---

## Real-world examples

### E-commerce multi-brand

- Single `@company/ui` package; theme JSON per brand (SubBrand A/B)
- Product card pattern shared; merchandising badges brand-specific via slots

### Dashboard density modes

- Token sets: `comfortable` vs `compact` spacing
- DataTable primitive supports both without duplicate components

### Social app dark mode

- Semantic tokens flip via `prefers-color-scheme` + manual toggle
- Persist preference; avoid flash with inline script in HTML shell

---

## Code snippets

### CSS variables from tokens

```css
:root {
  --color-bg-surface: #ffffff;
  --color-text-primary: #111827;
  --space-md: 16px;
  --radius-md: 8px;
}

[data-theme="dark"] {
  --color-bg-surface: #0f172a;
  --color-text-primary: #f8fafc;
}
```

### Themed Button using tokens

```tsx
export function Button({ variant = 'primary', children, ...props }) {
  return (
    <button
      className={`btn btn--${variant}`}
      type={props.type ?? 'button'}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Storybook as contract

```tsx
// Button.stories.tsx
export const Primary: Story = {
  args: { children: 'Checkout', variant: 'primary' },
};
// Docs + visual regression + a11y addon
```

---

## Tradeoffs

| Approach | Pros | Cons | When |
|----------|------|------|------|
| **Copy-paste components** | Full control | Drift, no fixes propagate | Solo projects |
| **Published npm DS** | Single upgrade path | Release coordination | Multi-app org |
| **Monorepo workspace package** | Atomic PRs | Coupling to repo | Same org, one platform |
| **Headless (Radix) + styles** | A11y behavior free | Still need tokens/docs | Custom brand |
| **Full MUI/Chakra** | Speed | Harder deep customization | Startups |

| Token storage | Pros | Cons |
|---------------|------|------|
| **CSS variables** | Runtime theming | IE legacy |
| **JS only** | Type-safe in TS | No CSS-only consumers |
| **Figma sync** | Designer-dev parity | Pipeline maintenance |

---

## Diagram: design system in org topology

```
┌─────────────────────────────────────────────────────────┐
│              Design System Team (platform)               │
│  Tokens │ Primitives │ Docs │ Storybook │ Visual CI     │
└───────────────────────────┬─────────────────────────────┘
            npm / workspace │
    ┌───────────┬───────────┼───────────┬───────────┐
    ▼           ▼           ▼           ▼           ▼
 Storefront   Admin     Mobile Web   Marketing   Internal tools
 (Feature     (Feature   (Feature     (SSG)       (Feature
  squads)      squads)    squads)                  squads)
```

---

## Interview questions & answers

### 1. (Easy) What are design tokens?

**Answer:** Named design decisions (color, spacing, typography) stored as data and translated to CSS/JS — single source of truth for theming and consistency across platforms.

### 2. (Easy) Why semver for a design system?

**Answer:** Consumers need predictable upgrades — patch for fixes, minor for additive props, major for breaking API/visual changes. Breaking button padding affects dozens of apps.

### 3. (Medium) Button has 25 variants. Refactor approach?

**Answer:** Collapse to composable variants (`variant`, `size`) + slots for icons; use CSS token combinations not one-off classes; codemod consumers; deprecate old props with console warnings for one major; document migration in changelog.

### 4. (Medium) How measure design system success?

**Answer:** Adoption rate (% apps on latest), time-to-ship UI features, a11y defect reduction, support tickets to DS team, contributor count, Storybook coverage, visual regression catch rate, designer-dev handoff time.

### 5. (Hard) Two brands need different button radius and typography but shared logic.

**Answer:** Headless behavior layer + theme provider injecting token sets per brand; semantic tokens not hardcoded radii in components; build-time or runtime theme switch; document brand override extension points; visual test per theme.

### 6. (Hard) Squad wants one-off component outside DS. Policy?

**Answer:** Evaluate if pattern will repeat — if yes, extend DS via contribution RFC. If truly domain-specific, live in feature folder using DS primitives only. Prevent duplicate primitives (second `Modal`). Quarterly audit for promotion candidates. Balance velocity vs fragmentation.

---

## Further reading

- [Material Design — Design tokens](https://m3.material.io/foundations/design-tokens/overview)
- [Storybook docs](https://storybook.js.org/docs)
- [Style Dictionary](https://amzn.github.io/style-dictionary/)
- [Inclusively Hidden — Scott O'Hara](https://www.scottohara.me/blog/2017/04/04/inclusively-hidden.html) (a11y in components)

---

## Related topics

- [component-architecture](../component-architecture/README.md) — feature vs shared UI
- [design-patterns](../design-patterns/README.md) — compound components
- [accessibility](../accessibility/README.md) — accessible primitives
- [testing](../testing/README.md) — visual regression
- [scalability](../scalability/README.md) — DS across micro-frontends
- [tooling](../tooling/README.md) — monorepo package publishing
