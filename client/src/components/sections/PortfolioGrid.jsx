import { Link } from "react-router-dom";
import SectionHeading from "../ui/SectionHeading";
import ArrowButton from "../ui/ArrowButton";
import Button from "../ui/Button";
import { cn } from "../../utils/cn";
import useFetch from "../../hooks/useFetch";
import { getProjects } from "../../services/contentService";

const fallback = [
  { _id: "1", slug: "studio-rebrand", title: "Studio Rebrand", client: "Creative Studio", category: "Brand Identity", cover: "/images/work-1.jpg" },
  { _id: "2", slug: "financeflow-platform", title: "FinanceFlow Platform", client: "FinTech Startup", category: "Digital Product", cover: "/images/work-2.jpg" },
  { _id: "3", slug: "aura-packaging", title: "Aura Packaging", client: "Skincare Brand", category: "Packaging", cover: "/images/work-3.jpg" },
  { _id: "4", slug: "pulse-app", title: "Pulse App", client: "Health & Fitness", category: "Mobile App", cover: "/images/work-4.jpg" },
];

// Bento rhythm: big-left / small-right, then small-left / big-right
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];
const heights = ["aspect-[4/5]", "aspect-[4/3]", "aspect-[4/3]", "aspect-[4/5]"];

export default function PortfolioGrid() {
  const { data: projects } = useFetch(getProjects, fallback);

  return (
    <section id="work" className="mx-auto max-w-7xl px-6 pb-28 lg:px-12">
      <div className="flex items-end justify-between gap-6">
        <SectionHeading eyebrow="Portfolio" title="Selected" accent="work" />
        <Button as={Link} to="/work" arrow className="hidden sm:inline-flex">View All Projects</Button>
      </div>

      <div className="mt-16 grid gap-x-8 gap-y-14 lg:grid-cols-12">
        {projects.slice(0, 4).map((p, i) => (
          <Link key={p._id} to={`/work/${p.slug}`} className={cn("group", spans[i])}>
            <div className={cn("overflow-hidden rounded-card bg-electric", heights[i])}>
              <img
                src={p.cover}
                alt={p.title}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
            <div className="mt-5 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-4xl text-night">{p.title}</h3>
                <p className="mt-1 text-stone">{p.client} &nbsp;•&nbsp; {p.category}</p>
              </div>
              <ArrowButton tabIndex={-1} label={`Open ${p.title}`} className="size-14" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
