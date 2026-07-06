"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Trade, TradeTab } from "@/lib/mock/types";

// Mock data
const mockTrades: Trade[] = [
  {
    id: "FP28472947",
    type: "buy",
    category: "data",
    network: "MTN",
    networkLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/MTN_Group_logo.svg/200px-MTN_Group_logo.svg.png",
    productName: "MTN 10GB",
    validity: "30 Days · 4G/5G",
    price: 2950.00,
    quantity: 1,
    isBuyer: true,
    tradePartner: "Seller",
    createdAt: "May 20, 10:30 AM",
    timeline: [
      { label: "Order Placed", completed: true, active: false, time: "May 20, 10:30 AM" },
      { label: "Payment Locked", completed: true, active: false, time: "May 20, 10:31 AM" },
      { label: "Awaiting Delivery", completed: false, active: true, time: "Seller has 14:59" },
      { label: "Completed", completed: false, active: false, time: "Auto release" },
    ],
  },
  {
    id: "FP28472948",
    type: "sell",
    category: "airtime",
    network: "Airtel",
    networkLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Airtel_logo.svg/200px-Airtel_logo.svg.png",
    productName: "Airtel ₦1,000",
    validity: "Airtime Top-up",
    price: 1000.00,
    quantity: 1,
    isBuyer: false,
    tradePartner: "Buyer",
    createdAt: "May 20, 09:15 AM",
    timeline: [
      { label: "Order Placed", completed: true, active: false, time: "May 20, 09:15 AM" },
      { label: "Payment Locked", completed: true, active: false, time: "May 20, 09:16 AM" },
      { label: "Awaiting Delivery", completed: false, active: true, time: "Buyer has 13:20" },
      { label: "Completed", completed: false, active: false, time: "Auto release" },
    ],
  },
  {
    id: "FP28472949",
    type: "buy",
    category: "data",
    network: "Glo",
    networkLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Glo_logo.svg/200px-Glo_logo.svg.png",
    productName: "Glo 5GB",
    validity: "7 Days · 4G",
    price: 1250.00,
    quantity: 1,
    isBuyer: true,
    tradePartner: "Seller",
    createdAt: "May 20, 08:45 AM",
    timeline: [
      { label: "Order Placed", completed: true, active: false, time: "May 20, 08:45 AM" },
      { label: "Payment Locked", completed: true, active: false, time: "May 20, 08:46 AM" },
      { label: "Awaiting Delivery", completed: false, active: true, time: "Seller has 28:10" },
      { label: "Completed", completed: false, active: false, time: "Auto release" },
    ],
  },
];

const pendingTrades: Trade[] = [
  {
    id: "FP28472950",
    type: "sell",
    category: "data",
    network: "9mobile",
    networkLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/9mobile_logo.svg/200px-9mobile_logo.svg.png",
    productName: "9mobile 2GB",
    validity: "7 Days",
    price: 650.00,
    quantity: 1,
    isBuyer: false,
    tradePartner: "Buyer",
    createdAt: "May 20, 07:30 AM",
    timeline: [
      { label: "Order Placed", completed: true, active: false, time: "May 20, 07:30 AM" },
      { label: "Payment Locked", completed: false, active: true, time: "Awaiting payment" },
      { label: "Awaiting Delivery", completed: false, active: false },
      { label: "Completed", completed: false, active: false },
    ],
  },
];

const tabs: { value: TradeTab; label: string; count: number }[] = [
  { value: "active", label: "Active", count: 3 },
  { value: "pending", label: "Pending", count: 1 },
  { value: "completed", label: "Completed", count: 12 },
  { value: "cancelled", label: "Cancelled", count: 2 },
];

interface StatCardProps {
  label: string;
  value: number;
  subLabel?: string;
  icon: string;
  color: string;
  bgColor: string;
}

