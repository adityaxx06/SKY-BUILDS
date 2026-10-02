import { requireAdmin } from "@/lib/auth/admin";
import { getProjectAdmin } from "@/app/admin/(dashboard)/actions";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { AdminProjectForm } from "@/components/admin/AdminProjectForm";

export default async function AdminEditProjectPage({
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
        <AdminProjectForm
          mode="edit"
          initialData={{
            id: project.id,
            title: project.title,
            slug: project.slug,
            category: project.category,
            short_description: project.short_description || "",
            description: project.description || "",
            year: project.year?.toString() || "",
            services: project.services?.join(", ") || "",
            technologies: project.technologies?.join(", ") || "",
            hero_image: project.hero_image || "",
            challenge: project.challenge || "",
            solution: project.solution || "",
            result_summary: project.result_summary || "",
            featured: project.featured.toString(),
            display_order: project.display_order.toString(),
          }}
        />
      </Reveal>
    </div>
  );
}