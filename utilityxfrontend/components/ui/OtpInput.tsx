"use client";

import { useRef, KeyboardEvent, ClipboardEvent } from "react";
import { cn } from "@/lib/utils";

interface OtpInputProps {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

export default function OtpInput({ length = 6, value, onChange, error }: OtpInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const focus = (i: number) => refs.current[i]?.focus();

  const handleChange = (i: number, char: string) => {
    if (!/^\d*$/.test(char)) return;
    const next = [...value];
    next[i] = char.slice(-1);
    onChange(next);
    if (char && i < length - 1) focus(i + 1);
  };

  const handleKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[i] && i > 0) focus(i - 1);
    if (e.key === "ArrowLeft"  && i > 0)            focus(i - 1);
    if (e.key === "ArrowRight" && i < length - 1)   focus(i + 1);
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    const next = [...value];
    pasted.split("").forEach((c, i) => { next[i] = c; });
    onChange(next);
    focus(Math.min(pasted.length, length - 1));
  };

  return (
    <div className="space-y-3">
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
              "w-12 h-14 text-center text-xl font-bold text-white bg-[#0F162D] border-2 rounded-xl focus:outline-none transition-all caret-[#5B3DF5]",
              error ? "border-[#FF5A6E]" : value[i] ? "border-[#5B3DF5]" : "border-[#1E2742] focus:border-[#5B3DF5]"
            )}
          />
        ))}
      </div>
      {error && <p className="text-xs text-[#FF5A6E] text-center">{error}</p>}
    </div>
  );
}
