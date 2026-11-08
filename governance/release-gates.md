# Release Gates

All gates start as `NOT_STARTED` or `BLOCKED` unless actually verified.
Production launch is BLOCKED until all gates are VERIFIED.

| Gate ID | Description | Status | Owner | Evidence | Verification Date | Blocker |
|---------|-------------|--------|-------|----------|-------------------|---------|
| DOM-01 | Domain registration verified | BLOCKED | Operator | None | — | Domain `singaporemarblepolishing.com` ownership is unverified. Cannot claim domain is registered or connected. |
| DOM-02 | DNS/TLS configured and verified | BLOCKED | Operator | None | — | Cannot configure DNS/TLS until domain ownership is verified. |
| BIZ-01 | Legal operator identity supplied | BLOCKED | Operator | None | — | No registered business name, ACRA number, or legal entity provided. Cannot publish operator identity. |
| BIZ-02 | Partner service coverage verified | BLOCKED | Operator | None | — | No independent service partners have been verified. Cannot claim partner availability, coverage, or capabilities. |
| BIZ-03 | Verified contact methods configured | BLOCKED | Operator | WhatsApp number provided (+65 9348 5255) but not tested | — | WhatsApp number must be tested. Telephone and email not configured. |
| PRIV-01 | Privacy policy and PDPA review completed | BLOCKED | Operator + Legal | Draft template in `/privacy-policy/` | — | Privacy policy is a draft. Must be reviewed and approved by legal counsel familiar with Singapore PDPA. |
| SEO-VAL-01 | All 12 routes return 200 with non-JS HTML content | NOT_STARTED | Developer | — | — | Requires prerender/SSG setup. Current Vite SPA renders client-side only. Must verify with non-JavaScript fetch. |
| SEO-PUB-01 | Sitemap includes only approved canonical routes | VERIFIED | Developer | `scripts/generate-sitemap.mjs` output | 2026-11-08 | Sitemap generated with exactly 12 routes. |
| SEO-IDX-01 | robots.txt and noindex for staging configured | VERIFIED | Developer | `public/robots.txt` | 2026-11-08 | robots.txt references sitemap. Staging noindex must be configured at deployment level. |
| SEO-SCHEMA-01 | JSON-LD structured data is truthful | VERIFIED | Developer | `src/components/SEOHead.tsx` | 2026-11-08 | WebSite schema on home only. BreadcrumbList on subpages. Service schema on service pages. No fake LocalBusiness, Review, AggregateRating, Offer, or FAQ schema. |
| FORM-01 | Quote form server validation working | VERIFIED | Developer | `supabase/functions/submit-lead/index.ts` | 2026-11-08 | Edge function validates all required fields server-side. Returns 422 for invalid input. |
| FORM-02 | Idempotency and double-submit handling | VERIFIED | Developer | `supabase/functions/submit-lead/index.ts` + `leads` table unique constraint | 2026-11-08 | Idempotency-Key header checked against database. Duplicate returns original response. Unique constraint handles race conditions. |
| DATA-01 | Lead data stored durably and securely | VERIFIED | Developer | Supabase migration `create_leads_table` | 2026-11-08 | Leads table created with RLS enabled. Only service_role can read/update/delete. Anon key cannot read leads. |
| ENG-SEC-01 | Security headers and secrets hygiene | NOT_STARTED | Developer | — | — | CSP, HSTS (after HTTPS), X-Content-Type-Options, referrer policy must be configured at deployment/hosting level. No secrets in client code (verified in source). |
| ENG-QUAL-01 | Build, typecheck, and tests pass | NOT_STARTED | Developer | — | — | Must run `npm run build`, `npm run typecheck`, `npm test` and fix all failures. |
| OPS-01 | Deployment steps documented | NOT_STARTED | Developer | — | — | Deployment documentation in README.md. Must include DNS, TLS, environment secrets, rollback. |
| OPS-02 | Monitoring and incident response documented | NOT_STARTED | Developer | — | — | Must document monitoring, alerting, incident contact, backup/restore drill. |

## Summary

- **VERIFIED**: 6 gates
- **NOT_STARTED**: 5 gates
- **BLOCKED**: 6 gates

## Launch-Blocking Items (Owner Action Required)

1. **Verify domain ownership** (DOM-01, DOM-02) — Register or confirm ownership of `singaporemarblepolishing.com`, configure DNS/TLS.
2. **Provide legal operator identity** (BIZ-01) — Supply registered business name and ACRA number for the entity operating this website.
3. **Verify service partners** (BIZ-02) — Confirm at least one independent service partner is available to receive enquiries.
4. **Test WhatsApp number** (BIZ-03) — Verify +65 9348 5255 receives messages. Configure telephone and email if available.
5. **Complete PDPA legal review** (PRIV-01) — Have the privacy policy and terms reviewed and approved by legal counsel.
6. **Set up prerender/SSG** (SEO-VAL-01) — Configure static site generation for the 12 routes so crawlers receive non-JS HTML.
7. **Configure security headers** (ENG-SEC-01) — Set CSP, HSTS, X-Content-Type-Options at the hosting layer.
8. **Configure lead notification destination** — Set `LEAD_NOTIFICATION_DESTINATION` so leads are forwarded to the operator.
9. **Run full QA suite** (ENG-QUAL-01) — Execute build, typecheck, and all tests. Fix all failures.
