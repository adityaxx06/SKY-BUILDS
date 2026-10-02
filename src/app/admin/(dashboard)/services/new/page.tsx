import { requireAdmin } from "@/lib/auth/admin";
import { Reveal } from "@/components/ui/Reveal";
import { AdminServiceForm } from "@/components/admin/AdminServiceForm";

export default async function AdminNewServicePage() {
  await requireAdmin();

  return (
    <div className="mx-auto w-full max-w-4xl">
      <Reveal>
        <AdminServiceForm mode="create" />
      </Reveal>
    </div>
  );
}