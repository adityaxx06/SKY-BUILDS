import { requireAdmin } from "@/lib/auth/admin";
import { getTestimonialsAdmin, getDashboardData } from "@/app/admin/(dashboard)/actions";
import { AdminPage } from "@/components/admin/AdminPage";
import { AdminTestimonialList } from "@/components/admin/AdminTestimonialList";

export default async function AdminTestimonialsPage({
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
  // "All Testimonials" in the UI means unfiltered: only narrow when ?featured=true.
  const featured = params.featured === "true" ? true : undefined;

  const data = await getTestimonialsAdmin({ page, search, featured });
  const dashboardData = await getDashboardData();

  return (
    <AdminPage
      title="Testimonials"
      description={`Manage client testimonials. ${dashboardData.testimonialsCount} total`}
      action={{ label: "Add Testimonial", href: "/admin/testimonials/new" }}
    >
      <AdminTestimonialList
        initialTestimonials={data.testimonials}
        initialTotalPages={data.totalPages}
        initialPage={data.currentPage}
        initialSearch={search}
        initialFeatured={params.featured === "true"}
      />
    </AdminPage>
  );
}