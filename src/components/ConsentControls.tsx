import { useState, useEffect } from "react";
import { getConsent, setConsent, consentKnown } from "../lib/consent";
import { analyticsEnabled } from "../lib/analytics";
import { siteConfig } from "../lib/siteConfig";

export function ConsentControls() {
  const [showBanner, setShowBanner] = useState(false);
  const [currentConsent, setCurrentConsent] = useState(getConsent());

  useEffect(() => {
    if (!consentKnown() && analyticsEnabled()) {
      setShowBanner(true);
    }
  }, []);

  const handleChoice = (choice: "granted" | "denied") => {
    setConsent(choice);
    setCurrentConsent(choice);
    setShowBanner(false);
  };

  if (!analyticsEnabled()) {
    // Analytics is not configured — no consent needed, nothing to show
    return null;
  }

  if (showBanner) {
    return (
      <div
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-stone-300 bg-stone-50 px-4 py-4 shadow-lg"
        role="dialog"
        aria-label="Analytics consent"
      >
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-stone-700">
            We use analytics to understand how visitors use this website. No
            personal information is collected. You can choose to allow or
            decline analytics.
          </p>
          <div className="mt-3 flex gap-3">
            <button
              onClick={() => handleChoice("granted")}
              className="rounded-md bg-sage-600 px-4 py-2 text-sm font-medium text-stone-50 hover:bg-sage-700"
            >
              Allow analytics
            </button>
            <button
              onClick={() => handleChoice("denied")}
              className="rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Inline consent controls for privacy policy or settings
  return (
    <div className="inline-flex items-center gap-3 text-sm">
      <span className="text-stone-600">
        Analytics: {currentConsent === "granted" ? "Allowed" : "Declined"}
      </span>
      {currentConsent === "granted" ? (
        <button
          onClick={() => handleChoice("denied")}
          className="text-sage-600 hover:underline"
        >
          Withdraw consent
        </button>
      ) : (
        <button
          onClick={() => handleChoice("granted")}
          className="text-sage-600 hover:underline"
        >
          Allow analytics
        </button>
      )}
    </div>
  );
}

export { siteConfig };
