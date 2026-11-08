import type { RouteMeta } from "../lib/routeRegistry";
import { SEOHead } from "./SEOHead";
import { SiteHeader } from "./SiteHeader";
import { Footer } from "./Footer";
import { Breadcrumbs } from "./Breadcrumbs";
import { MobileCTA } from "./MobileCTA";
import { ConsentControls } from "./ConsentControls";

interface PageLayoutProps {
  route: RouteMeta;
  children: React.ReactNode;
  showBreadcrumbs?: boolean;
}

export function PageLayout({
  route,
  children,
  showBreadcrumbs = true,
}: PageLayoutProps) {
  return (
    <>
      <SEOHead route={route} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-sage-600 focus:px-4 focus:py-2 focus:text-stone-50"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main
        id="main-content"
        className="min-h-screen pb-20 lg:pb-0"
      >
        {showBreadcrumbs && route.path !== "/" && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
            <Breadcrumbs route={route} />
          </div>
        )}
        {children}
      </main>
      <Footer />
      <MobileCTA />
      <ConsentControls />
    </>
  );
}
