"use client";

import Link from "next/link";
import { useActionState } from "react";
import { motion } from "framer-motion";
import { signInWithEmail } from "./actions";

export default function AdminLoginPage() {
  const [formState, formAction, isPending] = useActionState(signInWithEmail, null);

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12"
      style={{ background: "var(--bg)" }}
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -top-32 left-1/2 h-96 w-[42rem] max-w-none -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "color-mix(in srgb, var(--primary) 16%, transparent)" }}
        />
        <div
          className="absolute -bottom-40 left-1/2 h-80 w-[36rem] max-w-none -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "color-mix(in srgb, var(--secondary) 10%, transparent)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        className="relative w-full max-w-sm"
      >
        {/* Brand */}
        <div className="mb-8 text-center">
          <div
            className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl font-display text-xl font-bold"
            style={{ background: "var(--primary)", color: "var(--on-primary)" }}
            aria-hidden="true"
          >
            S
          </div>
          <h1 className="font-display text-3xl font-bold" style={{ color: "var(--text)" }}>
            Sky Builds
          </h1>
          <p
            className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: "var(--text-muted)" }}
          >
            Admin
          </p>
        </div>

        {/* Login card */}
        <div
          className="rounded-[24px] border p-7 sm:p-8"
          style={{ borderColor: "var(--border)", background: "var(--surface)" }}
        >
          <form action={formAction} className="space-y-5" noValidate>
            {formState?.error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
                className="rounded-xl border p-4 text-sm"
                style={{
                  background: "color-mix(in srgb, var(--secondary) 10%, transparent)",
                  borderColor: "var(--secondary)",
                  color: "var(--text)",
                }}
              >
                {formState.error}
              </motion.div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
                style={{ color: "var(--text)" }}
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={isPending}
                className="w-full rounded-xl border px-4 py-3 text-[var(--text)] placeholder-[var(--text-muted)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface-elevated)",
                }}
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
                style={{ color: "var(--text)" }}
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                disabled={isPending}
                className="w-full rounded-xl border px-4 py-3 text-[var(--text)] placeholder-[var(--text-muted)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface-elevated)",
                }}
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="flex w-full items-center justify-center gap-3 rounded-full px-8 py-3.5 font-medium transition-opacity disabled:cursor-wait"
              style={{
                background: "var(--primary)",
                color: "var(--on-primary)",
                opacity: isPending ? 0.7 : 1,
              }}
            >
              {isPending ? (
                <>
                  <span
                    className="h-5 w-5 animate-spin rounded-full border-2 border-transparent border-t-[var(--on-primary)]"
                    aria-hidden="true"
                  />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm" style={{ color: "var(--text-muted)" }}>
            Secure admin access
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current"
            style={{ color: "var(--primary)" }}
          >
            Back to website
          </Link>
        </div>
      </motion.div>
    </div>
  );
}