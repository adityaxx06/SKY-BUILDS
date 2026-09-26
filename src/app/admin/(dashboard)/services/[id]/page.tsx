import { requireAdmin } from "@/lib/auth/admin";
import { getServiceAdmin } from "@/app/admin/(dashboard)/actions";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AdminServiceDetail } from "@/components/admin/AdminServiceDetail";

export default async function AdminServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();

  const { id } = await params;
  const service = await getServiceAdmin(id);

  if (!service) {
    notFound();
  }

  return (
    <Container className="py-4 max-w-4xl">
      <Reveal>
        <AdminServiceDetail service={service} />
      </Reveal>
    </Container>
  );
}