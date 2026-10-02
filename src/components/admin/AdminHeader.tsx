"use client";

import { useActionState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { signOutAction } from "@/app/admin/login/actions";

const TITLES: Array<{ match: (p: string) => boolean; title: string; crumb: string }> = [
  { match: (p) => p === "/admin", title: "Dashboard", crumb: "Overview" },
  { match: (p) => p.startsWith("/admin/messages"), title: "Messages", crumb: "Inbox" },
    { match: (p) => p.startsWith("/admin/projects"), title: "Selected Work", crumb: "Content" },
  { match: (p) => p.startsWith("/admin/services"), title: "Services", crumb: "Content" },
  { match: (p) => p.startsWith("/admin/testimonials"), title: "Testimonials", crumb: "Content" },
  { match: (p) => p.startsWith("/admin/login"), title: "Sign in", crumb: "Access" },
];

export function AdminHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const [, formAction, isPending] = useActionState(signOutAction, null);
  const pathname = usePathname();
  const current = TITLES.find((t) => t.match(pathname)) ?? {
    title: "Admin",
    crumb: "Workspace",
  };

  return (
    <header
      className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b px-4 sm:px-6 lg:px-8"
      style={{ borderColor: "var(--border)", background: "var(--bg)" }}
    >
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="flex h-9 w-9 items-center justify-center rounded-lg border lg:hidden"
          style={{ borderColor: "var(--border)", color: "var(--text)" }}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <nav className="flex min-w-0 items-center gap-2 text-sm" aria-label="Admin breadcrumb">
          <Link href="/admin" className="hidden shrink-0 sm:inline" style={{ color: "var(--text-muted)" }}>
            Admin
          </Link>
          <span className="hidden sm:inline" style={{ color: "var(--text-muted)" }} aria-hidden="true">
            /
          </span>
          <span className="hidden md:inline" style={{ color: "var(--text-muted)" }}>
            {current.crumb}
          </span>
          <span className="hidden md:inline" style={{ color: "var(--text-muted)" }} aria-hidden="true">
            /
          </span>
          <span className="truncate font-semibold" style={{ color: "var(--text)" }} aria-current="page">
            {current.title}
          </span>
        </nav>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <Link
          href="/"
          className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors md:flex"
          style={{ color: "var(--text-muted)" }}
        >
          View site
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>
        <ThemeToggle />
        <form action={formAction}>
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors disabled:opacity-50"
            style={{ color: "var(--text-muted)" }}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">{isPending ? "Signing out…" : "Sign out"}</span>
          </button>
        </form>
      </div>
    </header>
  );
}