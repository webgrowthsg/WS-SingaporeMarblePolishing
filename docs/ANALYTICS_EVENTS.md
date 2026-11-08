# Analytics Events Dictionary

## Overview

Analytics is implemented via a typed event layer (`src/lib/analytics.ts`).
When GA4/GTM IDs are **not** configured (current state), all analytics
functions are inert no-ops. Events are only fired when IDs are supplied via
environment variables.

## Consent Model

- Analytics consent is managed via `src/lib/consent.ts` (localStorage-based).
- Non-essential analytics tags fire **only after** explicit consent is granted.
- A consent banner appears (only when analytics is enabled) on first visit.
- Users can withdraw consent at any time via the Privacy Policy page.
- The consent state is: `granted`, `denied`, or `unknown` (no choice made yet).

## Event Dictionary

| Event Name | Trigger | Parameters | PII Risk |
|-----------|---------|------------|----------|
| `page_view` | Page load / route change | `page_path` | None |
| `quote_form_start` | First interaction with any form field | `form_id` | None |
| `quote_form_submit` | Form submit button clicked (attempt) | `form_id` | None |
| `quote_form_error` | Validation or server error | `form_id`, `error_type` | None — error_type is an allowlisted code, never PII |
| `generate_lead` | Server-confirmed durable success (once per successful flow) | `form_id` | None |
| `click_whatsapp` | WhatsApp link clicked | `cta_location` | None |
| `click_call` | Telephone link clicked | `cta_location` | None |
| `click_email` | Email link clicked | `cta_location` | None |

## Allowed Non-PII Parameters

| Param | Values | Notes |
|-------|--------|-------|
| `page_path` | URL path string | e.g. `/marble-restoration/` |
| `form_id` | `quote-form` | Fixed identifier |
| `service_category` | Service page ID | e.g. `restoration`, `grinding` |
| `cta_location` | Position identifier | e.g. `hero`, `header`, `footer`, `mobile-cta-bar`, `page-body` |
| `error_type` | Allowlisted error codes | `validation_failed`, `network_error`, `http_422`, `http_429`, `http_503`, `storage_error`, `internal_error` |

## Prohibited Data (NEVER sent to analytics)

- Name, phone number, email address
- Physical address, district, or location details
- Raw notes or issue descriptions
- Photo URLs or filenames
- Person-linkable lead IDs or reference numbers
- IP addresses (configured at GA4 property level, not in event params)

## Consent Scenarios

### 1. Consent granted
- `page_view` fires on all page loads
- Form interaction events fire
- `generate_lead` fires once after server-confirmed success
- Click events fire on configured contact links

### 2. Consent denied
- No events fire at all
- `dataLayer` remains empty
- No GA4/GTM network requests

### 3. Consent unknown (no choice yet)
- No events fire until the user interacts with the consent banner
- If the banner is dismissed without a choice, no events fire

### 4. Analytics not configured (current state)
- All analytics functions are no-ops
- No consent banner is shown
- No `dataLayer` is initialised

## Backend vs GA4 Reconciliation

- **Backend leads** (Supabase `leads` table) are the source of truth for
  enquiry count and lead quality.
- **GA4 events** are supplementary attribution data only.
- `generate_lead` events may differ from backend lead count due to:
  - Ad blockers preventing GA4 from firing
  - Network failures during GA4 beacon
  - Users who deny analytics consent
- **Reporting metric:** Unique successful backend leads (not GA4 events) are
  the primary KPI.
- GA4 `generate_lead` count should be ≤ backend lead count (never higher).

## Dashboard Metric Definitions

| Metric | Source | Definition |
|--------|--------|------------|
| Unique successful leads | Backend (leads table) | Distinct rows with status ≠ spam/invalid/withdrawn |
| Qualified leads | Backend | Distinct rows with status = qualified |
| Organic attributed leads | Backend + GA4 | Leads where GA4 attribution data indicates organic search (best-effort) |
| WhatsApp clicks | GA4 | `click_whatsapp` event count |
| Call clicks | GA4 | `click_call` event count |
| Form error rate | GA4 | `quote_form_error` / `quote_form_submit` |
| Partner acceptance rate | Backend | partner_accepted / partner_offered |

## Timezone

All reporting uses `Asia/Singapore` timezone (UTC+8).