function StatCard({ label, value, subLabel, icon, color, bgColor }: StatCardProps) {
  return (
    <div
      className="rounded-[16px] p-4 border flex flex-col items-center text-center"
      style={{ backgroundColor: "#131A2E", borderColor: "#1E2742" }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
        style={{ backgroundColor: bgColor }}
      >
        <span className="material-symbols-outlined text-xl" style={{ color }}>
          {icon}
        </span>
      </div>
      <p className="text-lg font-bold text-white mb-0.5">{value}</p>
      <p className="text-xs" style={{ color: "#8A94A6" }}>{label}</p>
      {subLabel && (
        <p className="text-xs mt-1" style={{ color }}>{subLabel}</p>
      )}
    </div>
  );
}

function TimelineStep({ step, isLast }: { step: Trade["timeline"][0]; isLast: boolean }) {
  return (
    <div className="flex flex-col items-center flex-1">
      <div
        className={cn(
          "w-5 h-5 rounded-full flex items-center justify-center z-10",
          step.completed ? "brand-gradient-bg" : step.active ? "brand-gradient-bg" : "bg-[#1E2742]"
        )}
      >
        {step.completed && (
          <span className="material-symbols-outlined text-white text-xs">check</span>
        )}
      </div>
      {!isLast && (
        <div
          className="absolute top-2.5 left-1/2 w-full h-0.5 -z-0"
          style={{
            backgroundColor: step.completed ? "transparent" : "#1E2742",
            background: step.completed ? "linear-gradient(135deg, #5B3DF5 0%, #22E6B8 100%)" : "#1E2742",
          }}
        />
      )}
      <p className={cn(
        "text-xs mt-2 text-center",
        step.active ? "font-medium text-white" : "text-[#8A94A6]"
      )}>
        {step.label}
      </p>
      {step.time && (
        <p className="text-xs mt-1 text-center" style={{ color: step.active ? "#22E6B8" : "#8A94A6" }}>
          {step.time}
        </p>
      )}
    </div>
  );
}

function TradeCard({ trade }: { trade: Trade }) {
  return (
    <div
      className="rounded-[16px] p-4 border mb-3"
      style={{ backgroundColor: "#131A2E", borderColor: "#1E2742" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
            <img
              src={trade.networkLogo}
              alt={trade.network}
              className="w-8 h-8 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <span className="material-symbols-outlined text-2xl text-[#5B3DF5] hidden">wifi</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-semibold text-white truncate">
              {trade.productName}
            </p>
            {trade.validity && (
              <p className="text-xs" style={{ color: "#8A94A6" }}>
                {trade.validity}
              </p>
            )}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(138, 148, 166, 0.1)", color: "#8A94A6" }}>
                Trade ID: {trade.id}
              </span>
              <span className="material-symbols-outlined text-sm" style={{ color: "#8A94A6" }}>content_copy</span>
            </div>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-lg font-bold text-white">
            ₦{trade.price.toLocaleString()}
          </p>
          <p className="text-xs" style={{ color: "#8A94A6" }}>
            Quantity: {trade.quantity}
          </p>
          <div className="flex items-center justify-end gap-1 mt-1">
            <span className={cn(
              "text-xs font-medium",
              trade.isBuyer ? "text-[#22E6B8]" : "text-[#FFC857]"
            )}>
              {trade.isBuyer ? "Buyer" : "Seller"}
            </span>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: trade.isBuyer ? "#22E6B8" : "#FFC857" }} />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative flex items-start justify-between mb-4 px-2">
        {trade.timeline.map((step, index) => (
          <TimelineStep
            key={step.label}
            step={step}
            isLast={index === trade.timeline.length - 1}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button className="flex-1 py-2.5 text-sm font-medium rounded-[10px] border transition-colors hover:bg-[#1E2742]" style={{ borderColor: "#1E2742", color: "#8A94A6" }}>
          View Details
        </button>
        <button className="flex-1 py-2.5 text-sm font-medium rounded-[10px] border transition-colors hover:bg-[#1E2742] flex items-center justify-center gap-1" style={{ borderColor: "#1E2742", color: "#22E6B8" }}>
          <span className="material-symbols-outlined text-sm">chat</span>
          Chat with {trade.tradePartner}
        </button>
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#1E2742" }}>
        <span className="material-symbols-outlined text-3xl" style={{ color: "#8A94A6" }}>swap_horiz</span>
      </div>
      <p className="font-semibold text-white">No {message} trades</p>
      <p className="text-sm" style={{ color: "#8A94A6" }}>
        Your {message.toLowerCase()} trades will appear here
      </p>
    </div>
  );
}

export default function TradesPage() {
  const [activeTab, setActiveTab] = useState<TradeTab>("active");

  const getTradesForTab = () => {
    switch (activeTab) {
      case "active":
        return mockTrades;
      case "pending":
        return pendingTrades;
      case "completed":
      case "cancelled":
        return [];
      default:
        return [];
    }
  };

  const trades = getTradesForTab();

  return (
    <div className="p-4 md:p-6 space-y-5">
      {/* Page Title */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-white">My Trades</h1>
        <p className="text-sm md:text-base" style={{ color: "#8A94A6" }}>
          Track and manage all your trades
        </p>
      </div>

      {/* Tabs */}
      <div className="flex rounded-[12px] p-1 gap-1 overflow-x-auto" style={{ backgroundColor: "#131A2E" }}>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "flex-1 py-2.5 px-4 text-sm font-medium rounded-[10px] transition-all whitespace-nowrap flex items-center justify-center gap-2",
              activeTab === tab.value ? "brand-gradient-bg text-white" : "text-[#8A94A6] hover:text-white"
            )}
          >
            {tab.label}
            <span className={cn(
              "px-2 py-0.5 rounded-full text-xs",
              activeTab === tab.value ? "bg-white/20" : "bg-[#1E2742]"
            )}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Stats Cards - Only show on Active tab */}
      {activeTab === "active" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard
            label="Active Trades"
            value={3}
            subLabel="In progress"
            icon="swap_horiz"
            color="#5B3DF5"
            bgColor="rgba(91, 61, 245, 0.15)"
          />
          <StatCard
            label="Pending"
            value={1}
            subLabel="Awaiting payment"
            icon="schedule"
            color="#FFC857"
            bgColor="rgba(255, 200, 87, 0.15)"
          />
          <StatCard
            label="Completed"
            value={12}
            subLabel="This month"
            icon="check_circle"
            color="#22E6B8"
            bgColor="rgba(34, 230, 184, 0.15)"
          />
          <StatCard
            label="Cancelled"
            value={2}
            subLabel="This month"
            icon="cancel"
            color="#FF5A6E"
            bgColor="rgba(255, 90, 110, 0.15)"
          />
        </div>
      )}

      {/* Trade List */}
      {trades.length > 0 ? (
        <div className="space-y-1">
          {/* Section Header - Show for active and pending */}
          {(activeTab === "active" || activeTab === "pending") && (
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-white">
                {activeTab === "active" ? "Active Trades" : "Pending Trades"} ({trades.length})
              </h2>
              <button className="text-sm font-medium" style={{ color: "#5B3DF5" }}>
                View All →
              </button>
            </div>
          )}

          {/* Trade Cards */}
          {trades.map((trade) => (
            <TradeCard key={trade.id} trade={trade} />
          ))}
        </div>
      ) : (
        <EmptyState message={activeTab} />
      )}
    </div>
  );
}
