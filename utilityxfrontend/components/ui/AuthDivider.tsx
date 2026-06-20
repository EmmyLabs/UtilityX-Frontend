interface AuthDividerProps {
  label?: string;
}

export default function AuthDivider({ label = "or continue with" }: AuthDividerProps) {
  return (
    <div className="relative flex items-center py-1">
      <div className="flex-grow border-t border-[#1E2742]" />
      <span className="flex-shrink mx-4 text-[10px] font-semibold tracking-widest uppercase text-[#8A94A6]">
        {label}
      </span>
      <div className="flex-grow border-t border-[#1E2742]" />
    </div>
  );
}
