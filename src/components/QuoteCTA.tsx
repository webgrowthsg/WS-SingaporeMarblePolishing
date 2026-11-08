import { Link } from "react-router-dom";
import { whatsappLink } from "../lib/siteConfig";
import { clickWhatsApp } from "../lib/analytics";

interface QuoteCTAProps {
  variant?: "primary" | "secondary";
  label?: string;
  ctaLocation?: string;
  showWhatsApp?: boolean;
}

export function QuoteCTA({
  variant = "primary",
  label = "Request a Quote",
  ctaLocation = "page-body",
  showWhatsApp = true,
}: QuoteCTAProps) {
  const wa = whatsappLink("Hello, I'd like a quote for marble polishing.");

  if (variant === "secondary") {
    return (
      <div className="rounded-lg bg-sage-50 border border-sage-200 p-6 text-center">
        <p className="text-stone-700 font-medium">
          Ready to get your marble assessed?
        </p>
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/request-a-quote/"
            className="inline-flex items-center rounded-md bg-sage-600 px-5 py-2.5 text-sm font-medium text-stone-50 hover:bg-sage-700 transition-colors"
          >
            {label}
          </Link>
          {showWhatsApp && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => clickWhatsApp(ctaLocation)}
              className="inline-flex items-center rounded-md bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1da851] transition-colors"
            >
              WhatsApp for a Quote
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <Link
      to="/request-a-quote/"
      className="inline-flex items-center rounded-md bg-sage-600 px-5 py-2.5 text-sm font-medium text-stone-50 hover:bg-sage-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-600"
    >
      {label}
    </Link>
  );
}
