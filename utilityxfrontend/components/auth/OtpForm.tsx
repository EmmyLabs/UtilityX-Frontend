"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import BackLink from "@/components/auth/BackLink";
import OtpInput from "@/components/ui/OtpInput";
import BrandButton from "@/components/ui/BrandButton";
import { useAuth } from "@/context/AuthContext";
import * as authService from "@/lib/mock/authService";

export default function OtpForm() {
  const router = useRouter();
  const { pendingPhone, setPendingPhone } = useAuth();

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const phone = pendingPhone ?? "";
  const filled = otp.every((d) => d !== "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!filled) { setError("Please enter all 6 digits."); return; }
    if (!phone)  { setError("Session expired. Please register again."); return; }

    setError("");
    setLoading(true);
    const res = await authService.verifyOtp(phone, otp.join(""));
    setLoading(false);

    if (!res.ok) {
      setError(res.error ?? "Invalid code. Please try again.");
      setOtp(Array(6).fill(""));
      return;
    }

    router.push("/create-pin");
  };

  const handleResend = async () => {
    if (!phone) return;
    setResending(true);
    await authService.resendOtp(phone);
    setResending(false);
    setOtp(Array(6).fill(""));
    setError("");
  };

  return (
    <div className="w-full max-w-[480px] mx-auto flex flex-col py-4">
      <div className="md:hidden mb-8">
        <Logo size="sm" />
      </div>

      <BackLink href="/register" label="Back to Register" />

      <div className="w-14 h-14 rounded-2xl bg-[#5B3DF5]/15 border border-[#5B3DF5]/30 flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-[#5B3DF5] text-[28px]">sms</span>
      </div>

      <div className="mb-8">
        <h2 className="text-[28px] lg:text-[32px] font-bold text-white mb-2 font-[family-name:var(--font-display)]">
          Verify your phone number
        </h2>
        <p className="text-[#8A94A6] text-sm leading-relaxed">
          We sent a 6-digit code to{" "}
          <span className="text-white font-semibold">{phone || "your number"}</span>.
          <br />
          Enter it below to continue.
        </p>
      </div>

      {/* Dev hint */}
      <div className="mb-6 px-4 py-3 rounded-xl bg-[#22E6B8]/10 border border-[#22E6B8]/20 text-xs text-[#8A94A6]">
        <span className="text-[#22E6B8] font-semibold">Dev mode: </span>
        OTP is always <span className="text-white font-mono font-bold">123456</span>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <OtpInput length={6} value={otp} onChange={setOtp} error={error} />

        <BrandButton
          type="submit"
          disabled={!filled || loading}
          className="h-14 text-base mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Verifying…
            </span>
          ) : (
            <>
              <span>Verify and Continue</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </>
          )}
        </BrandButton>
      </form>

      <div className="mt-6 text-center">
        <p className="text-[#8A94A6] text-sm">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="text-[#5B3DF5] font-bold hover:underline disabled:opacity-50 cursor-pointer"
          >
            {resending ? "Sending…" : "Resend Code"}
          </button>
        </p>
      </div>
    </div>
  );
}
