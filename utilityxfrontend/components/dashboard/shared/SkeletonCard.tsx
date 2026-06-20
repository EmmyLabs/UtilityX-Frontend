import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
  lines?: number;
}

export default function SkeletonCard({ className, lines = 3 }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "rounded-[16px] p-4 animate-pulse",
        className
      )}
      style={{ backgroundColor: "#131A2E" }}
    >
      <div
        className="h-4 rounded-full mb-3 w-3/4"
        style={{ backgroundColor: "#1E2742" }}
      />
      {Array.from({ length: lines - 1 }).map((_, i) => (
        <div
          key={i}
          className="h-3 rounded-full mb-2"
          style={{
            backgroundColor: "#1E2742",
            width: i % 2 === 0 ? "100%" : "60%",
          }}
        />
      ))}
    </div>
  );
}

export function SkeletonRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 p-3 animate-pulse", className)}>
      <div
        className="w-10 h-10 rounded-full flex-shrink-0"
        style={{ backgroundColor: "#1E2742" }}
      />
      <div className="flex-1">
        <div
          className="h-3 rounded-full mb-2 w-1/2"
          style={{ backgroundColor: "#1E2742" }}
        />
        <div
          className="h-3 rounded-full w-1/3"
          style={{ backgroundColor: "#1E2742" }}
        />
      </div>
      <div
        className="h-4 rounded-full w-16"
        style={{ backgroundColor: "#1E2742" }}
      />
    </div>
  );
}
