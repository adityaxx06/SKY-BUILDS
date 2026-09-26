import { requireAdmin } from "@/lib/auth/admin";
import { getProjectAdmin } from "@/app/admin/(dashboard)/actions";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AdminProjectDetail } from "@/components/admin/AdminProjectDetail";

export default async function AdminProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();

  const { id } = await params;
  const project = await getProjectAdmin(id);

  if (!project) {
    notFound();
  }

  return (
    <Container className="py-4 max-w-4xl">
      <Reveal>
        <AdminProjectDetail project={project} />
      </Reveal>
    </Container>
  );
}