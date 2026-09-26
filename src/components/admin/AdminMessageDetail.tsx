"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { AdminStatusBadge } from "./AdminStatusBadge";
import Link from "next/link";
import { updateMessageStatusAction } from "@/app/admin/(dashboard)/messages/actions";

interface MessageDetail {
  id: string;
  name: string;
  email: string;
  project_type: string;
  budget: string | null;
  timeline: string | null;
  company: string | null;
  reference_url: string | null;
  message: string;
  status: "new" | "read" | "in_progress" | "closed";
  created_at: string;
  updated_at: string;
}

interface AdminMessageDetailProps {
  message: MessageDetail;
}

interface UpdateStatusResult {
  success: boolean;
  error?: string;
}

const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "read", label: "Read" },
  { value: "in_progress", label: "In Progress" },
  { value: "closed", label: "Closed" },
];

export function AdminMessageDetail({ message }: AdminMessageDetailProps) {
  const [actionState, actionDispatch, isPending] = useActionState<UpdateStatusResult, FormData>(
    async (_prevState: UpdateStatusResult | null, formData: FormData) => {
      const status = formData.get("status") as "new" | "read" | "in_progress" | "closed";
      return updateMessageStatusAction(message.id, status);
    },
    { success: false } as UpdateStatusResult
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateShort = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link
            href="/admin/messages"
            className="inline-flex items-center gap-2 text-sm font-medium mb-4 transition-colors hover:underline"
            style={{ color: "var(--primary)" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Messages
          </Link>
          <h1 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold" style={{ color: "var(--text)" }}>
            {message.name}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <AdminStatusBadge status={message.status} showIcon />
        </div>
      </div>

      {/* Meta info */}
      <div className="rounded-[18px] border p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div>
          <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Email</p>
          <p className="mt-1 font-medium break-all" style={{ color: "var(--text)" }}>{message.email}</p>
        </div>
        <div>
          <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Project Type</p>
          <p className="mt-1 font-medium" style={{ color: "var(--text)" }}>{message.project_type}</p>
        </div>
        <div>
          <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Submitted</p>
          <p className="mt-1 font-medium" style={{ color: "var(--text)" }}>{formatDate(message.created_at)}</p>
        </div>
        <div>
          <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Last Updated</p>
          <p className="mt-1 font-medium" style={{ color: "var(--text)" }}>{formatDateShort(message.updated_at)}</p>
        </div>
      </div>

      {/* Optional fields */}
      {(message.budget || message.timeline || message.company || message.reference_url) && (
        <div className="rounded-[18px] border p-6 grid grid-cols-1 md:grid-cols-2 gap-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          {message.company && (
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Company / Brand</p>
              <p className="mt-1 font-medium" style={{ color: "var(--text)" }}>{message.company}</p>
            </div>
          )}
          {message.budget && (
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Budget</p>
              <p className="mt-1 font-medium" style={{ color: "var(--text)" }}>{message.budget}</p>
            </div>
          )}
          {message.timeline && (
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Timeline</p>
              <p className="mt-1 font-medium" style={{ color: "var(--text)" }}>{message.timeline}</p>
            </div>
          )}
          {message.reference_url && (
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Reference URL</p>
              <a className="mt-1 inline-block text-sm font-medium underline decoration-transparent underline-offset-2 transition-colors hover:decoration-current break-all" href={message.reference_url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>
                {message.reference_url}
              </a>
            </div>
          )}
        </div>
      )}

      {/* Project Description */}
      <div className="rounded-[18px] border p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <h2 className="font-display text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>
          Project Description
        </h2>
        <div style={{ color: "var(--text-muted)" }}>
          <p className="whitespace-pre-wrap">{message.message}</p>
        </div>
      </div>

      {/* Status update */}
      <div className="rounded-[18px] border p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <h2 className="font-display text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>
          Update Status
        </h2>
        <form action={actionDispatch} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <input type="hidden" name="messageId" value={message.id} />
          <select
            name="status"
            defaultValue={message.status}
            disabled={isPending}
            className={cn(
              "w-full sm:w-48 appearance-none px-4 py-3.5 pr-10 rounded-xl border transition-all duration-300 bg-[var(--surface-elevated)] text-[var(--text)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/50",
              isPending ? "opacity-60 cursor-wait" : "border-[var(--border)] hover:border-[var(--primary)]"
            )}
            style={{
              background: "var(--surface-elevated)",
            }}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-colors"
            style={{ background: "var(--primary)", color: "var(--on-primary)" }}
          >
            {isPending ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 rounded-full border-2 border-transparent border-t-[var(--on-primary)] mr-2"
                />
                Updating...
              </>
            ) : (
              "Update Status"
            )}
          </button>
          {actionState?.success === true && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-sm font-medium"
              style={{ color: "var(--success)" }}
            >
              Status updated
            </motion.span>
          )}
          {actionState?.error && (
            <motion.span
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium"
              style={{ color: "var(--secondary)" }}
            >
              {actionState.error}
            </motion.span>
          )}
        </form>
      </div>
    </motion.div>
  );
}