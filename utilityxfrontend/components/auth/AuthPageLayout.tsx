import { ReactNode } from "react";
import AuthBrandPanel from "@/components/auth/AuthBrandPanel";
import AuthRightPanel from "@/components/auth/AuthRightPanel";

interface AuthPageLayoutProps {
  children: ReactNode;
}

export default function AuthPageLayout({ children }: AuthPageLayoutProps) {
  return (
    /*
     * h-full fills the 100vh body, overflow-hidden clips decorative blobs.
     * flex-col on mobile stacks brand (hidden) then panel full-width.
     * flex-row on md+ shows both columns side by side.
     */
    <div className="h-full flex flex-col md:flex-row bg-[#0B1020] overflow-hidden">
      {/* Ambient glow — clipped by overflow-hidden */}
      <div className="fixed top-[-10%] left-[5%] w-[400px] h-[400px] rounded-full bg-[#5B3DF5]/10 blur-[120px] pointer-events-none z-0" />

      <AuthBrandPanel />
      <AuthRightPanel>{children}</AuthRightPanel>
    </div>
  );
}
