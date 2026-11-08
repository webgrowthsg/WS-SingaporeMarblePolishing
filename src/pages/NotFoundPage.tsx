import { SEOHead } from "../components/SEOHead";
import { SiteHeader } from "../components/SiteHeader";
import { Footer } from "../components/Footer";
import { NotFound } from "../components/NotFound";
import { MobileCTA } from "../components/MobileCTA";

export function NotFoundPage() {
  return (
    <>
      <SEOHead
        route={{
          path: "/404",
          id: "not-found",
          title: "Page Not Found | Singapore Marble Polishing",
          description: "The page you were looking for could not be found.",
          h1: "Page Not Found",
          h2: [],
          primaryKeyword: "",
          supportingKeywords: [],
          breadcrumbs: [{ label: "Home", path: "/" }],
          contextualLinks: [],
          publishStatus: "blocked",
          navLabel: "404",
          footerGroup: "about",
        }}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-sage-600 focus:px-4 focus:py-2 focus:text-stone-50"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" className="min-h-screen pb-20 lg:pb-0">
        <NotFound />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
