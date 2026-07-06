/**
 * Mock Auth Service
 * -----------------
 * Simulates network latency (400–900ms) and deterministic outcomes so the
 * entire auth flow (Register → OTP → Create PIN → Login) can be exercised
 * end-to-end without a real backend.
 *
 * Replace each function body with a real fetch/axios call when the API is ready.
 */

import type { ApiResponse, AuthSession, AuthUser } from "./types";

// ─── Helpers ────────────────────────────────────────────────────────────────

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const fakeDelay = () => delay(rand(400, 900));

// In-memory store (resets on page refresh — expected for a mock)
interface MockStore {
  users: Record<string, { phone: string; password: string; pin: string; name: string }>;
  otpStore: Record<string, string>;   // phone → otp
  sessions: Record<string, string>;   // token → phone
  pendingPhone: string | null;        // phone awaiting OTP
}

const store: MockStore = {
  users: {},
  otpStore: {},
  sessions: {},
  pendingPhone: null,
};

// ─── Mock OTP (always "123456" in dev) ───────────────────────────────────────
const MOCK_OTP = "123456";

// ─── Auth Service ────────────────────────────────────────────────────────────

/**
 * Register a new user.
 * Stores credentials, sends a mock OTP, and returns the phone for the OTP step.
 */
export async function register(
  phone: string,
  password: string
): Promise<ApiResponse<{ phone: string }>> {
  await fakeDelay();

  const normalized = phone.replace(/\s/g, "");

  if (store.users[normalized]) {
    return { ok: false, error: "An account with this phone number already exists." };
  }
  if (password.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters." };
  }

  // Store user (no OTP yet — sent separately)
  store.users[normalized] = {
    phone: normalized,
    password,
    pin: "",
    name: `User ${normalized.slice(-4)}`,
  };

  // "Send" OTP
  store.otpStore[normalized] = MOCK_OTP;
  store.pendingPhone = normalized;

  console.info(`[MockAuth] OTP for ${normalized}: ${MOCK_OTP}`);

  return { ok: true, data: { phone: normalized } };
}

/**
 * Resend OTP (same mock code, resets timer).
 */
export async function resendOtp(phone: string): Promise<ApiResponse> {
  await fakeDelay();
  const normalized = phone.replace(/\s/g, "");
  store.otpStore[normalized] = MOCK_OTP;
  console.info(`[MockAuth] Resent OTP for ${normalized}: ${MOCK_OTP}`);
  return { ok: true };
}

/**
 * Verify OTP.
 * Returns a temporary token used to authorise the PIN creation step.
 */
export async function verifyOtp(
  phone: string,
  otp: string
): Promise<ApiResponse<{ tempToken: string }>> {
  await fakeDelay();

  const normalized = phone.replace(/\s/g, "");
  const expected = store.otpStore[normalized];

  if (!expected) return { ok: false, error: "No OTP was sent to this number." };
  if (otp !== expected) return { ok: false, error: "Incorrect code. Please try again." };

  // Clear OTP
  delete store.otpStore[normalized];
  const tempToken = `tmp_${normalized}_${Date.now()}`;

  return { ok: true, data: { tempToken } };
}

/**
 * Set transaction PIN.
 * Completes registration and returns a full auth session.
 */
export async function createPin(
  phone: string,
  pin: string
): Promise<ApiResponse<AuthSession>> {
  await fakeDelay();

  const normalized = phone.replace(/\s/g, "");
  const user = store.users[normalized];

  if (!user) return { ok: false, error: "User not found." };
  if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
    return { ok: false, error: "PIN must be exactly 4 digits." };
  }

  user.pin = pin;
  user.name = `User ${normalized.slice(-4)}`;

  const token = `tok_${Math.random().toString(36).slice(2)}`;
  store.sessions[token] = normalized;

  const session: AuthSession = {
    user: { id: normalized, phone: normalized, name: user.name, hasPin: true },
    token,
  };

  return { ok: true, data: session };
}

/**
 * Sign in with phone + password.
 * Returns a full auth session.
 */
export async function login(
  phoneOrEmail: string,
  password: string
): Promise<ApiResponse<AuthSession>> {
  await fakeDelay();

  const normalized = phoneOrEmail.replace(/\s/g, "");
  const user = store.users[normalized];

  // Demo shortcut — a hardcoded test account always works
  const isDemoAccount =
    normalized === "demo@fusepay.com" || normalized === "+2348000000000";

  if (!isDemoAccount && (!user || user.password !== password)) {
    return { ok: false, error: "Invalid credentials. Please try again." };
  }

  const resolvedUser: AuthUser = isDemoAccount
    ? { id: "demo", phone: "+2348000000000", name: "Demo User", hasPin: true }
    : { id: normalized, phone: user.phone, name: user.name, hasPin: !!user.pin };

  const token = `tok_${Math.random().toString(36).slice(2)}`;
  store.sessions[token] = resolvedUser.phone;

  return { ok: true, data: { user: resolvedUser, token } };
}

/**
 * Sign out — invalidates the token.
 */
export async function logout(token: string): Promise<ApiResponse> {
  await fakeDelay();
  delete store.sessions[token];
  return { ok: true };
}

/**
 * Validate a session token (used on page load to restore auth state).
 */
export async function validateSession(
  token: string
): Promise<ApiResponse<AuthUser>> {
  await fakeDelay();

  const phone = store.sessions[token];
  if (!phone) return { ok: false, error: "Session expired." };

  const user = store.users[phone];
  if (!user) return { ok: false, error: "User not found." };

  return {
    ok: true,
    data: { id: phone, phone: user.phone, name: user.name, hasPin: !!user.pin },
  };
}

/** Expose the pending phone between Register → OTP steps */
export function getPendingPhone(): string | null {
  return store.pendingPhone;
}

export function setPendingPhone(phone: string | null) {
  store.pendingPhone = phone;
}
