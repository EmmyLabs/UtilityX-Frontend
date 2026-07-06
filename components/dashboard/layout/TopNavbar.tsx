"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

interface TopNavbarProps {
  notificationCount?: number;
  sidebarCollapsed?: boolean;
}

const pageTitles: Record<string, string> = {
  "/dashboard": "Home",
  "/dashboard/market": "Marketplace",
  "/dashboard/trades": "My Trades",
  "/dashboard/swap": "Swap",
  "/dashboard/profile": "Profile",
};

export default function TopNavbar({
  notificationCount = 0,
  sidebarCollapsed = false,
}: TopNavbarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  const title = pageTitles[pathname] ?? "Dashboard";

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
      {/* Left: Page Title + Search */}
      <div className="flex items-center gap-6 flex-1">
        <h1 className="text-lg font-bold text-white">{title}</h1>

        {/* Search Bar */}
        <div className="relative max-w-md w-full">
          <span
            className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-xl"
            style={{ color: "#8A94A6" }}
          >
            search
          </span>
          <input
            type="text"
            placeholder="Search services, transactions..."
            className="w-full pl-10 pr-4 py-2 rounded-xl text-sm border focus:outline-none focus:border-[#5B3DF5]/50"
            style={{
              backgroundColor: "#131A2E",
              borderColor: "#1E2742",
              color: "#FFFFFF",
            }}
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Wallet Shortcut */}
        <Link
          href="/dashboard/wallet"
          className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl border hover:border-[#5B3DF5]/50 transition-colors"
          style={{
            backgroundColor: "#131A2E",
            borderColor: "#1E2742",
          }}
        >
          <span
            className="material-symbols-outlined text-xl"
            style={{ color: "#22E6B8" }}
          >
            account_balance_wallet
          </span>
          <span className="text-sm font-semibold text-white">₦125,000</span>
        </Link>

        {/* Messages Icon */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#1E2742] transition-colors">
          <span
            className="material-symbols-outlined text-xl"
            style={{ color: "#C8D1E6" }}
          >
            chat
          </span>
        </button>

        {/* Notification Bell */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#1E2742] transition-colors">
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

        {/* User Avatar */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full brand-gradient-bg flex items-center justify-center text-white text-xs font-bold">
            {initials}
          </div>
          <span className="text-sm font-medium text-white hidden lg:block">
            {user?.name?.split(" ")[0] ?? "User"}
          </span>
        </div>
      </div>
    </header>
  );
}
