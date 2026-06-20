"use client";

import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

interface SettingItem {
  icon: string;
  label: string;
  href?: string;
  danger?: boolean;
  action?: () => void;
  badge?: string;
}

export default function ProfilePage() {
  const { user, signOut } = useAuth();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  const settingItems: SettingItem[] = [
    { icon: "security", label: "Security & PIN", href: "#" },
    { icon: "verified_user", label: "KYC Verification", href: "#", badge: "Pending" },
    { icon: "notifications", label: "Notifications", href: "#" },
    { icon: "help", label: "Help & Support", href: "#" },
    { icon: "info", label: "About FusePay", href: "#" },
    { icon: "logout", label: "Sign Out", danger: true, action: signOut },
  ];

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-5">
      {/* Profile Header */}
      <div
        className="rounded-[20px] p-6 flex flex-col items-center gap-3"
        style={{ backgroundColor: "#131A2E", border: "1px solid #1E2742" }}
      >
        {/* Avatar */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full brand-gradient-bg flex items-center justify-center text-white text-2xl font-bold">
            {initials}
          </div>
          <button
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center border-2"
            style={{ backgroundColor: "#18233F", borderColor: "#0B1020" }}
          >
            <span
              className="material-symbols-outlined text-sm"
              style={{ color: "#5B3DF5" }}
            >
              edit
            </span>
          </button>
        </div>

        {/* User Info */}
        <div className="text-center">
          <p className="text-lg font-bold text-white">{user?.name ?? "User"}</p>
          <p className="text-sm" style={{ color: "#8A94A6" }}>
            {user?.phone ?? ""}
          </p>
          {user?.email && (
            <p className="text-sm" style={{ color: "#8A94A6" }}>
              {user.email}
            </p>
          )}
        </div>

        {/* Account Tier */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{ backgroundColor: "rgba(255,200,87,0.15)" }}
        >
          <span
            className="material-symbols-outlined text-sm"
            style={{ color: "#FFC857", fontVariationSettings: '"FILL" 1' }}
          >
            workspace_premium
          </span>
          <span className="text-xs font-semibold" style={{ color: "#FFC857" }}>
            {user?.tier ?? "Basic"} Account
          </span>
        </div>
      </div>

      {/* KYC Banner */}
      <div
        className="rounded-[16px] p-4 flex items-center gap-3 border"
        style={{
          backgroundColor: "rgba(91,61,245,0.08)",
          borderColor: "rgba(91,61,245,0.3)",
        }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "rgba(91,61,245,0.2)" }}
        >
          <span
            className="material-symbols-outlined text-xl"
            style={{ color: "#5B3DF5" }}
          >
            badge
          </span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">
            Verify Your Identity
          </p>
          <p className="text-xs" style={{ color: "#8A94A6" }}>
            Complete KYC to increase your transaction limits
          </p>
        </div>
        <button className="text-xs font-bold px-3 py-1.5 rounded-lg brand-gradient-bg text-white flex-shrink-0">
          Start
        </button>
      </div>

      {/* Settings List */}
      <div
        className="rounded-[16px] overflow-hidden border"
        style={{ backgroundColor: "#131A2E", borderColor: "#1E2742" }}
      >
        {settingItems.map((item, i) => (
          <button
            key={item.label}
            onClick={item.action}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-4 hover:bg-[#18233F] transition-colors text-left",
              i < settingItems.length - 1 ? "border-b" : ""
            )}
            style={{ borderColor: "#1E2742" }}
          >
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: item.danger
                  ? "rgba(255,90,110,0.15)"
                  : "#1E2742",
              }}
            >
              <span
                className="material-symbols-outlined text-lg"
                style={{
                  color: item.danger ? "#FF5A6E" : "#5B3DF5",
                }}
              >
                {item.icon}
              </span>
            </div>

            <span
              className={cn("flex-1 text-sm font-medium")}
              style={{ color: item.danger ? "#FF5A6E" : "#C8D1E6" }}
            >
              {item.label}
            </span>

            {item.badge && (
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full mr-2"
                style={{
                  backgroundColor: "rgba(255,200,87,0.15)",
                  color: "#FFC857",
                }}
              >
                {item.badge}
              </span>
            )}

            {!item.danger && (
              <span
                className="material-symbols-outlined text-lg"
                style={{ color: "#8A94A6" }}
              >
                chevron_right
              </span>
            )}
          </button>
        ))}
      </div>

      {/* App Version */}
      <p className="text-center text-xs" style={{ color: "#8A94A6" }}>
        FusePay v1.0.0 · Made with ❤️ in Nigeria
      </p>
    </div>
  );
}
