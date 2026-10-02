import { requireAdmin } from "@/lib/auth/admin";
import { Reveal } from "@/components/ui/Reveal";
import { AdminProjectForm } from "@/components/admin/AdminProjectForm";

export default async function AdminNewProjectPage() {
  await requireAdmin();

  return (
    <div className="mx-auto w-full max-w-4xl">
      <Reveal>
        <AdminProjectForm mode="create" />
      </Reveal>
    </div>
  );
}