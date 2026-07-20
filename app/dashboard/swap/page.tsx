"use client";

import { useState } from "react";

interface RateMonitorItem {
  id: string;
  from: string;
  to: string;
  rate: string;
  change: string;
  changeType: "up" | "down";
  icon: string;
  iconBg: string;
  iconColor: string;
}

interface RecentActivity {
  id: string;
  type: string;
  from: string;
  to: string;
  fromAmount: string;
  toAmount: string;
  rate: string;
  status: "completed" | "pending";
  date: string;
  time: string;
  icon: string;
  iconBg: string;
}

const rateMonitorItems: RateMonitorItem[] = [
  { id: "1", from: "USDT", to: "NGN", rate: "₦1,584.30", change: "+0.45%", changeType: "up", icon: "₮", iconBg: "rgba(34,230,184,0.2)", iconColor: "#22E6B8" },
  { id: "2", from: "BTC", to: "NGN", rate: "₦98,230,000.00", change: "+1.23%", changeType: "up", icon: "₿", iconBg: "rgba(255,200,87,0.2)", iconColor: "#FFC857" },
  { id: "3", from: "ETH", to: "NGN", rate: "₦5,920,430.00", change: "-0.35%", changeType: "down", icon: "Ξ", iconBg: "rgba(199,199,199,0.2)", iconColor: "#C8D1E6" },
  { id: "4", from: "USDC", to: "NGN", rate: "₦1,583.20", change: "+0.28%", changeType: "up", icon: "$", iconBg: "rgba(91,61,245,0.2)", iconColor: "#5B3DF5" },
  { id: "5", from: "BNB", to: "NGN", rate: "₦892,450.00", change: "-0.91%", changeType: "down", icon: "B", iconBg: "rgba(255,200,87,0.2)", iconColor: "#FFC857" },
];

const recentActivities: RecentActivity[] = [
  { id: "1", type: "Swap to Naira", from: "USDT", to: "NGN", fromAmount: "50.00 USDT", toAmount: "₦79,215.00", rate: "₦1,584.30", status: "completed", date: "May 25, 2025", time: "10:30 AM", icon: "swap_vert", iconBg: "rgba(91,61,245,0.2)" },
  { id: "2", type: "Swap to USDC", from: "NGN", to: "USDC", fromAmount: "100,000.00 NGN", toAmount: "63.15 USDC", rate: "₦1,583.20", status: "completed", date: "May 24, 2025", time: "04:15 PM", icon: "swap_vert", iconBg: "rgba(91,61,245,0.2)" },
  { id: "3", type: "Swap to BTC", from: "USDT", to: "BTC", fromAmount: "200.00 USDT", toAmount: "0.002034 BTC", rate: "₦98,230,000.00", status: "completed", date: "May 23, 2025", time: "09:45 AM", icon: "currency_bitcoin", iconBg: "rgba(255,200,87,0.2)" },
  { id: "4", type: "Swap to Naira", from: "USDT", to: "NGN", fromAmount: "75.00 USDT", toAmount: "₦118,822.50", rate: "₦1,584.30", status: "pending", date: "May 22, 2025", time: "02:20 PM", icon: "swap_vert", iconBg: "rgba(91,61,245,0.2)" },
  { id: "5", type: "Swap to ETH", from: "NGN", to: "ETH", fromAmount: "150,000.00 NGN", toAmount: "0.0252 ETH", rate: "₦5,920,430.00", status: "completed", date: "May 21, 2025", time: "11:10 AM", icon: "currency_ethereum", iconBg: "rgba(199,199,199,0.2)" },
];

