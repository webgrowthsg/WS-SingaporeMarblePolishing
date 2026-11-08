import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { routeRegistry } from "../lib/routeRegistry";
import { whatsappLink } from "../lib/siteConfig";
import { clickWhatsApp } from "../lib/analytics";

const serviceRoutes = [
  { path: "/marble-restoration/", label: "Restoration" },
  { path: "/marble-grinding/", label: "Grinding" },
  { path: "/marble-sealing/", label: "Sealing" },
  { path: "/hdb-marble-polishing/", label: "HDB" },
  { path: "/condo-marble-polishing/", label: "Condo" },
  { path: "/commercial-marble-polishing/", label: "Commercial" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  const waLink = whatsappLink(
    "Hello, I'd like to request a quote for marble polishing."
  );

  const handleWhatsAppClick = () => clickWhatsApp("header");

  return (
    <header className="sticky top-0 z-50 bg-stone-50/95 backdrop-blur border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-serif text-lg font-bold text-stone-800">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-sage-600 text-stone-50">
              M
            </span>
            <span className="hidden sm:inline">Singapore Marble Polishing</span>
            <span className="sm:hidden">SMP</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            <NavItem to="/">Home</NavItem>

            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className="rounded-md px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 hover:text-sage-700"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Services
              </button>
              {servicesOpen && (
                <div className="absolute left-0 top-full w-56 bg-white border border-stone-200 rounded-md shadow-lg py-1">
                  {serviceRoutes.map((r) => (
                    <Link
                      key={r.path}
                      to={r.path}
                      className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 hover:text-sage-700"
                    >
                      {r.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavItem to="/marble-polishing-cost-singapore/">Pricing</NavItem>
            <NavItem to="/about-us/">About</NavItem>
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="hidden sm:inline-flex items-center rounded-md bg-[#25D366] px-3 py-2 text-sm font-medium text-white hover:bg-[#1da851] transition-colors"
              aria-label="Chat on WhatsApp for a quote"
            >
              WhatsApp Quote
            </a>
            <Link
              to="/request-a-quote/"
              className="hidden md:inline-flex items-center rounded-md bg-sage-600 px-4 py-2 text-sm font-medium text-stone-50 hover:bg-sage-700 transition-colors"
            >
              Request a Quote
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-stone-700 hover:bg-stone-100"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
              aria-controls="mobile-nav"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div id="mobile-nav" className="lg:hidden border-t border-stone-200 bg-stone-50">
          <nav className="mx-auto max-w-7xl px-4 py-3 space-y-1" aria-label="Mobile navigation">
            <MobileNavItem to="/">Home</MobileNavItem>
            <div className="py-1">
              <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wide text-stone-500">Services</p>
              {serviceRoutes.map((r) => (
                <MobileNavItem key={r.path} to={r.path}>{r.label}</MobileNavItem>
              ))}
            </div>
            <MobileNavItem to="/marble-polishing-cost-singapore/">Pricing</MobileNavItem>
            <MobileNavItem to="/about-us/">About</MobileNavItem>
            <MobileNavItem to="/request-a-quote/">Request a Quote</MobileNavItem>
            <div className="pt-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="flex items-center justify-center rounded-md bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white"
              >
                WhatsApp for a Quote
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          isActive
            ? "text-sage-700 bg-sage-50"
            : "text-stone-700 hover:bg-stone-100 hover:text-sage-700"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

function MobileNavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="block rounded-md px-3 py-2 text-base font-medium text-stone-800 hover:bg-stone-100 hover:text-sage-700"
    >
      {children}
    </Link>
  );
}

// Also export the route list for potential reuse
export { routeRegistry };
