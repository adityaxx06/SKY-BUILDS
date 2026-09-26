"use server";

import { createServerSupabaseAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { ServiceFormData, CrudResult } from "@/app/admin/(dashboard)/actions";

export async function updateServiceAction(formData: FormData): Promise<CrudResult> {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const short_description = formData.get("short_description") as string;
  const description = formData.get("description") as string;
  const icon = formData.get("icon") as string;
  const display_order = formData.get("display_order") as string;
  const active = formData.get("active") as string;

  if (!title?.trim()) return { success: false, error: "Title is required" };
  if (!slug?.trim()) return { success: false, error: "Slug is required" };
  if (display_order && isNaN(Number(display_order))) return { success: false, error: "Display order must be a number" };

  const supabase = await createServerSupabaseAdminClient();
  const { error } = await supabase
    .from("services")
    .update({
      title: title.trim(),
      slug: slug.trim(),
      short_description: short_description?.trim() || null,
      description: description?.trim() || null,
      icon: icon?.trim() || null,
      display_order: display_order ? Number(display_order) : 0,
      active: active === "true",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Update service error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/services");
  revalidatePath(`/admin/services/${id}`);
  return { success: true };
}

export async function deleteServiceAction(formData: FormData): Promise<CrudResult> {
  const id = formData.get("id") as string;
  const supabase = await createServerSupabaseAdminClient();
  const { error } = await supabase.from("services").delete().eq("id", id);

  if (error) {
    console.error("Delete service error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/services");
  return { success: true };
}