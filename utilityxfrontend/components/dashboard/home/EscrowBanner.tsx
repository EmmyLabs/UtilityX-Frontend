"use client";

import { useRouter } from "next/navigation";

export default function EscrowBanner() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/dashboard/trades")}
      className="w-full text-left rounded-[16px] p-4 flex items-center gap-4 hover:opacity-90 active:scale-[0.99] transition-all"
      style={{ backgroundColor: "#131A2E", border: "1px solid #1E2742" }}
    >
      {/* Shield Icon with gradient */}
      <div
        className="w-12 h-12 rounded-[14px] brand-gradient-bg flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#5B3DF5]/30"
      >
        <span className="material-symbols-outlined text-2xl text-white">
          shield
        </span>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white mb-0.5">
          Trade with Confidence
        </p>
        <p className="text-xs leading-relaxed" style={{ color: "#8A94A6" }}>
          Your transactions are secured with{" "}
          <span className="brand-gradient-text font-semibold">
            FusePay Escrow
          </span>
        </p>
      </div>

      {/* Arrow */}
      <span
        className="material-symbols-outlined text-xl flex-shrink-0"
        style={{ color: "#5B3DF5" }}
      >
        arrow_forward_ios
      </span>
    </button>
  );
}
