import { requireAdmin } from "@/lib/auth/admin";
import { getProjectsAdmin, getDashboardData } from "@/app/admin/(dashboard)/actions";
import { AdminPage } from "@/components/admin/AdminPage";
import { ProjectList } from "@/components/admin/ProjectList";

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    featured?: string;
  }>;
}) {
  await requireAdmin();

  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const search = params.search || "";
  // "All Projects" in the UI means unfiltered: only narrow when ?featured=true.
  const featured = params.featured === "true" ? true : undefined;

  const data = await getProjectsAdmin({ page, search, featured });
  const dashboardData = await getDashboardData();

  return (
    <AdminPage
      title="Selected Work"
      description={`Manage selected work. ${dashboardData.projectsCount} total`}
      action={{ label: "Add Work", href: "/admin/projects/new" }}
    >
      <ProjectList
        initialProjects={data.projects}
        initialTotalPages={data.totalPages}
        initialPage={data.currentPage}
        initialSearch={search}
        initialFeatured={params.featured === "true"}
      />
    </AdminPage>
  );
}