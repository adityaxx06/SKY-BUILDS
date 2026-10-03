"use server";

import { createServerSupabaseAdminClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";
import { revalidatePath } from "next/cache";

export async function deleteProjectAction(formData: FormData): Promise<{ success: boolean; error?: string }> {
  await requireAdmin();
  const rawId = formData.get("id");
  if (typeof rawId !== "string" || !rawId.trim()) {
    return { success: false, error: "Missing project id." };
  }
  const id = rawId.trim();

  const supabase = await createServerSupabaseAdminClient();

  const { data: existing } = await supabase
    .from("projects")
    .select("slug")
    .eq("id", id)
    .maybeSingle();
  const oldSlug = (existing as { slug?: string } | null)?.slug || null;

  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error("Delete project error:", error);
    return { success: false, error: "Failed to delete project. Please try again." };
  }

  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/sitemap.xml");
  if (oldSlug) revalidatePath(`/projects/${oldSlug}`);
  return { success: true };
}