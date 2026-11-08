import { useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import type { LeadFormData, PropertyType } from "../lib/validation";
import { validateLeadForm } from "../lib/validation";
import { submitLead } from "../lib/leadApi";
import {
  trackFormStart,
  trackFormSubmit,
  trackFormError,
  trackGenerateLead,
} from "../lib/analytics";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; reference: string }
  | { status: "error"; message: string; retryable: boolean };

const FORM_ID = "quote-form";

export function QuoteForm() {
  const location = useLocation();
  const [formStarted, setFormStarted] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  // Pre-fill issue from query param (e.g. ?service=grinding)
  const params = new URLSearchParams(location.search);
  const presetService = params.get("service") ?? "";

  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    phone: "",
    email: "",
    propertyType: "" as PropertyType | "" as PropertyType,
    district: "",
    surfaceType: "",
    approximateSize: "",
    issue: presetService ? `Enquiry related to: ${presetService}. ` : "",
    preferredDate: "",
    notes: "",
    company: "",
    accessConstraints: "",
    enquiryAcknowledged: false,
    marketingConsent: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});

  const handleFirstInteraction = useCallback(() => {
    if (!formStarted) {
      setFormStarted(true);
      trackFormStart(FORM_ID);
    }
  }, [formStarted]);

  const updateField = <K extends keyof LeadFormData>(
    key: K,
    value: LeadFormData[K]
  ) => {
    handleFirstInteraction();
    setFormData((prev) => ({ ...prev, [key]: value }));
    // Clear field error on edit
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trackFormSubmit(FORM_ID);

    const validation = validateLeadForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      trackFormError(FORM_ID, "validation_failed");
      // Focus first error
      const firstError = Object.keys(validation.errors)[0];
      if (firstError) {
        const el = formRef.current?.querySelector(`[name="${firstError}"]`);
        if (el instanceof HTMLElement) el.focus();
      }
      return;
    }

    setSubmitState({ status: "submitting" });

    const result = await submitLead(formData);

    if (result.ok) {
      setSubmitState({
        status: "success",
        reference: result.data.reference,
      });
      trackGenerateLead(FORM_ID);
      formRef.current?.reset();
    } else {
      setSubmitState({
        status: "error",
        message: result.error.error,
        retryable: result.error.retryable,
      });
      trackFormError(FORM_ID, result.error.code);
    }
  };

  const handleRetry = () => {
    setSubmitState({ status: "idle" });
  };

  if (submitState.status === "success") {
    return (
      <div className="rounded-lg border border-sage-300 bg-sage-50 p-6" role="status" aria-live="polite">
        <div className="flex items-start gap-3">
          <svg className="h-6 w-6 flex-shrink-0 text-sage-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-serif text-lg font-semibold text-stone-900">
              Enquiry Received
            </h3>
            <p className="mt-2 text-sm text-stone-700">
              Thank you. Your enquiry has been recorded. Your reference is{" "}
              <strong className="font-mono">{submitState.reference}</strong>.
              Please keep this reference for your records.
            </p>
            <p className="mt-2 text-sm text-stone-600">
              We will coordinate your enquiry with an independent service
              partner where available. Response time depends on partner
              availability.
            </p>
            <button
              onClick={handleRetry}
              className="mt-4 text-sm font-medium text-sage-600 hover:text-sage-700 hover:underline"
            >
              Submit another enquiry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-describedby="form-intro"
      className="space-y-5"
    >
      {submitState.status === "error" && (
        <div
          role="alert"
          className="rounded-md border border-red-300 bg-red-50 p-4"
        >
          <p className="text-sm text-red-800">
            {submitState.message}
          </p>
          {submitState.retryable && (
            <p className="mt-1 text-xs text-red-700">
              You can try submitting again.
            </p>
          )}
        </div>
      )}

      {/* Name */}
      <Field
        label="Your Name"
        name="name"
        required
        error={errors.name}
      >
        <input
          type="text"
          name="name"
          id="name"
          required
          autoComplete="name"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
          onFocus={handleFirstInteraction}
          className={inputClass(errors.name)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
      </Field>

      {/* Phone */}
      <Field
        label="Phone Number"
        name="phone"
        required
        error={errors.phone}
        hint="e.g. +65 9123 4567 or international format"
      >
        <input
          type="tel"
          name="phone"
          id="phone"
          required
          autoComplete="tel"
          value={formData.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          onFocus={handleFirstInteraction}
          className={inputClass(errors.phone)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
        />
      </Field>

      {/* Email (optional) */}
      <Field
        label="Email"
        name="email"
        hint="Optional — if you prefer email communication"
        error={errors.email}
      >
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          onFocus={handleFirstInteraction}
          className={inputClass(errors.email)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : "email-hint"}
        />
      </Field>

      {/* Property type */}
      <Field
        label="Property Type"
        name="propertyType"
        required
        error={errors.propertyType}
      >
        <select
          name="propertyType"
          id="propertyType"
          required
          value={formData.propertyType}
          onChange={(e) => updateField("propertyType", e.target.value as PropertyType)}
          onFocus={handleFirstInteraction}
          className={inputClass(errors.propertyType)}
          aria-invalid={Boolean(errors.propertyType)}
          aria-describedby={errors.propertyType ? "propertyType-error" : undefined}
        >
          <option value="" disabled>Select property type</option>
          <option value="HDB">HDB</option>
          <option value="Condo">Condo / Apartment</option>
          <option value="Commercial">Commercial</option>
          <option value="Other">Other</option>
        </select>
      </Field>

      {/* District / area */}
      <Field
        label="Approximate District / Area"
        name="district"
        required
        hint="e.g. Bedok, Orchard, District 9. Do not enter your full address."
        error={errors.district}
      >
        <input
          type="text"
          name="district"
          id="district"
          required
          value={formData.district}
          onChange={(e) => updateField("district", e.target.value)}
          onFocus={handleFirstInteraction}
          className={inputClass(errors.district)}
          aria-invalid={Boolean(errors.district)}
          aria-describedby={errors.district ? "district-error" : "district-hint"}
        />
      </Field>

      {/* Surface type */}
      <Field
        label="Surface / Marble Type"
        name="surfaceType"
        required
        hint="e.g. living room floor, bathroom wall, lobby counter"
        error={errors.surfaceType}
      >
        <input
          type="text"
          name="surfaceType"
          id="surfaceType"
          required
          value={formData.surfaceType}
          onChange={(e) => updateField("surfaceType", e.target.value)}
          onFocus={handleFirstInteraction}
          className={inputClass(errors.surfaceType)}
          aria-invalid={Boolean(errors.surfaceType)}
          aria-describedby={errors.surfaceType ? "surfaceType-error" : "surfaceType-hint"}
        />
      </Field>

      {/* Approximate size */}
      <Field
        label="Approximate Size"
        name="approximateSize"
        required
        hint="e.g. 30 sqm, 100 sqft, or Unknown"
        error={errors.approximateSize}
      >
        <input
          type="text"
          name="approximateSize"
          id="approximateSize"
          required
          value={formData.approximateSize}
          onChange={(e) => updateField("approximateSize", e.target.value)}
          onFocus={handleFirstInteraction}
          className={inputClass(errors.approximateSize)}
          aria-invalid={Boolean(errors.approximateSize)}
          aria-describedby={errors.approximateSize ? "approximateSize-error" : "approximateSize-hint"}
        />
      </Field>

      {/* Issue */}
      <Field
        label="Issue / Problem"
        name="issue"
        required
        hint="Describe what you've noticed — scratches, dullness, stains, etching, uneven tiles, etc."
        error={errors.issue}
      >
        <textarea
          name="issue"
          id="issue"
          required
          rows={3}
          value={formData.issue}
          onChange={(e) => updateField("issue", e.target.value)}
          onFocus={handleFirstInteraction}
          className={inputClass(errors.issue)}
          aria-invalid={Boolean(errors.issue)}
          aria-describedby={errors.issue ? "issue-error" : "issue-hint"}
        />
      </Field>

      {/* Preferred date (optional) */}
      <Field
        label="Preferred Date"
        name="preferredDate"
        hint="Optional — when you'd ideally like the assessment"
      >
        <input
          type="date"
          name="preferredDate"
          id="preferredDate"
          value={formData.preferredDate}
          onChange={(e) => updateField("preferredDate", e.target.value)}
          onFocus={handleFirstInteraction}
          className={inputClass(undefined)}
        />
      </Field>

      {/* Conditional commercial fields */}
      {formData.propertyType === "Commercial" && (
        <>
          <Field
            label="Company / Business Name"
            name="company"
            hint="Optional"
          >
            <input
              type="text"
              name="company"
              id="company"
              value={formData.company}
              onChange={(e) => updateField("company", e.target.value)}
              onFocus={handleFirstInteraction}
              className={inputClass(undefined)}
            />
          </Field>
          <Field
            label="Access Constraints"
            name="accessConstraints"
            hint="e.g. after-hours only, service lift required"
          >
            <input
              type="text"
              name="accessConstraints"
              id="accessConstraints"
              value={formData.accessConstraints}
              onChange={(e) => updateField("accessConstraints", e.target.value)}
              onFocus={handleFirstInteraction}
              className={inputClass(undefined)}
            />
          </Field>
        </>
      )}

      {/* Notes (optional) */}
      <Field
        label="Additional Notes"
        name="notes"
        hint="Optional — anything else that may help with the assessment"
      >
        <textarea
          name="notes"
          id="notes"
          rows={2}
          value={formData.notes}
          onChange={(e) => updateField("notes", e.target.value)}
          onFocus={handleFirstInteraction}
          className={inputClass(undefined)}
        />
      </Field>

      {/* Acknowledgement */}
      <div className="space-y-3">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="enquiryAcknowledged"
            checked={formData.enquiryAcknowledged}
            onChange={(e) => updateField("enquiryAcknowledged", e.target.checked)}
            onFocus={handleFirstInteraction}
            className="mt-1 h-4 w-4 rounded border-stone-400 text-sage-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sage-600"
            aria-describedby={errors.enquiryAcknowledged ? "ack-error" : "ack-hint"}
          />
          <span className="text-sm text-stone-700" id="ack-hint">
            I understand that my enquiry details will be shared with independent
            service partners for the purpose of providing a quotation. I have
            read the <a href="/privacy-policy/" className="text-sage-600 hover:underline">Privacy Policy</a>.
          </span>
        </label>
        {errors.enquiryAcknowledged && (
          <p id="ack-error" className="text-sm text-red-700">{errors.enquiryAcknowledged}</p>
        )}

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="marketingConsent"
            checked={formData.marketingConsent}
            onChange={(e) => updateField("marketingConsent", e.target.checked)}
            onFocus={handleFirstInteraction}
            className="mt-1 h-4 w-4 rounded border-stone-400 text-sage-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sage-600"
          />
          <span className="text-sm text-stone-600">
            Optional: I'd like to receive occasional updates about marble care
            and related services. (Separate from your enquiry.)
          </span>
        </label>
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={submitState.status === "submitting"}
          className="w-full rounded-md bg-sage-600 px-6 py-3 text-base font-medium text-stone-50 hover:bg-sage-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-600"
        >
          {submitState.status === "submitting" ? "Submitting..." : "Submit Enquiry"}
        </button>
        <p className="mt-3 text-center text-xs text-stone-500">
          Your reference will appear on this page after successful submission.
          No separate confirmation page is used.
        </p>
      </div>
    </form>
  );
}

// ---- Field wrapper ----
function Field({
  label,
  name,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-stone-800">
        {label}
        {required && <span className="text-red-600" aria-hidden="true"> *</span>}
      </label>
      <div className="mt-1">{children}</div>
      {hint && !error && (
        <p id={`${name}-hint`} className="mt-1 text-xs text-stone-500">{hint}</p>
      )}
      {error && (
        <p id={`${name}-error`} className="mt-1 text-xs text-red-700" role="alert">{error}</p>
      )}
    </div>
  );
}

function inputClass(error?: string): string {
  const base =
    "block w-full rounded-md border bg-white px-3 py-2 text-sm text-stone-900 placeholder-stone-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sage-600";
  return error
    ? `${base} border-red-400`
    : `${base} border-stone-300`;
}
