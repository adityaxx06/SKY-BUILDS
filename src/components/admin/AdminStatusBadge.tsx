"use client";

import { cn } from "@/lib/utils/cn";

type Status =
  | "new"
  | "read"
  | "in_progress"
  | "closed"
  | "featured"
  | "active"
  | "inactive";

const STATUS_LABELS: Record<Status, string> = {
  new: "New",
  read: "Read",
  in_progress: "In Progress",
  closed: "Closed",
  featured: "Featured",
  active: "Active",
  inactive: "Inactive",
};

const STATUS_COLORS: Record<Status, string> = {
  new: "var(--primary)",
  read: "var(--accent)",
  in_progress: "var(--secondary)",
  closed: "var(--text-muted)",
  featured: "var(--accent)",
  active: "var(--success)",
  inactive: "var(--text-muted)",
};

interface AdminStatusBadgeProps {
  status: Status;
  size?: "sm" | "md";
  showIcon?: boolean;
}

export function AdminStatusBadge({ status, size = "md", showIcon = false }: AdminStatusBadgeProps) {
  const color = STATUS_COLORS[status];
  const label = STATUS_LABELS[status];

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-[11px]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium uppercase tracking-wider",
        sizeClasses[size]
      )}
      style={{ background: `${color}20`, color }}
    >
      {showIcon && (
        <span className="flex h-1.5 w-1.5" style={{ background: color }}>
          <span className="absolute h-1.5 w-1.5 rounded-full animate-ping" style={{ background: color, opacity: 0.5 }} />
        </span>
      )}
      {label}
    </span>
  );
}