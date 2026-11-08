import { PageLayout } from "../components/PageLayout";
import { Hero } from "../components/Hero";
import { Section } from "../components/Section";
import { ServiceCard } from "../components/ServiceCard";
import { QuoteCTA } from "../components/QuoteCTA";
import { FAQAccordion } from "../components/FAQAccordion";
import { TrustDisclosure } from "../components/TrustDisclosure";
import { ContextualLinks } from "../components/ContextualLinks";
import { getRoute } from "../lib/routeRegistry";
import { routeRegistry } from "../lib/routeRegistry";
import { commercialFaqs } from "../lib/faqContent";

const route = getRoute("/commercial-marble-polishing/")!;

export function CommercialPage() {
  return (
    <PageLayout route={route}>
      <Hero
        title={route.h1}
        subtitle="Enquiry coordination for commercial marble surfaces — lobbies, retail spaces, offices and common areas. Assessment, restoration and maintenance guidance."
      >
        <QuoteCTA ctaLocation="commercial-hero" label="Request a Commercial Quote" />
      </Hero>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <TrustDisclosure variant="compact" />

        <Section heading="Commercial Marble Surface Challenges">
          <p>
            Commercial marble surfaces face challenges that differ from
            residential settings. Higher foot traffic, rolling equipment,
            exposure to a wider range of substances, and the need to maintain
            appearance for customers and tenants all contribute to faster wear
            and more complex maintenance requirements.
          </p>
          <p className="mt-3">
            Common issues include accelerated dullness in traffic paths,
            scratches from trolleys or equipment, etching from spills in food
            service areas, and staining from a variety of sources. The larger
            surface areas typical of commercial spaces also make maintenance
            logistics more complex.
          </p>
        </Section>

        <Section heading="Relevant Building and Facility Types">
          <ul className="space-y-2 list-disc list-inside">
            <li>Office building lobbies and reception areas</li>
            <li>Retail mall common areas and individual shop floors</li>
            <li>Hotel lobbies, corridors and feature walls</li>
            <li>Restaurant and food service areas with marble surfaces</li>
            <li>Showrooms and display areas</li>
            <li>Residential development common areas (managed by MCSTs)</li>
          </ul>
        </Section>

        <Section heading="Restoration and Maintenance Options">
          <p className="mb-4">
            Depending on the condition and usage of the commercial marble,
            treatment options may include:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <ServiceCard
              to="/marble-restoration/"
              title="Restoration"
              description="Full assessment and treatment for worn commercial marble."
            />
            <ServiceCard
              to="/marble-sealing/"
              title="Sealing"
              description="Protective sealing for high-traffic or spill-prone commercial areas."
            />
          </div>
        </Section>

        <Section heading="Access, Safety and Downtime Planning">
          <p>
            Commercial marble work requires careful planning around building
            operations. Key considerations include:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside">
            <li><strong>Operating hours:</strong> Work may need to be scheduled outside business hours to minimise disruption. Whether after-hours work is available depends on the service partner.</li>
            <li><strong>Safety:</strong> Wet surfaces, dust, and equipment all create hazards in occupied spaces. Proper barricading and signage are important.</li>
            <li><strong>Phased approach:</strong> Large areas may be treated in sections to keep parts of the space operational.</li>
            <li><strong>Drying and curing time:</strong> Some treatments require the surface to remain unused for a period afterwards.</li>
            <li><strong>Building management coordination:</strong> For managed buildings, the building manager or MCST may need to be involved.</li>
          </ul>
          <p className="mt-3">
            We cannot guarantee after-hours availability, insurance
            arrangements, or specific scheduling options. These depend on the
            service partner and should be confirmed directly.
          </p>
        </Section>

        <Section heading="How Commercial Enquiries Are Assessed">
          <p>
            When you submit a commercial enquiry, providing details about the
            building type, approximate area, current condition, and access
            constraints helps service partners respond effectively. A partner
            would typically arrange a site visit to assess the surface and
            provide a written quotation.
          </p>
          <p className="mt-3">
            For managed buildings, please include information about management
            approval status and any known access restrictions in your enquiry.
          </p>
        </Section>

        <Section heading="Frequently Asked Questions">
          <FAQAccordion items={commercialFaqs} />
        </Section>

        <Section heading="Request a Commercial Quote">
          <QuoteCTA variant="secondary" label="Request a Commercial Quote" ctaLocation="commercial-final-cta" />
        </Section>

        <ContextualLinks links={route.contextualLinks} routeRegistry={routeRegistry} />
      </div>
    </PageLayout>
  );
}
