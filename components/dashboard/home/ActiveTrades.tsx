import SectionHeader from "@/components/dashboard/shared/SectionHeader";
import { cn } from "@/lib/utils";

interface StatItem {
  label: string;
  value: number;
  icon: string;
  iconColor: string;
  bgColor: string;
}

const stats: StatItem[] = [
  {
    label: "Active Trades",
    value: 3,
    icon: "swap_horiz",
    iconColor: "#5B3DF5",
    bgColor: "rgba(91, 61, 245, 0.15)",
  },
  {
    label: "Completed",
    value: 47,
    icon: "check_circle",
    iconColor: "#22E6B8",
    bgColor: "rgba(34, 230, 184, 0.15)",
  },
  {
    label: "Pending Escrow",
    value: 18500,
    icon: "account_balance_wallet",
    iconColor: "#FFC857",
    bgColor: "rgba(255, 200, 87, 0.15)",
    isCurrency: true,
  },
  {
    label: "Disputes",
    value: 0,
    icon: "warning",
    iconColor: "#FF5A6E",
    bgColor: "rgba(255, 90, 110, 0.15)",
  },
];

export default function ActiveTrades() {
  return (
    <div>
      <SectionHeader title="Active Trades" seeAllHref="/dashboard/trades" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[16px] p-4 border"
            style={{ backgroundColor: "#131A2E", borderColor: "#1E2742" }}
          >
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center mb-2"
              style={{ backgroundColor: stat.bgColor }}
            >
              <span
                className="material-symbols-outlined text-xl"
                style={{ color: stat.iconColor }}
              >
                {stat.icon}
              </span>
            </div>
            <p className="text-lg font-bold text-white mb-0.5">
              {stat.isCurrency ? `₦${stat.value.toLocaleString()}` : stat.value}
            </p>
            <p className="text-xs" style={{ color: "#8A94A6" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
