"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import InputField from "@/components/ui/InputField";
import BrandButton from "@/components/ui/BrandButton";
import SocialButton from "@/components/ui/SocialButton";
import { GoogleIcon, AppleIcon } from "@/components/icons/SocialIcons";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    /*
     * mobile  (<768px): full width, scrolls independently
     * tablet  (768px+): right panel, h-full to fill the flex row, overflow-y-auto
     * No ghost text — it was causing horizontal scroll via whitespace-nowrap overflow
     */
    <section className="relative z-10 w-full md:w-1/2 lg:w-[42%] h-full bg-[#0F162D] md:border-l md:border-[#1E2742]/50 flex flex-col overflow-y-auto">
      <div className="flex flex-col items-center justify-center flex-1 py-10 px-6 sm:px-10 md:px-8 lg:px-12">

        {/* Mobile-only logo */}
        <div className="md:hidden flex items-center gap-2 mb-10 self-start w-full">
          <div className="w-9 h-9 rounded-xl overflow-hidden brand-gradient-bg flex items-center justify-center shrink-0">
            <Image
              src="/Logo.jpeg"
              alt="FusePay Logo"
              width={36}
              height={36}
              className="w-9 h-9 object-cover"
            />
          </div>
          <span className="text-lg font-bold text-white font-[family-name:var(--font-display)]">
            FusePay
          </span>
        </div>

        <div className="w-full max-w-[400px]">
          {/* Heading */}
          <div className="mb-7">
            <h2 className="text-2xl lg:text-[26px] font-bold text-white mb-1.5 font-[family-name:var(--font-display)]">
              Welcome Back
            </h2>
            <p className="text-[#C8D1E6] text-sm leading-relaxed">
              Sign in to your FusePay account to continue.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <InputField
              id="email"
              type="text"
              label="Email or Phone Number"
              icon="person"
              placeholder="example@fusepay.com"
              autoComplete="email"
              required
            />

            <InputField
              id="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              labelRight={
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-[#8A94A6] hover:text-[#5B3DF5] transition-colors"
                >
                  Forgot password?
                </Link>
              }
              icon="lock"
              placeholder="••••••••"
              autoComplete="current-password"
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

            <BrandButton type="submit" className="h-14 text-base">
              <span>Sign In</span>
              <span className="material-symbols-outlined text-[18px]">login</span>
            </BrandButton>

            <div className="relative flex items-center py-1">
              <div className="flex-grow border-t border-[#1E2742]" />
              <span className="flex-shrink mx-4 text-[10px] font-semibold tracking-widest uppercase text-[#8A94A6]">
                Or continue with
              </span>
              <div className="flex-grow border-t border-[#1E2742]" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <SocialButton icon={<GoogleIcon />} label="Google" type="button" aria-label="Sign in with Google" className="h-12" />
              <SocialButton icon={<AppleIcon />} label="Apple" type="button" aria-label="Sign in with Apple" className="h-12" />
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[#C8D1E6] text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[#5B3DF5] font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
