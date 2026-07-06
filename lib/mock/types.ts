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

// ─── Dashboard Types ─────────────────────────────────────────────────────────

export interface Balance {
  naira: number;
  usd: number;
  escrow: number;
  changePercent: number;
}

export type TransactionCategory = "airtime" | "data" | "gift-card" | "transfer" | "received";

export interface Transaction {
  id: string;
  type: "credit" | "debit";
  description: string;
  to: string;
  amount: number;
  date: string;
  time: string;
  category: TransactionCategory;
}

export type ListingCategory = "airtime" | "data" | "gift-card";

export interface MarketListing {
  id: string;
  type: "buy" | "sell";
  category: ListingCategory;
  network: string;
  amount: number;
  price: number;
  seller: string;
  rating: number;
  verified: boolean;
  expiresIn: number;
}

export type NotificationType = "transaction" | "kyc" | "promo" | "security";

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: NotificationType;
}
