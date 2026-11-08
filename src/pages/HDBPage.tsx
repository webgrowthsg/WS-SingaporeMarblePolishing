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
import { hdbFaqs } from "../lib/faqContent";

const route = getRoute("/hdb-marble-polishing/")!;

export function HDBPage() {
  return (
    <PageLayout route={route}>
      <Hero
        title={route.h1}
        subtitle="Treatment options and practical guidance for HDB homes with marble flooring. Enquire for an independent assessment and quotation."
      >
        <QuoteCTA ctaLocation="hdb-hero" label="Request a Quote" />
      </Hero>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <TrustDisclosure variant="compact" />

        <Section heading="Marble Issues in HDB Homes">
          <p>
            Some HDB flats in Singapore feature marble flooring, typically in
            living and dining areas. Over time, these surfaces can develop
            issues common to residential marble:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside">
            <li>Dullness from foot traffic and routine cleaning</li>
            <li>Scratches from furniture movement or grit</li>
            <li>Stains from food and drink spills</li>
            <li>Etch marks from acidic cleaners or food contact</li>
            <li>Uneven tile edges (lippage) from natural settling</li>
          </ul>
          <p className="mt-3">
            Not every HDB flat has marble floors. This page is relevant to
            those that do and where the marble needs attention.
          </p>
        </Section>

        <Section heading="Suitable Treatment Options">
          <p className="mb-4">
            Depending on the condition of your marble, treatment options may
            include:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <ServiceCard
              to="/marble-restoration/"
              title="Restoration"
              description="A full assessment and treatment plan for damaged or worn marble."
            />
            <ServiceCard
              to="/marble-sealing/"
              title="Sealing"
              description="Protective sealing to slow future staining in HDB living areas."
            />
          </div>
        </Section>

        <Section heading="Home Access and Preparation">
          <p>
            For HDB homes, practical access considerations include:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside">
            <li><strong>Clearing the area:</strong> Furniture and rugs should be moved away from the marble surface before work begins.</li>
            <li><strong>Noise:</strong> Polishing and grinding equipment produces noise. Informing neighbours and working within HDB's renovation hours is considerate and may be required.</li>
            <li><strong>Dust and water:</strong> Some processes generate dust or use water. Protecting adjacent areas and allowing for cleanup time is important.</li>
            <li><strong>Pets and children:</strong> The work area should be kept clear during the process.</li>
          </ul>
        </Section>

        <Section heading="What to Expect from an Assessment">
          <p>
            When you submit an enquiry, a service partner can arrange to inspect
            your marble surface and provide a quotation. The assessment
            typically involves:
          </p>
          <ol className="mt-3 space-y-2 list-decimal list-inside">
            <li>Examining the condition of the marble — scratches, dullness, stains, etching, lippage</li>
            <li>Discussing your concerns and what you'd like to achieve</li>
            <li>Recommending an appropriate treatment approach</li>
            <li>Providing a written quotation with scope and terms</li>
          </ol>
        </Section>

        <Section heading="Related Restoration Services">
          <div className="grid gap-4 sm:grid-cols-2">
            <ServiceCard
              to="/marble-grinding/"
              title="Marble Grinding"
              description="For uneven HDB marble floors with lippage or deep damage."
            />
            <ServiceCard
              to="/marble-polishing-cost-singapore/"
              title="Cost Guide"
              description="Understand what factors affect marble polishing pricing."
            />
          </div>
        </Section>

        <Section heading="Frequently Asked Questions">
          <FAQAccordion items={hdbFaqs} />
        </Section>

        <Section heading="Request a Quote">
          <QuoteCTA variant="secondary" ctaLocation="hdb-final-cta" />
        </Section>

        <ContextualLinks links={route.contextualLinks} routeRegistry={routeRegistry} />
      </div>
    </PageLayout>
  );
}
