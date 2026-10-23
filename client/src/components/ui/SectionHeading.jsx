import { cn } from "../../utils/cn";

// Eyebrow line + two-tone display title: "WHAT WE" + "DO BEST"
export default function SectionHeading({ eyebrow, title, accent, aside, className }) {
  return (
    <header className={cn("flex flex-col gap-8 md:flex-row md:items-end md:justify-between", className)}>
      <div>
        {eyebrow && (
          <p className="mb-4 flex items-center gap-4 text-stone">
            <span className="h-px w-16 bg-stone" />
            {eyebrow}
          </p>
        )}
        <h2 className="text-6xl text-night sm:text-7xl lg:text-8xl">
          {title} {accent && <span className="text-stone">{accent}</span>}
        </h2>
      </div>
      {aside && <div className="max-w-sm text-lg leading-relaxed text-stone">{aside}</div>}
    </header>
  );
}
