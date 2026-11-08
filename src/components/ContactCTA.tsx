import { whatsappLink } from "../lib/siteConfig";
import { clickWhatsApp } from "../lib/analytics";

interface ContactCTAProps {
  variant?: "primary" | "secondary";
  label?: string;
  ctaLocation?: string;
}

export function ContactCTA({
  variant = "primary",
  label = "Chat on WhatsApp",
  ctaLocation = "page-body",
}: ContactCTAProps) {
  const wa = whatsappLink("Hello, I'd like a quote for marble polishing.");

  if (variant === "secondary") {
    return (
      <div className="rounded-lg bg-sage-50 border border-sage-200 p-6 text-center">
        <p className="text-stone-700 font-medium">
          Ready to get your marble assessed?
        </p>
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => clickWhatsApp(ctaLocation)}
            className="inline-flex items-center rounded-md bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1da851] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1da851]"
          >
            {label}
          </a>
        </div>
      </div>
    );
  }

  return (
    <a
      href={wa}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => clickWhatsApp(ctaLocation)}
      className="inline-flex items-center rounded-md bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1da851] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1da851]"
    >
      {label}
    </a>
  );
}
