# FusePay Frontend — Project Documentation

> Version: 1.0.0 · Stack: Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS v4

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Routing & Pages](#4-routing--pages)
5. [Auth Flow](#5-auth-flow)
6. [State Management](#6-state-management)
7. [Mock Services & Types](#7-mock-services--types)
8. [Components Reference](#8-components-reference)
   - [UI Primitives](#81-ui-primitives-componentsui)
   - [Auth Components](#82-auth-components-componentsauth)
   - [Dashboard Layout](#83-dashboard-layout-componentsdashboardlayout)
   - [Dashboard Home](#84-dashboard-home-componentsdashboardhome)
   - [Market Components](#85-market-components-componentsdashboardmarket)
   - [Shared Dashboard Components](#86-shared-components-componentsdashboardshared)
   - [Icon Components](#87-icon-components-componentsicons)
9. [Styling System](#9-styling-system)
10. [Configuration Files](#10-configuration-files)
11. [Known Issues & TODOs](#11-known-issues--todos)

---

## 1. Project Overview

FusePay is a **Nigerian fintech marketplace web application** for buying, selling, and trading digital utilities — primarily **airtime top-ups, mobile data bundles, and gift cards**. The platform is built around a peer-to-peer (P2P) model secured by a **FusePay Escrow system**, protecting buyers and sellers during trades.

**Core features:**

| Feature | Description |
|---|---|
| Authentication | Full multi-step flow: Register → OTP Verification → PIN Creation → Login |
| Dashboard | Home overview with balance, active trades, quick navigation, and market previews |
| Marketplace | P2P listings for airtime, data, and gift cards with category/type filters |
| Wallet | Balance display, quick actions (Add, Send, Receive, Exchange), full transaction history |
| Trades | Active, pending, completed, and cancelled trade management with a step-by-step timeline view |
| Swap | Crypto-to-Naira (and crypto-to-crypto) swap interface with live rate monitor |
| Profile | User info, KYC verification prompt, settings, and account management |

The app is currently **frontend-only**. Every API call is simulated with a fully-featured in-memory mock layer (`lib/mock/`) that can be swapped out for real API calls with minimal changes.

---

## 2. Tech Stack

### Runtime Dependencies

| Package | Version | Purpose |
|---|---|---|
| `next` | 16.2.1 | App Router framework (SSR, file-based routing, layouts) |
| `react` | 19.2.4 | UI library |
| `react-dom` | 19.2.4 | DOM renderer |

### Dev Dependencies

| Package | Version | Purpose |
|---|---|---|
| `tailwindcss` | ^4 | Utility-first CSS (v4 — CSS-native `@theme` config, no `tailwind.config.js`) |
| `@tailwindcss/postcss` | ^4 | PostCSS integration for Tailwind v4 |
| `typescript` | ^5 | Type safety |
| `eslint` | ^9 | Linting (flat config format) |
| `eslint-config-next` | 16.2.1 | Next.js ESLint rules |

### Notable Choices

- **No UI component library** — all UI is custom-built with Tailwind.
- **No external state library** — React Context only.
- **No routing library** — Next.js App Router handles all routing.
- **Fonts:** `Plus_Jakarta_Sans` (body) and `Hanken_Grotesk` (headings) via `next/font/google`.
- **Icons:** Google Material Symbols Outlined, loaded via `<link>` tag in the root layout.

---

## 3. Project Structure

```
FusePay-Frontend/
│
├── app/                            # Next.js App Router
│   ├── (auth)/                     # Route group — no shared layout
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── otp/page.tsx
│   │   └── create-pin/page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx              # Dashboard shell layout (async server component)
│   │   ├── page.tsx                # Home dashboard (client component)
│   │   ├── market/page.tsx
│   │   ├── profile/page.tsx
│   │   ├── swap/page.tsx
│   │   ├── trades/page.tsx
│   │   └── wallet/page.tsx
│   ├── favicon.ico
│   ├── globals.css                 # Tailwind v4 @theme + global styles
│   ├── layout.tsx                  # Root layout (fonts, AuthProvider, metadata)
│   └── page.tsx                    # Root redirect → /login
│
├── components/
│   ├── auth/                       # Auth-specific layout + form components
│   ├── dashboard/
│   │   ├── home/                   # Dashboard home section components
│   │   ├── layout/                 # Dashboard chrome (shell, sidebar, topnav, bottom nav)
│   │   ├── market/                 # Marketplace listing + filter components
│   │   └── shared/                 # Shared dashboard primitives (badges, headers, skeletons)
│   ├── icons/                      # SVG icon components (Google, Apple)
│   └── ui/                         # Reusable UI primitives (buttons, inputs, cards)
│
├── context/
│   └── AuthContext.tsx             # Global auth state
│
├── lib/
│   ├── mock/
│   │   ├── authService.ts          # Mock auth API
│   │   ├── dashboardService.ts     # Mock dashboard data API
│   │   └── types.ts                # All shared TypeScript types
│   └── utils.ts                    # cn() class name utility
│
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── package.json
└── tsconfig.json
```

---

## 4. Routing & Pages

### Route Map

| URL | File | Render | Purpose |
|---|---|---|---|
| `/` | `app/page.tsx` | Server | Redirects to `/login` |
| `/login` | `app/(auth)/login/page.tsx` | Server | Login page |
| `/register` | `app/(auth)/register/page.tsx` | Server | Registration step 1 |
| `/otp` | `app/(auth)/otp/page.tsx` | Server | OTP verification step |
| `/create-pin` | `app/(auth)/create-pin/page.tsx` | Server | PIN creation step |
| `/dashboard` | `app/dashboard/page.tsx` | Client | Main home dashboard |
| `/dashboard/market` | `app/dashboard/market/page.tsx` | Client | P2P marketplace |
| `/dashboard/wallet` | `app/dashboard/wallet/page.tsx` | Server (async) | Wallet & transactions |
| `/dashboard/trades` | `app/dashboard/trades/page.tsx` | Client | Trade management |
| `/dashboard/swap` | `app/dashboard/swap/page.tsx` | Client | Crypto swap |
| `/dashboard/profile` | `app/dashboard/profile/page.tsx` | Client | Profile & settings |

### Layout Hierarchy

```
app/layout.tsx  (root — applies to all routes)
  └── AuthProvider
        ├── app/(auth)/*  (no group layout — each page manages its own layout)
        └── app/dashboard/layout.tsx  (async — fetches notifications, wraps DashboardShell)
              ├── /dashboard
              ├── /dashboard/market
              ├── /dashboard/wallet
              ├── /dashboard/trades
              ├── /dashboard/swap
              └── /dashboard/profile
```

> **Note:** There is currently no middleware or route guard. Unauthenticated users can navigate directly to `/dashboard`. Adding `middleware.ts` with session checks is a recommended next step.

---

## 5. Auth Flow

The full registration and login flow is a 4-step process:

```
/register  →  /otp  →  /create-pin  →  /dashboard
                                ↑
/login  ────────────────────────┘
```

### Step-by-step

**1. Register (`/register`)**
- `RegisterForm` collects phone number + password.
- Calls `authService.register(phone, password)`.
- On success, stores the phone in `AuthContext.pendingPhone` and navigates to `/otp`.

**2. OTP Verification (`/otp`)**
- `OtpForm` reads `pendingPhone` from `AuthContext` and shows which number received the code.
- User enters the 6-digit code. In mock mode the code is always `123456`.
- Calls `authService.verifyOtp(phone, otp)`.
- On success, navigates to `/create-pin`.

**3. Create PIN (`/create-pin`)**
- `CreatePinForm` collects a 4-digit transaction PIN and asks for confirmation.
- Calls `authService.createPin(phone, pin)`.
- On success, receives a full `AuthSession`, calls `AuthContext.signIn(session)`, clears `pendingPhone`, and navigates to `/dashboard`.

**4. Login (`/login`)**
- `LoginForm` collects email/phone + password.
- Calls `authService.login(identifier, password)`.
- On success, calls `AuthContext.signIn(session)` and navigates to `/dashboard`.
- **Demo shortcut:** `demo@fusepay.com` with any password always succeeds.

---

## 6. State Management

### AuthContext (`context/AuthContext.tsx`)

The single global context, provided at the root in `app/layout.tsx`.

**State shape:**

```typescript
interface AuthContextValue {
  user: AuthUser | null;        // The signed-in user
  token: string | null;         // Session token
  isLoading: boolean;           // True during session hydration on mount
  pendingPhone: string | null;  // Phone mid-registration flow
  setPendingPhone: (phone: string | null) => void;
  signIn: (session: AuthSession) => void;
  signOut: () => Promise<void>;
}
```

**Session persistence:**
- Sessions are saved to `sessionStorage` under the key `"fp_session"` as a JSON-serialised `AuthSession`.
- On mount, the provider reads and restores the session from `sessionStorage`.
- Clearing `sessionStorage` on signout means sessions are **per-tab** (intentional for a mock-only build).

**`useAuth()` hook:**
```typescript
import { useAuth } from "@/context/AuthContext";

// Inside any component wrapped by AuthProvider:
const { user, signOut } = useAuth();
```
Throws an error if called outside `<AuthProvider>`.

**Key consumers:**

| Consumer | Uses |
|---|---|
| `LoginForm` | `signIn()` |
| `RegisterForm` | `setPendingPhone()` |
| `OtpForm` | `pendingPhone` |
| `CreatePinForm` | `pendingPhone`, `signIn()`, `setPendingPhone(null)` |
| `DashboardPage` | `user.name` for greeting |
| `ProfilePage` | `user`, `signOut()` |
| `Sidebar` | `user.name`, `user.phone`, `signOut()` |
| `TopNavbar` | `user` initials |

---

## 7. Mock Services & Types

### Types (`lib/mock/types.ts`)

All shared TypeScript interfaces are defined here.

**Auth types:**
```typescript
interface AuthUser { id: string; phone: string; name: string; hasPin: boolean; }
interface AuthSession { user: AuthUser; token: string; }
interface ApiResponse<T = void> { ok: boolean; data?: T; error?: string; }
```

**Dashboard types:**
```typescript
interface Balance { naira: number; usd: number; escrow: number; changePercent: number; }
interface Transaction {
  id: string; type: "credit" | "debit"; description: string;
  to: string; amount: number; date: string; time: string;
  category: "airtime" | "data" | "gift-card" | "transfer" | "received";
}
interface MarketListing {
  id: string; type: "buy" | "sell"; category: "airtime" | "data" | "gift-card";
  network: string; amount: number; price: number; seller: string;
  rating: number; verified: boolean; expiresIn: number;
}
interface Notification { id: string; title: string; message: string; time: string; read: boolean; type: "transaction" | "kyc" | "promo" | "security"; }
```

**Trade types:**
```typescript
type TradeTab = "active" | "pending" | "completed" | "cancelled";
type TradeStatus = "Order Placed" | "Payment Locked" | "Awaiting Delivery" | "Completed";
interface Trade {
  id: string; type: "buy" | "sell"; category: "airtime" | "data" | "gift-card";
  network: string; networkLogo: string; productName: string; validity?: string;
  price: number; quantity: number; isBuyer: boolean; tradePartner: string;
  timeline: TradeTimelineStep[]; createdAt: string;
}
interface TradeTimelineStep { label: TradeStatus; completed: boolean; active: boolean; time?: string; }
```

---

### Auth Service (`lib/mock/authService.ts`)

Simulates 400–900ms random network latency. Uses an in-memory `MockStore` object that resets on page refresh.

> **Replace each function body with a real `fetch`/`axios` call when the API is ready.**

| Function | Signature | Description |
|---|---|---|
| `register` | `(phone, password) → ApiResponse<{ phone }>` | Validates uniqueness, stores credentials, "sends" OTP (`123456` in console) |
| `resendOtp` | `(phone) → ApiResponse` | Resets OTP in the mock store |
| `verifyOtp` | `(phone, otp) → ApiResponse<{ tempToken }>` | Checks OTP, returns a temp token (currently unused by the frontend) |
| `createPin` | `(phone, pin) → ApiResponse<AuthSession>` | Validates 4-digit PIN, creates session token, returns full `AuthSession` |
| `login` | `(phoneOrEmail, password) → ApiResponse<AuthSession>` | Checks credentials; `demo@fusepay.com` is a built-in shortcut |
| `logout` | `(token) → ApiResponse` | Removes token from the in-memory sessions store |
| `validateSession` | `(token) → ApiResponse<AuthUser>` | Checks token validity (exported but currently not called by `AuthContext`) |

---

### Dashboard Service (`lib/mock/dashboardService.ts`)

Simulates 300–600ms random network latency. Returns hardcoded mock data.

| Function | Returns | Description |
|---|---|---|
| `getBalance()` | `Balance` | Naira: ₦125,000 · USD: $80.20 · Escrow: ₦18,500 · Change: +2.45% |
| `getTransactions()` | `Transaction[]` | 7 hardcoded transactions (credits & debits, various categories) |
| `getMarketListings(filter?)` | `MarketListing[]` | 6 listings; accepts `"buy"`, `"sell"`, or a category string to filter |
| `getNotifications()` | `Notification[]` | 4 notifications (2 unread — drives the notification badge in `TopNavbar`) |

---

### Utility (`lib/utils.ts`)

```typescript
cn(...classes: (string | undefined | null | false)[]): string
```
A minimal `clsx`-style utility for conditional class name merging. Used pervasively across all components.

---

## 8. Components Reference

### 8.1 UI Primitives (`components/ui/`)

These are the lowest-level building blocks used across auth and dashboard surfaces.

---

#### `BrandButton`
The primary CTA button. Full-width gradient, white text, hover opacity, active scale.

```tsx
<BrandButton type="submit" disabled={loading} className="h-14">
  Sign In
</BrandButton>
```

Props: extends `ButtonHTMLAttributes<HTMLButtonElement>` + `className?: string`.

---

#### `InputField`
Standard text input with icon slot, suffix slot, label, and hint text. Uses `forwardRef`.

```tsx
<InputField
  id="email"
  type="email"
  label="Email"
  icon="person"
  placeholder="you@example.com"
  suffix={<button>show</button>}
  hint="We'll never share your email."
/>
```

Props: extends `InputHTMLAttributes<HTMLInputElement>` + `label?`, `labelRight?: ReactNode`, `icon?: string` (Material Symbol name), `suffix?: ReactNode`, `hint?: string`, `className?: string`.

---

#### `OtpInput`
Six individual boxes for OTP entry. Auto-advances on fill, handles paste, backspace-to-previous, and arrow key navigation.

```tsx
<OtpInput
  value={otp}
  onChange={setOtp}
  error={error}
/>
```

Props: `length?: number` (default 6), `value: string[]`, `onChange: (v: string[]) => void`, `label?: string`, `error?: string`.

---

#### `PinInput`
Four-box PIN entry. Supports masking toggle (`masked` prop renders inputs as `type="password"`).

```tsx
<PinInput value={pin} onChange={setPin} masked error={error} />
```

Props: `length?: number` (default 4), `value: string[]`, `onChange`, `label?`, `hint?`, `error?`, `masked?: boolean`.

---

#### `PhoneInput`
Country code dropdown (flag + dial code) + phone number text input. Supported countries: Nigeria, Ghana, Kenya, South Africa, US, UK.

```tsx
<PhoneInput
  id="phone"
  label="Phone Number"
  value={phone}
  onChange={setPhone}
/>
```

Props: `id?`, `label?`, `hint?`, `value?`, `onChange?: (value: string) => void`, `className?`.

---

#### `Logo`
FusePay logo image in a gradient rounded container with optional text.

```tsx
<Logo size="md" variant="color" showText href="/dashboard" />
```

Props: `variant?: "color" | "white"`, `size?: "sm" | "md" | "lg"` (32/40/48px), `showText?: boolean`, `href?: string`, `className?`.

---

#### `GlassCard`
Dark glassmorphism card container applying the `.glass-effect` CSS class.

```tsx
<GlassCard className="p-4">content</GlassCard>
```

Props: `children: ReactNode`, `className?: string`.

---

#### `SocialButton`
Dark card button for OAuth providers (Google/Apple). Currently non-functional placeholders.

```tsx
<SocialButton icon={<GoogleIcon />} label="Google" type="button" />
```

Props: extends `ButtonHTMLAttributes`, `icon: ReactNode`, `label: string`, `className?`.

---

#### `AuthDivider`
Horizontal divider with centered label text.

```tsx
<AuthDivider label="or continue with" />
```

Props: `label?: string` (default: `"or continue with"`).

---

### 8.2 Auth Components (`components/auth/`)

---

#### `AuthPageLayout`
Two-column layout wrapper for Register, OTP, and Create-PIN pages. Renders `AuthBrandPanel` (left, desktop only) and `AuthRightPanel` (right).

```tsx
<AuthPageLayout>
  <RegisterForm />
</AuthPageLayout>
```

Props: `children: ReactNode`.

---

#### `AuthBrandPanel`
Left branding panel for Register/OTP/CreatePin pages. Shows logo, headline "The smarter way to trade & pay", feature list (Secure Escrow, Best Prices, Instant Delivery), and a decorative wallet card illustration. Hidden on mobile.

No props.

---

#### `AuthRightPanel`
Scrollable right column — centers form content vertically. Full-width on mobile, 50%/55% on larger screens.

Props: `children: ReactNode`.

---

#### `HeroBrand`
Left panel **for the Login page only**. Shows the logo, a background image, floating hero text, and two `GlassCard` feature highlights. Has `animate-float` animation.

No props.

---

#### `BackLink`
Back navigation link with a left arrow icon. Used at the top of form pages.

```tsx
<BackLink href="/login" label="Back to Sign in" />
```

Props: `href: string`, `label?: string` (default: `"Back to Sign in"`).

---

#### `LoginForm`
Full login page right panel. Handles email/phone + password input, show/hide password toggle, form submission, error display, and Google/Apple social buttons. Calls `authService.login()` then `AuthContext.signIn()`.

No props. Self-contained right-panel layout.

---

#### `RegisterForm`
Phone + password form. Calls `authService.register()`, stores phone in `setPendingPhone()`, navigates to `/otp`.

No props.

---

#### `OtpForm`
6-box OTP form. Reads `pendingPhone` from context. Calls `authService.verifyOtp()`. Includes resend button.

No props.

---

#### `CreatePinForm`
4-digit PIN creation + confirmation. Validates pins match. Calls `authService.createPin()`. Calls `signIn()` on success and navigates to `/dashboard`.

No props.

---

### 8.3 Dashboard Layout (`components/dashboard/layout/`)

---

#### `DashboardShell`
The master dashboard chrome. Manages sidebar `collapsed` state. Composes Sidebar, TopNavbar, main content area, and BottomNav.

```tsx
<DashboardShell notificationCount={unreadCount}>
  {children}
</DashboardShell>
```

Props: `children: ReactNode`, `notificationCount?: number` (default 0).

**Layout logic:**
- Sidebar is `hidden md:block` (desktop only).
- TopNavbar is `hidden md:flex` (desktop only).
- BottomNav is `md:hidden` (mobile only).
- Main content has `md:pl-60` (expanded) / `md:pl-16` (collapsed) left padding.
- Main content has `pb-20` bottom padding on mobile to clear BottomNav.

---

#### `Sidebar`
Fixed left sidebar for desktop. Shows Logo, navigation (Home, Market, Swap, Trades, Profile), user info, and logout button. Active item highlighted with `brand-gradient-bg`. Collapse toggle on tablet.

Props: `collapsed?: boolean`, `onToggle?: () => void`.

---

#### `TopNavbar`
Fixed top header for desktop. Shows current page title (via pathname lookup), notification bell with badge, hardcoded wallet balance link, and user avatar.

Props: `notificationCount?: number`, `sidebarCollapsed?: boolean`.

> **Note:** Wallet balance is hardcoded at ₦125,000.00 — it is not wired to real state.

---

#### `BottomNav`
Fixed mobile-only bottom navigation bar with 5 items: Home, Market, Swap (FAB raised above bar), Trades, Profile. Active state shows filled icon in brand purple.

No props.

---

### 8.4 Dashboard Home (`components/dashboard/home/`)

---

#### `BalanceCard`
Gradient wallet card displaying total NGN balance, USD equivalent, change percent badge, and 4 quick action buttons (Add Money, Send, Receive, History). Has a toggle to hide/reveal balance.

```tsx
<BalanceCard balance={balance} />
```

Props: `balance: Balance`.

---

#### `EscrowBanner`
Clickable banner promoting the FusePay Escrow system. Links to `/dashboard/trades`.

No props.

---

#### `NoticeCard`
Yellow-accented KYC verification reminder banner. "Verify" button links to `/dashboard/profile`.

No props.

---

#### `MarketplaceSection`
Two-card promotional grid: "Buy Data" and "Sell Data". Each links to `/dashboard/market` with a query param.

No props.

---

#### `PopularCategories`
Three category navigation cards: Airtime, Mobile Data, Gift Cards. Each links to `/dashboard/market?category=...`.

No props.

---

#### `ActiveTrades`
2×4 stat grid with hardcoded values: Active Trades (3), Completed (47), Pending Escrow (₦18,500), Disputes (0). Links to `/dashboard/trades`.

No props.

---

#### `RecentTransactions`
Transaction list with skeleton loading state and empty state. Each row shows an icon, description, recipient, amount (colour-coded credit/debit), date, and time.

```tsx
<RecentTransactions transactions={transactions} loading={loading} limit={5} />
```

Props: `transactions?: Transaction[]`, `loading?: boolean`, `limit?: number` (default 5).

---

#### `QuickServices`
> **Disabled** — the entire file is commented out. This component is a planned feature under development.

---

### 8.5 Market Components (`components/dashboard/market/`)

---

#### `MarketFilters`
Horizontally scrollable pill tabs: All, Airtime, Data, Gift Cards, Buy, Sell. Active tab gets `brand-gradient-bg`.

```tsx
<MarketFilters active={filter} onChange={setFilter} />
```

Props: `active: string`, `onChange: (value: string) => void`.

---

#### `ListingCard`
Card for a single marketplace listing. Displays category icon, amount, `NetworkBadge`, price, per-unit price, buy/sell type badge, seller name with verified badge, star rating, expiry timer, and a CTA button.

```tsx
<ListingCard listing={listing} />
```

Props: `listing: MarketListing`.

---

### 8.6 Shared Components (`components/dashboard/shared/`)

---

#### `SectionHeader`
Title row with an optional "See All" link.

```tsx
<SectionHeader title="Recent Transactions" seeAllHref="/dashboard/wallet" />
```

Props: `title: string`, `seeAllHref?: string`, `className?: string`.

---

#### `NetworkBadge`
Colored pill badge for telecom networks. MTN = yellow, Airtel = red, Glo = green, 9Mobile = teal.

```tsx
<NetworkBadge network="MTN" />
```

Props: `network: string`, `className?: string`.

---

#### `SkeletonCard` & `SkeletonRow`
Animated pulse loading placeholders. `SkeletonCard` renders stacked line bars. `SkeletonRow` renders a transaction-row-shaped skeleton.

```tsx
<SkeletonCard lines={4} />
<SkeletonRow />
```

`SkeletonCard` props: `className?: string`, `lines?: number` (default 3).
`SkeletonRow` has no props (named export from the same file).

---

#### `StatBadge`
Colored status pill badge.

```tsx
<StatBadge value="Completed" variant="success" />
```

Props: `value: string | number`, `variant?: "success" | "danger" | "warning" | "info"`, `className?: string`.

---

### 8.7 Icon Components (`components/icons/`)

#### `GoogleIcon` / `AppleIcon`
SVG React components with no props. `GoogleIcon` uses the standard 4-color Google G. `AppleIcon` is a white-filled Apple logo. Used inside `SocialButton` in auth forms.

---

## 9. Styling System

### Tailwind CSS v4

This project uses **Tailwind CSS v4**, which moves all configuration into CSS. There is **no `tailwind.config.js` or `tailwind.config.ts`** file. The PostCSS plugin `@tailwindcss/postcss` handles processing.

All theme tokens are declared in `app/globals.css` using the `@theme inline` directive.

### Design Tokens

```css
/* app/globals.css */
@theme inline {
  --color-primary:        #5B3DF5;   /* Deep violet — primary brand */
  --color-primary-hover:  #4a2fe0;
  --color-secondary:      #22E6B8;   /* Teal/mint — success + accent */
  --color-background:     #0B1020;   /* Near-black navy — page background */
  --color-card:           #131A2E;   /* Dark card surface */
  --color-card-elevated:  #18233F;   /* Slightly lighter card (inputs, rows) */
  --color-border:         #1E2742;   /* Subtle border lines */
  --color-text:           #FFFFFF;   /* Primary text */
  --color-text-secondary: #C8D1E6;   /* Soft blue-gray secondary text */
  --color-muted:          #8A94A6;   /* Placeholder / disabled text */
  --color-success:        #22E6B8;   /* Same as secondary */
  --color-warning:        #FFC857;   /* Amber */
  --color-danger:         #FF5A6E;   /* Red/coral */
  --color-info:           #5B3DF5;   /* Same as primary */

  --font-sans:    "Plus Jakarta Sans", system-ui, sans-serif;
  --font-display: "Hanken Grotesk", system-ui, sans-serif;

  --radius-sm:   0.375rem;
  --radius-md:   0.625rem;
  --radius-lg:   0.875rem;
  --radius-xl:   1.125rem;
  --radius-full: 9999px;
}
```

### Custom CSS Utilities

| Class | Description |
|---|---|
| `.glass-effect` | Dark glassmorphism: `rgba(19,26,46,0.85)` bg + `backdrop-filter: blur(12px)` + 7% white border |
| `.brand-gradient-text` | Gradient text from `#a78bfa` (lavender) to `#22E6B8` (teal) via `background-clip: text` |
| `.brand-gradient-bg` | Linear gradient background from `#5B3DF5` to `#22E6B8` |
| `.animate-float` | Gentle vertical float keyframe animation (0 → -18px → 0) over 6s |

### Styling Conventions

- Many components use **inline `style` props** for colors (e.g., `style={{ color: "#8A94A6" }}`). This is intentional for raw performance and developer clarity at the cost of Tailwind's purge optimisation.
- Tailwind classes handle layout, spacing, flex, grid, transitions, and border-radius.
- The dark theme is enforced globally via `body { background-color: #0B1020; }`.
- Material Symbols icons switch between filled and outlined states using `font-variation-settings: "FILL" 1` for active nav items.

---

## 10. Configuration Files

### `app/layout.tsx` — Root Layout

```typescript
export const metadata: Metadata = {
  title: "FusePay — Airtime, Data & Gift Cards",
  description: "The trusted marketplace for airtime, data, and gift cards. Secure, fast, and built for the modern era.",
};
```

- Loads `Plus_Jakarta_Sans` and `Hanken_Grotesk` via `next/font/google`.
- Injects Material Symbols Outlined stylesheet via `<link>` in `<head>`.
- Wraps all routes in `<AuthProvider>`.

---

### `next.config.ts`

Currently empty — no custom image domains, redirects, or headers configured.

---

### `postcss.config.mjs`

```js
{ plugins: { "@tailwindcss/postcss": {} } }
```
Single plugin for Tailwind v4. Autoprefixer is not needed in v4 (built-in).

---

### `eslint.config.mjs`

ESLint 9 flat config. Extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`. Ignores build output directories. No custom rules.

---

### `package.json` — NPM Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `next dev` | Start development server |
| `build` | `next build` | Production build |
| `start` | `next start` | Start production server |
| `lint` | `eslint` | Run ESLint |

---

## 11. Known Issues & TODOs

### Bugs

| # | Issue | Location | Impact |
|---|---|---|---|
| 1 | `Network` type referenced by `NetworkBadge` is not defined in `types.ts` | `components/dashboard/shared/NetworkBadge.tsx` | TypeScript compile error if strict mode is enforced |
| 2 | Wallet balance in `TopNavbar` is hardcoded (₦125,000.00) | `components/dashboard/layout/TopNavbar.tsx` | Balance does not reflect real state |
| 3 | `validateSession` in `authService.ts` is never called | `context/AuthContext.tsx` | Session restored from `sessionStorage` is not re-validated against the mock backend on mount |

### Missing Features / TODOs

| # | Item | Priority |
|---|---|---|
| 1 | **Route guards / middleware** — No authentication protection on `/dashboard/*`. Add `middleware.ts` to redirect unauthenticated users. | High |
| 2 | **`QuickServices` component** — File exists but is entirely commented out. | Medium |
| 3 | **Real API integration** — All mock service functions need to be replaced with real `fetch`/`axios` calls. The `ApiResponse<T>` return type is already the right shape. | High |
| 4 | **`pendingPhone` persistence** — Mid-flow refresh (between Register → OTP → CreatePin) causes `pendingPhone` to be lost. Consider persisting to `sessionStorage`. | Medium |
| 5 | **Social login** — Google and Apple buttons are rendered but have no OAuth integration. | Medium |
| 6 | **Trade actions** — "View Details" and "Chat" buttons on trade cards are not wired to any page or modal. | Medium |
| 7 | **Market URL query params** — Links like `/dashboard/market?category=airtime` are generated but `MarketPage` reads filter from React state only — it doesn't read `searchParams`. | Low |
| 8 | **Swap rate updates** — Rate monitor shows "Auto update in 10s" but no polling is implemented. | Low |
| 9 | **Profile image upload** — Edit avatar button on Profile page has no handler. | Low |
| 10 | **Error boundaries** — No error boundaries are defined. An unhandled error in any dashboard section will crash the entire page. | Medium |
| 11 | **KYC flow** — KYC verification prompts are present (NoticeCard, ProfilePage banner) but the KYC route/page does not exist. | High |
| 12 | **`/public` image assets** — `Logo.jpeg` and `whiteLogo.jpeg` must be present in `/public/` for the Logo component to render. These files are not tracked in the visible file tree. | High |

---

*Documentation generated from full codebase analysis — August 2026.*
