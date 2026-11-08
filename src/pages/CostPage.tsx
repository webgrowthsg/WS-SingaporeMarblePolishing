import { PageLayout } from "../components/PageLayout";
import { Hero } from "../components/Hero";
import { Section } from "../components/Section";
import { QuoteCTA } from "../components/QuoteCTA";
import { FAQAccordion } from "../components/FAQAccordion";
import { TrustDisclosure } from "../components/TrustDisclosure";
import { ContextualLinks } from "../components/ContextualLinks";
import { getRoute } from "../lib/routeRegistry";
import { routeRegistry } from "../lib/routeRegistry";
import { costFaqs } from "../lib/faqContent";

const route = getRoute("/marble-polishing-cost-singapore/")!;

export function CostPage() {
  return (
    <PageLayout route={route}>
      <Hero
        title={route.h1}
        subtitle="Understand what affects marble polishing pricing in Singapore and what a proper quotation should include. No invented prices — just transparent factors."
      >
        <QuoteCTA ctaLocation="cost-hero" label="Request a Tailored Quote" />
      </Hero>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <TrustDisclosure variant="compact" />

        <Section heading="What Affects Marble Polishing Cost">
          <p>
            The cost of marble polishing in Singapore varies based on several
            factors. No single per-square-foot price accurately reflects all
            situations because every marble surface is different. The main
            cost factors include:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside">
            <li><strong>Area size:</strong> Larger areas may have a lower per-square-foot rate due to economies of scale, while very small areas may carry a minimum charge.</li>
            <li><strong>Surface condition:</strong> Heavily scratched, stained, or etched marble requires more work than a surface that only needs a light polish.</li>
            <li><strong>Treatment type:</strong> Simple polishing costs less than a full restoration involving grinding, honing, polishing and sealing.</li>
            <li><strong>Marble type and colour:</strong> Some marble varieties are softer or more delicate and require more careful handling.</li>
            <li><strong>Access and logistics:</strong> High floors without service lifts, narrow access, or furniture that needs moving can add labour time.</li>
            <li><strong>Location and property type:</strong> Commercial properties with after-hours requirements or condo properties with management coordination may involve different considerations.</li>
          </ul>
        </Section>

        <Section heading="Polishing vs Restoration Pricing">
          <p>
            Polishing is generally less expensive than full restoration because
            it involves fewer steps and less time. Restoration may include
            grinding (the most labour-intensive step), honing, polishing, and
            sealing — each adding to the overall cost.
          </p>
          <p className="mt-3">
            However, choosing the cheaper option (polishing alone) when
            restoration is actually needed can lead to unsatisfactory results.
            An assessment by a service partner determines which approach is
            appropriate for your marble, and the quotation reflects the actual
            scope of work.
          </p>
        </Section>

        <Section heading="Area, Condition and Access Factors">
          <p className="mb-3">
            These three factors interact in ways that affect the final price:
          </p>
          <ul className="space-y-2 list-disc list-inside">
            <li>A small bathroom floor in poor condition may cost more per square foot than a large living room in good condition.</li>
            <li>A commercial lobby requiring after-hours work may involve premium scheduling considerations.</li>
            <li>A condo with service lift restrictions may require additional time for equipment transport.</li>
            <li>Deep staining or etching may require multiple treatment passes, increasing labour time.</li>
          </ul>
        </Section>

        <Section heading="What a Written Quotation Should Include">
          <p>
            A transparent, professional quotation from a service partner should
            include:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside">
            <li>The scope of work — which treatments will be performed (grinding, honing, polishing, sealing)</li>
            <li>The area to be treated, in square feet or square metres</li>
            <li>The condition assessment — what issues were identified</li>
            <li>The expected outcome — what the treatment aims to achieve</li>
            <li>The total price, including any breakdown by treatment or area</li>
            <li>The estimated duration of the work</li>
            <li>What is and is not covered — e.g. furniture moving, cleanup, aftercare products</li>
            <li>Payment terms and validity period of the quotation</li>
            <li>Any assumptions or exclusions</li>
          </ul>
          <p className="mt-3">
            If a quotation is missing these details, you are within your rights
            to ask for clarification before proceeding.
          </p>
        </Section>

        <Section heading="Frequently Asked Pricing Questions">
          <FAQAccordion items={costFaqs} />
        </Section>

        <Section heading="Request a Tailored Quote">
          <p className="mb-4">
            Rather than relying on published price lists, the most accurate way
            to understand the cost for your marble surface is to request an
            assessment. Submit an enquiry and we'll coordinate with an
            independent service partner who can provide a written quotation.
          </p>
          <QuoteCTA variant="secondary" label="Request a Tailored Quote" ctaLocation="cost-final-cta" />
        </Section>

        <ContextualLinks links={route.contextualLinks} routeRegistry={routeRegistry} />
      </div>
    </PageLayout>
  );
}
