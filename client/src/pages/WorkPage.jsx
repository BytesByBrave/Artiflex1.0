import { useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/ui/SectionHeading";
import ArrowButton from "../components/ui/ArrowButton";
import Button from "../components/ui/Button";
import useFetch from "../hooks/useFetch";
import { getProjects } from "../services/contentService";
import { cn } from "../utils/cn";

const fallbackProjects = [
  { _id: "1", slug: "studio-rebrand", title: "Studio Rebrand", client: "Creative Studio", category: "Brand Identity", year: 2026, cover: "/images/work-1.jpg" },
  { _id: "2", slug: "financeflow-platform", title: "FinanceFlow Platform", client: "FinTech Startup", category: "Digital Product", year: 2026, cover: "/images/work-2.jpg" },
  { _id: "3", slug: "aura-packaging", title: "Aura Packaging", client: "Skincare Brand", category: "Packaging", year: 2025, cover: "/images/work-3.jpg" },
  { _id: "4", slug: "pulse-app", title: "Pulse App", client: "Health & Fitness", category: "Mobile App", year: 2025, cover: "/images/work-4.jpg" },
];

const categories = ["All", "Brand Identity", "Digital Product", "Packaging", "Mobile App"];

export default function WorkPage() {
  const [selectedCat, setSelectedCat] = useState("All");
  const { data: projects } = useFetch(getProjects, fallbackProjects);

  const filteredProjects = selectedCat === "All"
    ? projects
    : projects.filter((p) => p.category.toLowerCase() === selectedCat.toLowerCase());

  return (
    <div>
      {/* Header Banner */}
      <section className="bg-spotlight relative isolate flex min-h-[48vh] flex-col justify-end px-6 pb-16 pt-36 text-white lg:px-12">
        <div className="mx-auto w-full max-w-7xl">
          <p className="mb-4 flex items-center gap-4 text-lime font-mono text-sm tracking-widest uppercase">
            <span className="h-px w-12 bg-lime" />
            Featured Case Studies
          </p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl">
            OUR <span className="text-lime">WORK.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-white/80">
            A curated portfolio of brands, digital products, and physical systems engineered to outshine the competition.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-3 border-b border-stone/20 pb-8">
          <span className="mr-3 font-mono text-xs uppercase text-stone tracking-wider">Filter:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
                selectedCat === cat
                  ? "bg-night text-white shadow-md"
                  : "bg-mist text-ink hover:bg-stone/20"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project List */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          {filteredProjects.map((p) => (
            <Link key={p._id} to={`/work/${p.slug}`} className="group block">
              <div className="overflow-hidden rounded-card bg-electric aspect-16/11 relative">
                <img
                  src={p.cover}
                  alt={p.title}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <div className="absolute top-4 right-4 rounded-full bg-night/80 px-4 py-1.5 font-mono text-xs text-lime backdrop-blur">
                  {p.year || 2026}
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-4xl text-night transition-colors group-hover:text-electric">{p.title}</h3>
                  <p className="mt-1 text-stone font-medium">{p.client} &nbsp;•&nbsp; {p.category}</p>
                </div>
                <ArrowButton tabIndex={-1} label={`View ${p.title}`} className="size-14 group-hover:rotate-45" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-24 flex flex-col items-center justify-between gap-6 rounded-card bg-lime p-12 sm:flex-row sm:p-16">
          <div>
            <h2 className="text-4xl text-night sm:text-5xl">Want your brand featured here?</h2>
            <p className="mt-2 text-lg text-ink/80">Let's craft your next digital flagship together.</p>
          </div>
          <Button as={Link} to="/book" variant="dark" size="lg" arrow>
            Start Your Project
          </Button>
        </div>
      </section>
    </div>
  );
}
