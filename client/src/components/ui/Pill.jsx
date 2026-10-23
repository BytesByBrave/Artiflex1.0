import { cn } from "../../utils/cn";

export default function Pill({ className, children }) {
  return (
    <span className={cn("inline-flex items-center rounded-full bg-white px-5 py-2 text-sm text-ink", className)}>
      {children}
    </span>
  );
}
