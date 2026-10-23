import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <div className="bg-spotlight min-h-screen flex flex-col items-center justify-center text-center px-6 text-white">
      <p className="font-mono text-lime tracking-widest uppercase text-sm">Error 404</p>
      <h1 className="mt-4 text-8xl sm:text-9xl text-white font-display">PAGE NOT FOUND</h1>
      <p className="mt-6 max-w-md text-lg text-white/80">
        The destination you are attempting to reach does not exist or has been shifted in coordinate space.
      </p>
      <div className="mt-10">
        <Button as={Link} to="/" size="lg" arrow>
          Return to Headquarters
        </Button>
      </div>
    </div>
  );
}
