# Singapore Marble Polishing — Enquiry Coordination Website

A lead coordination website for marble polishing and restoration enquiries in
Singapore. This website collects enquiries and coordinates them with
independent service partners. It is **not** a registered marble polishing
contractor.

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build tool:** Vite 5
- **Styling:** Tailwind CSS 3
- **Routing:** React Router 6
- **Backend:** Supabase (PostgreSQL database + Edge Functions)
- **Testing:** Vitest + Testing Library

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── SEOHead.tsx       # Document head management (title, meta, canonical, JSON-LD)
│   ├── SiteHeader.tsx    # Sticky header with desktop nav + mobile menu
│   ├── Footer.tsx        # Footer with all 12 routes grouped logically
│   ├── Breadcrumbs.tsx   # Breadcrumb navigation
│   ├── Hero.tsx          # Page hero section
│   ├── ServiceCard.tsx   # Link card for service pages
│   ├── TreatmentComparison.tsx  # Comparison table
│   ├── FAQAccordion.tsx  # Accessible FAQ accordion
│   ├── TrustDisclosure.tsx  # Honest service disclosure
│   ├── QuoteCTA.tsx      # Call-to-action button/panel
│   ├── QuoteForm.tsx     # Lead enquiry form with validation
│   ├── ConsentControls.tsx  # Analytics consent banner
│   ├── MobileCTA.tsx     # Sticky mobile WhatsApp/quote bar
│   ├── PageLayout.tsx    # Shared page wrapper
│   ├── Section.tsx       # Semantic content section
│   ├── ContextualLinks.tsx  # Cross-link section
│   ├── ErrorState.tsx    # Error display
│   └── NotFound.tsx      # 404 content
├── pages/               # 12 route page components
│   ├── HomePage.tsx
│   ├── RestorationPage.tsx
│   ├── GrindingPage.tsx
│   ├── SealingPage.tsx
│   ├── HDBPage.tsx
│   ├── CondoPage.tsx
│   ├── CommercialPage.tsx
│   ├── CostPage.tsx
│   ├── AboutPage.tsx
│   ├── QuotePage.tsx
│   ├── PrivacyPage.tsx
│   ├── TermsPage.tsx
│   └── NotFoundPage.tsx
├── lib/                 # Core logic
│   ├── routeRegistry.ts  # Typed route registry (12 routes)
│   ├── siteConfig.ts     # Site configuration + contact links
│   ├── supabaseClient.ts # Supabase client singleton
│   ├── validation.ts     # Lead form types + validation
│   ├── leadApi.ts        # Lead submission client
│   ├── analytics.ts      # Analytics event layer (inert without IDs)
│   ├── consent.ts        # Analytics consent management
│   └── faqContent.ts     # FAQ content per page
├── App.tsx              # Router with 12 routes + 404
├── main.tsx             # Entry point
└── index.css            # Tailwind + base styles

supabase/
├── config.toml          # Edge function config
└── functions/
    └── submit-lead/
        └── index.ts     # Lead API edge function

public/
├── robots.txt
├── sitemap.xml          # Generated (12 routes)
└── favicon.svg

