/**
 * Consent management for analytics.
 * Uses localStorage to persist the user's consent choice.
 * Non-essential analytics tags only fire after consent is granted.
 */

const CONSENT_KEY = "smp_analytics_consent";

export type ConsentState = "granted" | "denied" | "unknown";

export function getConsent(): ConsentState {
  if (typeof localStorage === "undefined") return "unknown";
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === "granted" || stored === "denied") return stored;
  return "unknown";
}

export function setConsent(state: ConsentState): void {
  if (typeof localStorage === "undefined") return;
  if (state === "granted" || state === "denied") {
    localStorage.setItem(CONSENT_KEY, state);
  } else {
    localStorage.removeItem(CONSENT_KEY);
  }
}

export function consentKnown(): boolean {
  return getConsent() !== "unknown";
}
