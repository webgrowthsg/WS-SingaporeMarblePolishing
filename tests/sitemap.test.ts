import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

describe("Sitemap", () => {
  const sitemapPath = resolve(__dirname, "../public/sitemap.xml");
  const sitemap = readFileSync(sitemapPath, "utf-8");

  it("contains exactly 12 URLs", () => {
    const urlMatches = sitemap.match(/<loc>/g);
    expect(urlMatches).toHaveLength(12);
  });

  it("contains all expected paths", () => {
    const expectedPaths = [
      "/",
      "/marble-restoration/",
      "/marble-grinding/",
      "/marble-sealing/",
      "/hdb-marble-polishing/",
      "/condo-marble-polishing/",
      "/commercial-marble-polishing/",
      "/marble-polishing-cost-singapore/",
      "/about-us/",
      "/request-a-quote/",
      "/privacy-policy/",
      "/terms-and-conditions/",
    ];

    for (const path of expectedPaths) {
      expect(sitemap).toContain(
        `https://singaporemarblepolishing.com${path}`
      );
    }
  });

  it("does not contain deferred routes", () => {
    expect(sitemap).not.toContain("/contact-us/");
    expect(sitemap).not.toContain("/thank-you/");
    expect(sitemap).not.toContain("/faq/");
    expect(sitemap).not.toContain("/projects/");
    expect(sitemap).not.toContain("/blog/");
  });

  it("uses HTTPS", () => {
    expect(sitemap).toContain("https://");
    expect(sitemap).not.toContain("http://localhost");
  });
});

describe("robots.txt", () => {
  const robotsPath = resolve(__dirname, "../public/robots.txt");
  const robots = readFileSync(robotsPath, "utf-8");

  it("allows all user agents", () => {
    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Allow: /");
  });

  it("references the sitemap", () => {
    expect(robots).toContain("Sitemap: https://singaporemarblepolishing.com/sitemap.xml");
  });
});
