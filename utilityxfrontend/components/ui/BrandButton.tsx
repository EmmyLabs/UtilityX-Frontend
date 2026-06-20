import { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BrandButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export default function BrandButton({
  children,
  className,
  ...props
}: BrandButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "brand-gradient-bg w-full py-4 rounded-xl font-bold text-white",
        "shadow-lg shadow-[#5B3DF5]/20",
        "hover:opacity-90 active:scale-[0.98] transition-all",
        "flex items-center justify-center gap-2",
        "cursor-pointer",
        className
      )}
    >
      {children}
    </button>
  );
}
