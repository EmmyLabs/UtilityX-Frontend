import Image from "next/image";
import GlassCard from "@/components/ui/GlassCard";

export default function HeroBrand() {
  return (
    /**
     * Breakpoints:
     * - mobile  (<768px): hidden entirely — form takes full screen
     * - tablet  (768–1023px): shown, takes 50% width, smaller text
     * - desktop (1024px+): takes 58% width, full large text
     */
    <section className="hidden md:flex flex-col justify-between md:w-1/2 lg:w-[58%] min-h-screen relative overflow-hidden px-8 lg:px-12 pt-8 pb-6">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.06] bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3PaH0FLQtfdiIyKpG2f1iD9rapETixgdMn47UswQ5z1G5NZmZ4wVJnGC-Zlksu_8mEAukHQxAztlLHZAJjCvi9Ff9ZhpmcvMkszxh3vbBJhaGU0lzsjapS2CfMwARJ45-ikTKkjR7Q3e8mKKZ9Q2hm0QFTU4SGgxlTiVi49xWZgy5xoKewOhMF_APpZTotbmpzWX3R5wYEy_gtgrCHdvOYNzUlgepXmGZUIFFY6_V7kLr6FFGy8OjqTpH9ttplmbX3dWMmNpBfQQ')",
        }}
      />

      {/* ── Logo ── */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl overflow-hidden brand-gradient-bg flex items-center justify-center shrink-0">
          <Image
            src="/Logo.jpeg"
            alt="FusePay Logo"
            width={40}
            height={40}
            className="w-10 h-10 object-cover"
          />
        </div>
        <span className="text-xl font-bold tracking-tight text-white font-[family-name:var(--font-display)]">
          FusePay
        </span>
      </div>

      {/* ── Hero copy — sits in the middle-bottom area ── */}
      <div className="relative z-10 animate-float mt-auto mb-4">
        <h1 className="text-[32px] md:text-[38px] lg:text-[48px] leading-[1.1] font-extrabold mb-4 tracking-tight text-white font-[family-name:var(--font-display)]">
          The trusted marketplace for{" "}
          <span className="brand-gradient-text">airtime, data,</span> and{" "}
          <span className="brand-gradient-text">gift cards.</span>
        </h1>

        <p className="text-[#C8D1E6] text-sm lg:text-base leading-relaxed mb-6 max-w-[380px]">
          Experience the future of digital finance. Secure, fast, and built for
          the modern Web3 era.
        </p>

        {/* Feature pills */}
        <div className="flex flex-col sm:flex-row gap-3">
          <GlassCard className="flex items-center gap-3 flex-1">
            <div className="w-9 h-9 rounded-lg bg-[#5B3DF5]/25 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#5B3DF5] text-[20px]">
                security
              </span>
            </div>
            <div>
              <p className="font-bold text-white text-sm leading-tight">
                Bank-grade Security
              </p>
              <p className="text-xs text-[#8A94A6] mt-0.5">
                Your funds are safe
              </p>
            </div>
          </GlassCard>

          <GlassCard className="flex items-center gap-3 flex-1">
            <div className="w-9 h-9 rounded-lg bg-[#22E6B8]/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#22E6B8] text-[20px]">
                bolt
              </span>
            </div>
            <div>
              <p className="font-bold text-white text-sm leading-tight">
                Instant Delivery
              </p>
              <p className="text-xs text-[#8A94A6] mt-0.5">
                Real-time processing
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
