"use client";

import { useState } from "react";
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import BottomNav from "./BottomNav";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  children: ReactNode;
  notificationCount?: number;
}

export default function DashboardShell({
  children,
  notificationCount = 0,
}: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0B1020" }}>
      {/* Sidebar — hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((prev) => !prev)}
        />
      </div>

      {/* Top Navbar — hidden on mobile */}
      <TopNavbar
        notificationCount={notificationCount}
        sidebarCollapsed={collapsed}
      />

      {/* Main Content */}
      <main
        className={cn(
          "min-h-screen transition-all duration-300",
          // Desktop/tablet: offset by sidebar
          "md:pt-16",
          collapsed ? "md:pl-16" : "md:pl-60",
          // Mobile: full width, padded bottom for bottom nav
          "pb-20 md:pb-0"
        )}
      >
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </main>

      {/* Bottom Nav — mobile only */}
      <BottomNav />
    </div>
  );
}
