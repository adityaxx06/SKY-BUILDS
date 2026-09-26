"use client";

import { motion } from "framer-motion";

interface AdminEmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

export function AdminEmptyState({ icon, title, description, action }: AdminEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      className="rounded-[18px] border p-10 text-center"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      {icon && (
        <div className="mx-auto h-16 w-16 mb-6 flex items-center justify-center rounded-full" style={{ background: "rgba(var(--shadow-tint), 0.1)", color: "var(--primary)" }}>
          {icon}
        </div>
      )}
      <h3 className="font-display text-xl font-semibold mb-2" style={{ color: "var(--text)" }}>
        {title}
      </h3>
      <p className="text-sm max-w-sm mx-auto mb-6" style={{ color: "var(--text-muted)" }}>
        {description}
      </p>
      {action && (
        <a
          href={action.href}
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-colors"
          style={{ background: "var(--primary)", color: "var(--on-primary)" }}
        >
          {action.label}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8" />
          </svg>
        </a>
      )}
    </motion.div>
  );
}