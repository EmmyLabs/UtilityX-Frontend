"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import InputField from "@/components/ui/InputField";
import BrandButton from "@/components/ui/BrandButton";
import SocialButton from "@/components/ui/SocialButton";
import AuthDivider from "@/components/ui/AuthDivider";
import { GoogleIcon, AppleIcon } from "@/components/icons/SocialIcons";
import { useAuth } from "@/context/AuthContext";
import { login } from "@/lib/mock/authService";

export default function LoginForm() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!identifier.trim()) { setError("Please enter your phone number or email."); return; }
    if (!password)           { setError("Please enter your password."); return; }

    setLoading(true);
    const res = await login(identifier.trim(), password);
    setLoading(false);

    if (!res.ok || !res.data) {
      setError(res.error ?? "Login failed. Please try again.");
      return;
    }

    signIn(res.data);
    router.push("/dashboard");
  };

  return (
    <section className="relative z-10 w-full md:w-1/2 lg:w-[42%] h-full bg-[#0F162D] md:border-l md:border-[#1E2742]/50 flex flex-col overflow-y-auto">
      <div className="flex flex-col items-center justify-center flex-1 py-10 px-6 sm:px-10 md:px-8 lg:px-12">

        {/* Mobile logo — reusable Logo component */}
        <div className="md:hidden self-start mb-10">
          <Logo size="sm" />
        </div>

        <div className="w-full max-w-[400px]">
          <div className="mb-7">
            <h2 className="text-2xl lg:text-[26px] font-bold text-white mb-1.5 font-[family-name:var(--font-display)]">
              Welcome Back
            </h2>
            <p className="text-[#C8D1E6] text-sm leading-relaxed">
              Sign in to your FusePay account to continue.
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-[#FF5A6E]/10 border border-[#FF5A6E]/30 text-[#FF5A6E] text-sm">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <InputField
              id="identifier"
              type="text"
              label="Email or Phone Number"
              icon="person"
              placeholder="example@fusepay.com"
              autoComplete="email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />

            <InputField
              id="login-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              labelRight={
                <Link href="/forgot-password" className="text-xs font-semibold text-[#8A94A6] hover:text-[#5B3DF5] transition-colors">
                  Forgot password?
                </Link>
              }
              icon="lock"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              suffix={
                <button type="button" onClick={() => setShowPassword((p) => !p)} aria-label={showPassword ? "Hide password" : "Show password"} className="text-[#8A94A6] hover:text-white transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-[20px]">{showPassword ? "visibility_off" : "visibility"}</span>
                </button>
              }
            />

            <BrandButton type="submit" disabled={loading} className="h-14 text-base disabled:opacity-60">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : (
                <>
                  <span>Sign In</span>
                  <span className="material-symbols-outlined text-[18px]">login</span>
                </>
              )}
            </BrandButton>

            <AuthDivider />

            <div className="grid grid-cols-2 gap-3">
              <SocialButton icon={<GoogleIcon />} label="Google" type="button" className="h-12" />
              <SocialButton icon={<AppleIcon />} label="Apple"  type="button" className="h-12" />
            </div>
          </form>

          {/* Dev hint */}
          <div className="mt-4 px-4 py-3 rounded-xl bg-[#5B3DF5]/10 border border-[#5B3DF5]/20 text-xs text-[#8A94A6]">
            <span className="text-[#a78bfa] font-semibold">Demo: </span>
            Use <span className="text-white font-mono">demo@fusepay.com</span> with any password.
          </div>

          <div className="mt-6 text-center">
            <p className="text-[#C8D1E6] text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[#5B3DF5] font-bold hover:underline">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
