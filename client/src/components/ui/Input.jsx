import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const Input = forwardRef(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-14 w-full rounded-full border border-white/20 bg-white/10 px-6 text-white placeholder:text-white/50 focus:border-lime focus:outline-none",
        className
      )}
      {...props}
    />
  );
});

export default Input;
