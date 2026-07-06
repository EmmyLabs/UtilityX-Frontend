import NetworkBadge from "@/components/dashboard/shared/NetworkBadge";
import BrandButton from "@/components/ui/BrandButton";
import type { MarketListing, ListingCategory } from "@/lib/mock/types";

interface ListingCardProps {
  listing: MarketListing;
}

const categoryIcons: Record<ListingCategory, string> = {
  airtime: "phone_iphone",
  data: "wifi",
  "gift-card": "card_giftcard",
};

const categoryLabels: Record<ListingCategory, string> = {
  airtime: "Airtime",
  data: "Data",
  "gift-card": "Gift Card",
};

function renderStars(rating: number) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < full) {
      stars.push(
        <span
          key={i}
          className="material-symbols-outlined text-sm"
          style={{ color: "#FFC857", fontVariationSettings: '"FILL" 1' }}
        >
          star
        </span>
      );
    } else if (i === full && half) {
      stars.push(
        <span
          key={i}
          className="material-symbols-outlined text-sm"
          style={{ color: "#FFC857" }}
        >
          star_half
        </span>
      );
    } else {
      stars.push(
        <span
          key={i}
          className="material-symbols-outlined text-sm"
          style={{ color: "#1E2742" }}
        >
          star
        </span>
      );
    }
  }
  return stars;
}

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <div
      className="rounded-[16px] p-4 flex flex-col gap-3 border hover:border-[#5B3DF5]/40 transition-colors"
      style={{ backgroundColor: "#131A2E", borderColor: "#1E2742" }}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Category Icon */}
          <div
            className="w-9 h-9 rounded-[10px] brand-gradient-bg flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-base text-white">
              {categoryIcons[listing.category]}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              {listing.category === "data"
                ? `${listing.amount}GB`
                : listing.category === "airtime"
                ? formatNaira(listing.amount)
                : `$${listing.amount}`}
            </p>
            <p className="text-xs" style={{ color: "#8A94A6" }}>
              {categoryLabels[listing.category]}
            </p>
          </div>
        </div>
        <NetworkBadge network={listing.network} />
      </div>

      {/* Price */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-base font-bold text-white">
            {formatNaira(listing.price)}
          </p>
          <p className="text-xs" style={{ color: "#8A94A6" }}>
            {listing.category === "data"
              ? `₦${(listing.price / listing.amount).toFixed(0)}/GB`
              : listing.category === "gift-card"
              ? `₦${(listing.price / listing.amount).toFixed(0)}/$1`
              : ""}
          </p>
        </div>
        {/* Type Badge */}
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{
            backgroundColor:
              listing.type === "sell"
                ? "rgba(34,230,184,0.15)"
                : "rgba(91,61,245,0.15)",
            color: listing.type === "sell" ? "#22E6B8" : "#5B3DF5",
          }}
        >
          {listing.type === "sell" ? "Selling" : "Buying"}
        </span>
      </div>

      {/* Seller Info */}
      <div className="flex items-center gap-1.5">
        <div
          className="w-6 h-6 rounded-full brand-gradient-bg flex items-center justify-center text-white text-[10px] font-bold"
        >
          {listing.seller[0].toUpperCase()}
        </div>
        <span className="text-xs font-medium text-white">
          {listing.seller}
        </span>
        {listing.verified && (
          <span
            className="material-symbols-outlined text-sm"
            style={{
              color: "#22E6B8",
              fontVariationSettings: '"FILL" 1',
            }}
          >
            verified
          </span>
        )}
        <div className="flex ml-auto">{renderStars(listing.rating)}</div>
      </div>

      {/* Expiry */}
      <div className="flex items-center gap-1" style={{ color: "#8A94A6" }}>
        <span className="material-symbols-outlined text-sm">schedule</span>
        <span className="text-xs">
          Expires in {listing.expiresIn}h
        </span>
      </div>

      {/* CTA */}
      <BrandButton className="py-2.5 text-sm rounded-[10px]">
        {listing.type === "sell" ? "Buy Now" : "Sell Now"}
      </BrandButton>
    </div>
  );
}
