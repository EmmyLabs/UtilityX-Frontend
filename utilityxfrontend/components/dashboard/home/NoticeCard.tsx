import Link from "next/link";

export default function NoticeCard() {
  return (
    <div
      className="rounded-[16px] p-4 flex items-center gap-3 border"
      style={{ backgroundColor: "#FFC857/10", background: "rgba(255,200,87,0.08)", borderColor: "rgba(255,200,87,0.3)" }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "rgba(255,200,87,0.2)" }}
      >
        <span
          className="material-symbols-outlined text-xl"
          style={{ color: "#FFC857" }}
        >
          verified_user
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white">
          Complete KYC Verification
        </p>
        <p className="text-xs mt-0.5" style={{ color: "#8A94A6" }}>
          Unlock higher transaction limits
        </p>
      </div>
      <Link
        href="/dashboard/profile"
        className="text-xs font-bold px-3 py-1.5 rounded-lg flex-shrink-0"
        style={{ backgroundColor: "#FFC857", color: "#1a1a1a" }}
      >
        Verify
      </Link>
    </div>
  );
}
