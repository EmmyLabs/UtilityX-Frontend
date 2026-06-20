import HeroBrand from "@/components/auth/HeroBrand";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Sign In — FusePay",
  description: "Sign in to your FusePay account.",
};

export default function LoginPage() {
  return (
    /*
     * h-full inherits the 100vh from html/body.
     * overflow-hidden on this wrapper ensures no child can create scroll.
     * The form section handles its own internal overflow-y-auto.
     */
    <div className="h-full flex flex-col bg-[#0B1020] overflow-hidden">
      {/* Ambient glow blobs — clipped by overflow-hidden on parent */}
      <div className="fixed top-[-15%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#5B3DF5]/10 blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#22E6B8]/8 blur-[120px] pointer-events-none z-0" />

      {/* Two-column row — takes all remaining height */}
      <div className="relative z-10 flex flex-col md:flex-row flex-1 min-h-0">
        <HeroBrand />
        <LoginForm />
      </div>

      {/* Footer — fixed height, never pushed off screen */}
      <footer className="relative z-10 shrink-0 w-full flex flex-col sm:flex-row items-center justify-between gap-1 px-6 md:px-10 py-3 border-t border-[#1E2742]/60">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-[#8A94A6]/60 text-center sm:text-left">
          © 2026 FUSEPAY TECHNOLOGY. ALL RIGHTS RESERVED.
        </p>
        <p className="text-[10px] text-[#8A94A6]/50 text-center sm:text-right leading-tight">
          By signing in, you agree to FusePay&apos;s Terms of Service and Privacy Policy.
        </p>
      </footer>
    </div>
  );
}
