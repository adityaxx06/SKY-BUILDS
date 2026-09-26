import { requireAdmin } from "@/lib/auth/admin";
import { getTestimonialsAdmin, getDashboardData } from "@/app/admin/(dashboard)/actions";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
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
  const featured = params.featured === "true";

  const data = await getTestimonialsAdmin({ page, search, featured });
  const dashboardData = await getDashboardData();

  return (
    <Container className="py-4">
      <Reveal>
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold" style={{ color: "var(--text)" }}>
              Testimonials
            </h1>
            <p className="mt-2 text-[1.125rem]" style={{ color: "var(--text-muted)" }}>
              Manage client testimonials. {dashboardData.projectsCount} total
            </p>
          </div>
          <a href="/admin/testimonials/new" className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-colors" style={{ background: "var(--primary)", color: "var(--on-primary)" }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            New Testimonial
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <AdminTestimonialList
          initialTestimonials={data.testimonials}
          initialTotalPages={data.totalPages}
          initialPage={data.currentPage}
          initialSearch={search}
          initialFeatured={featured}
        />
      </Reveal>
    </Container>
  );
}