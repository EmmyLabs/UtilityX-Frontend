"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BackLink from "@/components/auth/BackLink";
import PinInput from "@/components/ui/PinInput";
import BrandButton from "@/components/ui/BrandButton";

export default function CreatePinForm() {
  const [pin, setPin] = useState<string[]>(Array(4).fill(""));
  const [confirmPin, setConfirmPin] = useState<string[]>(Array(4).fill(""));
  const [error, setError] = useState("");
  const router = useRouter();

  const pinFilled = pin.every((d) => d !== "");
  const confirmFilled = confirmPin.every((d) => d !== "");
  const ready = pinFilled && confirmFilled;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.join("") !== confirmPin.join("")) {
      setError("PINs do not match. Please try again.");
      setConfirmPin(Array(4).fill(""));
      return;
    }
    setError("");
    // TODO: save PIN → redirect to dashboard
    router.push("/dashboard");
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

      <BackLink href="/otp" label="Back" />

      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-[#22E6B8]/10 border border-[#22E6B8]/30 flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-[#22E6B8] text-[28px]">pin</span>
      </div>

      {/* Heading */}
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
        {/* PIN */}
        <div className="bg-[#131A2E] border border-[#1E2742] rounded-2xl p-6 space-y-8">
          <PinInput
            length={4}
            value={pin}
            onChange={setPin}
            label="Enter PIN"
            hint="Choose a 4-digit transaction PIN"
            masked
          />

          <PinInput
            length={4}
            value={confirmPin}
            onChange={(v) => { setConfirmPin(v); setError(""); }}
            label="Confirm PIN"
            error={error}
            masked
          />
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`rounded-full transition-all ${
                i < pin.filter(Boolean).length
                  ? "w-4 h-2 bg-[#5B3DF5]"
                  : "w-2 h-2 bg-[#1E2742]"
              }`}
            />
          ))}
        </div>

        <BrandButton
          type="submit"
          disabled={!ready}
          className="h-14 text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Continue</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </BrandButton>
      </form>

      <p className="mt-6 text-center text-xs text-[#8A94A6] leading-relaxed">
        You can always change your PIN later in{" "}
        <span className="text-[#C8D1E6]">Security Settings</span>.
      </p>
    </div>
  );
}
