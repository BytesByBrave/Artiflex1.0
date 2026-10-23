import { cn } from "../../utils/cn";

const variants = {
  lime: "bg-lime text-night hover:bg-lime-dark",
  white: "bg-white text-night hover:bg-mist",
  dark: "bg-night text-white hover:bg-ink",
  outline: "border border-night text-night hover:bg-night hover:text-white",
};

const sizes = {
  md: "h-12 px-6 text-base",
  lg: "h-14 px-8 text-lg",
};

export default function Button({
  as: Tag = "button",
  variant = "lime",
  size = "md",
  arrow = false,
  className,
  children,
  ...props
}) {
  return (
    <Tag
      className={cn(
        "inline-flex items-center justify-center gap-3 rounded-full font-medium transition-colors duration-200",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
      {arrow && <span aria-hidden="true">↗</span>}
    </Tag>
  );
}
