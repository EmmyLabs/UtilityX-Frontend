"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Home", icon: "home" },
  { href: "/dashboard/market", label: "Market", icon: "storefront" },
  { href: "/dashboard/swap", label: "Swap", icon: "swap_vert" },
  { href: "/dashboard/trades", label: "Trades", icon: "swap_horiz" },
  { href: "/dashboard/profile", label: "Profile", icon: "person" },
];

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full z-40 flex flex-col transition-all duration-300",
        "border-r",
        collapsed ? "w-16" : "w-60"
      )}
      style={{
        backgroundColor: "#131A2E",
        borderColor: "#1E2742",
      }}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex items-center h-16 px-4 border-b flex-shrink-0",
          collapsed ? "justify-center" : "justify-between"
        )}
        style={{ borderColor: "#1E2742" }}
      >
        {!collapsed && <Logo variant="white" size="sm" />}
        {collapsed && (
          <span
            className="material-symbols-outlined text-2xl"
            style={{ color: "#5B3DF5" }}
          >
            bolt
          </span>
        )}
        {/* Collapse toggle button (tablet only) */}
        {onToggle && (
          <button
            onClick={onToggle}
            className="hidden md:flex lg:hidden w-7 h-7 items-center justify-center rounded-lg hover:bg-[#1E2742] transition-colors"
          >
            <span
              className="material-symbols-outlined text-lg"
              style={{ color: "#8A94A6" }}
            >
              {collapsed ? "chevron_right" : "chevron_left"}
            </span>
          </button>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                    collapsed ? "justify-center" : "",
                    isActive
                      ? "brand-gradient-bg text-white shadow-lg shadow-[#5B3DF5]/20"
                      : "text-[#8A94A6] hover:bg-[#1E2742] hover:text-white"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <span
                    className="material-symbols-outlined text-xl flex-shrink-0"
                    style={{
                      fontVariationSettings: isActive
                        ? '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24'
                        : '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24',
                    }}
                  >
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User & Sign Out */}
      <div
        className="border-t p-3 flex-shrink-0"
        style={{ borderColor: "#1E2742" }}
      >
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 brand-gradient-bg"
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {user?.name ?? "User"}
              </p>
              <p className="text-xs truncate" style={{ color: "#8A94A6" }}>
                {user?.phone ?? ""}
              </p>
            </div>
            <button
              onClick={signOut}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#FF5A6E]/10 transition-colors"
              title="Sign out"
            >
              <span
                className="material-symbols-outlined text-lg"
                style={{ color: "#FF5A6E" }}
              >
                logout
              </span>
            </button>
          </div>
        ) : (
          <button
            onClick={signOut}
            className="w-full flex items-center justify-center py-2 rounded-xl hover:bg-[#FF5A6E]/10 transition-colors"
            title="Sign out"
          >
            <span
              className="material-symbols-outlined text-xl"
              style={{ color: "#FF5A6E" }}
            >
              logout
            </span>
          </button>
        )}
      </div>
    </aside>
  );
}
