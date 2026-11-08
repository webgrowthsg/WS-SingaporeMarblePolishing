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
import { condoFaqs } from "../lib/faqContent";

const route = getRoute("/condo-marble-polishing/")!;

export function CondoPage() {
  return (
    <PageLayout route={route}>
      <Hero
        title={route.h1}
        subtitle="Polishing and restoration guidance for condominium marble surfaces, including management approvals, access and treatment options."
      >
        <QuoteCTA ctaLocation="condo-hero" label="Request a Quote" />
      </Hero>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <TrustDisclosure variant="compact" />

        <Section heading="Marble Surfaces in Condominiums">
          <p>
            Condominiums in Singapore often feature marble in living areas,
            foyers, bathrooms, and sometimes common areas like lobbies and
            corridors. The marble used in condos may range from standard
            varieties to premium finishes, and the installation context can
            differ from HDB flats — potentially larger areas, more complex
            layouts, and shared-space marble subject to management oversight.
          </p>
        </Section>

        <Section heading="Common Wear and Finish Problems">
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Dullness:</strong> Loss of shine in high-traffic zones like entrances and corridors.</li>
            <li><strong>Scratches:</strong> From footwear, furniture, and abrasive particles tracked in from outside.</li>
            <li><strong>Etching:</strong> Marks from acidic substances in bathrooms, kitchens, or dining areas.</li>
            <li><strong>Water spots and staining:</strong> In bathrooms or near wet areas where water sits on the surface.</li>
            <li><strong>Lippage:</strong> Uneven tiles that may be more noticeable in larger open areas.</li>
          </ul>
        </Section>

        <Section heading="Treatment and Finish Options">
          <p className="mb-4">
            The appropriate treatment depends on the marble type, condition, and
            the finish you want to achieve:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <ServiceCard
              to="/marble-restoration/"
              title="Restoration"
              description="Full assessment and treatment for worn or damaged condo marble."
            />
            <ServiceCard
              to="/marble-sealing/"
              title="Sealing"
              description="Protection for condo marble in kitchens, bathrooms and living areas."
            />
          </div>
        </Section>

        <Section heading="Management and Access Considerations">
          <p>
            Condominium living adds practical considerations that differ from
            HDB flats:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside">
            <li><strong>Management approval:</strong> Many condominiums require notice or approval for renovation or tradesperson access. Check with your management office before scheduling.</li>
            <li><strong>Service lifts:</strong> Some condos designate service lifts for contractors and restrict passenger lift use for equipment and materials.</li>
            <li><strong>Working hours:</strong> Condos may have specific renovation hours or noise rules that differ from HDB guidelines.</li>
            <li><strong>Common area marble:</strong> If the marble is in a shared area (lobby, corridor), coordination with management is essential — individual unit owners typically cannot arrange work on common property independently.</li>
          </ul>
          <p className="mt-3">
            These rules vary by development. We recommend confirming with your
            condo management before submitting an enquiry or scheduling work.
          </p>
        </Section>

        <Section heading="Related Restoration Services">
          <div className="grid gap-4 sm:grid-cols-2">
            <ServiceCard
              to="/marble-grinding/"
              title="Marble Grinding"
              description="For uneven condo marble surfaces with lippage or deep scratches."
            />
            <ServiceCard
              to="/marble-polishing-cost-singapore/"
              title="Cost Guide"
              description="Factors that affect marble polishing pricing in Singapore."
            />
          </div>
        </Section>

        <Section heading="Frequently Asked Questions">
          <FAQAccordion items={condoFaqs} />
        </Section>

        <Section heading="Request a Quote">
          <QuoteCTA variant="secondary" ctaLocation="condo-final-cta" />
        </Section>

        <ContextualLinks links={route.contextualLinks} routeRegistry={routeRegistry} />
      </div>
    </PageLayout>
  );
}
