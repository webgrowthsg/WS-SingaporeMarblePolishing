/**
 * Sticky mobile CTA bar that appears at the bottom on small screens.
 * Contains a WhatsApp button for direct enquiries.
 * Does not obscure content thanks to padding-bottom on the main layout.
 */
import { whatsappLink } from "../lib/siteConfig";
import { clickWhatsApp } from "../lib/analytics";

export function MobileCTA() {
  const wa = whatsappLink("Hello, I'd like to enquire about marble polishing.");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-stone-200 bg-stone-50/95 backdrop-blur lg:hidden">
      <div className="flex items-center gap-2 px-3 py-2">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => clickWhatsApp("mobile-cta-bar")}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-[#25D366] px-3 py-2.5 text-sm font-medium text-white"
          aria-label="WhatsApp for an enquiry"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
