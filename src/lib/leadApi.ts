/**
 * Lead submission client.
 * Calls the Supabase edge function `/functions/v1/submit-lead`.
 * Handles network errors, validation responses, and idempotent retries.
 */

import type { LeadFormData, LeadSubmitResponse, LeadSubmitError } from "./validation";
import { generateIdempotencyKey } from "./validation";

const LEAD_ENDPOINT = `${import.meta.env.VITE_SUPABASE_URL ?? ""}/functions/v1/submit-lead`;

export async function submitLead(
  data: LeadFormData
): Promise<{ ok: true; data: LeadSubmitResponse } | { ok: false; error: LeadSubmitError }> {
  const idempotencyKey = generateIdempotencyKey();

  try {
    const response = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY ?? ""}`,
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = (await response.json()) as LeadSubmitResponse;
      return { ok: true, data: result };
    }

    let errorBody: Partial<LeadSubmitError> = {};
    try {
      errorBody = await response.json();
    } catch {
      // non-JSON error body
    }

    const code = errorBody.code ?? `http_${response.status}`;
    const retryable =
      response.status === 429 || response.status === 503 || response.status >= 500;

    return {
      ok: false,
      error: {
        error: errorBody.error ?? "Submission failed. Please try again.",
        code,
        retryable: retryable ?? false,
      },
    };
  } catch {
    return {
      ok: false,
      error: {
        error:
          "We could not reach the server. Please check your connection and try again.",
        code: "network_error",
        retryable: true,
      },
    };
  }
}
