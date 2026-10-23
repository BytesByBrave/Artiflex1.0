import { cn } from "../../utils/cn";

// "Available for new projects" status chip with a lime dot
export default function Badge({ className, children }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur", className)}>
      <span className="size-2 rounded-full bg-lime" />
      {children}
    </span>
  );
}
