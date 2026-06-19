# Frontend Deployment & Delivery

## Overview

**Deployment** for frontend systems covers how code reaches users: build pipelines, environments, CDN, preview URLs, feature flags, and rollback. Architects optimize for **safe, frequent releases** without treating production as a surprise.

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | Describe build → artifact → CDN flow |
| **Intermediate** | Design PR preview and staging |
| **Advanced** | Plan canary, blue-green, feature flags |
| **Expert** | Multi-region CDN + edge config strategy |

---

## Core concepts

### Standard pipeline

```
 PR opened
    │
    ▼
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│ Lint    │──▶│ Test    │──▶│ Build   │──▶│ Preview │
│ typechk │   │ unit/e2e│   │ bundle  │   │ URL     │
└─────────┘   └─────────┘   └─────────┘   └─────────┘
                                    │
 merge to main                      ▼
                            ┌─────────┐   ┌─────────┐
                            │ Staging │──▶│ Prod    │
                            │ deploy  │   │ canary  │
                            └─────────┘   └─────────┘
```

### Environments

| Env | Purpose | Data |
|-----|---------|------|
| **Local** | Dev | Mock / dev API |
| **Preview** | PR review | Staging API or mocks |
| **Staging** | QA, E2E | Prod-like anonymized |
| **Production** | Users | Real |

---

## Real-world examples

### Static SPA on S3 + CloudFront

- `npm run build` → upload `dist/` → invalidate CDN paths
- Immutable hashed assets (`app.a1b2.js`) — long cache
- `index.html` — short cache or no cache

### Next.js on Vercel

- Git integration → preview per branch
- Production from `main`; edge config for redirects

### Enterprise bank

- Air-gapped build agents; manual approval gate
- Feature flags for gradual rollout (no big-bang Friday deploy)

---

## Code snippets

### Environment config (12-factor)

```bash
# .env.production — injected at build in CI
VITE_API_URL=https://api.example.com
VITE_RELEASE=$GITHUB_SHA
VITE_ENV=production
```

### Feature flag check

```tsx
function NewCheckout() {
  const enabled = useFeatureFlag('checkout-v2');
  return enabled ? <CheckoutV2 /> : <CheckoutV1 />;
}
```

### GitHub Actions sketch

```yaml
jobs:
  deploy:
    steps:
      - run: npm ci && npm run build
      - run: npm run test:e2e
      - uses: aws-actions/configure-aws-credentials@v4
      - run: aws s3 sync dist/ s3://app-bucket --delete
      - run: aws cloudfront create-invalidation --paths "/*"
```

---

## Tradeoffs

| Strategy | Pros | Cons | When |
|----------|------|------|------|
| **Deploy on every merge** | Fast feedback | Needs strong CI | Mature teams |
| **Scheduled releases** | Predictable | Slower fixes | Regulated industries |
| **Canary** | Limit blast radius | Complex routing | High-traffic prod |
| **Feature flags** | Decouple deploy/release | Flag debt | Gradual rollouts |
| **Immutable assets** | Cache efficiency | Must invalidate HTML | All SPAs |

---

## Diagram: rollback decision

```
 Canary deploy 5%
       │
       ▼
  Error rate OK? ──no──▶ Rollback (previous artifact)
       │
      yes
       ▼
  Expand 50% → 100%
       │
       ▼
  Monitor 24h (RUM + errors)
```

---

## Interview questions & answers

### 1. (Easy) Why hash filenames in build output?

**Answer:** Enables long-term CDN caching — file content changes → new hash → new URL. Users always get fresh JS after deploy without stale bundle bugs.

### 2. (Easy) What is a preview deployment?

**Answer:** Unique URL per PR with built frontend so reviewers test UI before merge. Often pairs with staging API or mock server.

### 3. (Medium) SPA deploy broke app — white screen. Causes?

**Answer:** Wrong `base` path; cached old `index.html` pointing to deleted chunks; env var missing in prod build; CDN misconfig. Fix: cache policy for HTML, health check, source maps for debug.

### 4. (Medium) Feature flags vs branch deployments?

**Answer:** Flags: same build, toggle runtime — good for gradual rollout. Branch envs: test incomplete work in isolation. Use flags for release control; branches for WIP not ready in main.

### 5. (Hard) Design CI/CD for monorepo with 5 apps.

**Answer:** Affected detection (only build changed packages); shared design system versioned; matrix jobs; deploy order (tokens pkg → apps); contract tests between MFE shell and remotes; artifact registry per app.

### 6. (Hard) Zero-downtime deploy for SSR app?

**Answer:** Blue-green or rolling pods behind load balancer; drain connections; warm new instances; DB migrations backward-compatible; session sticky if needed; rollback keeps previous image tagged.

---

## Further reading

- [GitHub Actions — Docs](https://docs.github.com/en/actions)
- [Vercel — Deployment](https://vercel.com/docs/deployments)
- [AWS — CloudFront](https://docs.aws.amazon.com/cloudfront/)

---

## Related topics

- [tooling](../tooling/README.md) — monorepo and CI
- [observability](../observability/README.md) — post-deploy metrics
- [rendering-strategies](../rendering-strategies/README.md) — SSR deploy complexity
- [security](../security/README.md) — secrets in CI
- [LEARNING_PATH](../LEARNING_PATH.md) — Week 7–8
