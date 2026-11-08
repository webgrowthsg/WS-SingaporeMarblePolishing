# QA Report

## Environment

- **OS:** Linux 6.9.12
- **Node:** v22.23.4
- **npm:** 10.9.9
- **Date:** 2026-11-08

## Test Results

### 1. TypeScript Type Check

**Command:** `npx tsc --noEmit`
**Result:** PASS — no errors
**Output:** (no output, clean exit)

### 2. Production Build

**Command:** `npm run build`
**Result:** PASS
**Output:**
```
vite v5.4.21 building for production...
✓ 71 modules transformed.
dist/index.html                   0.84 kB │ gzip:  0.45 kB
dist/assets/index-CwrBVPYU.css   20.26 kB │ gzip:  4.51 kB
dist/assets/index-BTez8xwO.js   276.35 kB │ gzip: 81.75 kB
✓ built in 5.04s
```

### 3. Automated Tests

**Command:** `npm test`
**Result:** PASS — 54 tests passed, 0 failed

| Test File | Tests | Status |
|-----------|-------|--------|
| tests/routeRegistry.test.ts | 18 | PASS |
| tests/validation.test.ts | 21 | PASS |
| tests/sitemap.test.ts | 6 | PASS |
| tests/siteConfig.test.ts | 6 | PASS |
| tests/analytics.test.ts | 3 | PASS |

### Test Coverage Details

**Route Registry Tests (18):**
- Exactly 12 routes
- No duplicate paths, IDs, titles, descriptions, or H1s
- All paths lowercase with trailing slashes
- All routes have H2 headings, contextual links, and breadcrumbs
- All contextual links point to existing routes
- Every page links to the quote page where sensible
- Title length ≤ 70 characters
- Description length ≤ 165 characters

**Validation Tests (21):**
- Phone validation (+65, international, local, too short, too long, letters)
- Email validation (valid, missing @, missing domain)
- Form validation (all valid, missing name, invalid phone, invalid email, no email, missing property type, missing district, missing issue, no acknowledgement, marketing consent optional)
- Idempotency key uniqueness (100 unique keys)

**Sitemap Tests (6):**
- Contains exactly 12 URLs
- Contains all expected paths
- Does not contain deferred routes (no /contact-us/, /thank-you/, /faq/, /projects/, /blog/)
- Uses HTTPS (no localhost)

**Site Config Tests (6):**
- Site name configured
- WhatsApp number present
- WhatsApp deep link generation
- Telephone link handling
- Email link handling

**Analytics Tests (3):**
- Analytics inert when IDs not configured
- Track functions don't throw when disabled

### 4. Sitemap Generation

**Command:** `node scripts/generate-sitemap.mjs`
**Result:** PASS — 12 routes generated
**Output:** Confirmed all 12 canonical routes in `public/sitemap.xml`

### 5. Supabase Migration

**Result:** PASS — `leads` table created with RLS enabled
- Unique constraint on `idempotency_key` for exactly-once storage
- Only `service_role` has CRUD access
- `anon`/`authenticated` cannot read leads

### 6. Edge Function Deployment

**Result:** PASS — `submit-lead` function deployed
- Server-side validation of all fields
- Idempotency key handling
- CORS headers on all responses
- Returns 201 with opaque reference token

## Manual Testing (Not Yet Performed)

The following tests require manual or E2E testing and have NOT been run:

- [ ] Keyboard navigation through all pages
- [ ] Screen reader testing (NVDA/VoiceOver)
- [ ] Visual testing at 320px, 375px, 768px, 1440px viewport widths
- [ ] Focus visibility on all interactive elements
- [ ] Color contrast verification (WCAG 2.2 AA)
- [ ] Reduced motion behavior
- [ ] Form submission end-to-end (requires live edge function test)
- [ ] Double-submit idempotency verification (requires live database test)
- [ ] WhatsApp link functionality on iOS and Android
- [ ] Non-JavaScript HTML content verification (requires prerender/SSG setup)

## Open Issues

1. **SEO-VAL-01:** No prerender/SSG — crawlers receive a blank HTML shell until
   JavaScript executes. Must add static site generation for the 12 routes
   before production launch.

2. **Lead notifications:** The edge function stores leads but does not yet
   send notifications to an authorised destination. Must configure
   `LEAD_NOTIFICATION_DESTINATION` and add notification logic.

3. **Rate limiting:** Not implemented at the edge function level. Must be
   configured before production launch.

4. **Security headers:** CSP, HSTS, X-Content-Type-Options must be configured
   at the hosting layer.

5. **Legal review:** Privacy policy and terms are drafts pending legal/PDPA
   review.

6. **Domain verification:** Domain ownership unverified.

7. **Lighthouse audit:** Not yet run. Target: accessibility ≥95, SEO ≥95,
   performance ≥90.
