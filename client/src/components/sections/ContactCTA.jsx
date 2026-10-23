import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function ContactCTA() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-10 px-6 pt-24 lg:flex-row lg:items-start lg:justify-between lg:px-12">
      <div>
        <h2 className="max-w-3xl text-6xl sm:text-7xl lg:text-8xl">
          Ready to create something artistic
        </h2>
        <p className="mt-4 max-w-lg text-lg text-white/70">
          Let Artiflex turn your vision into an unforgettable creative masterpiece — bold, expressive, and built to last.
        </p>
      </div>
      <div className="flex flex-col gap-3 lg:items-end">
        <Button as="a" href="mailto:hello@artiflex.studio">✉ hello@artiflex.studio</Button>
        <Button as={Link} to="/book" variant="white" arrow>Schedule a Call</Button>
      </div>
    </section>
  );
}
