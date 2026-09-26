import { requireAdmin } from "@/lib/auth/admin";
import { getTestimonialAdmin } from "@/app/admin/(dashboard)/actions";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AdminTestimonialDetail } from "@/components/admin/AdminTestimonialDetail";

export default async function AdminTestimonialDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();

  const { id } = await params;
  const testimonial = await getTestimonialAdmin(id);

  if (!testimonial) {
    notFound();
  }

  return (
    <Container className="py-4 max-w-4xl">
      <Reveal>
        <AdminTestimonialDetail testimonial={testimonial} />
      </Reveal>
    </Container>
  );
}