import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** "color" uses Logo.jpeg, "white" uses whiteLogo.jpeg */
  variant?: "color" | "white";
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  href?: string;
  className?: string;
}

const sizeMap = {
  sm: { img: 32, text: "text-base" },
  md: { img: 40, text: "text-xl" },
  lg: { img: 48, text: "text-2xl" },
};

export default function Logo({
  variant = "color",
  size = "md",
  showText = true,
  href = "/",
  className,
}: LogoProps) {
  const { img, text } = sizeMap[size];
  const src = variant === "white" ? "/whiteLogo.jpeg" : "/Logo.jpeg";

  const content = (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span
        className="rounded-xl overflow-hidden brand-gradient-bg flex items-center justify-center shrink-0"
        style={{ width: img, height: img }}
      >
        <Image
          src={src}
          alt="FusePay"
          width={img}
          height={img}
          className="object-cover w-full h-full"
          priority
        />
      </span>
      {showText && (
        <span
          className={cn(
            "font-bold tracking-tight text-white font-[family-name:var(--font-display)]",
            text
          )}
        >
          FusePay
        </span>
      )}
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} className="inline-flex items-center">
      {content}
    </Link>
  );
}
