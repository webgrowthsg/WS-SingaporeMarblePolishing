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
import { homeFaqs } from "../lib/faqContent";

const route = getRoute("/")!;

export function HomePage() {
  return (
    <PageLayout route={route} showBreadcrumbs={false}>
      <Hero
        title={route.h1}
        subtitle="Enquiry coordination for residential and commercial marble surfaces across Singapore. We connect your enquiry with independent service partners for assessment and quotation."
      >
        <div className="flex flex-wrap gap-3">
          <QuoteCTA ctaLocation="hero" />
          <a
            href="https://wa.me/6593416879?text=Hello%2C%20I%27d%20like%20a%20quote%20for%20marble%20polishing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1da851] transition-colors"
          >
            WhatsApp for a Quote
          </a>
        </div>
      </Hero>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <TrustDisclosure variant="full" />

        {/* Residential */}
        <Section heading="Residential Marble Polishing">
          <p className="mb-4">
            Marble flooring in HDB flats and private condominiums can lose its
            shine over time due to foot traffic, cleaning with unsuitable
            products, and everyday wear. If you live in an HDB flat or condo
            with marble surfaces, you can enquire about polishing and
            restoration options suited to residential settings.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 mt-6">
            <ServiceCard
              to="/hdb-marble-polishing/"
              title="HDB Marble Polishing"
              description="Treatment options and access considerations for HDB homes with marble flooring."
            />
            <ServiceCard
              to="/condo-marble-polishing/"
              title="Condo Marble Polishing"
              description="Polishing and restoration for condominium marble, including management and access guidance."
            />
          </div>
        </Section>

        {/* Commercial */}
        <Section heading="Commercial Marble Polishing">
          <p className="mb-4">
            Commercial spaces — lobbies, retail units, offices and common
            areas — face heavier traffic and different access constraints.
            Enquire about assessment and coordination for commercial marble
            surfaces.
          </p>
          <ServiceCard
            to="/commercial-marble-polishing/"
            title="Commercial Marble Polishing"
            description="Restoration and maintenance options for commercial marble surfaces, including access and downtime considerations."
          />
        </Section>

        {/* Restoration options */}
        <Section heading="Marble Restoration Options">
          <p className="mb-4">
            Restoration may involve several techniques depending on the
            condition of your marble. Grinding addresses uneven surfaces,
            honing removes scratches, polishing restores shine, and sealing
            helps slow future staining. The right approach depends on an
            in-person assessment.
          </p>
          <div className="grid gap-4 sm:grid-cols-3 mt-6">
            <ServiceCard
              to="/marble-restoration/"
              title="Marble Restoration"
              description="Understand when restoration is needed and what options are available."
            />
            <ServiceCard
              to="/marble-grinding/"
              title="Marble Grinding"
              description="Levelling uneven surfaces and addressing deep damage."
            />
            <ServiceCard
              to="/marble-sealing/"
              title="Marble Sealing"
              description="Stone protection and what sealers can and cannot do."
            />
          </div>
        </Section>

        {/* How coordination works */}
        <Section heading="How Enquiry Coordination Works">
          <ol className="space-y-3 list-decimal list-inside">
            <li>You submit an enquiry through our quote form with details about your marble surface and the issue you're experiencing.</li>
            <li>We review the enquiry and share your details with an independent service partner where one is available.</li>
            <li>The service partner contacts you directly to arrange an assessment and provide a quotation.</li>
            <li>Any engagement, pricing, or service arrangement is between you and the service partner.</li>
          </ol>
          <p className="mt-4">
            We do not carry out polishing work ourselves, employ technicians, or
            guarantee specific outcomes or response times. Our role is to
            connect your enquiry with a service partner who can help.
          </p>
        </Section>

        {/* Common problems */}
        <Section heading="Common Marble Problems">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ProblemCard
              title="Dullness and loss of shine"
              description="High-traffic areas can lose their polish over time, appearing cloudy or matte even when clean."
            />
            <ProblemCard
              title="Scratches and scuffs"
              description="Foot traffic, furniture movement and abrasive particles can scratch the marble surface."
            />
            <ProblemCard
              title="Acid etching"
              description="Contact with acidic substances — citrus, vinegar, some cleaners — leaves dull, lighter marks on the surface."
            />
            <ProblemCard
              title="Stains"
              description="Spills that penetrate the stone can leave visible marks, especially on unsealed or lightly sealed marble."
            />
            <ProblemCard
              title="Uneven tiles (lippage)"
              description="Adjacent tiles at different heights create visible lips and can be a trip hazard. Grinding may help."
            />
            <ProblemCard
              title="Cracks and chips"
              description="Structural movement or impact can cause cracks or chipped edges that may require specialist attention."
            />
          </div>
        </Section>

        {/* FAQs */}
        <Section heading="Frequently Asked Questions">
          <FAQAccordion items={homeFaqs} />
        </Section>

        {/* Final CTA */}
        <Section heading="Request a Quotation">
          <p className="mb-4">
            Ready to get your marble surface assessed? Submit an enquiry and
            we'll coordinate with an independent service partner where available.
          </p>
          <QuoteCTA variant="secondary" ctaLocation="home-final-cta" />
        </Section>

        <ContextualLinks links={route.contextualLinks} routeRegistry={routeRegistry} />
      </div>
    </PageLayout>
  );
}

function ProblemCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-5">
      <h3 className="font-medium text-stone-900">{title}</h3>
      <p className="mt-2 text-sm text-stone-600">{description}</p>
    </div>
  );
}
