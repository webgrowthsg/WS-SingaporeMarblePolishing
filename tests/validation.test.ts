import { describe, it, expect } from "vitest";
import {
  validateLeadForm,
  isValidPhone,
  isValidEmail,
  generateIdempotencyKey,
  type LeadFormData,
} from "../src/lib/validation";

const validData: LeadFormData = {
  name: "Jane Tan",
  phone: "+65 9123 4567",
  email: "jane@example.com",
  propertyType: "HDB",
  district: "Bedok",
  surfaceType: "living room floor",
  approximateSize: "30 sqm",
  issue: "Floor has lost its shine and has some scratches.",
  enquiryAcknowledged: true,
  marketingConsent: false,
};

describe("Phone validation", () => {
  it("accepts +65 format", () => {
    expect(isValidPhone("+65 9123 4567")).toBe(true);
  });

  it("accepts international format", () => {
    expect(isValidPhone("+1 555 123 4567")).toBe(true);
  });

  it("accepts local format without +", () => {
    expect(isValidPhone("91234567")).toBe(true);
  });

  it("rejects too short", () => {
    expect(isValidPhone("123")).toBe(false);
  });

  it("rejects too long", () => {
    expect(isValidPhone("+65 9123 4567 8901 2345 6789")).toBe(false);
  });

  it("rejects letters", () => {
    expect(isValidPhone("+65 abc defg")).toBe(false);
  });
});

describe("Email validation", () => {
  it("accepts valid email", () => {
    expect(isValidEmail("jane@example.com")).toBe(true);
  });

  it("rejects missing @", () => {
    expect(isValidEmail("janeexample.com")).toBe(false);
  });

  it("rejects missing domain", () => {
    expect(isValidEmail("jane@")).toBe(false);
  });
});

describe("Lead form validation", () => {
  it("passes with all valid fields", () => {
    const result = validateLeadForm(validData);
    expect(result.valid).toBe(true);
    expect(Object.keys(result.errors).length).toBe(0);
  });

  it("fails with missing name", () => {
    const result = validateLeadForm({ ...validData, name: "" });
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  it("fails with invalid phone", () => {
    const result = validateLeadForm({ ...validData, phone: "123" });
    expect(result.valid).toBe(false);
    expect(result.errors.phone).toBeDefined();
  });

  it("fails with invalid email when provided", () => {
    const result = validateLeadForm({ ...validData, email: "not-an-email" });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBeDefined();
  });

  it("passes with no email (optional field)", () => {
    const result = validateLeadForm({ ...validData, email: "" });
    expect(result.valid).toBe(true);
  });

  it("fails with missing property type", () => {
    const result = validateLeadForm({ ...validData, propertyType: "" as never });
    expect(result.valid).toBe(false);
    expect(result.errors.propertyType).toBeDefined();
  });

  it("fails with missing district", () => {
    const result = validateLeadForm({ ...validData, district: "" });
    expect(result.valid).toBe(false);
    expect(result.errors.district).toBeDefined();
  });

  it("fails with missing issue", () => {
    const result = validateLeadForm({ ...validData, issue: "hi" });
    expect(result.valid).toBe(false);
    expect(result.errors.issue).toBeDefined();
  });

  it("fails without enquiry acknowledgement", () => {
    const result = validateLeadForm({ ...validData, enquiryAcknowledged: false });
    expect(result.valid).toBe(false);
    expect(result.errors.enquiryAcknowledged).toBeDefined();
  });

  it("passes with marketing consent unchecked (optional)", () => {
    const result = validateLeadForm({ ...validData, marketingConsent: false });
    expect(result.valid).toBe(true);
  });
});

describe("Idempotency key generation", () => {
  it("generates a non-empty string", () => {
    const key = generateIdempotencyKey();
    expect(key).toBeTruthy();
    expect(key.length).toBeGreaterThan(8);
  });

  it("generates unique keys", () => {
    const keys = new Set();
    for (let i = 0; i < 100; i++) {
      keys.add(generateIdempotencyKey());
    }
    expect(keys.size).toBe(100);
  });
});
