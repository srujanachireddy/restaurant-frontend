import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center animate-fade-up">
      <p className="text-9xl font-black font-display text-stone-200 mb-4">
        404
      </p>
      <h2 className="text-2xl font-bold text-stone-700 mb-2">Page not found</h2>
      <p className="text-stone-400 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/menu">
        <Button size="lg">Back to Menu</Button>
      </Link>
    </div>
  </div>
);
