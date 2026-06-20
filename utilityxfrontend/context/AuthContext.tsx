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
import { logout } from "@/lib/mock/authService";

// ─── Shape ────────────────────────────────────────────────────────────────────

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  /** Phone awaiting OTP — passed from Register → OTP → CreatePin */
  pendingPhone: string | null;
  setPendingPhone: (phone: string | null) => void;
  /** Called after login or createPin succeeds */
  signIn: (session: AuthSession) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const SESSION_KEY = "fp_session";

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingPhone, setPendingPhone] = useState<string | null>(null);

  // Restore session from sessionStorage on first render
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const session: AuthSession = JSON.parse(raw);
        setUser(session.user);
        setToken(session.token);
      }
    } catch {
      sessionStorage.removeItem(SESSION_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signIn = useCallback((session: AuthSession) => {
    setUser(session.user);
    setToken(session.token);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }, []);

  const signOut = useCallback(async () => {
    if (token) await logout(token).catch(() => {});
    setUser(null);
    setToken(null);
    sessionStorage.removeItem(SESSION_KEY);
    router.push("/login");
  }, [token, router]);

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, pendingPhone, setPendingPhone, signIn, signOut }}
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
