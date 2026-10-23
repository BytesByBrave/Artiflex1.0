import { Link } from "react-router-dom";
import SectionHeading from "../components/ui/SectionHeading";
import ArrowButton from "../components/ui/ArrowButton";
import Pill from "../components/ui/Pill";
import Button from "../components/ui/Button";
import useFetch from "../hooks/useFetch";
import { getServices } from "../services/contentService";
import { cn } from "../utils/cn";

const fallbackServices = [
  {
    _id: "1",
    title: "Brand Identity",
    description: "We craft distinctive brand identities that capture your essence and resonate deeply with your target audience. From strategic positioning to comprehensive visual systems, we build brands that stand the test of time and drive lasting impact.",
    tags: ["Brand Strategy", "Visual Identity", "Logo Design", "Brand Guidelines", "Naming"],
    image: "/images/cube-1.png",
  },
  {
    _id: "2",
    title: "Digital Product Design",
    description: "User-centered design that seamlessly blends beautiful interfaces with intuitive experiences. Through rigorous research, prototyping, and testing, we create digital products that users love and that deliver measurable business results.",
    tags: ["UX Research", "UI Design", "Prototyping", "Design Systems", "Usability Testing"],
    image: "/images/cube-2.png",
  },
  {
    _id: "3",
    title: "Web Development",
    description: "High-performance, scalable web applications built with cutting-edge technologies. We transform designs into pixel-perfect, responsive experiences that work flawlessly across all devices and deliver exceptional user experiences.",
    tags: ["Frontend", "CMS", "API Integration", "Performance"],
    image: "/images/cube-3.png",
  },
];

const processSteps = [
  { step: "01", title: "Discovery & Strategy", desc: "We deep-dive into your market, competitors, and audience to uncover distinct opportunities." },
  { step: "02", title: "Concept & Exploration", desc: "We develop multiple artistic directions, challenging boundaries while staying true to your core mission." },
  { step: "03", title: "Design & Systems", desc: "Pixel-perfect execution across every touchpoint, backed by scalable systems and clear guidelines." },
  { step: "04", title: "Deployment & Growth", desc: "Production-ready engineering and launch support that ensures maximum adoption and measurable ROI." },
];

export default function ServicesPage() {
  const { data: services } = useFetch(getServices, fallbackServices);

  return (
    <div>
      {/* Header Banner */}
      <section className="bg-spotlight relative isolate flex min-h-[48vh] flex-col justify-end px-6 pb-16 pt-36 text-white lg:px-12">
        <div className="mx-auto w-full max-w-7xl">
          <p className="mb-4 flex items-center gap-4 text-lime font-mono text-sm tracking-widest uppercase">
            <span className="h-px w-12 bg-lime" />
            Capabilities &amp; Solutions
          </p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl">
            OUR <span className="text-lime">SERVICES.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-white/80">
            End-to-end design and engineering solutions tailored for brands ready to lead their industries.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <div className="space-y-8">
          {services.map((s, i) => (
            <article
              key={s._id}
              className={cn(
                "relative overflow-hidden rounded-card p-8 sm:p-14 transition-all duration-300 hover:shadow-2xl",
                i % 2 === 1 ? "bg-lime" : "bg-mist"
              )}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <span className="font-mono text-sm uppercase tracking-wider text-night/60">Service // 0{i + 1}</span>
                  <h2 className="mt-2 text-5xl text-night sm:text-6xl">{s.title}</h2>
                </div>
                <ArrowButton tone={i % 2 === 1 ? "white" : "lime"} label={`Book ${s.title}`} onClick={() => window.location.href = '/book'} />
              </div>

              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink/80 lg:max-w-[65%]">
                {s.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3 lg:max-w-[65%]">
                {s.tags.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>

              <img
                src={s.image}
                alt=""
                className="pointer-events-none absolute -bottom-6 right-6 hidden w-72 lg:block drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </article>
          ))}
        </div>

        {/* Process Section */}
        <div className="mt-28">
          <SectionHeading
            eyebrow="Our Process"
            title="How We"
            accent="Deliver Results"
            aside="A proven 4-stage methodology built to ensure flawless execution and transformative design outcomes."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((p) => (
              <div key={p.step} className="rounded-card border border-stone/20 bg-mist p-8 flex flex-col justify-between">
                <div>
                  <span className="font-display text-5xl text-electric">{p.step}</span>
                  <h3 className="mt-4 text-2xl text-night">{p.title}</h3>
                  <p className="mt-3 text-sm text-ink/70 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 rounded-card bg-night p-12 text-center text-white sm:p-16">
          <h2 className="text-5xl sm:text-6xl">Have a project in mind?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
            Let’s discuss your objectives, timeline, and how our team can bring your vision to life.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button as={Link} to="/book" size="lg" arrow>Schedule Consultation</Button>
            <Button as={Link} to="/contact" variant="white" size="lg">Contact Us</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
