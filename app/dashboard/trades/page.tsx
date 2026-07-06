"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type TradeTab = "active" | "completed" | "disputed";

const tabs: { value: TradeTab; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "disputed", label: "Disputed" },
];

// Mock active trade
const activeTrade = {
  id: "trd_001",
  category: "Data",
  network: "MTN",
  amount: "5GB",
  price: "₦1,400",
  seller: "Tunde_Sells",
  status: "In Escrow",
  createdAt: "Today, 2:34 PM",
};

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "#1E2742" }}
      >
        <span
          className="material-symbols-outlined text-3xl"
          style={{ color: "#8A94A6" }}
        >
          swap_horiz
        </span>
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

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-5">
      {/* Escrow Info Banner */}
      <div
        className="rounded-[16px] p-4 flex items-center gap-3"
        style={{ backgroundColor: "#131A2E", border: "1px solid #1E2742" }}
      >
        <div className="w-10 h-10 rounded-full brand-gradient-bg flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-xl text-white">
            shield
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">
            FusePay Escrow Active
          </p>
          <p className="text-xs" style={{ color: "#8A94A6" }}>
            All funds are held securely until trade completion
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex rounded-[12px] p-1 gap-1"
        style={{ backgroundColor: "#131A2E" }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "flex-1 py-2 text-sm font-medium rounded-[10px] transition-all",
              activeTab === tab.value
                ? "brand-gradient-bg text-white"
                : "text-[#8A94A6] hover:text-white"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "active" ? (
        <div
          className="rounded-[16px] border overflow-hidden"
          style={{ backgroundColor: "#131A2E", borderColor: "#1E2742" }}
        >
          {/* Trade Row */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] brand-gradient-bg flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg text-white">
                    wifi
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {activeTrade.network} {activeTrade.amount}
                  </p>
                  <p className="text-xs" style={{ color: "#8A94A6" }}>
                    {activeTrade.category} · {activeTrade.price}
                  </p>
                </div>
              </div>
              {/* Escrow Badge */}
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: "rgba(255,200,87,0.15)",
                  color: "#FFC857",
                }}
              >
                {activeTrade.status}
              </span>
            </div>

            {/* Trade Details */}
            <div
              className="rounded-[10px] p-3 space-y-2"
              style={{ backgroundColor: "#18233F" }}
            >
              <div className="flex justify-between text-xs">
                <span style={{ color: "#8A94A6" }}>Seller</span>
                <span className="text-white font-medium">
                  {activeTrade.seller}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span style={{ color: "#8A94A6" }}>Trade ID</span>
                <span className="text-white font-medium">{activeTrade.id}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span style={{ color: "#8A94A6" }}>Created</span>
                <span className="text-white font-medium">
                  {activeTrade.createdAt}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-3">
              <button
                className="flex-1 py-2.5 text-sm font-semibold rounded-[10px] border transition-colors hover:bg-[#1E2742]"
                style={{
                  borderColor: "#1E2742",
                  color: "#FF5A6E",
                  backgroundColor: "transparent",
                }}
              >
                Dispute
              </button>
              <button className="flex-1 py-2.5 text-sm font-semibold rounded-[10px] brand-gradient-bg text-white">
                Confirm Receipt
              </button>
            </div>
          </div>
        </div>
      ) : activeTab === "completed" ? (
        <EmptyState message="Completed" />
      ) : (
        <EmptyState message="Disputed" />
      )}
    </div>
  );
}
