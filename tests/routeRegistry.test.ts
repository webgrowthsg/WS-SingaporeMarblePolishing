import { describe, it, expect } from "vitest";
import { routeRegistry, getRoute, getPublishedRoutes } from "../src/lib/routeRegistry";

describe("Route Registry", () => {
  it("contains exactly 12 routes", () => {
    expect(routeRegistry).toHaveLength(12);
  });

  it("has no duplicate paths", () => {
    const paths = routeRegistry.map((r) => r.path);
    const unique = new Set(paths);
    expect(unique.size).toBe(paths.length);
  });

  it("has no duplicate IDs", () => {
    const ids = routeRegistry.map((r) => r.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it("has no duplicate titles", () => {
    const titles = routeRegistry.map((r) => r.title);
    const unique = new Set(titles);
    expect(unique.size).toBe(titles.length);
  });

  it("has no duplicate descriptions", () => {
    const descs = routeRegistry.map((r) => r.description);
    const unique = new Set(descs);
    expect(unique.size).toBe(descs.length);
  });

  it("has no duplicate H1s", () => {
    const h1s = routeRegistry.map((r) => r.h1);
    const unique = new Set(h1s);
    expect(unique.size).toBe(h1s.length);
  });

  it("all paths use lowercase with trailing slashes (except root)", () => {
    for (const route of routeRegistry) {
      if (route.path === "/") continue;
      expect(route.path).toMatch(/^\/[a-z0-9-]+\/$/);
      expect(route.path).toBe(route.path.toLowerCase());
    }
  });

  it("all routes have non-empty H2 arrays", () => {
    for (const route of routeRegistry) {
      expect(route.h2.length).toBeGreaterThan(0);
    }
  });

  it("all routes have at least one contextual link", () => {
    for (const route of routeRegistry) {
      expect(route.contextualLinks.length).toBeGreaterThan(0);
    }
  });

  it("all routes have breadcrumbs", () => {
    for (const route of routeRegistry) {
      expect(route.breadcrumbs.length).toBeGreaterThan(0);
    }
  });

  it("all contextual links point to routes that exist in the registry", () => {
    const allPaths = new Set(routeRegistry.map((r) => r.path));
    for (const route of routeRegistry) {
      for (const link of route.contextualLinks) {
        expect(allPaths.has(link)).toBe(true);
      }
    }
  });

  it("every page links to the quote page where sensible", () => {
    const quotePath = "/request-a-quote/";
    // All service and guide pages should link to quote
    const shouldLink = routeRegistry.filter(
      (r) => r.id !== "quote" && r.id !== "privacy" && r.id !== "terms"
    );
    for (const route of shouldLink) {
      expect(route.contextualLinks).toContain(quotePath);
    }
  });

  it("all routes have a publishStatus", () => {
    for (const route of routeRegistry) {
      expect(route.publishStatus).toMatch(/^(published|blocked)$/);
    }
  });

  it("getRoute returns the correct route for each path", () => {
    for (const route of routeRegistry) {
      const found = getRoute(route.path);
      expect(found).toBeDefined();
      expect(found?.id).toBe(route.id);
    }
  });

  it("getRoute returns undefined for unknown paths", () => {
    expect(getRoute("/nonexistent/")).toBeUndefined();
  });

  it("getPublishedRoutes returns only published routes", () => {
    const published = getPublishedRoutes();
    for (const route of published) {
      expect(route.publishStatus).toBe("published");
    }
  });

  it("no route has a title longer than 70 characters", () => {
    for (const route of routeRegistry) {
      expect(route.title.length).toBeLessThanOrEqual(70);
    }
  });

  it("no route has a description longer than 165 characters", () => {
    for (const route of routeRegistry) {
      expect(route.description.length).toBeLessThanOrEqual(165);
    }
  });
});
