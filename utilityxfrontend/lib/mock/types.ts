// ─── Shared Types ────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  phone: string;
  name: string;
  hasPin: boolean;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
}

export interface ApiResponse<T = void> {
  ok: boolean;
  data?: T;
  error?: string;
}
