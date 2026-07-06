import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  className?: string;
}

export default function SocialButton({
  icon,
  label,
  className,
  ...props
}: SocialButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "bg-[#131A2E] border border-[#1E2742] rounded-xl py-3",
        "flex items-center justify-center gap-3",
        "hover:bg-[#18233F] transition-colors cursor-pointer",
        className
      )}
    >
      {icon}
      <span className="text-sm font-semibold text-white">{label}</span>
    </button>
  );
}
