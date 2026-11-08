import { sectionImages } from "../lib/siteImages";
interface SectionProps { heading?: string; children: React.ReactNode; id?: string; className?: string }
/** Content section with an optional illustrative image for specifically mapped headings. */
export function Section({ heading, children, id, className = "" }: SectionProps) {
  const image = heading ? sectionImages[heading] : undefined;
  return (
    <section className={className} id={id}>
      {heading && <h2 className="mb-3 font-serif text-2xl font-semibold text-stone-900">{heading}</h2>}
      {image && <figure className="mb-6">
        <img src={image.src} alt={image.alt} width={image.width} height={image.height}
          loading="lazy" decoding="async" className="aspect-[16/7] w-full rounded-xl object-cover" />
      </figure>}
      <div className="leading-relaxed text-stone-700">{children}</div>
    </section>
  );
}
