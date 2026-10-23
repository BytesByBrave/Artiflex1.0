import SectionHeading from "../ui/SectionHeading";
import ArrowButton from "../ui/ArrowButton";
import Pill from "../ui/Pill";
import { cn } from "../../utils/cn";
import useFetch from "../../hooks/useFetch";
import { getServices } from "../../services/contentService";

const fallback = [
  {
    _id: "1",
    title: "Brand Identity",
    description:
      "We craft distinctive brand identities that capture your essence and resonate deeply with your target audience. From strategic positioning to comprehensive visual systems, we build brands that stand the test of time and drive lasting impact.",
    tags: ["Brand Strategy", "Visual Identity", "Logo Design", "Brand Guidelines", "Naming"],
    image: "/images/cube-1.png",
  },
  {
    _id: "2",
    title: "Digital Product Design",
    description:
      "User-centered design that seamlessly blends beautiful interfaces with intuitive experiences. Through rigorous research, prototyping, and testing, we create digital products that users love and that deliver measurable business results.",
    tags: ["UX Research", "UI Design", "Prototyping", "Design Systems", "Usability Testing"],
    image: "/images/cube-2.png",
  },
  {
    _id: "3",
    title: "Web Development",
    description:
      "High-performance, scalable web applications built with cutting-edge technologies. We transform designs into pixel-perfect, responsive experiences that work flawlessly across all devices and deliver exceptional user experiences.",
    tags: ["Frontend", "CMS", "API Integration", "Performance"],
    image: "/images/cube-3.png",
  },
];

export default function ServicesList() {
  const { data: services } = useFetch(getServices, fallback);

  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-28 lg:px-12">
      <SectionHeading
        eyebrow="Services"
        title="What we"
        accent="do best"
        aside="Comprehensive services designed to elevate your brand and accelerate growth through strategic design excellence."
      />

      <div className="mt-16 space-y-6">
        {services.map((s, i) => (
          <article
            key={s._id}
            className={cn(
              "relative overflow-hidden rounded-card p-8 sm:p-12",
              i % 2 === 1 ? "bg-lime" : "bg-mist"
            )}
          >
            <div className="flex items-start justify-between gap-6">
              <h3 className="text-5xl text-night sm:text-6xl">{s.title}</h3>
              <ArrowButton tone={i % 2 === 1 ? "white" : "lime"} label={`View ${s.title}`} />
            </div>

            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink/80 lg:max-w-[65%]">{s.description}</p>

            <ul className="mt-8 flex flex-wrap gap-3 lg:max-w-[65%]">
              {s.tags.map((t) => (
                <li key={t}><Pill>{t}</Pill></li>
              ))}
            </ul>

            <img
              src={s.image}
              alt=""
              className="pointer-events-none absolute -bottom-6 right-0 hidden w-72 lg:block"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
