import { getBalance, getTransactions } from "@/lib/mock/dashboardService";
import BalanceCard from "@/components/dashboard/home/BalanceCard";
import RecentTransactions from "@/components/dashboard/home/RecentTransactions";

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

const quickActions = [
  { icon: "add_circle", label: "Add Money" },
  { icon: "send", label: "Send" },
  { icon: "call_received", label: "Receive" },
  { icon: "swap_horiz", label: "Exchange" },
];

export default async function WalletPage() {
  const [balance, transactions] = await Promise.all([
    getBalance(),
    getTransactions(),
  ]);

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-5">
      {/* Balance Card */}
      <BalanceCard balance={balance} />

      {/* Quick Actions */}
      <div
        className="rounded-[16px] p-4 grid grid-cols-4 gap-2"
        style={{ backgroundColor: "#131A2E", border: "1px solid #1E2742" }}
      >
        {quickActions.map((action) => (
          <button key={action.label} className="flex flex-col items-center gap-2 group">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center group-hover:opacity-80 transition-opacity"
              style={{ backgroundColor: "#1E2742" }}
            >
              <span
                className="material-symbols-outlined text-xl"
                style={{ color: "#5B3DF5" }}
              >
                {action.icon}
              </span>
            </div>
            <span className="text-xs font-medium" style={{ color: "#C8D1E6" }}>
              {action.label}
            </span>
          </button>
        ))}
      </div>

      {/* Escrow Balance Card */}
      <div
        className="rounded-[16px] p-4 flex items-center justify-between"
        style={{ backgroundColor: "#131A2E", border: "1px solid #1E2742" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(91,61,245,0.15)" }}
          >
            <span
              className="material-symbols-outlined text-xl"
              style={{ color: "#5B3DF5" }}
            >
              lock
            </span>
          </div>
          <div>
            <p className="text-xs" style={{ color: "#8A94A6" }}>
              Escrow Balance
            </p>
            <p className="text-base font-bold text-white">
              {formatNaira(balance.escrow)}
            </p>
          </div>
        </div>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: "rgba(255,200,87,0.15)",
            color: "#FFC857",
          }}
        >
          Held
        </span>
      </div>

      {/* Transaction History */}
      <RecentTransactions transactions={transactions} loading={false} limit={20} />
    </div>
  );
}
