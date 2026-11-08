import { PageLayout } from "../components/PageLayout";
import { Hero } from "../components/Hero";
import { Section } from "../components/Section";
import { QuoteCTA } from "../components/QuoteCTA";
import { FAQAccordion } from "../components/FAQAccordion";
import { TrustDisclosure } from "../components/TrustDisclosure";
import { ContextualLinks } from "../components/ContextualLinks";
import { getRoute } from "../lib/routeRegistry";
import { routeRegistry } from "../lib/routeRegistry";
import { sealingFaqs } from "../lib/faqContent";

const route = getRoute("/marble-sealing/")!;

export function SealingPage() {
  return (
    <PageLayout route={route}>
      <Hero
        title={route.h1}
        subtitle="Understand what marble sealers do and don't do, when sealing may help, and how it fits into a broader maintenance approach."
      >
        <QuoteCTA ctaLocation="sealing-hero" label="Request an Assessment" />
      </Hero>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <TrustDisclosure variant="compact" />

        <Section heading="When Marble Sealing May Help">
          <p>
            Sealing may help if your marble is in an area where spills are
            likely — kitchens, bathrooms, dining areas, or high-traffic
            commercial spaces. A sealer penetrates the stone and creates a
            barrier that slows liquid absorption, giving you more time to wipe
            up spills before they become stains.
          </p>
          <p className="mt-3">
            Sealing is also commonly applied after restoration work — grinding,
            honing or polishing — as a final protective step. It is not a
            substitute for proper care, but it can be a useful part of a
            maintenance routine.
          </p>
        </Section>

        <Section heading="What Sealing Does and Does Not Prevent">
          <p className="font-medium text-stone-900 mb-2">Sealing can help with:</p>
          <ul className="space-y-2 list-disc list-inside mb-4">
            <li>Slowing the absorption of water- and oil-based liquids</li>
            <li>Giving you time to wipe spills before they stain</li>
            <li>Reducing the penetration of dirt into the stone surface</li>
          </ul>
          <p className="font-medium text-stone-900 mb-2">Sealing does NOT prevent:</p>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Acid etching:</strong> Acidic substances (citrus, vinegar, wine, some cleaners) react chemically with the calcium carbonate in marble. This etching happens regardless of whether the surface is sealed.</li>
            <li><strong>All staining:</strong> If a spill is left for an extended period, it can still penetrate even a sealed surface.</li>
            <li><strong>Scratches or physical wear:</strong> Sealers do not harden the surface against abrasion.</li>
          </ul>
        </Section>

        <Section heading="Surface Preparation and Assessment">
          <p>
            For a sealer to be effective, the marble surface must be clean,
            dry, and free of existing stains or residue. Applying sealer over a
            contaminated surface can trap existing marks beneath the barrier.
          </p>
          <p className="mt-3">
            A service partner can assess whether your marble is ready for
            sealing or whether it needs cleaning, honing, or other preparation
            first. The assessment also helps determine the appropriate sealer
            type for your marble and usage conditions.
          </p>
        </Section>

        <Section heading="Maintenance and Reapplication">
          <p>
            Sealers are not permanent. They wear down over time, especially in
            high-traffic areas or when aggressive cleaning products are used.
            The frequency of reapplication depends on:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside">
            <li>The type of sealer used (topical vs impregnating)</li>
            <li>Foot traffic and usage patterns</li>
            <li>Cleaning products and methods</li>
            <li>Exposure to moisture and spills</li>
          </ul>
          <p className="mt-3">
            There is no universal reapplication schedule. A service partner can
            provide guidance specific to your surface after assessment.
          </p>
        </Section>

        <Section heading="Related Marble Treatments">
          <p>
            Sealing is often combined with other treatments. If your marble has
            scratches, dullness, or uneven tiles, sealing alone will not
            address those issues. Consider reading about{" "}
            <a href="/marble-restoration/" className="text-sage-600 hover:underline">marble restoration</a>{" "}
            and{" "}
            <a href="/marble-grinding/" className="text-sage-600 hover:underline">grinding</a>{" "}
            to understand the full range of options.
          </p>
        </Section>

        <Section heading="Frequently Asked Questions">
          <FAQAccordion items={sealingFaqs} />
        </Section>

        <Section heading="Request an Assessment">
          <QuoteCTA variant="secondary" label="Request an Assessment" ctaLocation="sealing-final-cta" />
        </Section>

        <ContextualLinks links={route.contextualLinks} routeRegistry={routeRegistry} />
      </div>
    </PageLayout>
  );
}
