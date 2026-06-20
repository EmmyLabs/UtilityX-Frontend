import { cn } from "@/lib/utils";

interface StatBadgeProps {
  value: string | number;
  variant?: "success" | "danger" | "warning" | "info";
  className?: string;
}

const variantStyles: Record<string, string> = {
  success: "bg-[#22E6B8]/15 text-[#22E6B8]",
  danger: "bg-[#FF5A6E]/15 text-[#FF5A6E]",
  warning: "bg-[#FFC857]/15 text-[#FFC857]",
  info: "bg-[#5B3DF5]/15 text-[#5B3DF5]",
};

export default function StatBadge({
  value,
  variant = "success",
  className,
}: StatBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold",
        variantStyles[variant],
        className
      )}
    >
      {value}
    </span>
  );
}
