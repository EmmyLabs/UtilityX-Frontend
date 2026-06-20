"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import BackLink from "@/components/auth/BackLink";
import PinInput from "@/components/ui/PinInput";
import BrandButton from "@/components/ui/BrandButton";
import { useAuth } from "@/context/AuthContext";
import * as authService from "@/lib/mock/authService";

export default function CreatePinForm() {
  const router = useRouter();
  const { pendingPhone, setPendingPhone, signIn } = useAuth();

  const [pin, setPin] = useState<string[]>(Array(4).fill(""));
  const [confirmPin, setConfirmPin] = useState<string[]>(Array(4).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const phone = pendingPhone ?? "";
  const pinFilled = pin.every((d) => d !== "");
  const confirmFilled = confirmPin.every((d) => d !== "");
  const ready = pinFilled && confirmFilled;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.join("") !== confirmPin.join("")) {
      setError("PINs do not match. Please try again.");
      setConfirmPin(Array(4).fill(""));
      return;
    }
    if (!phone) { setError("Session expired. Please register again."); return; }

    setError("");
    setLoading(true);
    const res = await authService.createPin(phone, pin.join(""));
    setLoading(false);

    if (!res.ok || !res.data) {
      setError(res.error ?? "Failed to set PIN. Please try again.");
      return;
    }

    // Sign in and clear pending phone
    signIn(res.data);
    setPendingPhone(null);
    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-[480px] mx-auto flex flex-col py-4">
      <div className="md:hidden mb-8">
        <Logo size="sm" />
      </div>

      <BackLink href="/otp" label="Back" />

      <div className="w-14 h-14 rounded-2xl bg-[#22E6B8]/10 border border-[#22E6B8]/30 flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-[#22E6B8] text-[28px]">pin</span>
      </div>

      <div className="mb-8">
        <h2 className="text-[28px] lg:text-[32px] font-bold text-white mb-2 font-[family-name:var(--font-display)]">
          Create Transaction PIN
        </h2>
        <p className="text-[#8A94A6] text-sm leading-relaxed">
          Your 4-digit PIN secures every transaction.
          <br />
          Keep it private and never share it.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        <div className="bg-[#131A2E] border border-[#1E2742] rounded-2xl p-6 space-y-8">
          <PinInput length={4} value={pin} onChange={setPin} label="Enter PIN" hint="Choose a 4-digit transaction PIN" masked />
          <PinInput
            length={4}
            value={confirmPin}
            onChange={(v) => { setConfirmPin(v); setError(""); }}
            label="Confirm PIN"
            error={error}
            masked
          />
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-200 ${
                i < pin.filter(Boolean).length ? "w-4 h-2 bg-[#5B3DF5]" : "w-2 h-2 bg-[#1E2742]"
              }`}
            />
          ))}
        </div>

        <BrandButton type="submit" disabled={!ready || loading} className="h-14 text-base disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Setting PIN…
            </span>
          ) : (
            <>
              <span>Continue</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </>
          )}
        </BrandButton>
      </form>

      <p className="mt-6 text-center text-xs text-[#8A94A6] leading-relaxed">
        You can change your PIN anytime in{" "}
        <span className="text-[#C8D1E6]">Security Settings</span>.
      </p>
    </div>
  );
}
