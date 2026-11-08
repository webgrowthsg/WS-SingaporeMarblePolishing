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
      const result: unknown = await response.json();
      if (isLeadSubmitResponse(result)) {
        return { ok: true, data: result };
      }

      return {
        ok: false,
        error: {
          error: "The server returned an invalid response. Please try again.",
          code: "invalid_server_response",
          retryable: true,
        },
      };
    }

    let errorBody: Partial<LeadSubmitError> = {};
    try {
      const parsed: unknown = await response.json();
      if (isRecord(parsed)) {
        errorBody = parsed as Partial<LeadSubmitError>;
      }
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
        retryable,
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isLeadSubmitResponse(value: unknown): value is LeadSubmitResponse {
  return (
    isRecord(value) &&
    value.status === "received" &&
    typeof value.reference === "string" &&
    value.reference.length > 0
  );
}
