import type {
  Balance,
  Transaction,
  MarketListing,
  Notification,
  ListingCategory,
} from "./types";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomDelay() {
  return delay(300 + Math.random() * 300);
}

export async function getBalance(): Promise<Balance> {
  await randomDelay();
  return {
    naira: 125000.0,
    usd: 80.2,
    escrow: 18500.0,
    changePercent: 2.45,
  };
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "txn_001",
    type: "debit",
    description: "Airtime Purchase",
    to: "08012345678",
    amount: 1000,
    date: "Today",
    time: "2:34 PM",
    category: "airtime",
  },
  {
    id: "txn_002",
    type: "debit",
    description: "Data Bundle",
    to: "08054321987",
    amount: 2500,
    date: "Today",
    time: "11:12 AM",
    category: "data",
  },
  {
    id: "txn_003",
    type: "credit",
    description: "Gift Card Sale",
    to: "Marketplace",
    amount: 15000,
    date: "Yesterday",
    time: "6:45 PM",
    category: "received",
  },
  {
    id: "txn_004",
    type: "debit",
    description: "Wallet Transfer",
    to: "Chidi Okafor",
    amount: 5000,
    date: "Yesterday",
    time: "3:10 PM",
    category: "transfer",
  },
  {
    id: "txn_005",
    type: "credit",
    description: "Data Sale",
    to: "Marketplace",
    amount: 3200,
    date: "Dec 12",
    time: "9:00 AM",
    category: "received",
  },
  {
    id: "txn_006",
    type: "debit",
    description: "Amazon Gift Card",
    to: "08076543210",
    amount: 12000,
    date: "Dec 11",
    time: "1:22 PM",
    category: "gift-card",
  },
  {
    id: "txn_007",
    type: "credit",
    description: "Airtime Sale",
    to: "Marketplace",
    amount: 950,
    date: "Dec 10",
    time: "4:55 PM",
    category: "received",
  },
];

export async function getTransactions(): Promise<Transaction[]> {
  await randomDelay();
  return MOCK_TRANSACTIONS;
}

const MOCK_LISTINGS: MarketListing[] = [
  {
    id: "lst_001",
    type: "sell",
    category: "data",
    network: "MTN",
    amount: 5,
    price: 1400,
    seller: "Tunde_Sells",
    rating: 4.8,
    verified: true,
    expiresIn: 6,
  },
  {
    id: "lst_002",
    type: "sell",
    category: "airtime",
    network: "Airtel",
    amount: 2000,
    price: 1750,
    seller: "AdekunleFX",
    rating: 4.5,
    verified: true,
    expiresIn: 12,
  },
  {
    id: "lst_003",
    type: "buy",
    category: "data",
    network: "Glo",
    amount: 10,
    price: 2600,
    seller: "GloDealer_1",
    rating: 4.2,
    verified: false,
    expiresIn: 3,
  },
  {
    id: "lst_004",
    type: "sell",
    category: "gift-card",
    network: "MTN",
    amount: 50,
    price: 35000,
    seller: "GiftMaster_NG",
    rating: 4.9,
    verified: true,
    expiresIn: 24,
  },
  {
    id: "lst_005",
    type: "buy",
    category: "airtime",
    network: "9Mobile",
    amount: 5000,
    price: 4400,
    seller: "Etisalat_Pro",
    rating: 4.0,
    verified: false,
    expiresIn: 8,
  },
  {
    id: "lst_006",
    type: "sell",
    category: "data",
    network: "Airtel",
    amount: 20,
    price: 5200,
    seller: "DataKing_Lag",
    rating: 4.7,
    verified: true,
    expiresIn: 18,
  },
];

export async function getMarketListings(
  filter?: string
): Promise<MarketListing[]> {
  await randomDelay();
  if (!filter || filter === "all") return MOCK_LISTINGS;

  if (filter === "buy" || filter === "sell") {
    return MOCK_LISTINGS.filter((l) => l.type === filter);
  }

  return MOCK_LISTINGS.filter(
    (l) => l.category === (filter as ListingCategory)
  );
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif_001",
    title: "Transaction Successful",
    message: "Your airtime purchase of ₦1,000 was successful.",
    time: "2 min ago",
    read: false,
    type: "transaction",
  },
  {
    id: "notif_002",
    title: "KYC Verification",
    message: "Complete your KYC to unlock higher limits.",
    time: "1 hour ago",
    read: false,
    type: "kyc",
  },
  {
    id: "notif_003",
    title: "New Market Listing",
    message: "5GB MTN data is now available at ₦1,400.",
    time: "3 hours ago",
    read: true,
    type: "promo",
  },
  {
    id: "notif_004",
    title: "Security Alert",
    message: "A new device logged into your account.",
    time: "Yesterday",
    read: true,
    type: "security",
  },
];

export async function getNotifications(): Promise<Notification[]> {
  await randomDelay();
  return MOCK_NOTIFICATIONS;
}
