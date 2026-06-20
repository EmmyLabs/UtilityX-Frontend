import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { width: 80, height: 28 },
  md: { width: 110, height: 36 },
  lg: { width: 140, height: 46 },
};

export default function Logo({
  variant = "white",
  size = "md",
  className,
}: LogoProps) {
  const { width, height } = sizeMap[size];
  const src = variant === "white" ? "/whiteLogo.jpeg" : "/Logo.jpeg";

  return (
    <Image
      src={src}
      alt="FusePay"
      width={width}
      height={height}
      className={cn("object-contain", className)}
      priority
    />
  );
}
