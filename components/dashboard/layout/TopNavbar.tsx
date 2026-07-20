"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

interface TopNavbarProps {
  notificationCount?: number;
  sidebarCollapsed?: boolean;
}

const pageTitles: Record<string, { title: string; subtitle?: string }> = {
  "/dashboard": { title: "Home" },
  "/dashboard/market": { title: "Marketplace" },
  "/dashboard/trades": { title: "My Trades" },
  "/dashboard/swap": { title: "Swap", subtitle: "Swap your crypto to Naira or other crypto instantly" },
  "/dashboard/profile": { title: "Profile" },
};

export default function TopNavbar({
  notificationCount = 0,
  sidebarCollapsed = false,
}: TopNavbarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  const pageInfo = pageTitles[pathname] ?? { title: "Dashboard" };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-16 flex items-center justify-between px-6 border-b transition-all duration-300",
        "hidden md:flex"
      )}
      style={{
        left: sidebarCollapsed ? "64px" : "240px",
        backgroundColor: "#0B1020",
        borderColor: "#1E2742",
      }}
    >
      {/* Left: Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">{pageInfo.title}</h1>
        {pageInfo.subtitle && (
          <p className="text-sm mt-1" style={{ color: "#C8D1E6" }}>{pageInfo.subtitle}</p>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative w-12 h-12 flex items-center justify-center rounded-xl border hover:bg-[#1E2742] transition-colors" style={{ backgroundColor: "#131A2E", borderColor: "#1E2742" }}>
          <span
            className="material-symbols-outlined text-xl"
            style={{ color: "#C8D1E6" }}
          >
            notifications
          </span>
          {notificationCount > 0 && (
            <span
              className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
              style={{ backgroundColor: "#FF5A6E" }}
            >
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </button>

        {/* Wallet Balance */}
        <Link
          href="/dashboard/wallet"
          className="flex items-center gap-3 px-5 py-3 rounded-xl border hover:border-[#5B3DF5]/50 transition-colors"
          style={{
            backgroundColor: "#131A2E",
            borderColor: "#1E2742",
          }}
        >
          <div className="text-right">
            <span className="text-base font-semibold text-white">₦125,000.00</span>
            <p className="text-xs" style={{ color: "#8A94A6" }}>Wallet Balance</p>
          </div>
          <span
            className="material-symbols-outlined text-xl"
            style={{ color: "#8A94A6" }}
          >
            expand_more
          </span>
        </Link>

        {/* User Avatar */}
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full overflow-hidden border" style={{ borderColor: "#22E6B8" }}>
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces" 
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className="material-symbols-outlined text-xl"
            style={{ color: "#8A94A6" }}
          >
            expand_more
          </span>
        </div>
      </div>
    </header>
  );
}
