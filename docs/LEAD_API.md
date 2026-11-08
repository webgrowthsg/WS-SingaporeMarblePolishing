# Lead API Specification

## Endpoint

```
POST /functions/v1/submit-lead
```

This is a Supabase Edge Function. It accepts lead enquiry submissions from
the public quote form, validates them, stores them durably, and returns an
opaque reference token.

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | `application/json` |
| `Authorization` | Yes | `Bearer <SUPABASE_ANON_KEY>` |
| `Idempotency-Key` | Yes | UUID v4 — used for exactly-once submission |

### Body

```json
{
  "name": "Jane Tan",
  "phone": "+65 9123 4567",
  "email": "jane@example.com",
  "propertyType": "HDB",
  "district": "Bedok",
  "surfaceType": "living room floor",
  "approximateSize": "30 sqm",
  "issue": "Floor has lost its shine and has some scratches near the entrance.",
  "preferredDate": "2026-12-01",
  "notes": "Weekends preferred",
  "company": "",
  "accessConstraints": "",
  "enquiryAcknowledged": true,
  "marketingConsent": false
}
```

### Field Rules

| Field | Required | Validation |
|-------|----------|------------|
| `name` | Yes | Min 2 characters |
| `phone` | Yes | +65 or international format, 7-15 digits |
| `email` | No | Valid email format if provided |
| `propertyType` | Yes | One of: HDB, Condo, Commercial, Other |
| `district` | Yes | Min 2 characters (approximate area, not full address) |
| `surfaceType` | Yes | Min 2 characters |
| `approximateSize` | Yes | Text (e.g. "30 sqm", "100 sqft", or "Unknown") |
| `issue` | Yes | Min 5 characters |
| `preferredDate` | No | Date string |
| `notes` | No | Free text |
| `company` | No | Commercial enquiries only |
| `accessConstraints` | No | Commercial enquiries only |
| `enquiryAcknowledged` | Yes | Must be `true` |
| `marketingConsent` | No | Default `false`, separate from enquiry |

## Responses

### 201 Created (success or idempotent duplicate)

```json
{
  "status": "received",
  "reference": "SMP-AB3K9XQ7"
}
```

- The `reference` is an opaque, non-sequential token shown to the user.
- If a request with the same `Idempotency-Key` is submitted again, the
  original success response (with the original reference) is returned without
  creating a duplicate record.

### 422 Unprocessable Entity (validation error)

```json
{
  "error": "Validation failed: Name is required. Phone is required.",
  "code": "validation_error",
  "retryable": false
}
```

### 429 Too Many Requests (rate limited)

Not currently implemented at the edge function level. Rate limiting should be
configured at the Supabase project level or via a middleware layer before
production launch.

### 503 Service Unavailable (storage or server error)

```json
{
  "error": "Could not store your enquiry. Please try again.",
  "code": "storage_error",
  "retryable": true
}
```

## Idempotency

- The client generates a UUID v4 `Idempotency-Key` for each submission attempt.
- The edge function checks the `leads` table for an existing record with that key.
- If found, the original success response is returned (HTTP 201, same reference).
- If not found, a new record is inserted.
- A unique constraint on `idempotency_key` handles race conditions.
- This guarantees **exactly-once storage** of lead records.

## Lead Lifecycle State Machine

```
received → validated → notified → contacted → partner_offered → partner_accepted → qualified → won
                                                                                       → lost
```

Additional terminal/transitional states:
- `spam` — detected as spam
- `invalid` — determined to be invalid (test submission, nonsense, etc.)
- `withdrawn` — user withdrew their enquiry

### State Definitions

| State | Description |
|-------|-------------|
| `received` | Form submitted, stored in database |
| `validated` | Reviewed by operator, deemed genuine |
| `notified` | Service partner(s) notified of the enquiry |
| `contacted` | Partner has contacted the user |
| `partner_offered` | Partner has offered to provide a quote/assessment |
| `partner_accepted` | User has accepted the partner's offer |
| `qualified` | Assessment completed, genuine service need confirmed |
| `won` | Job booked/completed |
| `lost` | User declined or partner could not assist |
| `spam` | Marked as spam |
| `invalid` | Marked as invalid |
| `withdrawn` | User withdrew enquiry |

## Security

- **Server-side validation**: All fields validated on the server, not just the client.
- **Allowlisted fields**: Only fields in the schema are accepted; unknown fields are ignored.
- **RLS**: The `leads` table has RLS enabled. Only `service_role` can read/update/delete. The anon key cannot read leads.
- **No PII in logs**: Error logging uses error codes only, never PII field values.
- **No PII in URLs**: All PII is in the POST body, never in URL parameters.
- **No PII in analytics**: Analytics events use non-PII parameters only (see ANALYTICS_EVENTS.md).
- **Encrypted at rest**: Supabase encrypts data at rest.
- **CSRF/Origin**: The edge function uses the Supabase anon key for auth. CORS headers are set on all responses.
- **Bot defence**: The `enquiryAcknowledged` checkbox and honeypot fields (future) provide basic bot filtering. Advanced bot protection should be added before production launch.

## Storage

- Leads are stored in the `leads` table in Supabase (PostgreSQL).
- The table schema includes audit fields: `created_at`, `updated_at`, `notified_at`.
- Retention period: **To be determined** as part of PDPA review (see release-gates.md PRIV-01).

## Notifications

- After durable write succeeds, the edge function returns success.
- Notification to the authorised destination (email/CRM) is a **documented next step** — not yet implemented as a functional integration.
- The `LEAD_NOTIFICATION_DESTINATION` environment variable must be configured before notifications are enabled.
- Retry/dead-letter handling for notifications should be implemented before production launch.
- **No success UI is shown unless the durable write succeeds.**

## Internal Lead Status Interface

- No unauthenticated admin page is exposed.
- Lead status management is performed via the Supabase dashboard (service role) or a future authenticated internal interface.
- The documented integration contract is this file and the `leads` table schema.

## Testing

Tests to run before production launch:

1. **Double-submit**: Submit the same idempotency key twice → only one record created, same reference returned.
2. **Network retry**: Client retries with same key after network error → no duplicate.
3. **Invalid phone**: Submit with invalid phone → 422 response.
4. **Blocked consent**: Submit without acknowledgement → 422 response.
5. **Unavailable backend**: Submit when database is down → 503 response with retryable=true.
6. **Valid submission**: Submit with all valid fields → 201 with reference.
