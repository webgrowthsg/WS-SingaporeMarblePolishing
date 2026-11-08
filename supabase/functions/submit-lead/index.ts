import { createClient } from "npm:@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey, Idempotency-Key",
};

interface LeadInput {
  name: string;
  phone: string;
  email?: string;
  propertyType: "HDB" | "Condo" | "Commercial" | "Other";
  district: string;
  surfaceType: string;
  approximateSize: string;
  issue: string;
  preferredDate?: string;
  notes?: string;
  company?: string;
  accessConstraints?: string;
  enquiryAcknowledged: boolean;
  marketingConsent: boolean;
}

function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s-]/g, "");
  return /^\+?\d{7,15}$/.test(cleaned);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validateInput(value: unknown): { valid: boolean; errors: string[]; data?: LeadInput } {
  const errors: string[] = [];

  if (!isRecord(value)) {
    return { valid: false, errors: ["Request body must be an object."] };
  }

  const data = value as Partial<LeadInput>;
  const propertyTypes = ["HDB", "Condo", "Commercial", "Other"];
  const textFields: Array<keyof LeadInput> = [
    "name",
    "phone",
    "district",
    "surfaceType",
    "approximateSize",
    "issue",
  ];

  for (const field of textFields) {
    if (typeof data[field] !== "string") {
      errors.push(`${field} is required.`);
    }
  }

  if (typeof data.name === "string" && (data.name.trim().length < 2 || data.name.trim().length > 120)) {
    errors.push("Name length is invalid.");
  }
  if (typeof data.phone === "string" && !isValidPhone(data.phone)) {
    errors.push("Valid phone number is required.");
  }
  if (data.email !== undefined && (typeof data.email !== "string" || data.email.length > 254 || !isValidEmail(data.email))) {
    errors.push("Email format is invalid.");
  }
  if (typeof data.propertyType !== "string" || !propertyTypes.includes(data.propertyType)) {
    errors.push("Property type is required.");
  }
  if (typeof data.district === "string" && (data.district.trim().length < 2 || data.district.trim().length > 120)) {
    errors.push("District/area length is invalid.");
  }
  if (typeof data.surfaceType === "string" && (data.surfaceType.trim().length < 2 || data.surfaceType.trim().length > 200)) {
    errors.push("Surface type length is invalid.");
  }
  if (typeof data.approximateSize === "string" && (data.approximateSize.trim().length < 1 || data.approximateSize.trim().length > 80)) {
    errors.push("Approximate size is invalid.");
  }
  if (typeof data.issue === "string" && (data.issue.trim().length < 5 || data.issue.trim().length > 2000)) {
    errors.push("Issue description length is invalid.");
  }
  if (data.enquiryAcknowledged !== true) {
    errors.push("Privacy acknowledgement is required.");
  }

  const optionalTextFields: Array<keyof LeadInput> = [
    "preferredDate",
    "notes",
    "company",
    "accessConstraints",
  ];
  for (const field of optionalTextFields) {
    const valueForField = data[field];
    if (valueForField !== undefined && (typeof valueForField !== "string" || valueForField.length > 2000)) {
      errors.push(`${field} is invalid.`);
    }
  }

  if (data.marketingConsent !== undefined && typeof data.marketingConsent !== "boolean") {
    errors.push("Marketing consent is invalid.");
  }

  return errors.length === 0
    ? { valid: true, errors, data: data as LeadInput }
    : { valid: false, errors };
}

function isValidIdempotencyKey(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function generateReference(): string {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  return `SMP-${Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("").toUpperCase()}`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed", code: "method_not_allowed", retryable: false }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const idempotencyKey = req.headers.get("Idempotency-Key");
    if (!idempotencyKey || !isValidIdempotencyKey(idempotencyKey)) {
      return new Response(
        JSON.stringify({
          error: "Missing or invalid Idempotency-Key header.",
          code: "missing_idempotency_key",
          retryable: false,
        }),
        { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const contentLength = Number(req.headers.get("Content-Length") ?? "0");
    if (contentLength > 32_768) {
      return new Response(
        JSON.stringify({ error: "Request is too large.", code: "request_too_large", retryable: false }),
        { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const rawBody = await req.text();
    if (rawBody.length > 32_768) {
      return new Response(
        JSON.stringify({ error: "Request is too large.", code: "request_too_large", retryable: false }),
        { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let body: unknown;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return new Response(
        JSON.stringify({ error: "Request body must be valid JSON.", code: "invalid_json", retryable: false }),
        { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const validation = validateInput(body);

    if (!validation.valid || !validation.data) {
      return new Response(
        JSON.stringify({
          error: "Validation failed: " + validation.errors.join(" "),
          code: "validation_error",
          retryable: false,
        }),
        { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? Deno.env.get("VITE_SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      return new Response(
        JSON.stringify({
          error: "Server is not configured for lead storage.",
          code: "server_not_configured",
          retryable: false,
        }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    // Check for existing record with this idempotency key (exactly-once)
    const { data: existing } = await supabase
      .from("leads")
      .select("reference")
      .eq("idempotency_key", idempotencyKey)
      .maybeSingle();

    if (existing) {
      // Return the original successful result without creating a duplicate
      return new Response(
        JSON.stringify({ status: "received", reference: existing.reference }),
        { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = validation.data;
    const reference = generateReference();

    // Durable write — must succeed before we return success
    const { error: insertError } = await supabase.from("leads").insert({
      idempotency_key: idempotencyKey,
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || null,
      property_type: data.propertyType,
      district: data.district.trim(),
      surface_type: data.surfaceType.trim(),
      approximate_size: data.approximateSize.trim(),
      issue: data.issue.trim(),
      preferred_date: data.preferredDate?.trim() || null,
      notes: data.notes?.trim() || null,
      company: data.company?.trim() || null,
      access_constraints: data.accessConstraints?.trim() || null,
      marketing_consent: data.marketingConsent,
      status: "received",
      reference,
    });

    if (insertError) {
      // Check if it's a unique constraint violation (race condition on idempotency)
      if (insertError.code === "23505") {
        // Another request with the same key was inserted concurrently — return that record
        const { data: raceRecord } = await supabase
          .from("leads")
          .select("reference")
          .eq("idempotency_key", idempotencyKey)
          .maybeSingle();

        if (raceRecord) {
          return new Response(
            JSON.stringify({ status: "received", reference: raceRecord.reference }),
            { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }

      console.error("Lead insert failed:", insertError.code);
      return new Response(
        JSON.stringify({
          error: "Could not store your enquiry. Please try again.",
          code: "storage_error",
          retryable: true,
        }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Durable write succeeded. Notification would be queued here in production
    // (e.g. email/SMS to authorised destination). For now, notification is
    // a documented next step — not claimed as functional.

    return new Response(
      JSON.stringify({ status: "received", reference }),
      { status: 201, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch {
    console.error("Unexpected lead submission error");
    return new Response(
      JSON.stringify({
        error: "An unexpected error occurred. Please try again.",
        code: "internal_error",
        retryable: true,
      }),
      { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
