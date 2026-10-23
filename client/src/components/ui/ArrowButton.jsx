import { cn } from "../../utils/cn";

// Circular ↗ button used on service + project cards
export default function ArrowButton({ tone = "lime", className, label = "Open", ...props }) {
  return (
    <button
      aria-label={label}
      className={cn(
        "grid size-16 shrink-0 place-items-center rounded-full text-2xl text-night transition-transform duration-200 hover:rotate-45",
        tone === "lime" ? "bg-lime" : "bg-white",
        className
      )}
      {...props}
    >
      ↗
    </button>
  );
}
