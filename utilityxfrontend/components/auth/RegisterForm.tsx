"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BackLink from "@/components/auth/BackLink";
import PhoneInput from "@/components/ui/PhoneInput";
import InputField from "@/components/ui/InputField";
import BrandButton from "@/components/ui/BrandButton";
import SocialButton from "@/components/ui/SocialButton";
import { GoogleIcon, AppleIcon } from "@/components/icons/SocialIcons";

export default function RegisterForm() {
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: submit registration → redirect to /otp
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

      <BackLink href="/login" />

      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-[28px] lg:text-[32px] font-bold text-white mb-2 font-[family-name:var(--font-display)]">
          Create your account
        </h2>
        <p className="text-[#8A94A6] text-sm">Get started in less than a minute</p>
      </div>

      {/* Form */}
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <PhoneInput
          id="phone"
          label="Phone Number"
          hint="We'll send a verification code to this number"
          value={phone}
          onChange={setPhone}
        />

        <InputField
          id="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          icon="lock"
          placeholder="Create a strong password"
          autoComplete="new-password"
          hint="Use 8 or more characters with a mix of letters, numbers & symbols"
          required
          suffix={
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="text-[#8A94A6] hover:text-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          }
        />

        <BrandButton type="submit" className="h-14 text-base mt-2">
          <span>Create Account</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </BrandButton>

        {/* Divider */}
        <div className="relative flex items-center py-1">
          <div className="flex-grow border-t border-[#1E2742]" />
          <span className="flex-shrink mx-4 text-[10px] font-semibold tracking-widest uppercase text-[#8A94A6]">
            or continue with
          </span>
          <div className="flex-grow border-t border-[#1E2742]" />
        </div>

        {/* Social */}
        <div className="grid grid-cols-2 gap-3">
          <SocialButton
            icon={<GoogleIcon />}
            label="Continue with Google"
            type="button"
            aria-label="Continue with Google"
            className="h-14"
          />
          <SocialButton
            icon={<AppleIcon />}
            label="Continue with Apple"
            type="button"
            aria-label="Continue with Apple"
            className="h-14"
          />
        </div>
      </form>

      {/* Sign in link */}
      <p className="mt-8 text-center text-[#8A94A6] text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-[#5B3DF5] font-bold hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
