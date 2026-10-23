import { Link } from "react-router-dom";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="bg-spotlight relative isolate flex min-h-screen flex-col justify-end overflow-hidden text-white">
      {/* Portrait: drop your image at /public/images/hero.jpg (blue-lit, right-aligned) */}
      <img
        src="/images/hero.jpg"
        alt=""
        className="absolute inset-y-0 right-0 -z-10 h-full w-full object-cover object-right opacity-90 lg:w-3/5"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <Badge className="mb-24">Available for new projects</Badge>

        <h1 className="max-w-3xl text-4xl normal-case leading-tight tracking-normal font-body font-medium sm:text-5xl">
          A studio crafting distinctive brands with purpose, clarity, and creativity.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/80">
          We partner with ambitious brands to create digital experiences that inspire, engage, and convert. Strategy meets creativity.
        </p>

        <Button as={Link} to="/work" size="lg" arrow className="mt-10">
          Explore Our Work
        </Button>
      </div>

      <div className="mt-10 text-center px-6 lg:px-12">
        <p
          aria-hidden="true"
          className="select-none whitespace-nowrap bg-gradient-to-b from-white to-white/70 bg-clip-text font-display text-[19vw] leading-[0.85] text-transparent"
        >
          ARTISTIC
        </p>
        <p className="mt-4 font-body text-base tracking-[0.4em] text-white/50 uppercase">
          Where every pixel tells your story
        </p>
      </div>
    </section>
  );
}
