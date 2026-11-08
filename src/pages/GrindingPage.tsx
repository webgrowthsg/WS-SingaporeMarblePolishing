import { PageLayout } from "../components/PageLayout";
import { Hero } from "../components/Hero";
import { Section } from "../components/Section";
import { TreatmentComparison } from "../components/TreatmentComparison";
import { QuoteCTA } from "../components/QuoteCTA";
import { FAQAccordion } from "../components/FAQAccordion";
import { TrustDisclosure } from "../components/TrustDisclosure";
import { ContextualLinks } from "../components/ContextualLinks";
import { getRoute } from "../lib/routeRegistry";
import { routeRegistry } from "../lib/routeRegistry";
import { grindingFaqs } from "../lib/faqContent";

const route = getRoute("/marble-grinding/")!;

export function GrindingPage() {
  return (
    <PageLayout route={route}>
      <Hero
        title={route.h1}
        subtitle="A technical process for levelling uneven marble surfaces and addressing deep damage. Learn when grinding may or may not be appropriate before requesting an assessment."
      >
        <QuoteCTA ctaLocation="grinding-hero" label="Request an Assessment" />
      </Hero>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <TrustDisclosure variant="compact" />

        <Section heading="When Grinding May Be Appropriate">
          <p>
            Marble grinding is an aggressive surface-levelling process that
            removes a thin layer of stone using abrasive pads. It may be
            appropriate when:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside">
            <li>Adjacent tiles are at different heights (lippage), creating visible or tactile unevenness.</li>
            <li>Deep scratches or gouges are present that honing alone cannot address.</li>
            <li>The surface has been heavily worn and needs to be brought back to a flat, uniform state before further treatment.</li>
          </ul>
        </Section>

        <Section heading="When Grinding Is Not Appropriate">
          <p>
            Grinding is not always the right solution. It may not be
            appropriate when:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside">
            <li>The marble is in good condition with only minor dullness — polishing alone may suffice.</li>
            <li>Unevenness is caused by structural movement or subsidence — the underlying issue should be addressed first.</li>
            <li>The marble is very thin or fragile, as grinding removes material and could compromise the tile.</li>
            <li>The surface has only etching or light staining — these can often be addressed with honing or polishing.</li>
          </ul>
        </Section>

        <Section heading="Typical Assessment and Process">
          <p>
            A service partner would typically inspect the floor to assess the
            degree of lippage, the marble type, and the overall condition
            before recommending grinding. If grinding is appropriate, the
            general process involves:
          </p>
          <ol className="mt-3 space-y-2 list-decimal list-inside">
            <li>Clearing the area and protecting surrounding surfaces.</li>
            <li>Using progressively finer abrasive pads to level and smooth the surface.</li>
            <li>Transitioning to honing and then polishing to restore the desired finish.</li>
            <li>Cleaning the surface and applying sealer if recommended.</li>
          </ol>
          <p className="mt-3">
            The specific process varies depending on the marble, the area, and
            the service partner's methods.
          </p>
        </Section>

        <Section heading="Risks and Surface Limitations">
          <p>
            Grinding removes material from the stone, which means it is not
            infinitely repeatable — there is a limit to how many times a floor
            can be ground before the marble becomes too thin. Other
            considerations include:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside">
            <li><strong>Dust:</strong> Grinding generates dust. Contractors may use water or vacuum systems, but we cannot guarantee dust-free outcomes.</li>
            <li><strong>Noise:</strong> The process is noisy, which may affect scheduling in residential settings.</li>
            <li><strong>Flatness:</strong> Grinding can reduce lippage but cannot guarantee a perfectly level floor if the substrate is uneven.</li>
            <li><strong>Finish variation:</strong> The final appearance depends on the marble type and the grit sequence used.</li>
          </ul>
        </Section>

        <Section heading="Grinding vs Honing and Polishing">
          <TreatmentComparison
            rows={[
              {
                treatment: "Grinding",
                purpose: "Aggressive levelling — removes lippage and deep damage.",
                limitation: "Removes the most material; high dust and noise.",
              },
              {
                treatment: "Honing",
                purpose: "Smoothing and scratch removal — creates a matte/satin finish.",
                limitation: "Less aggressive than grinding; does not level uneven tiles.",
              },
              {
                treatment: "Polishing",
                purpose: "Final shine and clarity — brings out the stone's natural appearance.",
                limitation: "Requires a surface already in good condition; no levelling.",
              },
            ]}
          />
          <p className="mt-4 text-sm">
            Read more about the broader{" "}
            <a href="/marble-restoration/" className="text-sage-600 hover:underline">restoration process</a>{" "}
            and{" "}
            <a href="/marble-sealing/" className="text-sage-600 hover:underline">sealing</a>.
          </p>
        </Section>

        <Section heading="Frequently Asked Questions">
          <FAQAccordion items={grindingFaqs} />
        </Section>

        <Section heading="Request an Assessment">
          <QuoteCTA variant="secondary" label="Request an Assessment" ctaLocation="grinding-final-cta" />
        </Section>

        <ContextualLinks links={route.contextualLinks} routeRegistry={routeRegistry} />
      </div>
    </PageLayout>
  );
}
