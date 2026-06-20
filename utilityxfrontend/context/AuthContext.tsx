"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { AuthUser, AuthSession } from "@/lib/mock/types";
import * as authService from "@/lib/mock/authService";

// ─── Context shape ────────────────────────────────────────────────────────────

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  /** Phone awaiting OTP verification — shared between Register → OTP steps */
  pendingPhone: string | null;
  setPendingPhone: (phone: string | null) => void;
  signIn: (session: AuthSession) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const SESSION_KEY = "fp_session";

// ─── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingPhone, setPendingPhone] = useState<string | null>(null);

  // Restore session from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) {
      try {
        const session: AuthSession = JSON.parse(saved);
        setUser(session.user);
        setToken(session.token);
      } catch {
        sessionStorage.removeItem(SESSION_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = useCallback((session: AuthSession) => {
    setUser(session.user);
    setToken(session.token);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }, []);

  const signOut = useCallback(async () => {
    if (token) await authService.logout(token);
    setUser(null);
    setToken(null);
    sessionStorage.removeItem(SESSION_KEY);
    router.push("/login");
  }, [token, router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        pendingPhone,
        setPendingPhone,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
