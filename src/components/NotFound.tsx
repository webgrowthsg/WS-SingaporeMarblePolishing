import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <p className="font-serif text-6xl font-bold text-stone-300">404</p>
      <h1 className="mt-4 font-serif text-2xl font-bold text-stone-800">
        Page Not Found
      </h1>
      <p className="mt-3 text-stone-600">
        The page you're looking for doesn't exist. Please check the URL or
        return to the homepage.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center rounded-md bg-sage-600 px-5 py-2.5 text-sm font-medium text-stone-50 hover:bg-sage-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
