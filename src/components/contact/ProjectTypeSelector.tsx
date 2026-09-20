"use client";

import { motion } from "framer-motion";
import { services } from "@/features/services/service-data";

interface ProjectTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  name?: string;
}

export function ProjectTypeSelector({ value, onChange, error, disabled, name = "projectType" }: ProjectTypeSelectorProps) {
  const options = [
    { value: "", label: "Select project type" },
    ...services.map((s) => ({ value: s.title, label: s.title })),
    { value: "Other", label: "Other" },
  ];

  return (
    <div>
      <label
        htmlFor="project-type"
        className="block text-sm font-medium mb-2 transition-colors duration-200"
        style={{ color: error ? "var(--secondary)" : "var(--text)" }}
      >
        Project Type <span className="ml-1 text-[0.8125rem]" style={{ color: "var(--secondary)" }} aria-hidden>*</span>
      </label>
      <div className="relative">
        <motion.select
          id="project-type"
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "project-type-error" : undefined}
          className="w-full appearance-none px-4 py-3.5 pr-12 rounded-xl border transition-all duration-300 bg-[var(--surface-elevated)] text-[var(--text)]"
          style={{
            borderColor: error ? "var(--secondary)" : "var(--border)",
            background: "var(--surface-elevated)",
          }}
          whileFocus={{ borderColor: "var(--primary)", boxShadow: "0 0 0 3px rgba(var(--shadow-tint), 0.15)" }}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </motion.select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-muted)" }}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <motion.p
          id="project-type-error"
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm"
          style={{ color: "var(--secondary)" }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}