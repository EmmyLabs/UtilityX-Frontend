"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
  id?: string;
  label?: string;
  hint?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const COUNTRIES = [
  { code: "NG", dialCode: "+234", flag: "🇳🇬" },
  { code: "GH", dialCode: "+233", flag: "🇬🇭" },
  { code: "KE", dialCode: "+254", flag: "🇰🇪" },
  { code: "ZA", dialCode: "+27",  flag: "🇿🇦" },
  { code: "US", dialCode: "+1",   flag: "🇺🇸" },
  { code: "GB", dialCode: "+44",  flag: "🇬🇧" },
];

export default function PhoneInput({
  id = "phone",
  label = "Phone Number",
  hint,
  value = "",
  onChange,
  className,
}: PhoneInputProps) {
  const [selected, setSelected] = useState(COUNTRIES[0]);
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold tracking-widest uppercase text-[#8A94A6]"
        >
          {label}
        </label>
      )}

      <div className="relative group flex items-stretch">
        {/* Country selector */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={cn(
            "flex items-center gap-1.5 px-3 shrink-0",
            "bg-[#0F162D] border border-[#1E2742] border-r-0 rounded-l-xl",
            "text-white text-sm hover:bg-[#18233F] transition-colors cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-[#5B3DF5]/50",
            "h-14"
          )}
        >
          <span className="text-lg leading-none">{selected.flag}</span>
          <span className="text-[#C8D1E6] font-medium text-sm">{selected.dialCode}</span>
          <span className="material-symbols-outlined text-[16px] text-[#8A94A6]">
            expand_more
          </span>
        </button>

        {/* Number input */}
        <input
          id={id}
          type="tel"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="Enter your phone number"
          autoComplete="tel"
          className={cn(
            "flex-1 bg-[#0F162D] border border-[#1E2742] border-l-0 rounded-r-xl",
            "h-14 px-4 text-white text-sm placeholder:text-[#8A94A6]",
            "focus:outline-none focus:ring-2 focus:ring-[#5B3DF5]/50 focus:border-[#5B3DF5]",
            "group-focus-within:border-[#5B3DF5] transition-all"
          )}
        />

        {/* Dropdown */}
        {open && (
          <ul
            role="listbox"
            className="absolute top-full left-0 mt-1 z-50 w-44 bg-[#131A2E] border border-[#1E2742] rounded-xl overflow-hidden shadow-xl shadow-black/40"
          >
            {COUNTRIES.map((c) => (
              <li key={c.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={c.code === selected.code}
                  onClick={() => { setSelected(c); setOpen(false); }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left",
                    "hover:bg-[#18233F] transition-colors cursor-pointer",
                    c.code === selected.code
                      ? "text-[#5B3DF5] font-semibold"
                      : "text-[#C8D1E6]"
                  )}
                >
                  <span className="text-base">{c.flag}</span>
                  <span>{c.dialCode}</span>
                  <span className="text-[#8A94A6] text-xs ml-auto">{c.code}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {hint && (
        <p className="text-xs text-[#8A94A6] mt-1">{hint}</p>
      )}
    </div>
  );
}
