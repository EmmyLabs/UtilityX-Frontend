"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Balance } from "@/lib/mock/types";

interface BalanceCardProps {
  balance: Balance;
}

interface ActionButton {
  icon: string;
  label: string;
  href?: string;
}

const actions: ActionButton[] = [
  { icon: "add_circle", label: "Add Money", href: "/dashboard/wallet" },
  { icon: "send", label: "Send", href: "/dashboard/wallet" },
  { icon: "call_received", label: "Receive", href: "/dashboard/wallet" },
  { icon: "history", label: "History", href: "/dashboard/wallet" },
];

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatUsd(amount: number) {
  return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function BalanceCard({ balance }: BalanceCardProps) {
  const [hidden, setHidden] = useState(false);

  return (
    <div
      className="rounded-[20px] p-5 relative overflow-hidden brand-gradient-bg"
      style={{ minHeight: "180px" }}
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10"
        style={{ backgroundColor: "#ffffff" }}
      />
      <div
        className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10"
        style={{ backgroundColor: "#ffffff" }}
      />

      {/* Header row */}
      <div className="relative flex items-start justify-between mb-3">
        <div>
          <p className="text-sm text-white/70 font-medium">Total Balance</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHidden((h) => !h)}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <span className="material-symbols-outlined text-base text-white">
              {hidden ? "visibility_off" : "visibility"}
            </span>
          </button>
          <Link
            href="/dashboard/wallet"
            className="text-xs text-white/80 font-medium hover:text-white flex items-center gap-0.5"
          >
            Wallet
            <span className="material-symbols-outlined text-base">
              chevron_right
            </span>
          </Link>
        </div>
      </div>

      {/* Balance Amount */}
      <div className="relative mb-1">
        <p className="text-3xl font-bold text-white tracking-tight">
          {hidden ? "₦ ••••••" : formatNaira(balance.naira)}
        </p>
      </div>

      {/* USD + Percent */}
      <div className="relative flex items-center gap-2 mb-5">
        <span className="text-sm text-white/70">
          {hidden ? "≈ $••••" : `≈ ${formatUsd(balance.usd)}`}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-bold",
            balance.changePercent >= 0
              ? "bg-[#22E6B8]/20 text-[#22E6B8]"
              : "bg-[#FF5A6E]/20 text-[#FF5A6E]"
          )}
        >
          <span className="material-symbols-outlined text-sm">
            {balance.changePercent >= 0 ? "trending_up" : "trending_down"}
          </span>
          {balance.changePercent >= 0 ? "+" : ""}
          {balance.changePercent}%
        </span>
      </div>

      {/* Action Buttons */}
      <div className="relative grid grid-cols-4 gap-2">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href ?? "#"}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
              <span className="material-symbols-outlined text-xl text-white">
                {action.icon}
              </span>
            </div>
            <span className="text-[11px] text-white/80 font-medium text-center leading-tight">
              {action.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
