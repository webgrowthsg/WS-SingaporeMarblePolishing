import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { RouteMeta } from "../lib/routeRegistry";
import { siteOrigin } from "../lib/routeRegistry";
import { siteConfig } from "../lib/siteConfig";
import { trackPageView } from "../lib/analytics";

interface SEOHeadProps {
  route: RouteMeta;
}

/**
 * Manages document <head> for SEO: title, meta description, canonical,
 * Open Graph, Twitter cards, and JSON-LD structured data.
 * In a Vite SPA this runs client-side. For production SEO, a prerender
 * step (see docs) must bake these into static HTML.
 */
export function SEOHead({ route }: SEOHeadProps) {
  const location = useLocation();

  useEffect(() => {
    const canonical = `${siteOrigin}${route.path}`;
    const ogImage = undefined; // only set when rights-cleared image is available

    setDocumentHead({
      title: route.title,
      description: route.description,
      canonical,
      ogTitle: route.title,
      ogDescription: route.description,
      ogUrl: canonical,
      ogImage,
    });

    injectJsonLd(route, canonical);

    trackPageView(route.path);
  }, [route]);

  // also track on route changes handled by location
  useEffect(() => {
    // no-op: location tracking handled by route prop
  }, [location.pathname]);

  return null;
}

function setDocumentHead(opts: {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogImage?: string;
}): void {
  document.title = opts.title;

  setMeta("description", opts.description);
  setLink("canonical", opts.canonical);

  setMetaProperty("og:title", opts.ogTitle);
  setMetaProperty("og:description", opts.ogDescription);
  setMetaProperty("og:url", opts.ogUrl);
  setMetaProperty("og:type", "website");
  if (opts.ogImage) setMetaProperty("og:image", opts.ogImage);

  setMeta("twitter:card", "summary");
  setMeta("twitter:title", opts.ogTitle);
  setMeta("twitter:description", opts.ogDescription);
  if (opts.ogImage) setMeta("twitter:image", opts.ogImage);
}

function setMeta(name: string, content: string): void {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaProperty(property: string, content: string): void {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string): void {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function injectJsonLd(route: RouteMeta, canonical: string): void {
  // Remove previous JSON-LD blocks
  document.querySelectorAll('script[type="application/ld+json"]').forEach((el) => {
    el.remove();
  });

  const blocks: Record<string, unknown>[] = [];

  // WebSite schema on homepage only
  if (route.path === "/") {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteOrigin,
    });
  }

  // BreadcrumbList for all pages except home
  if (route.breadcrumbs.length > 1) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: route.breadcrumbs.map((crumb, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: crumb.label,
        item: `${siteOrigin}${crumb.path}`,
      })),
    });
  }

  // Service schema on service pages — truthful, no fake provider details
  const servicePageIds = ["restoration", "grinding", "sealing", "hdb", "condo", "commercial"];
  if (servicePageIds.includes(route.id)) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: route.h1,
      description: route.description,
      url: canonical,
      serviceType: "Marble polishing and restoration enquiry coordination",
      areaServed: { "@type": "Country", name: "Singapore" },
    });
  }

  for (const block of blocks) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(block);
    document.head.appendChild(script);
  }
}
