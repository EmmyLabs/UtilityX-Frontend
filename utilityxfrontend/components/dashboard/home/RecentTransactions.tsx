import Link from "next/link";
import SectionHeader from "@/components/dashboard/shared/SectionHeader";
import { SkeletonRow } from "@/components/dashboard/shared/SkeletonCard";
import type { Transaction, TransactionCategory } from "@/lib/mock/types";
import { cn } from "@/lib/utils";

interface RecentTransactionsProps {
  transactions?: Transaction[];
  loading?: boolean;
  limit?: number;
}

const categoryIcons: Record<TransactionCategory, string> = {
  airtime: "phone_iphone",
  data: "wifi",
  "gift-card": "card_giftcard",
  transfer: "send",
  received: "call_received",
};

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function RecentTransactions({
  transactions = [],
  loading = false,
  limit = 5,
}: RecentTransactionsProps) {
  const displayed = transactions.slice(0, limit);

  return (
    <div>
      <SectionHeader
        title="Recent Transactions"
        seeAllHref="/dashboard/wallet"
      />

      <div
        className="rounded-[16px] overflow-hidden border"
        style={{ backgroundColor: "#131A2E", borderColor: "#1E2742" }}
      >
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <SkeletonRow
              key={i}
              className={cn(i < 3 ? "border-b" : "")}
            />
          ))
        ) : displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 gap-2">
            <span
              className="material-symbols-outlined text-4xl"
              style={{ color: "#1E2742" }}
            >
              receipt_long
            </span>
            <p className="text-sm" style={{ color: "#8A94A6" }}>
              No transactions yet
            </p>
          </div>
        ) : (
          displayed.map((txn, i) => (
            <div
              key={txn.id}
              className={cn(
                "flex items-center gap-3 px-4 py-3",
                i < displayed.length - 1 ? "border-b" : ""
              )}
              style={{ borderColor: "#1E2742" }}
            >
              {/* Icon */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                )}
                style={{
                  background:
                    txn.type === "credit"
                      ? "linear-gradient(135deg, #22E6B8 0%, #0ea5e9 100%)"
                      : "#1E2742",
                }}
              >
                <span
                  className="material-symbols-outlined text-lg"
                  style={{ color: txn.type === "credit" ? "#fff" : "#8A94A6" }}
                >
                  {categoryIcons[txn.category]}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {txn.description}
                </p>
                <p className="text-xs truncate" style={{ color: "#8A94A6" }}>
                  {txn.to}
                </p>
              </div>

              {/* Amount + Date */}
              <div className="text-right flex-shrink-0">
                <p
                  className="text-sm font-bold"
                  style={{
                    color: txn.type === "credit" ? "#22E6B8" : "#FF5A6E",
                  }}
                >
                  {txn.type === "credit" ? "+" : "-"}
                  {formatNaira(txn.amount)}
                </p>
                <p className="text-xs" style={{ color: "#8A94A6" }}>
                  {txn.date} · {txn.time}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {!loading && transactions.length > limit && (
        <div className="mt-3 text-center">
          <Link
            href="/dashboard/wallet"
            className="text-sm font-medium"
            style={{ color: "#5B3DF5" }}
          >
            View all transactions
          </Link>
        </div>
      )}
    </div>
  );
}
