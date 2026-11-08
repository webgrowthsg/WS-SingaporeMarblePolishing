interface HeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function Hero({ title, subtitle, children }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-100 to-stone-50 border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-3xl">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-lg text-stone-600 leading-relaxed">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
      {/* Subtle decorative marble-like pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-sage-100/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-stone-200/40 blur-2xl"
      />
    </section>
  );
}
