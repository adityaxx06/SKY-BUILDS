import { requireAdmin } from "@/lib/auth/admin";
import { getServicesAdmin, getDashboardData } from "@/app/admin/(dashboard)/actions";
import { AdminPage } from "@/components/admin/AdminPage";
import { ServiceList } from "@/components/admin/ServiceList";

export default async function AdminServicesPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    active?: string;
  }>;
}) {
  await requireAdmin();

  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const search = params.search || "";
  // "All Services" in the UI means unfiltered: only narrow when ?active=true.
  const active = params.active === "true" ? true : undefined;

  const data = await getServicesAdmin({ page, search, active });
  const dashboardData = await getDashboardData();

  return (
    <AdminPage
      title="Services"
      description={`Manage service offerings. ${dashboardData.servicesCount} total`}
      action={{ label: "Add Service", href: "/admin/services/new" }}
    >
      <ServiceList
        initialServices={data.services}
        initialTotalPages={data.totalPages}
        initialPage={data.currentPage}
        initialSearch={search}
        initialActive={params.active === "true"}
      />
    </AdminPage>
  );
}