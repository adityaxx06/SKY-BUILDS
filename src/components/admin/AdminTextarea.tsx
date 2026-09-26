"use client";

import { cn } from "@/lib/utils/cn";
import { forwardRef } from "react";

interface AdminTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
}

export const AdminTextarea = forwardRef<HTMLTextAreaElement, AdminTextareaProps>(
  ({ label, error, hint, disabled, required, rows = 4, className, id, ...props }, ref) => {
    const fieldId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const errorId = error ? `${fieldId}-error` : undefined;
    const hintId = hint ? `${fieldId}-hint` : undefined;

    return (
      <div className={className}>
        {label && (
          <label htmlFor={fieldId} className="block text-sm font-medium mb-2 transition-colors duration-200" style={{ color: error ? "var(--secondary)" : "var(--text)" }}>
            {label}
            {required && <span className="ml-1 text-[0.8125rem]" style={{ color: "var(--secondary)" }} aria-hidden>*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={fieldId}
          rows={rows}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={`${errorId || ""} ${hintId || ""}`.trim() || undefined}
          disabled={disabled}
          className={cn(
            "w-full rounded-xl border px-4 py-3.5 bg-transparent text-[var(--text)] placeholder-[var(--text-muted)] focus-visible:outline-none transition-all duration-300 resize-y",
            "focus-visible:ring-2 focus-visible:ring-[var(--primary)]/50",
            error ? "border-[var(--secondary)]" : "border-[var(--border)] hover:border-[var(--primary)]"
          )}
          style={{ background: "var(--surface-elevated)" }}
          {...props}
        />
        {error && <p id={errorId} role="alert" className="mt-2 text-sm" style={{ color: "var(--secondary)" }}>{error}</p>}
        {hint && !error && <p id={hintId} className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>{hint}</p>}
      </div>
    );
  }
);

AdminTextarea.displayName = "AdminTextarea";
