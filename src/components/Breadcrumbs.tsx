import { Link } from "react-router-dom";
import type { RouteMeta } from "../lib/routeRegistry";

interface BreadcrumbsProps {
  route: RouteMeta;
}

export function Breadcrumbs({ route }: BreadcrumbsProps) {
  if (route.breadcrumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-stone-600">
      <ol className="flex flex-wrap items-center gap-1">
        {route.breadcrumbs.map((crumb, idx) => {
          const isLast = idx === route.breadcrumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1">
              {isLast ? (
                <span aria-current="page" className="text-stone-800 font-medium">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className="text-sage-600 hover:text-sage-700 hover:underline"
                >
                  {crumb.label}
                </Link>
              )}
              {!isLast && <span aria-hidden="true" className="text-stone-400">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
