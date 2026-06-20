import { ReactNode } from "react";

interface AuthRightPanelProps {
  children: ReactNode;
}

export default function AuthRightPanel({ children }: AuthRightPanelProps) {
  return (
    <section className="relative z-10 w-full md:w-1/2 lg:w-[55%] h-full bg-[#0F162D] overflow-y-auto">
      {/*
       * min-h-full ensures the inner div stretches to fill the panel when
       * content is short; flex + items-center centres vertically on tall screens.
       * On short/mobile screens content scrolls naturally.
       */}
      <div className="min-h-full flex flex-col items-center justify-center py-8 px-6 sm:px-10 lg:px-14">
        {children}
      </div>
    </section>
  );
}
