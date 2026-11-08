import { PageLayout } from "../components/PageLayout";
import { Hero } from "../components/Hero";
import { Section } from "../components/Section";
import { ContextualLinks } from "../components/ContextualLinks";
import { getRoute } from "../lib/routeRegistry";
import { routeRegistry } from "../lib/routeRegistry";

const route = getRoute("/terms-and-conditions/")!;

export function TermsPage() {
  return (
    <PageLayout route={route}>
      <Hero
        title={route.h1}
        subtitle="The terms under which this enquiry coordination website operates."
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          <p>
            <strong>Draft notice:</strong> These terms and conditions are a
            template provided for review. They must be reviewed and approved
            by the website operator and legal counsel before public production
            launch. Do not treat this as legal advice or approved terms.
          </p>
        </div>

        <Section heading="Website and Enquiry Service">
          <p>
            SingaporeMarblePolishing.com is an enquiry coordination website.
            By using this website and submitting an enquiry, you acknowledge
            that:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside">
            <li>This website is not a registered marble polishing contractor.</li>
            <li>We do not employ technicians or carry out polishing, grinding, honing, or sealing work.</li>
            <li>We act as an intermediary, forwarding your enquiry to independent service partners.</li>
            <li>We do not guarantee that a service partner will be available or will respond to your enquiry.</li>
          </ul>
        </Section>

        <Section heading="Independent Service Providers">
          <p>
            Service partners who may contact you after you submit an enquiry
            are independent businesses or individuals. They are not employees,
            agents, or representatives of this website. We do not:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside">
            <li>Control or supervise the methods, equipment, or materials used by service partners</li>
            <li>Guarantee the quality, safety, or outcome of any work performed by service partners</li>
            <li>Arrange or guarantee insurance, bonding, or liability coverage</li>
            <li>Endorse or warrant any specific service partner</li>
          </ul>
          <p className="mt-3">
            Any engagement, quotation, or service arrangement is between you
            and the service partner you choose to work with. You are
            responsible for evaluating the suitability of any service partner
            before engaging them.
          </p>
        </Section>

        <Section heading="Quotations and Service Arrangements">
          <p>
            Quotations provided to you come directly from service partners, not
            from this website. We do not set, verify, or guarantee any prices.
            Any quotation you receive should be evaluated on its own terms,
            including scope, price, timeline, and conditions.
          </p>
          <p className="mt-3">
            We are not a party to any agreement between you and a service
            partner. If a dispute arises regarding work performed, it should be
            resolved directly with the service partner.
          </p>
        </Section>

        <Section heading="Information and Limitations">
          <p>
            The information provided on this website is for general
            educational purposes only. It explains marble treatment concepts
            in general terms and does not constitute professional advice for
            your specific situation.
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside">
            <li>We do not publish specific prices, as these depend on individual assessments.</li>
            <li>We do not claim specific outcomes, as results vary by marble type and condition.</li>
            <li>We do not guarantee the accuracy or completeness of all information, though we strive to be accurate.</li>
            <li>You should rely on an in-person assessment by a qualified service partner for advice specific to your marble surface.</li>
          </ul>
        </Section>

        <Section heading="Contact and Updates">
          <p>
            We may update these terms from time to time. Changes will be posted
            on this page. Continued use of the website after changes are posted
            constitutes acceptance of the updated terms.
          </p>
          <p className="mt-3">
            To contact us about these terms, please use the enquiry form or
            WhatsApp.
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
