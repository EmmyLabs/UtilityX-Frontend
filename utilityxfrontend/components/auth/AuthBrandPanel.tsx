import Logo from "@/components/ui/Logo";

const FEATURES = [
  { icon: "security", color: "text-[#5B3DF5]", bg: "bg-[#5B3DF5]/20", title: "Secure Escrow",    desc: "100% protection for buyers and sellers." },
  { icon: "diamond",  color: "text-[#22E6B8]", bg: "bg-[#22E6B8]/20", title: "Best Prices",      desc: "Competitive rates across all networks." },
  { icon: "bolt",     color: "text-[#a78bfa]", bg: "bg-[#a78bfa]/20", title: "Instant Delivery", desc: "Airtime, data & gift cards delivered instantly." },
];

export default function AuthBrandPanel() {
  return (
    <aside className="hidden md:flex flex-col md:w-1/2 lg:w-[45%] h-full relative overflow-hidden bg-[#0B1020] px-8 lg:px-12 pt-8 pb-8">
      {/* Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[380px] h-[380px] rounded-full bg-[#5B3DF5]/15 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[300px] h-[300px] rounded-full bg-[#22E6B8]/10 blur-[90px] pointer-events-none" />

      {/* Logo — same component everywhere */}
      <div className="relative z-10 shrink-0">
        <Logo size="md" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center gap-5 py-6 min-h-0">
        <div>
          <h1 className="text-[28px] md:text-[32px] lg:text-[40px] font-extrabold leading-[1.1] tracking-tight text-white font-[family-name:var(--font-display)] mb-3">
            The smarter way to{" "}
            <span className="brand-gradient-text">trade &amp; pay</span>
          </h1>
          <p className="text-[#C8D1E6] text-sm lg:text-base leading-relaxed max-w-[320px]">
            Buy, sell and trade airtime, data and gift cards securely with the
            best rates and instant payments.
          </p>
        </div>

        <ul className="space-y-3">
          {FEATURES.map((f) => (
            <li key={f.title} className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-lg ${f.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                <span className={`material-symbols-outlined ${f.color} text-[20px]`}>{f.icon}</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">{f.title}</p>
                <p className="text-[#8A94A6] text-xs mt-0.5">{f.desc}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Wallet illustration */}
        <div className="relative flex justify-center lg:justify-end shrink-0 mt-2">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[180px] h-[40px] bg-[#5B3DF5]/25 blur-[35px] rounded-full" />
          <div className="relative w-[200px] lg:w-[240px] h-[180px] lg:h-[210px] flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-[#5B3DF5]/15 animate-pulse" />
            <div className="w-[155px] lg:w-[185px] bg-gradient-to-br from-[#5B3DF5] to-[#22E6B8] rounded-2xl p-4 shadow-2xl shadow-[#5B3DF5]/40 rotate-[-5deg]">
              <div className="flex justify-between items-start mb-4">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[16px]">bolt</span>
                </div>
                <span className="text-white/70 text-[10px] font-semibold uppercase tracking-wider">FusePay</span>
              </div>
              <p className="text-white/60 text-[9px] uppercase tracking-widest mb-1">Balance</p>
              <p className="text-white text-lg font-bold">₦ 84,500.00</p>
              <div className="mt-3 flex gap-1.5">
                {["wifi", "card_giftcard", "phone_iphone"].map((ic) => (
                  <div key={ic} className="w-6 h-6 rounded-md bg-white/15 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[12px]">{ic}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute top-2 right-0 bg-[#131A2E] border border-[#1E2742] rounded-xl px-2.5 py-1.5 shadow-lg rotate-[5deg]">
              <p className="text-[#22E6B8] text-xs font-bold leading-tight">+₦2,400</p>
              <p className="text-[#8A94A6] text-[9px]">Instant</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 shrink-0">
        <p className="text-[10px] text-[#8A94A6]/50 font-semibold tracking-widest uppercase">
          © 2025 FusePay. All rights reserved.
        </p>
      </div>
    </aside>
  );
}
