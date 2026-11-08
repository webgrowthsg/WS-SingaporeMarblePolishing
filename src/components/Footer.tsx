import { Link } from "react-router-dom";
import { routeRegistry } from "../lib/routeRegistry";
import { siteConfig, whatsappLink, telLink, emailLink } from "../lib/siteConfig";
import { clickWhatsApp, clickCall, clickEmail } from "../lib/analytics";

export function Footer() {
  const services = routeRegistry.filter((r) => r.footerGroup === "services");
  const pricing = routeRegistry.filter((r) => r.footerGroup === "pricing");
  const about = routeRegistry.filter((r) => r.footerGroup === "about");
  const legal = routeRegistry.filter((r) => r.footerGroup === "legal");
  const conversion = routeRegistry.filter((r) => r.footerGroup === "conversion");

  const tel = telLink();
  const email = emailLink();
  const wa = whatsappLink("Hello, I'd like a quote for marble polishing.");

  return (
    <footer className="mt-16 border-t border-stone-200 bg-stone-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand + contact */}
          <div>
            <p className="font-serif text-lg font-bold text-stone-800">
              Singapore Marble Polishing
            </p>
            <p className="mt-2 text-sm text-stone-600">
              Enquiry coordination for marble polishing and restoration services in Singapore.
            </p>
            <div className="mt-4 space-y-2">
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => clickWhatsApp("footer")}
                className="flex items-center gap-2 text-sm text-sage-600 hover:text-sage-700 hover:underline"
              >
                WhatsApp: {siteConfig.whatsappNumber}
              </a>
              {tel && (
                <a
                  href={tel}
                  onClick={() => clickCall("footer")}
                  className="flex items-center gap-2 text-sm text-sage-600 hover:text-sage-700 hover:underline"
                >
                  Call: {siteConfig.telephone}
                </a>
              )}
              {email && (
                <a
                  href={email}
                  onClick={() => clickEmail("footer")}
                  className="flex items-center gap-2 text-sm text-sage-600 hover:text-sage-700 hover:underline"
                >
                  {siteConfig.email}
                </a>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-sm font-semibold text-stone-800">Services</h2>
            <ul className="mt-3 space-y-2">
              {services.map((r) => (
                <li key={r.path}>
                  <Link to={r.path} className="text-sm text-stone-600 hover:text-sage-600 hover:underline">
                    {r.navLabel === "HDB" ? "HDB Marble Polishing" : r.navLabel === "Condo" ? "Condo Marble Polishing" : r.navLabel === "Commercial" ? "Commercial Marble Polishing" : r.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing + About + Quote */}
          <div>
            <h2 className="text-sm font-semibold text-stone-800">Guides & About</h2>
            <ul className="mt-3 space-y-2">
              {pricing.map((r) => (
                <li key={r.path}>
                  <Link to={r.path} className="text-sm text-stone-600 hover:text-sage-600 hover:underline">
                    {r.navLabel}
                  </Link>
                </li>
              ))}
              {about.map((r) => (
                <li key={r.path}>
                  <Link to={r.path} className="text-sm text-stone-600 hover:text-sage-600 hover:underline">
                    {r.navLabel}
                  </Link>
                </li>
              ))}
              {conversion.map((r) => (
                <li key={r.path}>
                  <Link to={r.path} className="text-sm text-sage-600 font-medium hover:underline">
                    {r.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="text-sm font-semibold text-stone-800">Legal</h2>
            <ul className="mt-3 space-y-2">
              {legal.map((r) => (
                <li key={r.path}>
                  <Link to={r.path} className="text-sm text-stone-600 hover:text-sage-600 hover:underline">
                    {r.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-stone-300 pt-6">
          <p className="text-xs text-stone-500">
            &copy; {new Date().getFullYear()} SingaporeMarblePolishing.com. This website coordinates enquiries with independent service partners. It does not claim to be a registered contractor. All quotations are provided directly by service partners.
          </p>
        </div>
      </div>
    </footer>
  );
}
