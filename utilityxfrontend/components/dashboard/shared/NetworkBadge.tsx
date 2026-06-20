import { cn } from "@/lib/utils";
import type { Network } from "@/lib/mock/types";

interface NetworkBadgeProps {
  network: Network;
  className?: string;
}

const networkStyles: Record<Network, { bg: string; text: string; label: string }> = {
  MTN: { bg: "#FFC857", text: "#1a1a1a", label: "MTN" },
  Airtel: { bg: "#FF5A6E", text: "#ffffff", label: "Airtel" },
  Glo: { bg: "#22c55e", text: "#ffffff", label: "Glo" },
  "9Mobile": { bg: "#22E6B8", text: "#1a1a1a", label: "9Mobile" },
};

export default function NetworkBadge({ network, className }: NetworkBadgeProps) {
  const style = networkStyles[network];
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold",
        className
      )}
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {style.label}
    </span>
  );
}
