import { requireAdmin } from "@/lib/auth/admin";
import { getServiceAdmin } from "@/app/admin/(dashboard)/actions";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { AdminServiceForm } from "@/components/admin/AdminServiceForm";

export default async function AdminEditServicePage({
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
    <div className="mx-auto w-full max-w-4xl">
      <Reveal>
        <AdminServiceForm mode="edit" initialData={service} />
      </Reveal>
    </div>
  );
}
