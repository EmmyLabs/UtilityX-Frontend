"use client";

import { useRef, KeyboardEvent, ClipboardEvent } from "react";
import { cn } from "@/lib/utils";

interface OtpInputProps {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  error?: string;
}

export default function OtpInput({
  length = 6,
  value,
  onChange,
  label,
  error,
}: OtpInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const focus = (index: number) => refs.current[index]?.focus();

  const handleChange = (index: number, char: string) => {
    if (!/^\d*$/.test(char)) return;
    const next = [...value];
    next[index] = char.slice(-1);
    onChange(next);
    if (char && index < length - 1) focus(index + 1);
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) focus(index - 1);
    if (e.key === "ArrowLeft" && index > 0) focus(index - 1);
    if (e.key === "ArrowRight" && index < length - 1) focus(index + 1);
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    const next = [...value];
    pasted.split("").forEach((char, i) => { next[i] = char; });
    onChange(next);
    const lastFilled = Math.min(pasted.length, length - 1);
    focus(lastFilled);
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="text-xs font-semibold tracking-widest uppercase text-[#8A94A6]">
          {label}
        </label>
      )}

      <div className="flex gap-3 justify-center">
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[i] ?? ""}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            aria-label={`OTP digit ${i + 1}`}
            className={cn(
              "w-12 h-14 text-center text-xl font-bold text-white",
              "bg-[#0F162D] border-2 rounded-xl",
              "focus:outline-none focus:ring-0 transition-all",
              "caret-[#5B3DF5]",
              error
                ? "border-[#FF5A6E]"
                : value[i]
                ? "border-[#5B3DF5]"
                : "border-[#1E2742] focus:border-[#5B3DF5]"
            )}
          />
        ))}
      </div>

      {error && (
        <p className="text-xs text-[#FF5A6E] text-center">{error}</p>
      )}
    </div>
  );
}
