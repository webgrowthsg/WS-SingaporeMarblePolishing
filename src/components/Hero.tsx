import { useLocation } from "react-router-dom";
import { pageImages } from "../lib/siteImages";
interface HeroProps { title: string; subtitle?: string; children?: React.ReactNode }
export function Hero({ title, subtitle, children }: HeroProps) {
  const { pathname } = useLocation();
  const image = pageImages[pathname];
  const primary = pathname === "/";
  return (
    <section className="relative overflow-hidden border-b border-stone-200 bg-gradient-to-b from-stone-100 to-stone-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className={image ? "grid items-center gap-8 lg:grid-cols-2 lg:gap-12" : "max-w-3xl"}>
          <div className="relative z-10">
            <h1 className="font-serif text-3xl font-bold leading-tight text-stone-900 sm:text-4xl lg:text-5xl">{title}</h1>
            {subtitle && <p className="mt-4 text-lg leading-relaxed text-stone-600">{subtitle}</p>}
            {children && <div className="mt-6">{children}</div>}
          </div>
          {image && <figure className="min-w-0">
            <img src={image.src} alt={image.alt} width={image.width} height={image.height}
              fetchPriority={primary ? "high" : "auto"} loading="eager" decoding="async"
              className="aspect-[3/2] w-full rounded-2xl object-cover shadow-lg ring-1 ring-stone-200" />
            <figcaption className="mt-2 text-xs text-stone-600">AI-generated illustration. Not a photograph of a completed project or service partner.</figcaption>
          </figure>}
        </div>
      </div>
    </section>
  );
}
