"use client";

import { usePathname } from "next/navigation";
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
  "/dashboard/wallet": "Wallet",
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
      {/* Page Title */}
      <h1 className="text-lg font-bold text-white">{title}</h1>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
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
