import Link from "next/link";
import SectionHeader from "@/components/dashboard/shared/SectionHeader";

interface ServiceItem {
  label: string;
  icon: string;
  href: string;
  iconBg: string;
}

const services: ServiceItem[] = [
  {
    label: "Airtime",
    icon: "phone_iphone",
    href: "/dashboard/market?category=airtime",
    iconBg: "linear-gradient(135deg, #5B3DF5 0%, #8b5cf6 100%)",
  },
  {
    label: "Data",
    icon: "wifi",
    href: "/dashboard/market?category=data",
    iconBg: "linear-gradient(135deg, #22E6B8 0%, #0ea5e9 100%)",
  },
  {
    label: "Cable TV",
    icon: "tv",
    href: "#",
    iconBg: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
  },
  {
    label: "Electricity",
    icon: "bolt",
    href: "#",
    iconBg: "linear-gradient(135deg, #FFC857 0%, #f59e0b 100%)",
  },
  {
    label: "More",
    icon: "apps",
    href: "#",
    iconBg: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
  },
];

export default function QuickServices() {
  return (
    <div>
      <SectionHeader title="Quick Services" seeAllHref="/dashboard/market" />

      {/* Scrollable row on mobile, grid on desktop */}
      <div className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible md:pb-0 scrollbar-hide">
        {services.map((service) => (
          <Link
            key={service.label}
            href={service.href}
            className="flex flex-col items-center gap-2.5 flex-shrink-0 group"
          >
            <div
              className="w-14 h-14 rounded-[16px] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform"
              style={{ background: service.iconBg }}
            >
              <span className="material-symbols-outlined text-2xl text-white">
                {service.icon}
              </span>
            </div>
            <span
              className="text-xs font-medium text-center"
              style={{ color: "#C8D1E6" }}
            >
              {service.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
