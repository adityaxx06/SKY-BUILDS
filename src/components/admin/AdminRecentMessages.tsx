"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Message {
  id: string;
  name: string;
  email: string;
  project_type: string;
  status: "new" | "read" | "in_progress" | "closed";
  created_at: string;
}

interface AdminRecentMessagesProps {
  messages: Message[];
}

const STATUS_LABELS: Record<Message["status"], string> = {
  new: "New",
  read: "Read",
  in_progress: "In Progress",
  closed: "Closed",
};

const STATUS_COLORS: Record<Message["status"], string> = {
  new: "var(--primary)",
  read: "var(--accent)",
  in_progress: "var(--secondary)",
  closed: "var(--text-muted)",
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function AdminRecentMessages({ messages }: AdminRecentMessagesProps) {
  if (messages.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[18px] border p-8 text-center"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <svg className="mx-auto h-12 w-12 mb-4" style={{ color: "var(--text-muted)", opacity: 0.5 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <h3 className="font-display text-lg font-semibold mb-2" style={{ color: "var(--text)" }}>
          No inquiries yet
        </h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Contact form submissions will appear here.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[18px] border overflow-hidden"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <div className="border-b px-6 py-4" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold" style={{ color: "var(--text)" }}>
            Recent Messages
          </h2>
          <Link
            href="/admin/messages"
            className="text-sm font-medium transition-colors hover:underline"
            style={{ color: "var(--primary)" }}
          >
            View all
          </Link>
        </div>
      </div>
      <div className="divide-y" style={{ borderColor: "var(--border)" }}>
        {messages.map((message) => (
          <Link
            key={message.id}
            href={`/admin/messages/${message.id}`}
            className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-[var(--surface-elevated)]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-medium" style={{ background: "var(--primary)", color: "var(--on-primary)" }}>
              {message.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate" style={{ color: "var(--text)" }}>
                {message.name}
              </p>
              <p className="text-sm truncate" style={{ color: "var(--text-muted)" }}>
                {message.email} · {message.project_type}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider"
                style={{ background: `${STATUS_COLORS[message.status]}20`, color: STATUS_COLORS[message.status] }}
              >
                {STATUS_LABELS[message.status]}
              </span>
              <time className="text-[11px]" style={{ color: "var(--text-muted)" }} dateTime={message.created_at}>
                {formatDate(message.created_at)}
              </time>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}