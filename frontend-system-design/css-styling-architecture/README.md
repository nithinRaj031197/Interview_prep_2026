# CSS & Styling Architecture

## Overview

Architects own **consistency at scale** — layout systems, naming, and the tradeoff between Tailwind, CSS Modules, and CSS-in-JS across dozens of engineers.

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | Explain specificity and stacking context |
| **Intermediate** | Choose Flexbox vs Grid for layouts |
| **Advanced** | Compare CSS architecture methodologies |
| **Expert** | Align styling strategy with [design-system](../design-system/README.md) tokens |

---

## Fundamentals (deep)

| Area | Architect note |
|------|----------------|
| **Specificity** | Avoid `!important` wars; prefer single-class components |
| **Flexbox** | 1D alignment — toolbars, nav rows |
| **Grid** | 2D — dashboards, product grids |
| **Container queries** | Component-responsive without viewport hacks |
| **Layers (`@layer`)** | Predictable cascade in large codebases |

---

## Architecture methodologies

| Method | Idea | Best for |
|--------|------|----------|
| **BEM** | Block__element--modifier | Legacy, clear naming |
| **SMACSS** | Base, layout, module, state, theme | Large CSS codebases |
| **Utility-first (Tailwind)** | Compose in markup | Speed, consistency with config |
| **CSS Modules / scoped** | Colocated styles | React/Vite apps |
| **CSS-in-JS (styled-components, Emotion)** | Dynamic styles | Theming; watch runtime cost |

---

## Design system connection

- **Tokens** → CSS variables → components — see [design-system](../design-system/README.md)
- **Accessibility:** focus rings, contrast, motion — [accessibility](../accessibility/README.md)

---

## Tradeoffs

| Stack | Pros | Cons |
|-------|------|------|
| **Tailwind** | Fast iteration, small prod CSS | HTML noise, learning curve |
| **CSS Modules** | Zero runtime, scoped | Theming less dynamic |
| **CSS-in-JS** | Props-driven styles | Bundle/runtime cost |
| **Global Sass** | Familiar | Specificity debt at scale |

---

## Interview questions

1. **(Easy)** Flex vs Grid?
2. **(Medium)** How avoid CSS bundle bloat?
3. **(Medium)** Tailwind vs CSS-in-JS for enterprise DS?
4. **(Hard)** Theme switching (light/dark) architecture.
5. **(Hard)** RTL + i18n layout strategy.

---

## Related topics

- [design-system](../design-system/README.md)
- [accessibility](../accessibility/README.md)
- [performance](../performance/README.md)
