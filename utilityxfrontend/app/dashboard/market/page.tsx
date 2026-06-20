"use client";

import { useState, useEffect } from "react";
import { getMarketListings } from "@/lib/mock/dashboardService";
import type { MarketListing } from "@/lib/mock/types";
import ListingCard from "@/components/dashboard/market/ListingCard";
import MarketFilters from "@/components/dashboard/market/MarketFilters";
import SkeletonCard from "@/components/dashboard/shared/SkeletonCard";

export default function MarketPage() {
  const [filter, setFilter] = useState("all");
  const [listings, setListings] = useState<MarketListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMarketListings(filter).then((data) => {
      setListings(data);
      setLoading(false);
    });
  }, [filter]);

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-5">
      {/* Filters */}
      <MarketFilters active={filter} onChange={setFilter} />

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} lines={5} />
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <span
            className="material-symbols-outlined text-5xl"
            style={{ color: "#1E2742" }}
          >
            storefront
          </span>
          <p className="font-semibold text-white">No listings found</p>
          <p className="text-sm" style={{ color: "#8A94A6" }}>
            Try a different filter
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
