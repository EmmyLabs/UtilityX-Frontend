import { ReactNode } from "react";

export default function AuthRightPanel({ children }: { children: ReactNode }) {
  return (
    <section className="relative z-10 w-full md:w-1/2 lg:w-[55%] h-full bg-[#0F162D] overflow-y-auto">
      <div className="min-h-full flex flex-col items-center justify-center py-8 px-6 sm:px-10 lg:px-14">
        {children}
      </div>
    </section>
  );
}
