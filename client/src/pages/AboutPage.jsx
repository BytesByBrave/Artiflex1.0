import { Link } from "react-router-dom";
import SectionHeading from "../components/ui/SectionHeading";
import Pill from "../components/ui/Pill";
import Button from "../components/ui/Button";
import LeadershipBento from "../components/sections/LeadershipBento";

const values = [
  {
    title: "Radical Clarity",
    description: "We cut through noise. Every design choice and line of code must serve a defined, undeniable purpose.",
  },
  {
    title: "Bold Craftsmanship",
    description: "Good enough is never acceptable. We obsess over the micro-interactions, typographic rhythm, and performance.",
  },
  {
    title: "Measurable Impact",
    description: "Aesthetics must translate into business momentum, retention, conversion, and cultural resonance.",
  },
  {
    title: "Relentless Curiosity",
    description: "We embrace cutting-edge technology, experimental layouts, and future-proof design systems.",
  },
];

const clients = [
  "Acme Global", "Vanguard Health", "Aether Robotics", "Hyperion Media", 
  "Kinetix Sports", "Lumina Optics", "Monolith Ventures", "Solstice AI"
];

export default function AboutPage() {
  return (
    <div>
      {/* Header Banner */}
      <section className="bg-spotlight relative isolate flex min-h-[48vh] flex-col justify-end px-6 pb-16 pt-36 text-white lg:px-12">
        <div className="mx-auto w-full max-w-7xl">
          <p className="mb-4 flex items-center gap-4 text-lime font-mono text-sm tracking-widest uppercase">
            <span className="h-px w-12 bg-lime" />
            Who We Are
          </p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl">
            ABOUT <span className="text-lime">ARTIFLEX.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-white/80">
            An independent design and digital innovation studio creating industry-defining brands for forward-thinking pioneers.
          </p>
        </div>
      </section>

      {/* Leadership Bento Section */}
      <div className="pt-20">
        <LeadershipBento />
      </div>

      {/* Studio Philosophy / Values */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <SectionHeading
          eyebrow="Our DNA"
          title="Core"
          accent="Principles"
          aside="The non-negotiable fundamentals that guide our craft, our partnerships, and our collective pursuit of excellence."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <div key={v.title} className="rounded-card bg-mist p-8 flex flex-col justify-between border border-stone/20">
              <div>
                <span className="font-mono text-xs uppercase text-stone tracking-widest">0{i + 1} // Value</span>
                <h3 className="mt-4 text-3xl text-night">{v.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink/80">{v.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Global Clients */}
        <div className="mt-28 rounded-card bg-night p-12 text-white sm:p-16">
          <p className="font-mono text-xs uppercase tracking-widest text-lime">Trusted By Innovators</p>
          <h2 className="mt-3 text-5xl sm:text-6xl">Global Collaborators</h2>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {clients.map((c) => (
              <div key={c} className="flex h-20 items-center justify-center rounded-2xl bg-white/5 border border-white/10 px-4 text-center font-display text-2xl tracking-wider text-white/80">
                {c}
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Button as={Link} to="/contact" size="lg" arrow>
              Work With Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
