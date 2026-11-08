/*
# Lock lead records to the server role

1. Purpose
- Ensure public lead records cannot be read or modified directly through the
  Supabase Data API by anonymous or authenticated browser sessions.
- Keep the deployed `submit-lead` Edge Function as the only application path
  for accepting enquiries.

2. Modified Table
- `public.leads`
- No columns or rows are changed.
- Existing RLS remains enabled.

3. Security Changes
- Revoke SELECT, INSERT, UPDATE, and DELETE from `anon`.
- Revoke SELECT, INSERT, UPDATE, and DELETE from `authenticated`.
- Keep SELECT, INSERT, UPDATE, and DELETE for `service_role`, which is used by
  the server-side Edge Function.

4. Important Notes
- This is intentionally deny-by-default for browser roles. No RLS policies
  are needed for anon/authenticated because they have no table privileges.
- The Edge Function uses the service role key only on the server and does not
  expose it to the browser.
- This migration is non-destructive: it changes privileges only and does not
  delete or alter lead data.
*/

REVOKE SELECT, INSERT, UPDATE, DELETE ON TABLE public.leads FROM anon;
REVOKE SELECT, INSERT, UPDATE, DELETE ON TABLE public.leads FROM authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.leads TO service_role;