# Accessibility in Frontend System Design

## Overview

Accessibility (a11y) is a **non-functional requirement** and often a legal obligation (ADA, EAA, Section 508). Architects embed inclusive design into component APIs, routing, and design systems — not as a pre-launch audit checkbox.

**~15–20% of users** benefit directly; everyone benefits from keyboard support, captions, and clear UX.

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | Use semantic HTML; label form controls; explain WCAG levels |
| **Intermediate** | Implement keyboard patterns (menus, dialogs); manage focus |
| **Advanced** | Design accessible data tables, live regions, complex widgets |
| **Expert** | Govern a11y in design system; define release gates and VPAT process |

---

## Core concepts

### WCAG principles (POUR)

| Principle | Meaning | FE example |
|-----------|---------|------------|
| **Perceivable** | Content available to senses | Alt text, contrast, captions |
| **Operable** | UI works with keyboard | Focus order, skip links |
| **Understandable** | Predictable, clear | Error messages, labels |
| **Robust** | Works with AT | Valid roles, name/role/value |

**Conformance levels:** A (minimum), AA (industry standard), AAA (aspirational).

### Semantic HTML first

```html
<!-- Prefer -->
<button type="button">Add to cart</button>
<nav aria-label="Main">...</nav>

<!-- Avoid -->
<div onclick="...">Add to cart</div>
```

### ARIA: rules of use

1. **Don't use ARIA** if native HTML suffices
2. **Don't change native semantics** incorrectly
3. **All interactive controls need accessible names**
4. **Hide decorative content** from AT (`aria-hidden`)

### Keyboard support checklist

- Logical tab order (no positive tabindex abuse)
- Visible focus indicators
- Escape closes overlays
- Arrow keys in composite widgets (tabs, listbox)
- Focus trap **only** in modal dialogs — return focus on close

---

## Real-world examples

### E-commerce filters (sidebar)

- Fieldset/legend for checkbox groups
- Announce result count updates via `aria-live="polite"`
- URL-synced filters remain shareable **and** screen-reader friendly

### Dashboard data table

- `<table>` with `<th scope="col">` not div-grid masquerading as table
- Sort buttons in headers with `aria-sort`
- Sticky header doesn't trap focus

### Social feed

- Infinite scroll: "Load more" button alternative for AT users
- Autoplay video off by default; captions available
- Reaction buttons expose pressed state (`aria-pressed`)

---

## Code snippets

### Accessible modal focus trap (conceptual)

```tsx
function Modal({ isOpen, onClose, title, children }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement;
    ref.current?.focus();
    return () => previouslyFocused?.focus();
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title" ref={ref} tabIndex={-1}>
      <h2 id="modal-title">{title}</h2>
      {children}
      <button type="button" onClick={onClose}>Close</button>
    </div>
  );
}
```

### Live region for async status

```html
<div aria-live="polite" aria-atomic="true" class="sr-only">
  {statusMessage}
</div>
```

### Skip link (layout shell)

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
<main id="main-content" tabindex="-1">...</main>
```

---

## Tradeoffs

| Approach | Pros | Cons | When |
|----------|------|------|------|
| **Native HTML** | Free a11y | Limited styling | Default |
| **Headless + custom UI** | Brand control | You own behavior | Design systems |
| **ARIA-heavy div soup** | Flexible | Easy to get wrong | Avoid |
| **Automated axe only** | Fast CI | Misses UX issues | Supplement manual |
| **Separate "accessible version"** | — | Stigma, double maintenance | **Never** |

| WCAG level | Effort | Typical requirement |
|------------|--------|---------------------|
| **A** | Baseline | Minimum legal risk |
| **AA** | Standard target | Most enterprises |
| **AAA** | High | Niche (e.g. gov health) |

---

## Diagram: focus flow in multi-step checkout

```
Step 1: Cart          Step 2: Shipping       Step 3: Payment
┌──────────────┐      ┌──────────────┐       ┌──────────────┐
│ [Continue]   │ ───▶ │ focus first  │ ───▶  │ focus summary│
│              │      │ invalid field│       │ on error     │
└──────────────┘      └──────────────┘       └──────────────┘
        │                     │                      │
        └─────────────────────┴──────────────────────┘
                    aria-live announces step change
```

---

## Interview questions & answers

### 1. (Easy) Why is semantic HTML important for accessibility?

**Answer:** Browsers and assistive technologies expose native elements with built-in roles, keyboard behavior, and naming. Div buttons lack defaults unless you recreate them with ARIA — error-prone.

### 2. (Easy) What is an accessible name?

**Answer:** How assistive tech identifies a control — from visible label, `aria-label`, `aria-labelledby`, or alt text on image buttons. Every interactive element needs one.

### 3. (Medium) How implement an accessible custom select?

**Answer:** Follow [WAI-ARIA Listbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/): combobox role, keyboard (arrows, typeahead, Escape), manage `aria-expanded`, active descendant. Prefer native `<select>` if styling allows or use battle-tested headless library.

### 4. (Medium) Color contrast fails on secondary buttons. System fix?

**Answer:** Fix in design tokens — define AA-compliant pairs for text/background/border in design system; lint in Figma and code; don't one-off patch per button. Document exceptions process for brand colors.

### 5. (Hard) Design a11y strategy for infinite scroll feed.

**Answer:** Virtualization preserves tabindex chaos — provide "Load more" fallback; preserve focus when new items prepend (don't steal focus); live region sparingly for new content count; keyboard shortcuts documented; respect `prefers-reduced-motion`; test with NVDA/VoiceOver; offer pagination mode setting for users who need stable DOM.

### 6. (Hard) How embed accessibility in design system governance?

**Answer:** Each component documents keyboard, roles, examples; axe in Storybook CI; no merge without RTL interaction tests for primitives; designers use accessible Figma kit; a11y champion review for new patterns; semver major for breaking a11y APIs; train consumers; track a11y defects SLAs.

---

## Further reading

- [WAI-ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/)
- [web.dev — Learn Accessibility](https://web.dev/learn/accessibility/)
- [MDN — Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Deque axe rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)

---

## Related topics

- [design-system](../design-system/README.md) — accessible primitives
- [component-architecture](../component-architecture/README.md) — focus boundaries
- [testing](../testing/README.md) — automated a11y checks
- [performance](../performance/README.md) — motion and reduced-motion
- [foundations](../foundations/README.md) — a11y as NFR
