import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelRight?: ReactNode;
  icon?: string; // Material Symbol name
  suffix?: ReactNode;
  hint?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, labelRight, icon, suffix, hint, className, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {(label || labelRight) && (
          <div className="flex justify-between items-center">
            {label && (
              <label
                htmlFor={id}
                className="text-xs font-semibold tracking-widest uppercase text-[#8A94A6] font-[family-name:var(--font-display)]"
              >
                {label}
              </label>
            )}
            {labelRight}
          </div>
        )}

        <div className="relative group">
          {icon && (
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#8A94A6] group-focus-within:text-[#5B3DF5] transition-colors">
              <span className="material-symbols-outlined text-[20px]">{icon}</span>
            </div>
          )}

          <input
            ref={ref}
            id={id}
            {...props}
            className={cn(
              "w-full bg-[#0F162D] border border-[#1E2742] text-white rounded-xl",
              "py-3.5 pr-4 focus:outline-none",
              "focus:ring-2 focus:ring-[#5B3DF5]/50 focus:border-[#5B3DF5]",
              "transition-all text-sm placeholder:text-[#8A94A6]",
              icon ? "pl-12" : "pl-4",
              suffix ? "pr-12" : "",
              className
            )}
          />

          {suffix && (
            <div className="absolute inset-y-0 right-4 flex items-center">
              {suffix}
            </div>
          )}
        </div>

        {hint && (
          <p className="text-xs text-[#8A94A6]">{hint}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
