import { requireAdmin } from "@/lib/auth/admin";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AdminProjectForm } from "@/components/admin/AdminProjectForm";

export default async function AdminNewProjectPage() {
  await requireAdmin();

  return (
    <Container className="py-4 max-w-4xl">
      <Reveal>
        <AdminProjectForm mode="create" />
      </Reveal>
    </Container>
  );
}