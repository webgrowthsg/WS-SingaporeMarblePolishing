import { Link } from "react-router-dom";

interface ServiceCardProps {
  to: string;
  title: string;
  description: string;
  ctaLabel?: string;
}

export function ServiceCard({ to, title, description, ctaLabel = "Learn more" }: ServiceCardProps) {
  return (
    <Link
      to={to}
      className="group block rounded-lg border border-stone-200 bg-white p-6 transition-all hover:border-sage-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-600"
    >
      <h3 className="font-serif text-xl font-semibold text-stone-900 group-hover:text-sage-700">
        {title}
      </h3>
      <p className="mt-2 text-sm text-stone-600 leading-relaxed">
        {description}
      </p>
      <span className="mt-4 inline-flex items-center text-sm font-medium text-sage-600 group-hover:text-sage-700">
        {ctaLabel}
        <svg
          className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </span>
    </Link>
  );
}
