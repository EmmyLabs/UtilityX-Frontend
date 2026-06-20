"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import BackLink from "@/components/auth/BackLink";
import PhoneInput from "@/components/ui/PhoneInput";
import InputField from "@/components/ui/InputField";
import BrandButton from "@/components/ui/BrandButton";
import SocialButton from "@/components/ui/SocialButton";
import AuthDivider from "@/components/ui/AuthDivider";
import { GoogleIcon, AppleIcon } from "@/components/icons/SocialIcons";
import { useAuth } from "@/context/AuthContext";
import * as authService from "@/lib/mock/authService";

export default function RegisterForm() {
  const router = useRouter();
  const { setPendingPhone } = useAuth();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!phone.trim()) { setError("Please enter your phone number."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }

    setLoading(true);
    const res = await authService.register(phone.trim(), password);
    setLoading(false);

    if (!res.ok || !res.data) {
      setError(res.error ?? "Registration failed. Please try again.");
      return;
    }

    // Store phone so OTP screen knows who to verify
    setPendingPhone(res.data.phone);
    router.push("/otp");
  };

  return (
    <div className="w-full max-w-[480px] mx-auto flex flex-col py-4">
      <div className="md:hidden mb-8">
        <Logo size="sm" />
      </div>

      <BackLink href="/login" />

      <div className="mb-8">
        <h2 className="text-[28px] lg:text-[32px] font-bold text-white mb-2 font-[family-name:var(--font-display)]">
          Create your account
        </h2>
        <p className="text-[#8A94A6] text-sm">Get started in less than a minute</p>
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 rounded-xl bg-[#FF5A6E]/10 border border-[#FF5A6E]/30 text-[#FF5A6E] text-sm">
          {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <PhoneInput
          id="phone"
          label="Phone Number"
          hint="We'll send a verification code to this number"
          value={phone}
          onChange={setPhone}
        />

        <InputField
          id="reg-password"
          type={showPassword ? "text" : "password"}
          label="Password"
          icon="lock"
          placeholder="Create a strong password"
          autoComplete="new-password"
          hint="Use 8 or more characters with letters, numbers & symbols"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          suffix={
            <button type="button" onClick={() => setShowPassword((p) => !p)} aria-label={showPassword ? "Hide" : "Show"} className="text-[#8A94A6] hover:text-white transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">{showPassword ? "visibility_off" : "visibility"}</span>
            </button>
          }
        />

        <BrandButton type="submit" disabled={loading} className="h-14 text-base disabled:opacity-60">
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating account…
            </span>
          ) : (
            <>
              <span>Create Account</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </>
          )}
        </BrandButton>

        <AuthDivider />

        <div className="grid grid-cols-2 gap-3">
          <SocialButton icon={<GoogleIcon />} label="Google" type="button" className="h-14" />
          <SocialButton icon={<AppleIcon />} label="Apple"  type="button" className="h-14" />
        </div>
      </form>

      <p className="mt-8 text-center text-[#8A94A6] text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-[#5B3DF5] font-bold hover:underline">Sign In</Link>
      </p>
    </div>
  );
}
