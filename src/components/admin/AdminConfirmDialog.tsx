"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AdminConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  isConfirming?: boolean;
  error?: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Shared destructive-action confirmation. Rendered conditionally by the
 * caller (returns null when closed) — no CSS hiding, no globals.
 */
export function AdminConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  isConfirming = false,
  error = null,
  onConfirm,
  onCancel,
}: AdminConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    cancelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isConfirming) onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, isConfirming, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Cancel and close dialog"
        onClick={onCancel}
        disabled={isConfirming}
        className="absolute inset-0 bg-black/60"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="admin-confirm-title"
        aria-describedby="admin-confirm-description"
        className="relative w-full max-w-sm rounded-[20px] border p-6"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <div
          className="mb-4 flex h-11 w-11 items-center justify-center rounded-full"
          style={{ background: "color-mix(in srgb, var(--secondary) 12%, transparent)", color: "var(--secondary)" }}
          aria-hidden="true"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 id="admin-confirm-title" className="font-display text-lg font-semibold" style={{ color: "var(--text)" }}>
          {title}
        </h2>
        <p id="admin-confirm-description" className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
          {description}
        </p>
        {error && (
          <p role="alert" className="mt-3 rounded-lg border p-3 text-sm" style={{ borderColor: "var(--secondary)", color: "var(--secondary)" }}>
            {error}
          </p>
        )}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            disabled={isConfirming}
            className="rounded-full px-5 py-2.5 text-sm font-medium transition-colors disabled:opacity-50"
            style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isConfirming}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-opacity disabled:cursor-wait"
            style={{ background: "var(--secondary)", color: "#fff", opacity: isConfirming ? 0.7 : 1 }}
          >
            {isConfirming ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-transparent border-t-white" aria-hidden="true" />
                Deleting…
              </>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
