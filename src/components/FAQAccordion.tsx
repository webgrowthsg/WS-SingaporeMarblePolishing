import { useState } from "react";
import type { FAQItem } from "../lib/faqContent";

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-stone-200 rounded-lg border border-stone-200 bg-white">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const buttonId = `faq-button-${idx}`;
        const panelId = `faq-panel-${idx}`;

        return (
          <div key={idx}>
            <h3 className="m-0">
              <button
                id={buttonId}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full items-center justify-between px-5 py-4 text-left text-stone-800 font-medium hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sage-600"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="pr-4 text-base">{item.question}</span>
                <svg
                  className={`h-5 w-5 flex-shrink-0 text-sage-600 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-4 text-stone-600 leading-relaxed"
            >
              <p className="text-sm">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
