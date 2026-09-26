import { requireAdmin } from "@/lib/auth/admin";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AdminTestimonialForm } from "@/components/admin/AdminTestimonialForm";

export default async function AdminNewTestimonialPage() {
  await requireAdmin();

  return (
    <Container className="py-4 max-w-4xl">
      <Reveal>
        <AdminTestimonialForm mode="create" />
      </Reveal>
    </Container>
  );
}