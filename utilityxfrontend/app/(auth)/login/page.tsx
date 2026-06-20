import HeroBrand from "@/components/auth/HeroBrand";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Sign In — FusePay",
  description: "Sign in to your FusePay account.",
};

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-[#0B1020] flex flex-col">
      {/* ── Ambient glow blobs ── */}
      <div className="fixed top-[-15%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#5B3DF5]/10 blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#22E6B8]/8 blur-[120px] pointer-events-none z-0" />

      {/* ── Main content ── */}
      <main className="relative z-10 flex flex-col md:flex-row flex-1">
        {/* Hero — hidden on mobile, shown md+ */}
        <HeroBrand />
        {/* Form — full width on mobile, right panel on md+ */}
        <LoginForm />
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 w-full flex flex-col sm:flex-row items-center justify-between gap-2 px-6 md:px-10 py-4 border-t border-[#1E2742]/60">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-[#8A94A6]/60 text-center sm:text-left">
          © 2026 FUSEPAY TECHNOLOGY. ALL RIGHTS RESERVED.
        </p>
        <p className="text-[10px] text-[#8A94A6]/50 text-center sm:text-right leading-tight max-w-xs">
          By signing in, you agree to FusePay&apos;s Terms of Service and
          Privacy Policy. Secured by 256-bit encryption.
        </p>
      </footer>
    </div>
  );
}
