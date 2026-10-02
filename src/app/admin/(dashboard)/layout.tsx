import { getCurrentUser } from "@/lib/auth/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { redirect } from "next/navigation";

/**
 * Dashboard shell layout. Applies ONLY to routes inside the
 * (dashboard) route group (/admin, /admin/projects, /admin/services,
 * /admin/testimonials, /admin/messages). /admin/login is outside this
 * group and renders standalone. The group is URL-invisible, so all
 * public admin URLs are unchanged.
 *
 * Defense in depth behind src/proxy.ts: an authenticated non-admin who
 * somehow reaches this layout is bounced to "/". Unauthenticated
 * requests are left for the proxy (which redirects to /admin/login);
 * every data access below additionally enforces requireAdmin().
 */
export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (user && user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
