import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Pill from "../components/ui/Pill";
import { getProject } from "../services/contentService";

const fallbackData = {
  "studio-rebrand": {
    title: "Studio Rebrand",
    client: "Creative Studio",
    category: "Brand Identity",
    year: 2026,
    cover: "/images/work-1.jpg",
    challenge: "The client needed a sharp, bold visual transformation to stand out in the crowded contemporary design agency landscape and command premium client retainers.",
    solution: "We engineered an avant-garde visual language combining high-contrast Swiss typography, electric blue spotlights, and neon lime interactive accents.",
    deliverables: ["Brand Identity", "Design System", "Custom Typography", "Motion Guidelines", "Stationery & Packaging"],
    results: "+180% inbound inquiries within 90 days, featured in multiple international design publications.",
  },
  "financeflow-platform": {
    title: "FinanceFlow Platform",
    client: "FinTech Startup",
    category: "Digital Product",
    year: 2026,
    cover: "/images/work-2.jpg",
    challenge: "Complex institutional liquidity data was causing cognitive fatigue for analysts and slowing execution times down significantly.",
    solution: "We re-architected the entire multi-tenant dashboard with a modular widget framework, dark mode ergonomics, and sub-100ms real-time chart latency.",
    deliverables: ["UX Architecture", "React Component Library", "Real-Time Visualizations", "Design Tokens"],
    results: "Reduced user task completion time by 42% and secured $14M Series A funding post-launch.",
  },
  "aura-packaging": {
    title: "Aura Packaging",
    client: "Skincare Brand",
    category: "Packaging",
    year: 2025,
    cover: "/images/work-3.jpg",
    challenge: "A premium organic botanical brand needed structural packaging that aligned with zero-waste principles without sacrificing high-end luxury appeal.",
    solution: "Custom tactile embossed bottles crafted from post-consumer recycled glass and limestone-infused stone paper boxes, complemented by understated editorial typography.",
    deliverables: ["Structural 3D Packaging", "Materials Sourcing Spec", "Foil & Emboss Tooling", "Unboxing Experience"],
    results: "Won the 2025 Eco-Design Excellence Award and sold out the initial 50,000 unit production batch in 3 weeks.",
  },
  "pulse-app": {
    title: "Pulse App",
    client: "Health & Fitness",
    category: "Mobile App",
    year: 2025,
    cover: "/images/work-4.jpg",
    challenge: "Athletes and fitness enthusiasts struggled with cluttered health metrics that failed to provide actionable daily recovery guidance.",
    solution: "Designed a luminous, glanceable mobile experience featuring biometric activity rings, kinetic heart-rate waveforms, and adaptive AI coaching insights.",
    deliverables: ["iOS & Android App Design", "Micro-Interactions", "Haptic Feedback Spec", "Wearable Companion UI"],
    results: "4.9 App Store rating across 15,000+ reviews with 84% 30-day retention rate.",
  },
};

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getProject(slug)
      .then((data) => {
        if (active && data) setProject(data);
      })
      .catch(() => {
        // use fallback if backend error
        if (active && fallbackData[slug]) {
          setProject(fallbackData[slug]);
        }
      })
      .finally(() => {
        if (active) {
          // If no data from API, check local fallback
          setProject((prev) => prev || fallbackData[slug] || fallbackData["studio-rebrand"]);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading && !project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-night text-white">
        <p className="font-display text-2xl tracking-widest animate-pulse">LOADING PROJECT...</p>
      </div>
    );
  }

  const p = project || fallbackData[slug] || fallbackData["studio-rebrand"];
  const details = fallbackData[slug] || fallbackData["studio-rebrand"];

  return (
    <div>
      {/* Banner */}
      <section className="bg-spotlight relative isolate flex min-h-[55vh] flex-col justify-end px-6 pb-16 pt-36 text-white lg:px-12">
        <div className="mx-auto w-full max-w-7xl">
          <Link to="/work" className="mb-6 inline-flex items-center gap-2 text-lime font-mono text-sm tracking-wider hover:underline">
            ← Back to all projects
          </Link>
          <div className="flex flex-wrap items-center gap-4 text-white/70 font-mono text-sm">
            <span>{p.client}</span>
            <span>•</span>
            <span className="text-lime">{p.category}</span>
            <span>•</span>
            <span>{p.year || 2026}</span>
          </div>
          <h1 className="mt-4 text-6xl sm:text-7xl lg:text-8xl">
            {p.title}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        {/* Cover Image */}
        <div className="overflow-hidden rounded-card bg-electric shadow-2xl">
          <img
            src={p.cover}
            alt={p.title}
            className="w-full object-cover max-h-[700px]"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>

        {/* Overview Grid */}
        <div className="mt-20 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-12">
            <div>
              <h2 className="text-4xl text-night sm:text-5xl">The Challenge</h2>
              <p className="mt-4 text-xl leading-relaxed text-ink/80">
                {p.challenge || details.challenge}
              </p>
            </div>

            <div>
              <h2 className="text-4xl text-night sm:text-5xl">Our Solution</h2>
              <p className="mt-4 text-xl leading-relaxed text-ink/80">
                {p.solution || details.solution}
              </p>
            </div>

            <div className="rounded-card bg-mist p-8 sm:p-10">
              <h3 className="text-2xl text-night">Key Results &amp; Impact</h3>
              <p className="mt-3 text-lg font-medium text-electric">
                {p.results || details.results}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 lg:border-l lg:border-stone/20 lg:pl-10 space-y-8">
            <div>
              <h4 className="font-mono text-xs uppercase text-stone tracking-widest">Client</h4>
              <p className="mt-2 text-2xl font-display text-night">{p.client}</p>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase text-stone tracking-widest">Discipline</h4>
              <p className="mt-2 text-2xl font-display text-night">{p.category}</p>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase text-stone tracking-widest">Year</h4>
              <p className="mt-2 text-2xl font-display text-night">{p.year || 2026}</p>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase text-stone tracking-widest">Deliverables</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {(details.deliverables || []).map((d) => (
                  <Pill key={d} className="bg-night text-white">{d}</Pill>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <Button as={Link} to="/book" arrow className="w-full">
                Start Similar Project
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-24 flex items-center justify-between border-t border-stone/20 pt-10">
          <Button as={Link} to="/work" variant="white">
            ← All Case Studies
          </Button>
          <Button as={Link} to="/contact" arrow>
            Inquire About This Work
          </Button>
        </div>
      </section>
    </div>
  );
}
