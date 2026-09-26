/**
 * Minimal pass-through layout for /admin/*.
 *
 * It intentionally renders NO shell here: the dashboard shell
 * (AdminSidebar + AdminHeader) lives in (dashboard)/layout.tsx so that
 * /admin/login stays a standalone authentication screen. Route groups
 * do not affect URLs, so /(dashboard) routes still resolve to /admin/*.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}