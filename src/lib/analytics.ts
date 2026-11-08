/**
 * Analytics event layer.
 *
 * When GA4/GTM IDs are NOT configured, all functions are inert no-ops.
 * When IDs ARE configured, events fire via dataLayer / gtag.
 *
 * CRITICAL: no PII is ever sent to analytics. Only non-PII params
 * from the allowlist are passed.
 */

import { siteConfig } from "./siteConfig";

const ALLOWED_PARAMS = new Set([
  "page_path",
  "form_id",
  "service_category",
  "cta_location",
  "error_type",
]);

type EventParams = Partial<{
  page_path: string;
  form_id: string;
  service_category: string;
  cta_location: string;
  error_type: string;
}>;

type EventName =
  | "quote_form_start"
  | "quote_form_submit"
  | "quote_form_error"
  | "generate_lead"
  | "click_whatsapp"
  | "click_call"
  | "click_email"
  | "page_view";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function analyticsEnabled(): boolean {
  return Boolean(siteConfig.ga4Id || siteConfig.gtmId);
}

function pushEvent(name: EventName, params?: EventParams): void {
  if (!analyticsEnabled()) return;

  const cleanParams: Record<string, string> = {};
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (ALLOWED_PARAMS.has(key) && typeof value === "string") {
        cleanParams[key] = value;
      }
    }
  }

  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({ event: name, ...cleanParams });
  }
}

export function trackPageView(path: string): void {
  pushEvent("page_view", { page_path: path });
}

export function trackFormStart(formId: string): void {
  pushEvent("quote_form_start", { form_id: formId });
}

export function trackFormSubmit(formId: string): void {
  pushEvent("quote_form_submit", { form_id: formId });
}

export function trackFormError(formId: string, errorType: string): void {
  pushEvent("quote_form_error", { form_id: formId, error_type: errorType });
}

export function trackGenerateLead(formId: string): void {
  pushEvent("generate_lead", { form_id: formId });
}

export function clickWhatsApp(ctaLocation: string): void {
  pushEvent("click_whatsapp", { cta_location: ctaLocation });
}

export function clickCall(ctaLocation: string): void {
  pushEvent("click_call", { cta_location: ctaLocation });
}

export function clickEmail(ctaLocation: string): void {
  pushEvent("click_email", { cta_location: ctaLocation });
}
