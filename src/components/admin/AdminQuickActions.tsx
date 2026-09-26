"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface QuickAction {
  href: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    href: "/admin/messages",
    label: "View Messages",
    description: "Review and manage contact inquiries",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    href: "/admin/projects",
    label: "Manage Projects",
    description: "Add, edit, or remove portfolio projects",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h6v6H9z" />
      </svg>
    ),
  },
  {
    href: "/admin/services",
    label: "Manage Services",
    description: "Update service offerings and descriptions",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    href: "/admin/testimonials",
    label: "Manage Testimonials",
    description: "Add or edit client testimonials",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 12h2M14 12h2" />
      </svg>
    ),
  },
];

export function AdminQuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <h2 className="font-display text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {QUICK_ACTIONS.map((action, index) => (
          <motion.div
            key={action.href}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.35 + index * 0.05, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <Link
              href={action.href}
              className="group flex items-center gap-3 rounded-[14px] border p-4 text-left transition-all duration-200 hover:border-primary/50 hover:bg-[var(--surface-elevated)]"
              style={{
                borderColor: "var(--border)",
                background: "var(--surface)",
                color: "var(--text)",
              }}
            >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors"
                  style={{
                    background: "rgba(var(--shadow-tint), 0.1)",
                    color: "var(--primary)",
                  }}
                >
                  {action.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate" style={{ color: "var(--text)" }}>
                    {action.label}
                  </p>
                  <p className="text-sm truncate" style={{ color: "var(--text-muted)" }}>
                    {action.description}
                  </p>
                </div>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" style={{ color: "var(--text-muted)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8" />
                </svg>
              </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}