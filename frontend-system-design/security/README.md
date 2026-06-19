# Security in Frontend Systems

## Overview

The browser is a **hostile environment**: users run extensions, attackers inject scripts, and secrets leak through bundles and logs. Frontend system design includes **threat modeling**, **defense in depth**, and clear boundaries for what the client can never trust.

Solution architects partner with security teams on CSP, auth flows, and supply chain — not treating security as "backend's job."

---

## Learning objectives

| Level | You should be able to… |
|-------|------------------------|
| **Beginner** | Explain XSS, CSRF at high level; why not to store secrets in FE |
| **Intermediate** | Design token storage tradeoffs; sanitize user HTML |
| **Advanced** | Configure CSP; OAuth/OIDC flows for SPAs |
| **Expert** | Lead threat modeling sessions; govern third-party scripts and SBOM |

---

## Core concepts

### Threat model (STRIDE-lite for FE)

| Threat | Example | Mitigation |
|--------|---------|------------|
| **Spoofing** | Fake login form | HTTPS, HSTS, clear domain |
| **Tampering** | Modified client requests | Server validation always |
| **Repudiation** | Deny action | Audit logs (server) |
| **Info disclosure** | API keys in bundle | No secrets in client |
| **DoS** | Heavy client loops | Rate limits (server), debounce |
| **Elevation** | Client-side "admin" flag | RBAC enforced server-side |

### Golden rules

1. **Never trust the client** for authorization — UI hiding ≠ security
2. **Never embed secrets** in frontend code — use short-lived tokens
3. **Validate and encode** output contextually (HTML, URL, JS)
4. **Minimize attack surface** — CSP, subresource integrity, least privilege scopes

### XSS types

- **Stored:** Malicious script saved in DB, served to others
- **Reflected:** Script in URL/query echoed in page
- **DOM-based:** Client JS writes untrusted data to DOM unsafely

**Fix:** Avoid `dangerouslySetInnerHTML`; use DOMPurify if rich text required; framework escaping by default.

### Auth patterns for SPAs

```
Authorization Code + PKCE (preferred for public clients)
     │
     ▼
Access token (short TTL, memory or httpOnly cookie via BFF)
     │
     ▼
Refresh token (httpOnly secure cookie — not localStorage if avoidable)
```

---

## Real-world examples

### E-commerce checkout

- Payment fields in Stripe iframe — reduces PCI scope
- CSP allows `frame-src https://js.stripe.com` only
- Order totals recalculated **server-side** — never trust client price

### Dashboard with role-based widgets

- API returns 403 for forbidden widgets — don't only hide in CSS
- JWT claims for display only; permissions from server on each sensitive action

### Social feed (user-generated content)

- Sanitize markdown/HTML server-side **and** client display layer
- Linkify with allowlist protocols (`https:` only)
- CSP `default-src 'self'` blocks injected inline scripts

---

## Code snippets

### Content Security Policy (example header)

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://cdn.example.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://api.example.com;
  frame-ancestors 'none';
```

### Safe URL handling

```javascript
function safeHref(raw) {
  try {
    const url = new URL(raw, window.location.origin);
    if (!['https:', 'http:'].includes(url.protocol)) return '#';
    return url.href;
  } catch {
    return '#';
  }
}
```

### CSRF: double-submit or SameSite cookies

```javascript
// BFF sets SameSite=Strict/Lax httpOnly cookie
// For state-changing APIs, include CSRF token from meta tag or cookie
fetch('/api/transfer', {
  method: 'POST',
  credentials: 'include',
  headers: { 'X-CSRF-Token': getCsrfToken() },
  body: JSON.stringify(payload),
});
```

---

## Tradeoffs

| Token storage | Pros | Cons | Recommendation |
|---------------|------|------|----------------|
| **memory** | XSS can't exfiltrate persistently | Lost on refresh | Short sessions, high security |
| **localStorage** | Easy | XSS reads tokens | Avoid for refresh tokens |
| **httpOnly cookie** | JS can't read | CSRF needs mitigation | Prefer with BFF + SameSite |
| **BFF session** | Tokens never in browser | Extra service | Enterprise SPAs |

| Sanitization location | Pros | Cons |
|-----------------------|------|------|
| **Server only** | Single source | Client-only apps risk |
| **Client only** | Fast | Bypassable |
| **Both** | Defense in depth | Duplication | **Preferred for UGC** |

---

## Diagram: SPA auth with BFF

```
 Browser                         BFF                          Auth Server
    │                             │                               │
    │── login redirect ──────────▶│── OAuth code + PKCE ─────────▶│
    │                             │◀── tokens ────────────────────│
    │◀── Set-Cookie (httpOnly) ───│                               │
    │                             │                               │
    │── API call (cookie) ───────▶│── attach access token ───────▶│ API
    │◀── JSON ────────────────────│◀──────────────────────────────│
```

Tokens stay off `localStorage`; JS uses same-origin cookie to BFF.

---

## Interview questions & answers

### 1. (Easy) Why shouldn't API secrets live in frontend code?

**Answer:** Bundles are public — anyone can inspect source maps and network traffic. Secrets would be extractable and abused. Use public client IDs with PKCE and keep secrets on server/BFF.

### 2. (Easy) What is XSS?

**Answer:** Injection of malicious scripts executed in victim's browser context — stealing cookies/tokens, defacing UI, keylogging. Prevent by encoding output, avoiding unsafe HTML insertion, CSP, and sanitizing UGC.

### 3. (Medium) localStorage vs httpOnly cookies for JWT?

**Answer:** localStorage accessible to any XSS — game over for token theft. httpOnly cookies not readable by JS; pair with SameSite and CSRF protection. Memory storage for access tokens acceptable for high-security short sessions. Refresh tokens should not live in localStorage.

### 4. (Medium) How do you safely render user-provided rich text?

**Answer:** Allowlist HTML tags/attributes via sanitizer (DOMPurify); sanitize on server too; CSP without `unsafe-inline` scripts; no `javascript:` URLs; link `rel="noopener noreferrer"` for external. Prefer markdown → sanitized HTML pipeline.

### 5. (Hard) Threat model for third-party analytics and chat widgets.

**Answer:** Each script expands blast radius — can read DOM, cookies (if not httpOnly), form fields. Inventory scripts; load async; narrow CSP; use tag manager with consent; prefer server-side analytics for sensitive apps; SRI for static scripts; evaluate vendor SOC2; sandbox iframes where possible; document in privacy policy.

### 6. (Hard) Design auth for multi-tab SPA with token refresh.

**Answer:** Single refresh coordinator (BroadcastChannel or mutex) to avoid refresh storms; handle 401 with queued retry; logout clears all tabs via storage event; rotate refresh tokens; detect stolen refresh server-side; idle timeout; step-up auth for sensitive actions; never log tokens.

---

## Further reading

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series — XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [web.dev — Secure](https://web.dev/secure/)
- [OAuth 2.0 for Browser-Based Apps (BCP)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps)

---

## Related topics

- [data-layer](../data-layer/README.md) — API client auth interceptors
- [foundations](../foundations/README.md) — compliance NFRs
- [tooling](../tooling/README.md) — dependency scanning, SRI in build
- [testing](../testing/README.md) — security regression tests
