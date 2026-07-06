"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import BalanceCard from "@/components/dashboard/home/BalanceCard";
import MarketplaceSection from "@/components/dashboard/home/MarketplaceSection";
import RecentTransactions from "@/components/dashboard/home/RecentTransactions";
import EscrowBanner from "@/components/dashboard/home/EscrowBanner";
import NoticeCard from "@/components/dashboard/home/NoticeCard";
import PopularCategories from "@/components/dashboard/home/PopularCategories";
import ActiveTrades from "@/components/dashboard/home/ActiveTrades";
import { getBalance, getTransactions } from "@/lib/mock/dashboardService";
import type { Balance, Transaction } from "@/lib/mock/types";

export default function DashboardPage() {
  const { user } = useAuth();
  const [balance, setBalance] = useState<Balance | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [balanceData, transactionsData] = await Promise.all([
        getBalance(),
        getTransactions(),
      ]);
      setBalance(balanceData);
      setTransactions(transactionsData);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">
          Good Morning, {user?.name?.split(" ")[0] ?? "User"} 👋
        </h1>
        <p className="text-sm mt-1" style={{ color: "#C8D1E6" }}>
          Manage your utilities, wallet and trades securely.
        </p>
      </div>

      {/* Main Wallet Card */}
      {balance && <BalanceCard balance={balance} />}

      {/* Escrow Banner */}
      <EscrowBanner />

     

      {/* Popular Categories */}
      <PopularCategories />

      {/* Marketplace Section */}
      <MarketplaceSection />

      {/* Active Trades */}
      <ActiveTrades />

      {/* Notice Card */}
      <NoticeCard />

      {/* Recent Transactions */}
      <RecentTransactions transactions={transactions} loading={loading} />

      {/* Spacer for mobile bottom nav */}
      <div className="h-10 md:hidden" />
    </div>
  );
}
