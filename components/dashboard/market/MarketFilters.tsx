"use client";

import { cn } from "@/lib/utils";

interface FilterTab {
  value: string;
  label: string;
}

const filters: FilterTab[] = [
  { value: "all", label: "All" },
  { value: "airtime", label: "Airtime" },
  { value: "data", label: "Data" },
  { value: "gift-card", label: "Gift Cards" },
  { value: "buy", label: "Buy" },
  { value: "sell", label: "Sell" },
];

interface MarketFiltersProps {
  active: string;
  onChange: (value: string) => void;
}

export default function MarketFilters({ active, onChange }: MarketFiltersProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={cn(
            "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all",
            active === f.value
              ? "brand-gradient-bg text-white shadow-lg shadow-[#5B3DF5]/20"
              : "border text-[#8A94A6] hover:text-white hover:border-[#5B3DF5]/50"
          )}
          style={
            active !== f.value
              ? { backgroundColor: "#131A2E", borderColor: "#1E2742" }
              : {}
          }
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
