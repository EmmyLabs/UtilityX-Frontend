/**
 * Mock Auth Service
 * -----------------
 * Simulates real backend auth with network latency.
 * Replace each function body with real API calls when backend is ready.
 *
 * DEV credentials:
 *   Login:  demo@fusepay.com  /  any password
 *   OTP:    123456  (always)
 */

import type { ApiResponse, AuthSession, AuthUser } from "./types";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
const randDelay = () => delay(400 + Math.random() * 500);

// ─── In-memory store (resets on page refresh — expected for mock) ─────────────

interface UserRecord {
  phone: string;
  password: string;
  pin: string;
  name: string;
}

const store: {
  users: Record<string, UserRecord>;
  otpCodes: Record<string, string>;
  sessions: Record<string, string>; // token → phone
  pendingPhone: string | null;
} = {
  users: {},
  otpCodes: {},
  sessions: {},
  pendingPhone: null,
};

const MOCK_OTP = "123456";

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Step 1 — Register: creates user, "sends" OTP, returns phone for OTP screen.
 */
export async function register(
  phone: string,
  password: string
): Promise<ApiResponse<{ phone: string }>> {
  await randDelay();

  const key = phone.replace(/\s/g, "");

  if (store.users[key]) {
    return { ok: false, error: "An account with this phone number already exists." };
  }
  if (password.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters." };
  }

  store.users[key] = { phone: key, password, pin: "", name: `User ${key.slice(-4)}` };
  store.otpCodes[key] = MOCK_OTP;
  store.pendingPhone = key;

  // Dev hint in console
  console.info(`[MockAuth] OTP for ${key}: ${MOCK_OTP}`);

  return { ok: true, data: { phone: key } };
}

/**
 * Step 2 — Verify OTP.
 */
export async function verifyOtp(
  phone: string,
  otp: string
): Promise<ApiResponse<{ tempToken: string }>> {
  await randDelay();

  const key = phone.replace(/\s/g, "");
  const expected = store.otpCodes[key];

  if (!expected) return { ok: false, error: "No OTP was sent to this number. Please register first." };
  if (otp !== expected) return { ok: false, error: "Incorrect code. Please check and try again." };

  delete store.otpCodes[key];

  return { ok: true, data: { tempToken: `tmp_${key}_${Date.now()}` } };
}

/**
 * Resend OTP — resets the code.
 */
export async function resendOtp(phone: string): Promise<ApiResponse> {
  await randDelay();
  const key = phone.replace(/\s/g, "");
  store.otpCodes[key] = MOCK_OTP;
  console.info(`[MockAuth] Resent OTP for ${key}: ${MOCK_OTP}`);
  return { ok: true };
}

/**
 * Step 3 — Create PIN, completes registration, returns a full session.
 */
export async function createPin(
  phone: string,
  pin: string
): Promise<ApiResponse<AuthSession>> {
  await randDelay();

  const key = phone.replace(/\s/g, "");
  const user = store.users[key];

  if (!user) return { ok: false, error: "User not found. Please register again." };
  if (!/^\d{4}$/.test(pin)) return { ok: false, error: "PIN must be exactly 4 digits." };

  user.pin = pin;

  const token = `tok_${Math.random().toString(36).slice(2)}`;
  store.sessions[token] = key;

  return {
    ok: true,
    data: {
      user: { id: key, phone: key, name: user.name, hasPin: true },
      token,
    },
  };
}

/**
 * Login — returns a full session.
 * Demo shortcut: demo@fusepay.com with ANY password always works.
 */
export async function login(
  identifier: string,
  password: string
): Promise<ApiResponse<AuthSession>> {
  await randDelay();

  const key = identifier.replace(/\s/g, "");

  // Demo account — always succeeds
  const isDemo = key === "demo@fusepay.com" || key === "+2348000000000";

  if (!isDemo) {
    const user = store.users[key];
    if (!user || user.password !== password) {
      return { ok: false, error: "Incorrect phone number or password." };
    }
  }

  const resolvedUser: AuthUser = isDemo
    ? { id: "demo", phone: "+2348000000000", name: "Demo User", hasPin: true }
    : (() => {
        const u = store.users[key];
        return { id: key, phone: u.phone, name: u.name, hasPin: !!u.pin };
      })();

  const token = `tok_${Math.random().toString(36).slice(2)}`;
  store.sessions[token] = resolvedUser.phone;

  return { ok: true, data: { user: resolvedUser, token } };
}

/**
 * Logout — removes the session token.
 */
export async function logout(token: string): Promise<ApiResponse> {
  await randDelay();
  delete store.sessions[token];
  return { ok: true };
}

/** Get/set the phone awaiting OTP — shared between Register → OTP steps */
export function getPendingPhone(): string | null {
  return store.pendingPhone;
}

export function setPendingPhone(phone: string | null): void {
  store.pendingPhone = phone;
}
