"use client";

import { cn } from "@/lib/utils/cn";
import { forwardRef } from "react";

interface AdminInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  icon?: React.ReactNode;
}

export const AdminInput = forwardRef<HTMLInputElement, AdminInputProps>(
  ({ label, error, hint, disabled, required, className, id, icon, ...props }, ref) => {
    const fieldId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const errorId = error ? `${fieldId}-error` : undefined;
    const hintId = hint ? `${fieldId}-hint` : undefined;

    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={fieldId}
            className="block text-sm font-medium mb-2 transition-colors duration-200"
            style={{ color: error ? "var(--secondary)" : "var(--text)" }}
          >
            {label}
            {required && (
              <span className="ml-1 text-[0.8125rem]" style={{ color: "var(--secondary)" }} aria-hidden>
                *
              </span>
            )}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-muted)" }}>
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={fieldId}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={`${errorId || ""} ${hintId || ""}`.trim() || undefined}
            disabled={disabled}
            className={cn(
              "w-full rounded-xl border px-4 py-3.5 bg-transparent text-[var(--text)] placeholder-[var(--text-muted)] focus-visible:outline-none transition-all duration-300",
              "focus-visible:ring-2 focus-visible:ring-[var(--primary)]/50",
              error
                ? "border-[var(--secondary)]"
                : "border-[var(--border)] hover:border-[var(--primary)]",
              icon ? "pl-12" : ""
            )}
            style={{
              background: "var(--surface-elevated)",
              borderColor: error ? "var(--secondary)" : "var(--border)",
            }}
            {...props}
          />
        </div>
        {error && (
          <p id={errorId} role="alert" className="mt-2 text-sm" style={{ color: "var(--secondary)" }}>
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
            {hint}
          </p>
        )}
      </div>
    );
  }
);

AdminInput.displayName = "AdminInput";