export default function SwapPage() {
  const [fromCurrency, setFromCurrency] = useState("USDT");
  const [toCurrency, setToCurrency] = useState("NGN");
  const [fromAmount, setFromAmount] = useState("100.00");
  const [toAmount, setToAmount] = useState("158430.00");
  const [activeTab, setActiveTab] = useState<"swap" | "history">("swap");

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Mobile Header */}
      <div className="flex items-center justify-between md:hidden mb-4">
        <button className="w-10 h-10 rounded-xl border flex items-center justify-center" style={{ backgroundColor: "#131A2E", borderColor: "#1E2742" }}>
          <span className="material-symbols-outlined" style={{ color: "#C8D1E6" }}>menu</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold brand-gradient-text font-[family-name:var(--font-display)]">FP</span>
          <span className="text-xl font-bold text-white font-[family-name:var(--font-display)]">FusePay</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-xl border flex items-center justify-center" style={{ backgroundColor: "#131A2E", borderColor: "#1E2742" }}>
            <span className="material-symbols-outlined" style={{ color: "#C8D1E6" }}>notifications</span>
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border" style={{ borderColor: "#22E6B8" }}>
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces" 
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Mobile Title */}
      <div className="md:hidden">
        <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">Swap</h1>
        <p className="text-sm mt-1" style={{ color: "#C8D1E6" }}>Swap your crypto to Naira or other crypto instantly</p>
      </div>

      {/* How it works button (mobile) */}
      <div className="flex justify-end md:hidden">
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ backgroundColor: "#131A2E", borderColor: "#5B3DF5" }}>
          <span className="material-symbols-outlined text-sm" style={{ color: "#5B3DF5" }}>info</span>
          <span className="text-sm font-medium" style={{ color: "#5B3DF5" }}>How it works</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Swap Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-[20px] p-6 border" style={{ backgroundColor: "#131A2E", borderColor: "#1E2742" }}>
            {/* Tabs (Desktop only) */}
            <div className="hidden md:flex items-center gap-2 mb-6">
              <button
                onClick={() => setActiveTab("swap")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === "swap" ? "bg-[#5B3DF5] text-white" : "text-[#8A94A6] hover:text-white"}`}
              >
                Swap
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === "history" ? "bg-[#5B3DF5] text-white" : "text-[#8A94A6] hover:text-white"}`}
              >
                History
              </button>
              <div className="flex-1" />
              <div className="flex items-center gap-2 text-sm" style={{ color: "#8A94A6" }}>
                <span className="material-symbols-outlined text-sm">schedule</span>
                Auto update in 10s
              </div>
            </div>

            {/* From Section */}
            <div className="space-y-3 mb-2">
              <p className="text-sm font-medium" style={{ color: "#C8D1E6" }}>You send</p>
              <div className="flex items-center gap-4 p-5 rounded-xl" style={{ backgroundColor: "#18233F" }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(34,230,184,0.2)" }}>
                    <span className="text-xl font-bold" style={{ color: "#22E6B8" }}>₮</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-lg font-bold text-white">USDT</p>
                      <span className="material-symbols-outlined text-sm" style={{ color: "#8A94A6" }}>expand_more</span>
                    </div>
                    <p className="text-xs" style={{ color: "#8A94A6" }}>Tether USD</p>
                  </div>
                </div>
                <div className="flex-1" />
                <div className="text-right">
                  <input
                    type="text"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    className="w-full text-right bg-transparent text-3xl font-bold text-white focus:outline-none"
                  />
                  <p className="text-sm" style={{ color: "#8A94A6" }}>≈ $100.00</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm" style={{ color: "#8A94A6" }}>Balance: 250.50 USDT</p>
                <button className="text-sm font-semibold" style={{ color: "#5B3DF5" }}>MAX</button>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center -my-3 relative z-10">
              <button
                onClick={handleSwapCurrencies}
                className="w-14 h-14 rounded-full border-4 flex items-center justify-center hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#131A2E", borderColor: "#5B3DF5" }}
              >
                <span className="material-symbols-outlined text-2xl" style={{ color: "#5B3DF5" }}>swap_vert</span>
              </button>
            </div>

            {/* To Section */}
            <div className="space-y-3 mb-6">
              <p className="text-sm font-medium" style={{ color: "#C8D1E6" }}>You receive</p>
              <div className="flex items-center gap-4 p-5 rounded-xl" style={{ backgroundColor: "#18233F" }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(34,230,184,0.2)" }}>
                    <span className="text-xl font-bold" style={{ color: "#22E6B8" }}>🇳🇬</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-lg font-bold text-white">NGN</p>
                      <span className="material-symbols-outlined text-sm" style={{ color: "#8A94A6" }}>expand_more</span>
                    </div>
                    <p className="text-xs" style={{ color: "#8A94A6" }}>Nigerian Naira</p>
                  </div>
                </div>
                <div className="flex-1" />
                <div className="text-right">
                  <input
                    type="text"
                    value={toAmount}
                    readOnly
                    className="w-full text-right bg-transparent text-3xl font-bold text-white focus:outline-none"
                  />
                  <p className="text-sm" style={{ color: "#8A94A6" }}>≈ $100.00</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm" style={{ color: "#8A94A6" }}>Balance: 125,000.00 NGN</p>
              </div>
            </div>

            {/* Swap Details */}
            <div className="space-y-3 p-4 rounded-xl mb-6" style={{ backgroundColor: "#18233F" }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-white">Live Exchange Rate</p>
                  <span className="material-symbols-outlined text-sm" style={{ color: "#8A94A6" }}>info</span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-white">1 USDT = ₦1,584.30</p>
                  <span className="text-sm font-semibold" style={{ color: "#22E6B8" }}>+0.45%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-sm" style={{ color: "#8A94A6" }}>You are saving</p>
                  <span className="material-symbols-outlined text-sm" style={{ color: "#8A94A6" }}>info</span>
                </div>
                <p className="text-sm font-semibold" style={{ color: "#22E6B8" }}>₦712.50</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-sm" style={{ color: "#8A94A6" }}>Network Fee</p>
                  <span className="material-symbols-outlined text-sm" style={{ color: "#8A94A6" }}>info</span>
                </div>
                <p className="text-sm font-semibold text-white">0.50 USDT</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-sm" style={{ color: "#8A94A6" }}>Estimated Time</p>
                  <span className="material-symbols-outlined text-sm" style={{ color: "#8A94A6" }}>info</span>
                </div>
                <p className="text-sm font-semibold text-white">≈ 2 mins</p>
              </div>
            </div>

            {/* Swap Button */}
            <button
              className="w-full py-4 rounded-[16px] brand-gradient-bg text-white font-bold text-lg hover:opacity-90 transition-opacity"
            >
              Swap Now
            </button>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="material-symbols-outlined text-sm" style={{ color: "#8A94A6" }}>shield</span>
              <p className="text-sm" style={{ color: "#8A94A6" }}>Secured by <span style={{ color: "#22E6B8" }}>FusePay Escrow</span></p>
            </div>
          </div>

          {/* Mobile Security Banner */}
          <div className="md:hidden rounded-[20px] p-5 border flex items-center gap-4" style={{ backgroundColor: "#131A2E", borderColor: "#1E2742" }}>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(91,61,245,0.2)" }}>
              <span className="material-symbols-outlined text-3xl" style={{ color: "#5B3DF5" }}>shield</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">Your swaps are 100% secure</p>
              <p className="text-sm" style={{ color: "#5B3DF5" }}>All swaps are protected by FusePay Escrow System</p>
            </div>
            <span className="material-symbols-outlined" style={{ color: "#8A94A6" }}>chevron_right</span>
          </div>

          {/* Recent Activities */}
          <div className="rounded-[20px] p-6 border" style={{ backgroundColor: "#131A2E", borderColor: "#1E2742" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Recent Activities</h3>
              <button className="text-sm font-semibold" style={{ color: "#5B3DF5" }}>View All</button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: activity.iconBg }}>
                    <span className="material-symbols-outlined text-xl" style={{ color: "#5B3DF5" }}>{activity.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{activity.type}</p>
                    <div className="hidden md:flex items-center gap-4 text-sm" style={{ color: "#8A94A6" }}>
                      <span>{activity.fromAmount}</span>
                      <span>→</span>
                      <span>{activity.toAmount}</span>
                    </div>
                    <div className="md:hidden flex items-center gap-2 text-sm" style={{ color: "#22E6B8" }}>
                      <span className="font-semibold">{activity.toAmount}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="hidden md:block text-sm" style={{ color: "#8A94A6" }}>{activity.rate}</div>
                    <div className="hidden md:block">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                          activity.status === "completed"
                            ? "bg-[rgba(34,230,184,0.15)] text-[#22E6B8]"
                            : "bg-[rgba(255,200,87,0.15)] text-[#FFC857]"
                        }`}
                      >
                        {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                      </span>
                    </div>
                    <div className="md:hidden text-xs" style={{ color: "#8A94A6" }}>{activity.date} {activity.time}</div>
                    <div className="md:hidden mt-1">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                          activity.status === "completed"
                            ? "bg-[rgba(34,230,184,0.15)] text-[#22E6B8]"
                            : "bg-[rgba(255,200,87,0.15)] text-[#FFC857]"
                        }`}
                      >
                        {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                      </span>
                    </div>
                    <div className="hidden md:block text-sm" style={{ color: "#8A94A6" }}>{activity.date} {activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rate Monitor (Desktop only) */}
        <div className="hidden lg:block space-y-6">
          <div className="rounded-[20px] p-6 border" style={{ backgroundColor: "#131A2E", borderColor: "#1E2742" }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Rate Monitor</h3>
              <button className="text-sm font-semibold" style={{ color: "#5B3DF5" }}>View All</button>
            </div>
            <div className="space-y-3">
              {rateMonitorItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: "#18233F" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: item.iconBg }}>
                      <span className="text-lg font-bold" style={{ color: item.iconColor }}>{item.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.from} / {item.to}</p>
                      <p className="text-sm text-white">{item.rate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
                      <path
                        d="M0 20 Q15 10 30 15 Q45 20 60 10"
                        stroke={item.changeType === "up" ? "#22E6B8" : "#FF5A6E"}
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                    <span
                      className={`text-sm font-semibold ${
                        item.changeType === "up" ? "text-[#22E6B8]" : "text-[#FF5A6E]"
                      }`}
                    >
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Swap Tips */}
          <div className="rounded-[20px] p-6 border" style={{ backgroundColor: "#131A2E", borderColor: "#1E2742" }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(91,61,245,0.2)" }}>
                <span className="material-symbols-outlined text-sm" style={{ color: "#5B3DF5" }}>lightbulb</span>
              </div>
              <h3 className="text-lg font-bold text-white">Swap Tips</h3>
            </div>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2 text-sm" style={{ color: "#8A94A6" }}>
                <span className="material-symbols-outlined text-sm mt-0.5" style={{ color: "#8A94A6" }}>circle</span>
                Swap is powered by real-time market rates
              </li>
              <li className="flex items-start gap-2 text-sm" style={{ color: "#8A94A6" }}>
                <span className="material-symbols-outlined text-sm mt-0.5" style={{ color: "#8A94A6" }}>circle</span>
                Low fees and best rates guaranteed
              </li>
              <li className="flex items-start gap-2 text-sm" style={{ color: "#8A94A6" }}>
                <span className="material-symbols-outlined text-sm mt-0.5" style={{ color: "#8A94A6" }}>circle</span>
                All swaps are secured by FusePay Escrow
              </li>
            </ul>
            <button className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#5B3DF5" }}>
              Learn more about swap
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Spacer for mobile bottom nav */}
      <div className="h-20 md:hidden" />
    </div>
  );
}