docs/                    # Documentation
governance/              # Release gates
scripts/                 # Build scripts
tests/                   # Test suite
```

## The 12 Canonical Routes

| # | Path | Purpose |
|---|------|---------|
| 1 | `/` | Homepage — marble polishing Singapore |
| 2 | `/marble-restoration/` | Restoration hub |
| 3 | `/marble-grinding/` | Grinding technical service |
| 4 | `/marble-sealing/` | Sealing technical service |
| 5 | `/hdb-marble-polishing/` | HDB residential |
| 6 | `/condo-marble-polishing/` | Condo residential |
| 7 | `/commercial-marble-polishing/` | Commercial hub |
| 8 | `/marble-polishing-cost-singapore/` | Pricing guide |
| 9 | `/about-us/` | Business identity |
| 10 | `/request-a-quote/` | Quote form + contact |
| 11 | `/privacy-policy/` | Legal |
| 12 | `/terms-and-conditions/` | Legal |

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in values (Supabase credentials are pre-populated in Bolt).

3. Run the dev server (automatic in Bolt):
   ```
   npm run dev
   ```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | TypeScript check + Vite build |
| `npm run typecheck` | TypeScript type check only |
| `npm test` | Run test suite |
| `npm run generate-sitemap` | Regenerate sitemap.xml |

## Architecture

### Route Registry

The `routeRegistry` in `src/lib/routeRegistry.ts` is the single source of
truth for all 12 routes. It defines:
- Path, ID, SEO title, meta description, H1, H2 headings
- Primary and supporting keywords
- Breadcrumb hierarchy
- Contextual links (internal link graph)
- Publish status
- Navigation labels and footer grouping

The build validates that exactly 12 routes exist with no duplicates.

### Lead Submission Flow

1. User fills the quote form on `/request-a-quote/`
2. Client validates input (`src/lib/validation.ts`)
3. Client generates an `Idempotency-Key` (UUID v4)
4. Client POSTs to the Supabase edge function `/functions/v1/submit-lead`
5. Edge function validates server-side, checks idempotency, stores in `leads` table
6. Returns 201 with opaque reference token (e.g. `SMP-AB3K9XQ7`)
7. Client shows success confirmation on the same page (no redirect)

### Analytics

Analytics is **inert** (no-ops) when GA4/GTM IDs are not configured.
When configured, events fire via `dataLayer` only after explicit consent.
No PII is ever sent to analytics. See `docs/ANALYTICS_EVENTS.md`.

## Known Limitations

1. **Client-side rendering only**: The current Vite SPA renders content
   client-side. For production SEO, a prerender/SSG step must be added so
   crawlers receive non-JavaScript HTML. This is a launch blocker
   (SEO-VAL-01).

2. **Lead notifications not implemented**: The edge function stores leads
   durably but does not yet send notifications to an authorised destination.
   The `LEAD_NOTIFICATION_DESTINATION` environment variable must be
   configured and notification logic added before production launch.

3. **Rate limiting not implemented**: The edge function does not currently
   rate-limit submissions. Rate limiting should be configured at the
   Supabase project level or via middleware.

4. **Legal policies are drafts**: The privacy policy and terms are templates.
   They must be reviewed and approved by legal counsel before launch.

5. **Domain ownership unverified**: The canonical origin
   `singaporemarblepolishing.com` is a provisional build configuration.
   Domain ownership must be verified before launch.

6. **No photo upload**: File upload is deferred (not implemented) because
   secure private upload, malware scanning, and lifecycle controls are not
   yet in place.

## Launch Blockers

See `governance/release-gates.md` for the full list. Key blockers requiring
owner action:

- Verify domain ownership
- Provide legal operator identity (business name, ACRA number)
- Verify at least one service partner
- Test WhatsApp number (+65 9348 5255)
- Complete PDPA legal review of privacy policy and terms
- Set up prerender/SSG for SEO
- Configure security headers at hosting layer
- Configure lead notification destination

## Deployment

1. Verify all launch blockers in `governance/release-gates.md` are resolved.
2. Set production environment variables (see `.env.example`).
3. Run `npm run build` — must pass with no errors.
4. Run `npm test` — must pass with no failures.
5. Run `npm run generate-sitemap` to regenerate sitemap with production origin.
6. Deploy the `dist/` folder to your hosting provider.
7. Configure DNS to point to the hosting provider.
8. Enable HTTPS/TLS (required for HSTS).
9. Configure security headers (CSP, HSTS, X-Content-Type-Options, referrer policy).
10. Verify the sitemap is accessible at `/sitemap.xml`.
11. Verify robots.txt is accessible at `/robots.txt`.
12. Submit the sitemap to Google Search Console.

### Rollback

1. Deploy the previous version of `dist/` to your hosting provider.
2. Verify the site loads correctly.
3. Check that lead submissions still work.

### Backup and Restore

- Supabase provides automated daily backups. Verify backup retention
  settings in the Supabase dashboard.
- Perform a restore drill before launch: restore the database to a staging
  project and verify lead data integrity.

### Monitoring

- Set up uptime monitoring for the production URL.
- Monitor edge function error rates in the Supabase dashboard.
- Set up alerts for lead submission failures.
- Document the incident contact and escalation procedure.
