import Link from "next/link";
import SectionHeader from "@/components/dashboard/shared/SectionHeader";

export default function MarketplaceSection() {
  return (
    <div>
      <SectionHeader title="Market Place" seeAllHref="/dashboard/market" />

      <div className="grid grid-cols-2 gap-3">
        {/* Buy Data Card */}
        <Link
          href="/dashboard/market?filter=buy"
          className="rounded-[20px] p-4 flex flex-col justify-between hover:opacity-90 active:scale-[0.98] transition-all"
          style={{
            background: "linear-gradient(135deg, #5B3DF5 0%, #0ea5e9 100%)",
            minHeight: "140px",
          }}
        >
          <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-xl text-white">
              wifi
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white mb-0.5">Buy Data</p>
            <p className="text-xs text-white/70 mb-3 leading-relaxed">
              Instant delivery, best prices
            </p>
            <span className="text-xs font-bold text-white/90 flex items-center gap-1">
              Buy Now
              <span className="material-symbols-outlined text-base">
                arrow_forward
              </span>
            </span>
          </div>
        </Link>

        {/* Sell Data Card */}
        <Link
          href="/dashboard/market?filter=sell"
          className="rounded-[20px] p-4 flex flex-col justify-between hover:opacity-90 active:scale-[0.98] transition-all border"
          style={{
            backgroundColor: "#18233F",
            borderColor: "#1E2742",
            minHeight: "140px",
          }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
            style={{ backgroundColor: "#22E6B8/15", background: "rgba(34,230,184,0.15)" }}
          >
            <span
              className="material-symbols-outlined text-xl"
              style={{ color: "#22E6B8" }}
            >
              sell
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white mb-0.5">Sell Data</p>
            <p className="text-xs mb-3 leading-relaxed" style={{ color: "#8A94A6" }}>
              Sell your unused data instantly
            </p>
            <span
              className="text-xs font-bold flex items-center gap-1"
              style={{ color: "#22E6B8" }}
            >
              Sell Now
              <span className="material-symbols-outlined text-base">
                arrow_forward
              </span>
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
