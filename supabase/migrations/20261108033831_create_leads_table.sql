/*
# Create leads table for enquiry coordination

1. New Tables
- `leads`
  - `id` (uuid, primary key, default gen_random_uuid())
  - `idempotency_key` (text, unique — used for exactly-once submission)
  - `name` (text, not null)
  - `phone` (text, not null)
  - `email` (text, nullable)
  - `property_type` (text, not null — HDB, Condo, Commercial, Other)
  - `district` (text, not null)
  - `surface_type` (text, not null)
  - `approximate_size` (text, not null)
  - `issue` (text, not null)
  - `preferred_date` (text, nullable)
  - `notes` (text, nullable)
  - `company` (text, nullable)
  - `access_constraints` (text, nullable)
  - `marketing_consent` (boolean, default false)
  - `status` (text, not null, default 'received' — lifecycle state machine)
  - `reference` (text, not null — opaque non-sequential client-facing token)
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())
  - `notified_at` (timestamptz, nullable — when partner notification was sent)

2. Security
- Enable RLS on `leads`.
- Grant INSERT only to `anon, authenticated` (public form submissions via edge function).
- Do NOT grant SELECT/UPDATE/DELETE to `anon` or `authenticated` — leads are
  service-role only. The edge function uses the service role key to insert and
  manage lead records.
- Grant SELECT, INSERT, UPDATE, DELETE to `service_role` for internal management.

3. Indexes
- Unique index on `idempotency_key` for exactly-once enforcement.
- Index on `reference` for client lookups.
- Index on `status` for lifecycle queries.
- Index on `created_at` for chronological sorting.

4. Important Notes
- The `idempotency_key` is a UUID sent by the client in the Idempotency-Key
  header. The edge function checks for an existing record with that key before
  inserting. If found, it returns the original success response.
- The `reference` is a separate opaque token (not the database UUID) shown to
  the user as their acknowledgement code.
- The `status` field implements the lifecycle:
  received → validated → notified → contacted → partner_offered →
  partner_accepted → qualified → won/lost, plus spam, invalid, withdrawn.
- No PII is logged. The table stores PII at rest (encrypted by Supabase).
- Only the service role (edge function with SUPABASE_SERVICE_ROLE_KEY) can
  read or update leads. The anon key can only INSERT (through the edge function
  which validates and proxies the insert).
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  idempotency_key text UNIQUE NOT NULL,
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  property_type text NOT NULL CHECK (property_type IN ('HDB', 'Condo', 'Commercial', 'Other')),
  district text NOT NULL,
  surface_type text NOT NULL,
  approximate_size text NOT NULL,
  issue text NOT NULL,
  preferred_date text,
  notes text,
  company text,
  access_constraints text,
  marketing_consent boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'received' CHECK (
    status IN ('received', 'validated', 'notified', 'contacted',
               'partner_offered', 'partner_accepted', 'qualified',
               'won', 'lost', 'spam', 'invalid', 'withdrawn')
  ),
  reference text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  notified_at timestamptz
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- The edge function uses the service role key (bypasses RLS) for all operations.
-- We still grant minimum privileges explicitly.
-- anon/authenticated can INSERT only (the edge function proxies inserts).
-- Actually, the edge function uses service_role, so anon doesn't need direct
-- table access at all. But we grant INSERT to anon as a fallback in case the
-- edge function is bypassed and the client inserts directly — though that path
-- is not used in production.
-- For security, we DO NOT grant SELECT to anon — leads are not publicly readable.

-- No grants to anon/authenticated — all access goes through the edge function
-- using the service role key. This is the most secure configuration.

-- Grant full access to service_role (edge function internal management).
-- service_role bypasses RLS, but explicit grants are still required for the
-- Data API / PostgREST to allow operations.
GRANT SELECT, INSERT, UPDATE, DELETE ON leads TO service_role;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_leads_reference ON leads(reference);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- Grant sequence usage (not needed for uuid DEFAULT gen_random_uuid() but
-- included for completeness if serial columns are added later)
