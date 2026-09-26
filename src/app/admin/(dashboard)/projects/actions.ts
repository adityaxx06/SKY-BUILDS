"use server";

import { createServerSupabaseAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface UpdateProjectResult {
  success: boolean;
  error?: string;
}

export async function updateProjectAction(formData: FormData): Promise<UpdateProjectResult> {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const category = formData.get("category") as string;
  const short_description = formData.get("short_description") as string;
  const description = formData.get("description") as string;
  const year = formData.get("year") as string;
  const services = formData.get("services") as string;
  const technologies = formData.get("technologies") as string;
  const hero_image = formData.get("hero_image") as string;
  const challenge = formData.get("challenge") as string;
  const solution = formData.get("solution") as string;
  const result_summary = formData.get("result_summary") as string;
  const featured = formData.get("featured") as string;
  const display_order = formData.get("display_order") as string;

  // Validation
  if (!title?.trim()) return { success: false, error: "Title is required" };
  if (!slug?.trim()) return { success: false, error: "Slug is required" };
  if (!category?.trim()) return { success: false, error: "Category is required" };
  if (year && isNaN(Number(year))) return { success: false, error: "Year must be a number" };
  if (display_order && isNaN(Number(display_order))) return { success: false, error: "Display order must be a number" };

  const supabase = await createServerSupabaseAdminClient();

  const { error } = await supabase
    .from("projects")
    .update({
      title: title.trim(),
      slug: slug.trim(),
      category: category.trim(),
      short_description: short_description?.trim() || null,
      description: description?.trim() || null,
      year: year ? Number(year) : null,
      services: services ? services.split(",").map(s => s.trim()).filter(Boolean) : [],
      technologies: technologies ? technologies.split(",").map(t => t.trim()).filter(Boolean) : [],
      hero_image: hero_image?.trim() || null,
      challenge: challenge?.trim() || null,
      solution: solution?.trim() || null,
      result_summary: result_summary?.trim() || null,
      featured: featured === "true",
      display_order: display_order ? Number(display_order) : 0,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Update project error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${id}`);
  return { success: true };
}

export async function deleteProjectAction(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const id = formData.get("id") as string;

  const supabase = await createServerSupabaseAdminClient();

  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error("Delete project error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/projects");
  return { success: true };
}