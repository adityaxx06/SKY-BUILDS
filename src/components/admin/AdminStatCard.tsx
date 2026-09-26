"use client";

import { motion } from "framer-motion";

interface AdminStatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accentColor?: "primary" | "secondary" | "accent" | "success";
  trend?: { value: string; positive: boolean };
  delay?: number;
}

export function AdminStatCard({
  label,
  value,
  icon,
  accentColor = "primary",
  trend,
  delay = 0,
}: AdminStatCardProps) {
  const accentColors = {
    primary: "var(--primary)",
    secondary: "var(--secondary)",
    accent: "var(--accent)",
    success: "var(--success)",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 0.61, 0.36, 1] }}
      className="rounded-[18px] border p-6 transition-colors"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
            {label}
          </p>
          <p className="mt-2 font-display text-3xl font-bold truncate" style={{ color: "var(--text)" }}>
            {value}
          </p>
          {trend && (
            <p className="mt-2 flex items-center gap-1 text-sm" style={{ color: trend.positive ? "var(--success)" : "var(--secondary)" }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={trend.positive ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"} />
              </svg>
              <span>{trend.value}</span>
            </p>
          )}
        </div>
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
          style={{ background: `${accentColors[accentColor]}15`, color: accentColors[accentColor] }}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}