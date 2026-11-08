import { PageLayout } from "../components/PageLayout";
import { Hero } from "../components/Hero";
import { Section } from "../components/Section";
import { ContactCTA } from "../components/ContactCTA";
import { TrustDisclosure } from "../components/TrustDisclosure";
import { ContextualLinks } from "../components/ContextualLinks";
import { getRoute } from "../lib/routeRegistry";
import { routeRegistry } from "../lib/routeRegistry";
import { aboutFaqs } from "../lib/faqContent";
import { FAQAccordion } from "../components/FAQAccordion";

const route = getRoute("/about-us/")!;

export function AboutPage() {
  return (
    <PageLayout route={route}>
      <Hero
        title={route.h1}
        subtitle="A lead coordination website connecting marble polishing enquiries with independent service partners in Singapore."
      >
        <ContactCTA ctaLocation="about-hero" />
      </Hero>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <TrustDisclosure variant="full" />

        <Section heading="What This Website Does">
          <p>
            SingaporeMarblePolishing.com is an enquiry coordination website.
            Our purpose is to make it easier for people in Singapore to connect
            with marble polishing and restoration services. We do not carry out
            polishing, grinding, honing, or sealing work ourselves.
          </p>
          <p className="mt-3">
            When you submit an enquiry through this website, we review the
            details and share them with independent service partners who may be
            able to assist. The service partner then contacts you directly to
            arrange an assessment and provide a quotation.
          </p>
        </Section>

        <Section heading="How Enquiries Are Coordinated">
          <ol className="space-y-3 list-decimal list-inside">
            <li>You submit an enquiry through our quote form with details about your marble surface and the issue you're experiencing.</li>
            <li>We review the enquiry for completeness and forward it to an independent service partner where one is available.</li>
            <li>The service partner contacts you directly to discuss your needs, potentially arrange a site visit, and provide a quotation.</li>
            <li>Any agreement, quotation, or service arrangement is between you and the service partner. We are not a party to that arrangement.</li>
          </ol>
        </Section>

        <Section heading="Independent Service Partners">
          <p>
            The service partners we coordinate with are independent businesses
            or individuals. We do not employ them, control their methods, or
            guarantee their work. When you receive a quotation from a service
            partner, you should evaluate it on its own terms — including the
            scope of work, price, timeline, and any terms and conditions they
            provide.
          </p>
          <p className="mt-3">
            We do not currently make claims about the number, qualifications,
            certifications, or track record of our service partners, as we do
            not have verified evidence to support such claims. Partner
            information will be added here only when properly verified.
          </p>
        </Section>

        <Section heading="Our Approach to Accurate Information">
          <p>
            We aim to provide helpful, accurate information about marble
            polishing and restoration so you can make informed decisions. The
            content on this website explains marble treatment concepts in
            general terms — what grinding, honing, polishing and sealing
            involve, what they can and cannot achieve, and what factors affect
            cost.
          </p>
          <p className="mt-3">
            We do not publish specific prices, project showcases, testimonials,
            or ratings unless we have verified evidence to support them. We do
            not claim to be a registered contractor, to hold certifications, or
            to have completed specific projects.
          </p>
        </Section>

        <Section heading="Contact and Enquiries">
          <p>
            The best way to reach us is through the quote form. You can also
            contact us via WhatsApp for a quick enquiry about marble polishing
            services.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <ContactCTA ctaLocation="about-contact" label="WhatsApp Us" />
          </div>
        </Section>

        <Section heading="Frequently Asked Questions">
          <FAQAccordion items={aboutFaqs} />
        </Section>

        <ContextualLinks links={route.contextualLinks} routeRegistry={routeRegistry} />
      </div>
    </PageLayout>
  );
}
