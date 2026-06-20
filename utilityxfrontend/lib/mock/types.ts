export interface AuthUser {
  id: string;
  phone: string;
  name: string;
  hasPin: boolean;
  email?: string;
  tier?: string;
  avatar?: string;
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

export interface Balance {
  naira: number;
  usd: number;
  escrow: number;
  changePercent: number;
}

export type TransactionCategory =
  | "airtime"
  | "data"
  | "gift-card"
  | "transfer"
  | "received";

export interface Transaction {
  id: string;
  type: "debit" | "credit";
  description: string;
  to: string;
  amount: number;
  date: string;
  time: string;
  category: TransactionCategory;
}

export type ListingCategory = "airtime" | "data" | "gift-card";
export type Network = "MTN" | "Airtel" | "Glo" | "9Mobile";

export interface MarketListing {
  id: string;
  type: "buy" | "sell";
  category: ListingCategory;
  network: Network;
  amount: number;
  price: number;
  seller: string;
  rating: number;
  verified: boolean;
  expiresIn: number; // hours
}

export type NotificationType = "transaction" | "promo" | "security" | "kyc";

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: NotificationType;
}
