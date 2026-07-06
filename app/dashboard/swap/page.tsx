"use client";

import { useState } from "react";
import SectionHeader from "@/components/dashboard/shared/SectionHeader";

interface SwapPair {
  from: string;
  to: string;
  rate: number;
}

interface RecentSwap {
  id: string;
  from: string;
  fromAmount: number;
  to: string;
  toAmount: number;
  status: "completed" | "pending" | "failed";
  date: string;
  time: string;
}

const swapPairs: SwapPair[] = [
  { from: "NGN", to: "USDT", rate: 1560 },
  { from: "NGN", to: "USDC", rate: 1558 },
  { from: "USDT", to: "NGN", rate: 1555 },
  { from: "USDC", to: "NGN", rate: 1553 },
];

const recentSwaps: RecentSwap[] = [
  { id: "swap_001", from: "NGN", fromAmount: 156000, to: "USDT", toAmount: 100, status: "completed", date: "Today", time: "2:30 PM" },
  { id: "swap_002", from: "USDC", fromAmount: 50, to: "NGN", toAmount: 77650, status: "completed", date: "Yesterday", time: "10:15 AM" },
  { id: "swap_003", from: "NGN", fromAmount: 312000, to: "USDT", toAmount: 200, status: "pending", date: "Yesterday", time: "6:45 PM" },
];

export default function SwapPage() {
  const [fromCurrency, setFromCurrency] = useState("NGN");
  const [toCurrency, setToCurrency] = useState("USDT");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  const currentRate = swapPairs.find(p => p.from === fromCurrency && p.to === toCurrency)?.rate || 1560;

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    if (value) {
      const amount = parseFloat(value);
      setToAmount((amount / currentRate).toFixed(2));
    } else {
      setToAmount("");
    }
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">Swap</h1>
        <p className="text-sm mt-1" style={{ color: "#C8D1E6" }}>Convert between NGN, USDT, and USDC</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Swap Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-[20px] p-6 border" style={{ backgroundColor: "#131A2E", borderColor: "#1E2742" }}>
            {/* From Section */}
            <div className="space-y-3 mb-4">
              <p className="text-sm font-medium" style={{ color: "#C8D1E6" }}>From</p>
              <div className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: "#18233F" }}>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="bg-transparent text-lg font-bold text-white focus:outline-none"
                >
                  <option value="NGN">NGN</option>
                  <option value="USDT">USDT</option>
                  <option value="USDC">USDC</option>
                </select>
                <div className="flex-1" />
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => handleFromAmountChange(e.target.value)}
                  placeholder="0.00"
                  className="w-40 text-right bg-transparent text-lg font-bold text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center my-4">
              <button
                onClick={handleSwapCurrencies}
                className="w-12 h-12 rounded-full brand-gradient-bg flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <span className="material-symbols-outlined text-white text-2xl">swap_vert</span>
              </button>
            </div>

            {/* To Section */}
            <div className="space-y-3 mb-6">
              <p className="text-sm font-medium" style={{ color: "#C8D1E6" }}>To</p>
              <div className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: "#18233F" }}>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="bg-transparent text-lg font-bold text-white focus:outline-none"
                >
                  <option value="USDT">USDT</option>
                  <option value="USDC">USDC</option>
                  <option value="NGN">NGN</option>
                </select>
                <div className="flex-1" />
                <input
                  type="text"
                  value={toAmount}
                  readOnly
                  placeholder="0.00"
                  className="w-40 text-right bg-transparent text-lg font-bold text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Rate Info */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm" style={{ color: "#8A94A6" }}>
                1 {fromCurrency} = {currentRate} {toCurrency}
              </p>
            </div>

            {/* Swap Button */}
            <button
              className="w-full py-4 rounded-xl brand-gradient-bg text-white font-bold text-lg hover:opacity-90 transition-opacity"
            >
              Swap Now
            </button>
          </div>

          {/* Recent Swaps */}
          <div>
            <SectionHeader title="Recent Swaps" />
            <div className="rounded-[16px] overflow-hidden border" style={{ backgroundColor: "#131A2E", borderColor: "#1E2742" }}>
              {recentSwaps.map((swap) => (
                <div
                  key={swap.id}
                  className="flex items-center justify-between p-4 border-b last:border-0"
                  style={{ borderColor: "#1E2742" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: swap.status === "completed" ? "rgba(34,230,184,0.15)" : swap.status === "pending" ? "rgba(255,200,87,0.15)" : "rgba(255,90,110,0.15)",
                      }}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{
                          color: swap.status === "completed" ? "#22E6B8" : swap.status === "pending" ? "#FFC857" : "#FF5A6E",
                        }}
                      >
                        swap_vert
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {swap.from} → {swap.to}
                      </p>
                      <p className="text-xs" style={{ color: "#8A94A6" }}>
                        {swap.date} · {swap.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">
                      {swap.from === "NGN" ? "₦" : "$"}{swap.fromAmount.toLocaleString()}
                    </p>
                    <p
                      className="text-xs"
                      style={{
                        color: swap.status === "completed" ? "#22E6B8" : swap.status === "pending" ? "#FFC857" : "#FF5A6E",
                      }}
                    >
                      {swap.status.charAt(0).toUpperCase() + swap.status.slice(1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Market Price */}
        <div className="space-y-6">
          <div className="rounded-[20px] p-6 border" style={{ backgroundColor: "#131A2E", borderColor: "#1E2742" }}>
            <h3 className="text-lg font-bold text-white mb-4">Live Market Price</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 rounded-xl" style={{ backgroundColor: "#18233F" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center brand-gradient-bg">
                    <span className="text-white font-bold text-sm">$</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">USD/NGN</p>
                    <p className="text-xs" style={{ color: "#8A94A6" }}>Last updated: 2:35 PM</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">₦1,560.00</p>
                  <p className="text-xs" style={{ color: "#22E6B8" }}>+0.45%</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 rounded-xl" style={{ backgroundColor: "#18233F" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(34,230,184,0.2)" }}>
                    <span className="text-[#22E6B8] font-bold text-sm">₮</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">USDT/NGN</p>
                    <p className="text-xs" style={{ color: "#8A94A6" }}>Last updated: 2:34 PM</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">₦1,558.00</p>
                  <p className="text-xs" style={{ color: "#22E6B8" }}>+0.32%</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 rounded-xl" style={{ backgroundColor: "#18233F" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(91,61,245,0.2)" }}>
                    <span className="text-[#5B3DF5] font-bold text-sm">USDC</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">USDC/NGN</p>
                    <p className="text-xs" style={{ color: "#8A94A6" }}>Last updated: 2:33 PM</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">₦1,555.00</p>
                  <p className="text-xs" style={{ color: "#FF5A6E" }}>-0.15%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for mobile bottom nav */}
      <div className="h-10 md:hidden" />
    </div>
  );
}
