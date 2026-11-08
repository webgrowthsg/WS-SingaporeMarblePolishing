import { PageLayout } from "../components/PageLayout";
import { Hero } from "../components/Hero";
import { Section } from "../components/Section";
import { QuoteForm } from "../components/QuoteForm";
import { TrustDisclosure } from "../components/TrustDisclosure";
import { ContextualLinks } from "../components/ContextualLinks";
import { getRoute } from "../lib/routeRegistry";
import { routeRegistry } from "../lib/routeRegistry";
import { siteConfig, whatsappLink, telLink, emailLink } from "../lib/siteConfig";
import { clickWhatsApp, clickCall, clickEmail } from "../lib/analytics";

const route = getRoute("/request-a-quote/")!;

export function QuotePage() {
  const tel = telLink();
  const email = emailLink();
  const wa = whatsappLink("Hello, I'd like a quote for marble polishing.");

  return (
    <PageLayout route={route}>
      <Hero
        title={route.h1}
        subtitle="Tell us about your marble surface and the issue you're experiencing. We'll coordinate your enquiry with an independent service partner where available."
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <TrustDisclosure variant="full" />

        {/* Form section */}
        <Section heading="Tell Us About Your Marble Surface">
          <p className="mb-6 text-sm text-stone-600" id="form-intro">
            Fields marked with <span className="text-red-600">*</span> are required.
            Please do not include your full address — an approximate district or
            area is sufficient for initial coordination.
          </p>
          <div className="rounded-lg border border-stone-200 bg-white p-6 sm:p-8">
            <QuoteForm />
          </div>
        </Section>

        {/* What happens next */}
        <Section heading="What Happens After You Enquire">
          <ol className="space-y-3 list-decimal list-inside">
            <li>We review your enquiry for completeness and forward it to an independent service partner where one is available.</li>
            <li>The service partner contacts you directly — typically by phone or WhatsApp — to discuss your needs.</li>
            <li>If needed, a site visit is arranged to assess the marble surface in person.</li>
            <li>You receive a written quotation from the service partner with scope, price and terms.</li>
            <li>You decide whether to proceed. There is no obligation to accept any quotation.</li>
          </ol>
          <p className="mt-4">
            Response times depend on partner availability and the information
            you provide. We cannot guarantee a specific timeframe.
          </p>
        </Section>

        {/* Contact options */}
        <Section heading="Contact Options">
          <p className="mb-4">
            Prefer to reach out directly? The following contact channels are
            available:
          </p>
          <div className="space-y-3">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => clickWhatsApp("quote-contact")}
              className="flex items-center gap-3 rounded-lg border border-stone-200 bg-white p-4 hover:border-sage-300 hover:shadow-sm transition-all"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#25D366] text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </span>
              <div>
                <p className="font-medium text-stone-900">WhatsApp</p>
                <p className="text-sm text-stone-600">{siteConfig.whatsappNumber}</p>
              </div>
            </a>

            {tel && (
              <a
                href={tel}
                onClick={() => clickCall("quote-contact")}
                className="flex items-center gap-3 rounded-lg border border-stone-200 bg-white p-4 hover:border-sage-300 hover:shadow-sm transition-all"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-sage-600 text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <div>
                  <p className="font-medium text-stone-900">Phone</p>
                  <p className="text-sm text-stone-600">{siteConfig.telephone}</p>
                </div>
              </a>
            )}

            {email && (
              <a
                href={email}
                onClick={() => clickEmail("quote-contact")}
                className="flex items-center gap-3 rounded-lg border border-stone-200 bg-white p-4 hover:border-sage-300 hover:shadow-sm transition-all"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-stone-600 text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <div>
                  <p className="font-medium text-stone-900">Email</p>
                  <p className="text-sm text-stone-600">{siteConfig.email}</p>
                </div>
              </a>
            )}

            {!tel && !email && (
              <p className="text-sm text-stone-500 italic">
                Additional contact channels will be listed here once verified
                and configured.
              </p>
            )}
          </div>
        </Section>

        {/* Privacy notice */}
        <Section heading="How Your Information Is Used">
          <p>
            When you submit an enquiry, the information you provide is shared
            with independent service partners for the purpose of assessing your
            marble surface and providing a quotation. We do not sell your
            information to third parties.
          </p>
          <p className="mt-3">
            If you opt in to marketing consent (separate from your enquiry),
            you may receive occasional updates about marble care. You can
            withdraw this consent at any time. Marketing consent is not
            required to submit an enquiry.
          </p>
          <p className="mt-3">
            For full details, please read our{" "}
            <a href="/privacy-policy/" className="text-sage-600 hover:underline">Privacy Policy</a>{" "}
            and{" "}
            <a href="/terms-and-conditions/" className="text-sage-600 hover:underline">Terms and Conditions</a>.
          </p>
        </Section>

        <ContextualLinks links={route.contextualLinks} routeRegistry={routeRegistry} />
      </div>
    </PageLayout>
  );
}
