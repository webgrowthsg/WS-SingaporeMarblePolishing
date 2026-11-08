import { describe, it, expect } from "vitest";
import { analyticsEnabled, trackPageView, clickWhatsApp } from "../src/lib/analytics";

describe("Analytics", () => {
  it("is inert when no GA4/GTM IDs are configured", () => {
    // In the test environment, no IDs are set, so analytics should be disabled
    expect(analyticsEnabled()).toBe(false);
  });

  it("trackPageView does not throw when analytics is disabled", () => {
    expect(() => trackPageView("/test/")).not.toThrow();
  });

  it("clickWhatsApp does not throw when analytics is disabled", () => {
    expect(() => clickWhatsApp("test-location")).not.toThrow();
  });
});
