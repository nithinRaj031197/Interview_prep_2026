# Frontend Observability

## Overview

**Observability** means understanding frontend behavior in production: errors, performance, user journeys, and business impact. Architects define **what to measure**, **where to instrument**, and **how teams respond** — not just "add Sentry."

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | Name RUM vs logs vs errors |
| **Intermediate** | Design error boundaries + reporting pipeline |
| **Advanced** | Define SLOs and dashboards per route |
| **Expert** | Connect FE metrics to release and feature flags |

---

## Core concepts

### Three pillars (frontend lens)

| Pillar | FE examples | Tools (examples) |
|--------|-------------|------------------|
| **Logs** | Structured client logs, breadcrumbs | Datadog, LogRocket |
| **Metrics** | LCP p75, error rate, API latency | RUM, custom beacons |
| **Traces** | User session, navigation spans | OpenTelemetry browser |

### What to always capture

- Uncaught errors + React error boundary reports
- Route / feature name on every event
- Release version + environment
- User id (hashed) — never PII in clear text
- Core Web Vitals (field data)

---

## Real-world examples

### E-commerce checkout drop-off

- Funnel: cart → shipping → payment → confirm
- RUM: step timing, error spikes on payment SDK
- Session replay (sampled) on failed checkout only (privacy policy)

### Dashboard timeout complaints

- Compare RUM API duration vs backend APM
- Identify slow queries vs large payload vs render blocking
- Long task attribution in Performance API

### Post-release regression

- Canary 5% → watch error rate + LCP by route
- Rollback trigger if error rate &gt; 2× baseline for 15 min

---

## Code snippets

### Error boundary with reporting

```tsx
class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    reportError({
      error,
      componentStack: info.componentStack,
      route: window.location.pathname,
      release: import.meta.env.VITE_RELEASE,
    });
  }
  render() { /* fallback UI */ }
}
```

### Web Vitals beacon

```javascript
import { onLCP, onINP, onCLS } from 'web-vitals';

function sendMetric(metric) {
  navigator.sendBeacon('/analytics/vitals', JSON.stringify({
    name: metric.name,
    value: metric.value,
    id: metric.id,
    route: location.pathname,
  }));
}

onLCP(sendMetric);
onINP(sendMetric);
onCLS(sendMetric);
```

---

## Tradeoffs

| Technique | Pros | Cons | When |
|-----------|------|------|------|
| **Session replay** | Debug UX bugs fast | Privacy, cost, perf | Sampled, consent-gated |
| **Full RUM** | Real device data | Noise, volume cost | All public apps |
| **Error tracking only** | Cheap start | Miss perf issues | MVP / internal |
| **Console in prod** | None | Security leak | Never |
| **100% tracing** | Complete picture | Expensive | Incidents only |

---

## Diagram: observability pipeline

```
 Browser                    Ingestion                 Response
┌──────────┐              ┌──────────┐              ┌──────────┐
│ App +    │── errors ───▶│ Sentry / │── alerts ───▶│ On-call  │
│ vitals   │── RUM ──────▶│ Datadog  │── dashboard ▶│ PM/Eng   │
└──────────┘              └──────────┘              └──────────┘
     │                           │
     └── release tag ────────────┴──▶ compare deploy N vs N-1
```

---

## Interview questions & answers

### 1. (Easy) RUM vs synthetic monitoring?

**Answer:** RUM is real users (variable devices/networks). Synthetic is scripted lab tests (consistent). Use both: synthetic for CI gates, RUM for truth in prod.

### 2. (Easy) What should an error report include?

**Answer:** Stack trace, route, release version, user/session id (anonymous), breadcrumbs, device/browser — not passwords or tokens.

### 3. (Medium) LCP regressed after deploy — debug steps?

**Answer:** Compare RUM by route and release; check bundle size diff; hero image changes; CDN cache; SSR timing; third-party scripts. Roll back if critical; fix forward with budget gate.

### 4. (Medium) How to observe micro-frontends?

**Answer:** Shared RUM SDK in shell; each MFE tags `team` + `mfe_name`; unified error boundary at shell; avoid duplicate SDK loads.

### 5. (Hard) Design observability for 10M DAU social app.

**Answer:** Sample sessions (1–5%); aggregate CWV; error rate SLOs; feature-level counters; privacy review for replay; edge logging for auth failures; tie to feature flag dimensions; on-call runbooks per top routes.

### 6. (Hard) GDPR and session replay?

**Answer:** Consent banner; mask inputs; exclude sensitive routes; retention limits; DPA with vendor; allow user deletion requests; document in privacy policy.

---

## Further reading

- [web.dev — Measure Web Vitals](https://web.dev/articles/vitals-measurement-getting-started)
- [OpenTelemetry — Browser](https://opentelemetry.io/docs/languages/js/getting-started/browser/)
- [Sentry — Frontend monitoring](https://docs.sentry.io/platforms/javascript/)

---

## Related topics

- [performance](../performance/README.md) — budgets and CWV
- [deployment](../deployment/README.md) — canary and rollback
- [security](../security/README.md) — PII in logs
- [tooling](../tooling/README.md) — CI integration
- [LEARNING_PATH](../LEARNING_PATH.md) — Week 7 topics
