import { getBalance, getTransactions } from "@/lib/mock/dashboardService";
import BalanceCard from "@/components/dashboard/home/BalanceCard";
import EscrowBanner from "@/components/dashboard/home/EscrowBanner";
import QuickServices from "@/components/dashboard/home/QuickServices";
import MarketplaceSection from "@/components/dashboard/home/MarketplaceSection";
import RecentTransactions from "@/components/dashboard/home/RecentTransactions";
import NoticeCard from "@/components/dashboard/home/NoticeCard";

export default async function DashboardHomePage() {
  const [balance, transactions] = await Promise.all([
    getBalance(),
    getTransactions(),
  ]);

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto lg:max-w-4xl space-y-5">
      {/* KYC Notice */}
      <NoticeCard />

      {/* Balance Card */}
      <BalanceCard balance={balance} />

      {/* Escrow Banner */}
      <EscrowBanner />

      {/* Quick Services */}
      <QuickServices />

      {/* Marketplace Section */}
      <MarketplaceSection />

      {/* Recent Transactions */}
      <RecentTransactions transactions={transactions} loading={false} limit={5} />
    </div>
  );
}
