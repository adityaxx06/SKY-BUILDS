"use server";

import { createServerSupabaseAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { CrudResult } from "@/app/admin/(dashboard)/actions";

export async function updateTestimonialAction(formData: FormData): Promise<CrudResult> {
  const id = formData.get("id") as string;
  const client_name = formData.get("client_name") as string;
  const client_role = formData.get("client_role") as string;
  const company = formData.get("company") as string;
  const content = formData.get("content") as string;
  const avatar_url = formData.get("avatar_url") as string;
  const display_order = formData.get("display_order") as string;
  const featured = formData.get("featured") as string;

  if (!client_name?.trim()) return { success: false, error: "Client name is required" };
  if (!content?.trim()) return { success: false, error: "Content is required" };
  if (display_order && isNaN(Number(display_order))) return { success: false, error: "Display order must be a number" };

  const supabase = await createServerSupabaseAdminClient();
  const { error } = await supabase
    .from("testimonials")
    .update({
      client_name: client_name.trim(),
      client_role: client_role?.trim() || null,
      company: company?.trim() || null,
      content: content.trim(),
      avatar_url: avatar_url?.trim() || null,
      display_order: display_order ? Number(display_order) : 0,
      featured: featured === "true",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Update testimonial error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/testimonials");
  revalidatePath(`/admin/testimonials/${id}`);
  return { success: true };
}

export async function deleteTestimonialAction(formData: FormData): Promise<CrudResult> {
  const id = formData.get("id") as string;
  const supabase = await createServerSupabaseAdminClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);

  if (error) {
    console.error("Delete testimonial error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/testimonials");
  return { success: true };
}