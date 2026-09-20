"use client";

import { motion } from "framer-motion";

interface ChipOption {
  value: string;
  label: string;
}

interface ChipSelectorProps {
  name?: string;
  label: string;
  options: ChipOption[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  hint?: string;
}

export function ChipSelector({ name, label, options, value, onChange, required, disabled, error, hint }: ChipSelectorProps) {
  const fieldId = name || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <fieldset className="w-full">
      <legend className="block text-sm font-medium mb-3 transition-colors duration-200" style={{ color: error ? "var(--secondary)" : "var(--text)" }}>
        {label}
        {required && <span className="ml-1 text-[0.8125rem]" style={{ color: "var(--secondary)" }} aria-hidden>*</span>}
        {!required && <span className="ml-2 text-sm font-normal" style={{ color: "var(--text-muted)" }}>(optional)</span>}
      </legend>
      <div className="flex flex-wrap gap-3" role="radiogroup" aria-label={label} aria-invalid={error ? "true" : "false"}>
        {options.map((option) => (
          <motion.label
            key={option.value}
            className="relative cursor-pointer"
            style={{ cursor: disabled ? "not-allowed" : "pointer" }}
          >
            <input
              type="radio"
              name={fieldId}
              value={option.value}
              checked={value === option.value}
              onChange={() => !disabled && onChange(option.value)}
              disabled={disabled}
              className="sr-only"
              aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
            />
            <motion.div
              className="px-5 py-3 rounded-xl border transition-all duration-300 flex items-center justify-center min-w-[120px] text-sm font-medium"
              style={{
                borderColor: value === option.value ? "var(--primary)" : "var(--border)",
                background: value === option.value ? "rgba(var(--shadow-tint), 0.1)" : "var(--surface-elevated)",
                color: value === option.value ? "var(--primary)" : "var(--text)",
                opacity: disabled ? 0.5 : 1,
              }}
              whileHover={{ scale: value === option.value ? 1 : 1.02, borderColor: value === option.value ? "var(--primary)" : "var(--primary)" }}
              whileTap={{ scale: 0.98 }}
            >
              {option.label}
            </motion.div>
          </motion.label>
        ))}
      </div>
      {error && (
        <motion.p
          id={`${fieldId}-error`}
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
        <p id={`${fieldId}-hint`} className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
          {hint}
        </p>
      )}
    </fieldset>
  );
}

const BUDGET_OPTIONS: ChipOption[] = [
  { value: "under-25k", label: "Under ₹25k" },
  { value: "25k-50k", label: "₹25k–₹50k" },
  { value: "50k-100k", label: "₹50k–₹1L" },
  { value: "100k-plus", label: "₹1L+" },
  { value: "not-sure", label: "Not sure yet" },
];

const TIMELINE_OPTIONS: ChipOption[] = [
  { value: "asap", label: "As soon as possible" },
  { value: "2-4-weeks", label: "2–4 weeks" },
  { value: "1-2-months", label: "1–2 months" },
  { value: "2-months-plus", label: "2+ months" },
  { value: "flexible", label: "Flexible" },
];

export function BudgetSelector(props: Omit<ChipSelectorProps, "options">) {
  return <ChipSelector {...props} options={BUDGET_OPTIONS} name="budget" />;
}

export function TimelineSelector(props: Omit<ChipSelectorProps, "options">) {
  return <ChipSelector {...props} options={TIMELINE_OPTIONS} name="timeline" />;
}