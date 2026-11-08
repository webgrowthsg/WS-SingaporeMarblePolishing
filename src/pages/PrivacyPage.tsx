import { PageLayout } from "../components/PageLayout";
import { Hero } from "../components/Hero";
import { Section } from "../components/Section";
import { ContextualLinks } from "../components/ContextualLinks";
import { ConsentControls } from "../components/ConsentControls";
import { getRoute } from "../lib/routeRegistry";
import { routeRegistry } from "../lib/routeRegistry";

const route = getRoute("/privacy-policy/")!;

export function PrivacyPage() {
  return (
    <PageLayout route={route}>
      <Hero
        title={route.h1}
        subtitle="How enquiry information is collected, used and shared when you use this website."
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          <p>
            <strong>Draft notice:</strong> This privacy policy is a template
            provided for review. It must be reviewed and approved by the
            website operator and legal counsel familiar with Singapore's PDPA
            before public production launch. Do not treat this as legal advice
            or an approved policy.
          </p>
        </div>

        <Section heading="Who Handles Your Information">
          <p>
            This website is operated by SingaporeMarblePolishing.com
            (referred to as "we", "us", or "this website"). We are an enquiry
            coordination service. When you submit an enquiry, we act as an
            intermediary and share your information with independent service
            partners who may contact you to provide a quotation.
          </p>
          <p className="mt-3">
            The specific legal entity that operates this website must be
            confirmed before launch. Once verified, the registered business
            name and contact details will be stated here.
          </p>
        </Section>

        <Section heading="What We Collect">
          <p>
            When you submit an enquiry through our quote form, we collect:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside">
            <li>Your name</li>
            <li>Your phone number</li>
            <li>Your email address (if provided)</li>
            <li>Property type, approximate district/area, surface type, approximate size</li>
            <li>Description of the issue or problem with your marble</li>
            <li>Preferred date and additional notes (if provided)</li>
            <li>For commercial enquiries: company name and access constraints (if provided)</li>
          </ul>
          <p className="mt-3">
            We do not currently use cookies for essential functionality beyond
            storing your analytics consent preference. If analytics is enabled,
            non-personal usage data may be collected subject to your consent.
          </p>
        </Section>

        <Section heading="Why We Use and Share It">
          <p>
            We use your enquiry information to:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside">
            <li>Review and forward your enquiry to an independent service partner</li>
            <li>Allow the service partner to contact you regarding an assessment and quotation</li>
            <li>Respond to any questions you send us directly</li>
          </ul>
          <p className="mt-3">
            We share your enquiry details with service partners for the sole
            purpose of facilitating your marble polishing enquiry. We do not
            sell your information or share it for unrelated marketing purposes
            unless you have separately opted in to marketing communications.
          </p>
          <p className="mt-3">
            If you opt in to marketing consent, you may receive occasional
            updates about marble care. This consent is separate from your
            enquiry and is not required to submit one. You can withdraw
            marketing consent at any time.
          </p>
        </Section>

        <Section heading="Retention and Security">
          <p>
            Enquiry information is stored in a secure database with
            encryption. Access is restricted to authorised personnel and
            service partners involved in handling your enquiry.
          </p>
          <p className="mt-3">
            The specific retention period for enquiry data must be confirmed
            as part of the PDPA review before launch. We will not publish a
            retention period until it has been approved.
          </p>
          <p className="mt-3">
            We take reasonable steps to protect your information, but no method
            of transmission or storage is completely secure. If you have
            concerns about how your information is handled, please contact us
            before submitting an enquiry.
          </p>
        </Section>

        <Section heading="Your Requests and Contact">
          <p>
            Under Singapore's Personal Data Protection Act (PDPA), you may
            have rights regarding your personal data, including the right to
            request access, correction, or withdrawal of consent.
          </p>
          <p className="mt-3">
            To exercise these rights or ask questions about how we handle your
            information, please contact us through the enquiry form or via
            WhatsApp.
          </p>
          <p className="mt-3">
            <strong>Analytics consent:</strong> If analytics is enabled on this
            website, you can control your consent below.
          </p>
          <div className="mt-4 rounded-lg border border-stone-200 bg-stone-50 p-4">
            <ConsentControls />
          </div>
        </Section>

        <Section heading="Updates to This Policy">
          <p>
            We may update this privacy policy from time to time. Changes will
            be posted on this page with an updated date. We encourage you to
            review this page periodically.
          </p>
          <p className="mt-3 text-sm text-stone-500">
            Last updated: {new Date().getFullYear()} — Draft, pending legal review.
          </p>
        </Section>

        <ContextualLinks links={route.contextualLinks} routeRegistry={routeRegistry} />
      </div>
    </PageLayout>
  );
}
