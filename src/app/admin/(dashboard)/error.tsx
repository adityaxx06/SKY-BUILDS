"use client";

import { useEffect } from "react";

/**
 * Dashboard segment error boundary. Catches render/data failures for
 * /admin/* (dashboard group only — login is outside this group) and
 * offers a retry. Never renders error internals: diagnostics stay in
 * server logs via the console.error below.
 */
export default function AdminDashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin dashboard error:", error);
  }, [error]);

  return (
    <div className="mx-auto w-full max-w-[1120px]">
      <div
        className="rounded-[18px] border p-10 text-center"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <div
          className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full"
          style={{
            background: "color-mix(in srgb, var(--secondary) 12%, transparent)",
            color: "var(--secondary)",
          }}
          aria-hidden="true"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="font-display text-xl font-semibold" style={{ color: "var(--text)" }}>
          Something went wrong
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-sm" style={{ color: "var(--text-muted)" }}>
          This admin section failed to load. Please try again, and contact support if the problem persists.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90"
          style={{ background: "var(--primary)", color: "var(--on-primary)" }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
