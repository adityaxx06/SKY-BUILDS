/**
 * Minimal pass-through layout for /admin/*.
 *
 * It intentionally renders NO shell here: the dashboard shell
 * (AdminSidebar + AdminHeader) lives in (dashboard)/layout.tsx so that
 * /admin/login stays a standalone authentication screen. Route groups
 * do not affect URLs, so /(dashboard) routes still resolve to /admin/*.
 */

import type { Metadata } from "next";

/**
 * Admin routes must never appear in search results. This is purely a
 * crawling directive — authentication/authorization (proxy.ts +
 * requireAdmin + RLS) remain the actual protection and are unchanged.
 */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}