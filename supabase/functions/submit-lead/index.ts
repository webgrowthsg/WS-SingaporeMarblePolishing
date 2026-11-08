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

function validateInput(data: LeadInput): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name is required.");
  }
  if (!data.phone || !isValidPhone(data.phone)) {
    errors.push("Valid phone number is required.");
  }
  if (data.email && !isValidEmail(data.email)) {
    errors.push("Email format is invalid.");
  }
  if (!data.propertyType || !["HDB", "Condo", "Commercial", "Other"].includes(data.propertyType)) {
    errors.push("Property type is required.");
  }
  if (!data.district || data.district.trim().length < 2) {
    errors.push("District/area is required.");
  }
  if (!data.surfaceType || data.surfaceType.trim().length < 2) {
    errors.push("Surface type is required.");
  }
  if (!data.approximateSize) {
    errors.push("Approximate size is required.");
  }
  if (!data.issue || data.issue.trim().length < 5) {
    errors.push("Issue description is required (at least 5 characters).");
  }
  if (!data.enquiryAcknowledged) {
    errors.push("Privacy acknowledgement is required.");
  }

  return { valid: errors.length === 0, errors };
}

function generateReference(): string {
  // Opaque, non-sequential reference token for the client.
  // Format: SMP-XXXXXXXX (8 random alphanumeric chars)
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "";
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)];
  }
  return `SMP-${ref}`;
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
    if (!idempotencyKey || idempotencyKey.length < 8) {
      return new Response(
        JSON.stringify({
          error: "Missing or invalid Idempotency-Key header.",
          code: "missing_idempotency_key",
          retryable: false,
        }),
        { status: 422, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const validation = validateInput(body as LeadInput);

    if (!validation.valid) {
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

    const data = body as LeadInput;
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
  } catch (err) {
    console.error("Unexpected error:", err.message);
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
