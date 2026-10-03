import { requireAdmin } from "@/lib/auth/admin";
import { getProjectAdmin } from "@/app/admin/(dashboard)/actions";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { AdminProjectForm } from "@/components/admin/AdminProjectForm";
import type { ManagedImage } from "@/components/admin/AdminImageManager";

function toManagedImages(value: unknown): ManagedImage[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (entry): entry is { url: string; alt?: string } =>
        typeof entry === "object" &&
        entry !== null &&
        typeof (entry as { url?: unknown }).url === "string"
    )
    .map((entry) => ({
      url: (entry as { url: string }).url,
      alt: typeof entry.alt === "string" ? entry.alt : "",
    }));
}

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
            overview: project.overview || "",
            features: Array.isArray(project.features)
              ? (project.features as unknown[])
                  .filter((f): f is string => typeof f === "string")
                  .join("\n")
              : "",
            year: project.year?.toString() || "",
            services: project.services?.join(", ") || "",
            technologies: project.technologies?.join(", ") || "",
            images: toManagedImages(project.images),
            challenge: project.challenge || "",
            solution: project.solution || "",
            result_summary: project.result_summary || "",
            mockup_type: project.mockup_type || "browser",
            visual_theme: project.visual_theme || "analytical",
            featured: project.featured.toString(),
            display_order: project.display_order.toString(),
          }}
        />
      </Reveal>
    </div>
  );
}