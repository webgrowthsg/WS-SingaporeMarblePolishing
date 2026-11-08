import { Link } from "react-router-dom";

interface ContextualLinksProps {
  links: string[];
  routeRegistry: { path: string; navLabel: string; h1: string }[];
}

/**
 * Renders contextual cross-links to related pages.
 * Uses the route registry to look up labels.
 */
export function ContextualLinks({ links, routeRegistry }: ContextualLinksProps) {
  if (links.length === 0) return null;

  return (
    <div className="rounded-lg bg-stone-100 p-5">
      <h2 className="text-sm font-semibold text-stone-800 mb-3">
        Related Pages
      </h2>
      <ul className="flex flex-wrap gap-x-4 gap-y-2">
        {links.map((path) => {
          const route = routeRegistry.find((r) => r.path === path);
          if (!route) return null;
          return (
            <li key={path}>
              <Link
                to={path}
                className="text-sm text-sage-600 hover:text-sage-700 hover:underline"
              >
                {route.h1}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
