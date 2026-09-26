import { requireAdmin } from "@/lib/auth/admin";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AdminServiceForm } from "@/components/admin/AdminServiceForm";

export default async function AdminNewServicePage() {
  await requireAdmin();

  return (
    <Container className="py-4 max-w-4xl">
      <Reveal>
        <AdminServiceForm mode="create" />
      </Reveal>
    </Container>
  );
}