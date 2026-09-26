"use client";

import { cn } from "@/lib/utils/cn";
import { forwardRef } from "react";

interface AdminSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
}

export const AdminSelect = forwardRef<HTMLSelectElement, AdminSelectProps>(
  ({ label, error, hint, disabled, required, className, id, ...props }, ref) => {
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
          <select
            ref={ref}
            id={fieldId}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={`${errorId || ""} ${hintId || ""}`.trim() || undefined}
            disabled={disabled}
            className={cn(
              "w-full appearance-none px-4 py-3.5 pr-10 rounded-xl border transition-all duration-300 bg-[var(--surface-elevated)] text-[var(--text)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
              error
                ? "border-[var(--secondary)]"
                : "border-[var(--border)] hover:border-[var(--primary)]"
            )}
            style={{
              background: "var(--surface-elevated)",
            }}
            {...props}
          >
            {props.children}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-muted)" }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
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

AdminSelect.displayName = "AdminSelect";