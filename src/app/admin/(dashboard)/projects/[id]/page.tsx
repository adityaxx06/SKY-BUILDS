import { requireAdmin } from "@/lib/auth/admin";
import { getProjectAdmin } from "@/app/admin/(dashboard)/actions";
import { notFound } from "next/navigation";
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
    <div className="mx-auto w-full max-w-4xl">
      <Reveal>
        <AdminProjectDetail project={project} />
      </Reveal>
    </div>
  );
}