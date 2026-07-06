import Link from "next/link";
import SectionHeader from "@/components/dashboard/shared/SectionHeader";

interface CategoryItem {
  label: string;
  icon: string;
  description: string;
  href: string;
}

const categories: CategoryItem[] = [
  {
    label: "Airtime",
    icon: "phone_iphone",
    description: "Buy & Sell Airtime",
    href: "/dashboard/market?category=airtime",
  },
  {
    label: "Mobile Data",
    icon: "wifi",
    description: "Buy & Sell Data",
    href: "/dashboard/market?category=data",
  },
  {
    label: "Gift Cards",
    icon: "card_giftcard",
    description: "Buy & Sell Gift Cards",
    href: "/dashboard/market?category=gift-card",
  },
];

export default function PopularCategories() {
  return (
    <div>
      <SectionHeader title="Popular Categories" seeAllHref="/dashboard/market" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {categories.map((category) => (
          <Link
            key={category.label}
            href={category.href}
            className="rounded-[16px] p-4 flex items-center gap-3 border hover:border-[#5B3DF5]/50 transition-colors"
            style={{ backgroundColor: "#131A2E", borderColor: "#1E2742" }}
          >
            <div
              className="w-11 h-11 rounded-[12px] flex items-center justify-center brand-gradient-bg"
            >
              <span className="material-symbols-outlined text-2xl text-white">
                {category.icon}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white mb-0.5">
                {category.label}
              </p>
              <p className="text-xs" style={{ color: "#8A94A6" }}>
                {category.description}
              </p>
            </div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#1E2742" }}
            >
              <span
                className="material-symbols-outlined text-base"
                style={{ color: "#C8D1E6" }}
              >
                arrow_forward
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
