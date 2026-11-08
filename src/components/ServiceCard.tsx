import { Link } from "react-router-dom";
import { serviceImages } from "../lib/siteImages";
interface ServiceCardProps { to: string; title: string; description: string; ctaLabel?: string }
export function ServiceCard({ to, title, description, ctaLabel = "Learn more" }: ServiceCardProps) {
  const image = serviceImages[to];
  return (
    <Link to={to} className="group block overflow-hidden rounded-lg border border-stone-200 bg-white transition-all hover:border-sage-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-600">
      {image && <div>
        <img src={image.src} alt={image.alt} width={image.width} height={image.height}
          loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover transition-transform duration-300 motion-reduce:transform-none group-hover:scale-[1.02]" />
      </div>}
      <div className="p-6">
        <h3 className="font-serif text-xl font-semibold text-stone-900 group-hover:text-sage-700">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">{description}</p>
        <span className="mt-4 inline-flex items-center text-sm font-medium text-sage-600 group-hover:text-sage-700">{ctaLabel}<svg aria-hidden="true" className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></span>
      </div>
    </Link>
  );
}
