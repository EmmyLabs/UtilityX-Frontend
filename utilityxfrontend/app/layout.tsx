import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Hanken_Grotesk } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FusePay — Airtime, Data & Gift Cards",
  description:
    "The trusted marketplace for airtime, data, and gift cards. Secure, fast, and built for the modern era.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${hankenGrotesk.variable} h-full`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="h-full antialiased overflow-x-hidden" suppressHydrationWarning>
        {/* AuthProvider wraps everything so auth state is available on auth pages too */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
