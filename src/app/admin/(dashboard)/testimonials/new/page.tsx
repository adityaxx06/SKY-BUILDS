import { requireAdmin } from "@/lib/auth/admin";
import { Reveal } from "@/components/ui/Reveal";
import { AdminTestimonialForm } from "@/components/admin/AdminTestimonialForm";

export default async function AdminNewTestimonialPage() {
  await requireAdmin();

  return (
    <div className="mx-auto w-full max-w-4xl">
      <Reveal>
        <AdminTestimonialForm mode="create" />
      </Reveal>
    </div>
  );
}