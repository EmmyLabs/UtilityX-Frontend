"use client";

import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/ui/Logo";
import BrandButton from "@/components/ui/BrandButton";

export default function DashboardPage() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-[#0B1020] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md text-center space-y-6">
        <Logo size="lg" href="/" />

        <div className="bg-[#131A2E] border border-[#1E2742] rounded-2xl p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#22E6B8]/20 border border-[#22E6B8]/30 flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[#22E6B8] text-[32px]">check_circle</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">
            Welcome, {user?.name ?? "User"}!
          </h1>
          <p className="text-[#8A94A6] text-sm">
            You&apos;re now signed in to FusePay.
            <br />
            Dashboard UI coming soon.
          </p>
          <div className="bg-[#0F162D] rounded-xl p-4 text-left space-y-1">
            <p className="text-xs text-[#8A94A6] uppercase tracking-widest font-semibold">Session</p>
            <p className="text-sm text-white font-mono">{user?.phone}</p>
            <p className="text-xs text-[#22E6B8]">✓ Authenticated</p>
          </div>
        </div>

        <BrandButton onClick={signOut} className="max-w-xs mx-auto">
          <span className="material-symbols-outlined text-[18px]">logout</span>
          Sign Out
        </BrandButton>
      </div>
    </div>
  );
}
