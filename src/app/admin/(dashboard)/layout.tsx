import { isAdmin } from "@/lib/auth/admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Dashboard shell layout. Applies ONLY to routes inside the
 * (dashboard) route group (/admin, /admin/projects, /admin/services,
 * /admin/testimonials, /admin/messages). /admin/login is outside this
 * group and renders standalone. The group is URL-invisible, so all
 * public admin URLs are unchanged.
 */
export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("sb-access-token")?.value;

  if (session) {
    const user = await isAdmin();
    if (!user) {
      redirect("/");
    }
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
