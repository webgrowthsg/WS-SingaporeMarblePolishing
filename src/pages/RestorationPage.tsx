import { PageLayout } from "../components/PageLayout";
import { Hero } from "../components/Hero";
import { Section } from "../components/Section";
import { TreatmentComparison } from "../components/TreatmentComparison";
import { ContactCTA } from "../components/ContactCTA";
import { FAQAccordion } from "../components/FAQAccordion";
import { TrustDisclosure } from "../components/TrustDisclosure";
import { ContextualLinks } from "../components/ContextualLinks";
import { getRoute } from "../lib/routeRegistry";
import { routeRegistry } from "../lib/routeRegistry";
import { restorationFaqs } from "../lib/faqContent";

const route = getRoute("/marble-restoration/")!;

export function RestorationPage() {
  return (
    <PageLayout route={route}>
      <Hero
        title={route.h1}
        subtitle="Understand when marble restoration may be needed, the treatment options available, and how to enquire for an independent assessment in Singapore."
      >
        <ContactCTA ctaLocation="restoration-hero" label="WhatsApp for a Quote" />
      </Hero>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <TrustDisclosure variant="compact" />

        <Section heading="When Marble Restoration May Be Needed">
          <p>
            Marble is a natural stone that changes over time. Restoration may
            be worth considering when your marble surfaces show signs of wear
            that routine cleaning can no longer address — such as persistent
            dullness, visible scratches, uneven tile edges, staining that has
            penetrated the surface, or etch marks from acidic contact.
          </p>
          <p className="mt-3">
            Not every marble surface needs restoration. Some issues are
            cosmetic and can be managed with proper cleaning and maintenance.
            An in-person assessment by a service partner can help determine
            whether restoration is appropriate and what it would involve.
          </p>
        </Section>

        <Section heading="Common Damage Types">
          <ul className="space-y-3 list-disc list-inside">
            <li>
              <strong>Scratches:</strong> Surface abrasions from foot traffic,
              furniture, or grit. Shallow scratches may be addressed by honing;
              deeper ones may require more aggressive treatment.
            </li>
            <li>
              <strong>Acid etching:</strong> Dull, sometimes lighter-coloured
              marks left by acidic substances (citrus juice, vinegar, some
              cleaning products). Etching is chemical damage, not a stain, and
              cannot simply be wiped away.
            </li>
            <li>
              <strong>Stains:</strong> Discoloration from spills — oil, wine,
              coffee, rust — that have absorbed into the stone. Different
              stain types may require different treatment approaches.
            </li>
            <li>
              <strong>Lippage (uneven tiles):</strong> Adjacent tiles sitting
              at different heights, creating visible lips. Grinding can reduce
              lippage, but the cause (e.g. substrate movement) should also be
              considered.
            </li>
            <li>
              <strong>Cracks and chips:</strong> Physical damage from impact or
              structural movement. These may require repair techniques beyond
              surface polishing.
            </li>
          </ul>
        </Section>

        <Section heading="Grinding, Honing and Polishing Explained">
          <p className="mb-4">
            These are distinct steps that may be used individually or together,
            depending on the condition of your marble:
          </p>
          <TreatmentComparison
            rows={[
              {
                treatment: "Grinding",
                purpose:
                  "Removes a thin layer of stone to level uneven tiles and address deep damage.",
                limitation:
                  "Aggressive process; not every floor needs it. Generates dust and requires expertise.",
              },
              {
                treatment: "Honing",
                purpose:
                  "Removes scratches and creates a smooth, matte or satin finish.",
                limitation:
                  "Does not produce a high-gloss shine. May be a finish in its own right or a step before polishing.",
              },
              {
                treatment: "Polishing",
                purpose:
                  "Brings out the natural shine and clarity of the marble surface.",
                limitation:
                  "Works on surfaces that are already relatively flat and free of deep damage.",
              },
              {
                treatment: "Sealing",
                purpose:
                  "Applies a protective layer that slows liquid absorption.",
                limitation:
                  "Does not prevent acid etching or all staining. Requires reapplication.",
              },
            ]}
          />
          <p className="mt-4 text-sm">
            Learn more about{" "}
            <a href="/marble-grinding/" className="text-sage-600 hover:underline">grinding</a>{" "}
            and{" "}
            <a href="/marble-sealing/" className="text-sage-600 hover:underline">sealing</a>{" "}
            on their dedicated pages.
          </p>
        </Section>

        <Section heading="Sealing and Aftercare">
          <p>
            After restoration, sealing can help slow future staining by giving
            you more time to wipe spills before they absorb. However, sealing
            does not prevent acid etching — acidic substances will still mark
            the surface regardless of sealer.
          </p>
          <p className="mt-3">
            Aftercare typically involves using pH-neutral cleaners, avoiding
            acidic or abrasive products, and using mats or rugs in high-traffic
            areas. Specific aftercare guidance should come from the service
            partner who performs the work, as it depends on the marble type and
            treatment applied.
          </p>
        </Section>

        <Section heading="Assessment and Service Coordination">
          <p>
            Because marble damage varies widely, an accurate assessment
            requires inspecting the surface in person. When you message us,
            we share your details with an independent service partner who can
            arrange an on-site assessment and provide a quotation directly.
          </p>
          <p className="mt-3">
            We do not diagnose specific conditions or recommend particular
            treatments without a partner assessment. Providing detailed
            information in your enquiry helps partners respond more effectively.
          </p>
        </Section>

        <Section heading="Frequently Asked Questions">
          <FAQAccordion items={restorationFaqs} />
        </Section>

        <Section heading="Get a Quote">
          <ContactCTA variant="secondary" ctaLocation="restoration-final-cta" />
        </Section>

        <ContextualLinks links={route.contextualLinks} routeRegistry={routeRegistry} />
      </div>
    </PageLayout>
  );
}
