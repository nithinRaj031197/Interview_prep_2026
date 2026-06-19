# Tooling & Developer Experience

## Overview

Frontend system design includes **how code is built, verified, and shipped**. Tooling choices affect team velocity, bundle quality, and incident response as much as component patterns.

Solution architects align **monorepo structure**, **CI pipelines**, **feature flags**, and **observability** with org scale.

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | Explain bundler, linter, formatter roles |
| **Intermediate** | Configure CI for lint/test/build; env management |
| **Advanced** | Design monorepo with shared packages; preview deploys |
| **Expert** | Platform team roadmap: golden paths, templates, SLOs for DX |

---

## Core concepts

### Modern FE toolchain

```
Source (TS/TSX)
     │
     ▼
Transpile (esbuild/swc/babel) ──▶ Typecheck (tsc)
     │
     ▼
Bundle (Vite/Rspack/webpack) ──▶ Tree shake, code split
     │
     ▼
Optimize (minify, compress) ──▶ Assets to CDN
     │
     ▼
Deploy (static host / SSR platform)
```

### Environment strategy

| Env | Purpose |
|-----|---------|
| **local** | Fast feedback, mocks |
| **preview** | Per-PR ephemeral URL |
| **staging** | Production-like integration |
| **production** | Real users, feature flags |

**Rule:** Never branch logic on `NODE_ENV` alone for product features — use feature flags.

### Monorepo vs polyrepo

```
Monorepo (pnpm/turbo/nx):
  apps/web, apps/admin, packages/ui, packages/config-eslint

Polyrepo:
  separate repos per app — shared UI via published npm package
```

### Observability on client

- **RUM:** LCP, JS errors, API latency (Datadog, Sentry, web-vitals)
- **Logging:** Structured, correlation IDs, PII scrubbing
- **Session replay:** Privacy-reviewed, sampled

---

## Real-world examples

### E-commerce: preview deployments

- Every PR → Vercel/Netlify preview with env vars scoped to staging API
- QA signs off on preview URL before merge

### Dashboard: monorepo

- `packages/charts` shared by admin + customer portal
- Turborepo caches build; only affected apps rebuild on PR

### Social app: feature flags

- Launch reel feature to 5% via LaunchDarkly
- Kill switch without redeploy if error rate spikes

---

## Code snippets

### Turborepo pipeline (turbo.json excerpt)

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": { "dependsOn": ["build"] },
    "lint": {}
  }
}
```

### Feature flag wrapper

```typescript
export function useFeature(name: string): boolean {
  const flags = useContext(FlagsContext);
  return flags[name] ?? false;
}

// Usage
{useFeature('new-checkout') ? <CheckoutV2 /> : <CheckoutV1 />}
```

### Bundle size CI gate (conceptual)

```yaml
- name: Analyze bundle
  run: npm run build -- --analyze
- name: Check budget
  run: node scripts/check-bundle-budget.js
```

### Source map policy

```javascript
// vite.config — hidden source maps in prod for Sentry, not public
build: {
  sourcemap: 'hidden',
}
```

---

## Tradeoffs

| Choice | Pros | Cons | When |
|--------|------|------|------|
| **Vite** | Fast dev, ESM | SSR ecosystem varies | Greenfield SPAs |
| **webpack** | Mature ecosystem | Slower config | Legacy, MF |
| **Monorepo** | Atomic changes across apps | CI complexity | Shared design system |
| **Polyrepo + npm** | Clear ownership | Version drift | Independent lifecycles |
| **Trunk-based + flags** | Continuous delivery | Flag debt if messy | High release cadence |
| **GitFlow** | Release branches | Slow merges | Regulated releases |

| Flag system | Pros | Cons |
|-------------|------|------|
| **Env var** | Simple | Requires deploy to change |
| **SaaS flags** | Targeting, kill switch | Cost, vendor |
| **Homegrown** | Control | Maintenance |

---

## Diagram: PR → production pipeline

```
 Developer PR
      │
      ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ CI: lint     │────▶│ CI: test     │────▶│ Preview URL  │
│ typecheck    │     │ build        │     │ + E2E smoke  │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
 Merge to main                                    ▼
      │                                    QA approval
      ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Staging deploy│────▶│ Canary 5%   │────▶│ Full rollout │
│ + sourcemaps │     │ RUM compare  │     │ flag cleanup │
└──────────────┘     └──────────────┘     └──────────────┘
```

---

## Interview questions & answers

### 1. (Easy) What problem does a bundler solve?

**Answer:** Combines modules, transpiles modern syntax, tree-shakes unused code, splits chunks, hashes filenames for caching — preparing assets browsers can load efficiently.

### 2. (Easy) Why run TypeScript in CI if Vite strips types?

**Answer:** `tsc` catches type errors build might ignore; prevents shipping logic bugs; enforces contracts across packages in monorepos.

### 3. (Medium) Monorepo or polyrepo for company with web + admin + mobile web?

**Answer:** Monorepo if shared design system and coordinated releases dominate — atomic PRs across packages. Polyrepo if teams fully independent with semver-published UI kit. Often monorepo + turborepo for cache and affected builds.

### 4. (Medium) How structure environment variables safely?

**Answer:** Public vars prefixed (e.g. `VITE_`) only for non-secrets; secrets in CI/CD vault, injected at build for SSR or kept server-side; never commit `.env.production`; document required vars; validate at startup.

### 5. (Hard) Design DX platform for 50 FE engineers.

**Answer:** Golden path template (Vite + TS + ESLint + testing + Storybook); shared config packages; documented ADRs; preview deploys; CODEOWNERS; automated dependency updates with policy; internal CLI for scaffold; RUM/error dashboards; office hours; measure DX metrics (lead time, flaky test rate).

### 6. (Hard) Production error: minified stack traces useless. Fix systemically?

**Answer:** Upload hidden source maps to Sentry/Datadog; include release version in every event; structured logging with user/session correlation (no PII); reproduce in staging with same build ID; add E2E for regression; error boundaries with fallback UI and report ID for support.

---

## Further reading

- [Vite guide](https://vite.dev/guide/)
- [Turborepo docs](https://turbo.build/repo/docs)
- [GitHub Actions — CI](https://docs.github.com/en/actions)
- [web.dev — Feature flags](https://web.dev/articles/feature-policy)

---

## Related topics

- [performance](../performance/README.md) — bundle budgets in CI
- [testing](../testing/README.md) — pipeline test stages
- [deployment](../deployment/README.md) — CDN, preview, canary
- [observability](../observability/README.md) — RUM and error pipelines in CI
- [scalability](../scalability/README.md) — monorepo + micro-frontends
- [security](../security/README.md) — dependency scanning, SRI
