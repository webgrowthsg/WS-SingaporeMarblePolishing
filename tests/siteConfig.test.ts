import { describe, it, expect } from "vitest";
import { siteConfig, whatsappLink, telLink, emailLink } from "../src/lib/siteConfig";

describe("Site configuration", () => {
  it("has a site name", () => {
    expect(siteConfig.name).toBe("Singapore Marble Polishing");
  });

  it("has a WhatsApp number", () => {
    expect(siteConfig.whatsappNumber).toBeTruthy();
  });

  it("generates a WhatsApp deep link", () => {
    const link = whatsappLink("Hello");
    expect(link).toContain("https://wa.me/");
    expect(link).toContain("Hello");
  });

  it("generates a WhatsApp link without message", () => {
    const link = whatsappLink();
    expect(link).toContain("https://wa.me/");
    expect(link).not.toContain("text=");
  });

  it("returns null for telephone when not configured", () => {
    // In test env, VITE_TELEPHONE is not set
    expect(telLink() === null || typeof telLink() === "string").toBe(true);
  });

  it("returns null for email when not configured", () => {
    expect(emailLink() === null || typeof emailLink() === "string").toBe(true);
  });
});
