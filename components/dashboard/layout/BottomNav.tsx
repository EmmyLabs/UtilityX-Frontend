"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface BottomNavItem {
  href: string;
  label: string;
  icon: string;
  isFab?: boolean;
}

const navItems: BottomNavItem[] = [
  { href: "/dashboard", label: "Home", icon: "home" },
  { href: "/dashboard/market", label: "Market", icon: "storefront" },
  { href: "/dashboard/swap", label: "Swap", icon: "swap_vert", isFab: true },
  { href: "/dashboard/trades", label: "Trades", icon: "swap_horiz" },
  { href: "/dashboard/profile", label: "Profile", icon: "person" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t"
      style={{ backgroundColor: "#131A2E", borderColor: "#1E2742" }}
    >
      <div className="flex items-end h-16">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          if (item.isFab) {
            return (
              <div
                key={item.href}
                className="flex-1 flex flex-col items-center justify-end pb-2"
              >
                <Link
                  href={item.href}
                  className="w-14 h-14 rounded-full brand-gradient-bg flex items-center justify-center shadow-lg shadow-[#5B3DF5]/40 -translate-y-3"
                >
                  <span className="material-symbols-outlined text-2xl text-white">
                    {item.icon}
                  </span>
                </Link>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-0.5 h-full transition-colors",
                isActive ? "" : "opacity-60"
              )}
            >
              <span
                className="material-symbols-outlined text-2xl"
                style={{
                  color: isActive ? "#5B3DF5" : "#8A94A6",
                  fontVariationSettings: isActive
                    ? '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24'
                    : '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24',
                }}
              >
                {item.icon}
              </span>
              <span
                className="text-[10px] font-medium"
                style={{ color: isActive ? "#5B3DF5" : "#8A94A6" }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
