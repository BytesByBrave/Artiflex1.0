import SectionHeading from "../ui/SectionHeading";
import Pill from "../ui/Pill";

export default function LeadershipBento() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 pb-28 lg:px-12">
      <SectionHeading
        eyebrow="Leadership"
        title="Man behind"
        accent="work"
        aside="Comprehensive services designed to elevate your brand and accelerate growth through strategic design excellence."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        {/* Founder */}
        <article className="overflow-hidden rounded-card bg-ink text-white lg:row-span-2">
          <div className="bg-spotlight-soft aspect-[4/4.2]">
            <img
              src="/images/founder.jpg"
              alt="Alex Thompson"
              className="size-full object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
          <div className="p-8">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h3 className="text-5xl">Alex Thompson</h3>
              <p className="text-white/80">Founder &amp; Creative Director</p>
            </div>
            <p className="mt-5 text-lg text-white/80">
              With 15+ years of experience leading creative strategy for Fortune 500 companies and innovative startups across the globe.
            </p>
            <div className="mt-8 flex gap-3">
              <Pill className="text-night">15+ Awards</Pill>
              <Pill className="text-night">250+ Projects</Pill>
            </div>
          </div>
        </article>

        {/* Mission */}
        <article className="bg-spotlight-soft flex min-h-80 flex-col justify-end rounded-card p-8 text-white">
          <h3 className="text-4xl">Our Mission</h3>
          <p className="mt-4 text-lg leading-relaxed text-white/85">
            Our mission is to empower brands through outstanding design that not only drives significant business results but also fosters enduring connections with their audiences.
          </p>
        </article>

        {/* Stats */}
        <article className="flex min-h-80 flex-col justify-between rounded-card bg-lime p-8">
          <div>
            <p className="font-display text-8xl text-night">100%</p>
            <p className="text-ink/70">On-time delivery rate</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6">
            <div>
              <p className="font-display text-7xl text-night">24/7</p>
              <p className="text-ink/70">Dedicated support</p>
            </div>
            <div>
              <p className="font-display text-7xl text-night">15</p>
              <p className="text-ink/70">Countries served worldwide</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
