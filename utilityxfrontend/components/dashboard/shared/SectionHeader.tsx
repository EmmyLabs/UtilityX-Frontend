import Link from "next/link";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  seeAllHref?: string;
  className?: string;
}

export default function SectionHeader({
  title,
  seeAllHref,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      <h2 className="text-base font-semibold text-white">{title}</h2>
      {seeAllHref && (
        <Link
          href={seeAllHref}
          className="text-sm font-medium"
          style={{ color: "#5B3DF5" }}
        >
          See All
        </Link>
      )}
    </div>
  );
}
