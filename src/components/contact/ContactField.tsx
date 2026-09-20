"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";

interface ContactFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const ContactField = forwardRef<HTMLInputElement, ContactFieldProps>(
  ({ label, error, hint, required, className, id, ...props }, ref) => {
    const fieldId = id || label.toLowerCase().replace(/\s+/g, "-");
    const errorId = error ? `${fieldId}-error` : undefined;
    const hintId = hint ? `${fieldId}-hint` : undefined;

    return (
      <div className={className}>
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
        <motion.div
          whileFocus={{ borderColor: "var(--primary)", boxShadow: "0 0 0 3px rgba(var(--shadow-tint), 0.15)" }}
          className="w-full rounded-xl border transition-all duration-300"
          style={{
            borderColor: error ? "var(--secondary)" : "var(--border)",
            background: "var(--surface-elevated)",
          }}
        >
          <input
            ref={ref}
            id={fieldId}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={`${errorId || ""} ${hintId || ""}`.trim() || undefined}
            className="w-full px-4 py-3.5 rounded-xl bg-transparent text-[var(--text)] placeholder-[var(--text-muted)] border-0 focus-visible:outline-none"
            style={{ background: "transparent" }}
            {...props}
          />
        </motion.div>
        {error && (
          <motion.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm"
            style={{ color: "var(--secondary)" }}
          >
            {error}
          </motion.p>
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

ContactField.displayName = "ContactField";

interface ContactTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const ContactTextarea = forwardRef<HTMLTextAreaElement, ContactTextareaProps>(
  ({ label, error, hint, required, className, id, ...props }, ref) => {
    const fieldId = id || label.toLowerCase().replace(/\s+/g, "-");
    const errorId = error ? `${fieldId}-error` : undefined;
    const hintId = hint ? `${fieldId}-hint` : undefined;

    return (
      <div className={className}>
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
        <motion.div
          whileFocus={{ borderColor: "var(--primary)", boxShadow: "0 0 0 3px rgba(var(--shadow-tint), 0.15)" }}
          className="w-full rounded-xl border transition-all duration-300"
          style={{
            borderColor: error ? "var(--secondary)" : "var(--border)",
            background: "var(--surface-elevated)",
          }}
        >
          <textarea
            ref={ref}
            id={fieldId}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={`${errorId || ""} ${hintId || ""}`.trim() || undefined}
            className="w-full px-4 py-3.5 rounded-xl bg-transparent text-[var(--text)] placeholder-[var(--text-muted)] resize-y min-h-[140px] border-0 focus-visible:outline-none"
            style={{ background: "transparent" }}
            {...props}
          />
        </motion.div>
        {error && (
          <motion.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm"
            style={{ color: "var(--secondary)" }}
          >
            {error}
          </motion.p>
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

ContactTextarea.displayName = "ContactTextarea";