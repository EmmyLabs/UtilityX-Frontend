"use client";

import { useRef, KeyboardEvent, useState } from "react";
import { cn } from "@/lib/utils";

interface PinInputProps {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  hint?: string;
  error?: string;
  masked?: boolean;
}

export default function PinInput({ length = 4, value, onChange, label, hint, error, masked = true }: PinInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const [reveal, setReveal] = useState(false);
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
    if (e.key === "ArrowLeft"  && i > 0)             focus(i - 1);
    if (e.key === "ArrowRight" && i < length - 1)    focus(i + 1);
  };

  return (
    <div className="space-y-3">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold tracking-widest uppercase text-[#8A94A6]">{label}</label>
          {masked && (
            <button type="button" onClick={() => setReveal((r) => !r)} className="text-[#8A94A6] hover:text-white transition-colors cursor-pointer" aria-label={reveal ? "Hide PIN" : "Show PIN"}>
              <span className="material-symbols-outlined text-[18px]">{reveal ? "visibility_off" : "visibility"}</span>
            </button>
          )}
        </div>
      )}
      <div className="flex gap-4 justify-center">
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            type={masked && !reveal ? "password" : "text"}
            inputMode="numeric"
            maxLength={1}
            value={value[i] ?? ""}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            aria-label={`PIN digit ${i + 1}`}
            className={cn(
              "w-14 h-14 text-center text-2xl font-bold text-white bg-[#0F162D] border-2 rounded-xl focus:outline-none transition-all caret-[#5B3DF5]",
              error ? "border-[#FF5A6E]" : value[i] ? "border-[#5B3DF5] bg-[#5B3DF5]/10" : "border-[#1E2742] focus:border-[#5B3DF5]"
            )}
          />
        ))}
      </div>
      {hint && !error && <p className="text-xs text-[#8A94A6] text-center">{hint}</p>}
      {error && <p className="text-xs text-[#FF5A6E] text-center">{error}</p>}
    </div>
  );
}
