"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BackLink from "@/components/auth/BackLink";
import OtpInput from "@/components/ui/OtpInput";
import BrandButton from "@/components/ui/BrandButton";

export default function OtpForm() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);
  const router = useRouter();

  const filled = otp.every((d) => d !== "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!filled) {
      setError("Please enter all 6 digits.");
      return;
    }
    setError("");
    // TODO: verify OTP → redirect to /create-pin
    router.push("/create-pin");
  };

  const handleResend = async () => {
    setResending(true);
    // TODO: call resend OTP API
    await new Promise((r) => setTimeout(r, 1500));
    setResending(false);
  };

  return (
    <div className="w-full max-w-[480px] mx-auto flex flex-col py-4">
      {/* Mobile logo */}
      <div className="md:hidden flex items-center gap-2 mb-8">
        <div className="w-9 h-9 rounded-full bg-[#5B3DF5]/20 border border-[#5B3DF5]/40 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[#5B3DF5] text-[20px]">bolt</span>
        </div>
        <span className="text-lg font-bold text-white font-[family-name:var(--font-display)]">
          Fuse<span className="text-[#5B3DF5]">Pay</span>
        </span>
      </div>

      <BackLink href="/register" label="Back to Register" />

      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-[#5B3DF5]/15 border border-[#5B3DF5]/30 flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-[#5B3DF5] text-[28px]">sms</span>
      </div>

      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-[28px] lg:text-[32px] font-bold text-white mb-2 font-[family-name:var(--font-display)]">
          Verify your phone number
        </h2>
        <p className="text-[#8A94A6] text-sm leading-relaxed">
          We sent a 6-digit code to your phone number.
          <br />
          Enter it below to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <OtpInput
          length={6}
          value={otp}
          onChange={setOtp}
          error={error}
        />

        <BrandButton
          type="submit"
          disabled={!filled}
          className="h-14 text-base mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Verify and Continue</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </BrandButton>
      </form>

      {/* Resend */}
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
