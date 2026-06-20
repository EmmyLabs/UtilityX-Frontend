import Link from "next/link";

interface BackLinkProps {
  href: string;
  label?: string;
}

export default function BackLink({ href, label = "Back to Sign in" }: BackLinkProps) {
  return (
    <Link href={href} className="inline-flex items-center gap-1.5 text-[#8A94A6] hover:text-white text-sm transition-colors group mb-8 self-start">
      <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
      {label}
    </Link>
  );
}
