/**
 * Lead form types and validation.
 * Shared between the client form and the server edge function.
 */

export type PropertyType = "HDB" | "Condo" | "Commercial" | "Other";

export interface LeadFormData {
  name: string;
  phone: string;
  email?: string;
  propertyType: PropertyType;
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

export interface LeadSubmitResponse {
  status: "received";
  reference: string;
}

export interface LeadSubmitError {
  error: string;
  code: string;
  retryable: boolean;
}

/**
 * Accepts +65 and international formats.
 * Validates: optional leading +, then 7-15 digits, allowing spaces/dashes.
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s-]/g, "");
  return /^\+?\d{7,15}$/.test(cleaned);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export type ValidationResult = {
  valid: boolean;
  errors: Partial<Record<keyof LeadFormData, string>>;
};

export function validateLeadForm(data: LeadFormData): ValidationResult {
  const errors: Partial<Record<keyof LeadFormData, string>> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  if (!data.phone || !isValidPhone(data.phone)) {
    errors.phone =
      "Please enter a valid phone number (e.g. +65 9123 4567 or international format).";
  }

  if (data.email && !isValidEmail(data.email)) {
    errors.email = "Please enter a valid email address or leave it blank.";
  }

  if (!data.propertyType) {
    errors.propertyType = "Please select a property type.";
  }

  if (!data.district || data.district.trim().length < 2) {
    errors.district = "Please enter an approximate district or area.";
  }

  if (!data.surfaceType || data.surfaceType.trim().length < 2) {
    errors.surfaceType = "Please describe your surface type.";
  }

  if (!data.approximateSize) {
    errors.approximateSize = "Please enter an approximate size or select Unknown.";
  }

  if (!data.issue || data.issue.trim().length < 5) {
    errors.issue = "Please describe the issue (at least a few words).";
  }

  if (!data.enquiryAcknowledged) {
    errors.enquiryAcknowledged =
      "Please acknowledge the enquiry privacy notice to proceed.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

/**
 * Creates an opaque, non-sequential reference token for the client.
 * Not a database ID — just a user-facing acknowledgement code.
 */
export function generateIdempotencyKey(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
