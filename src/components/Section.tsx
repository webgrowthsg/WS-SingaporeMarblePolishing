interface SectionProps {
  heading?: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
}

/**
 * Semantic content section with optional H2 heading.
 */
export function Section({ heading, children, id, className = "" }: SectionProps) {
  return (
    <section className={className} id={id}>
      {heading && <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-3">{heading}</h2>}
      <div className="text-stone-700 leading-relaxed">{children}</div>
    </section>
  );
}
