"use server";

import { createServerSupabaseAdminClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";
import { revalidatePath } from "next/cache";
import { CrudResult } from "@/app/admin/(dashboard)/actions";

export async function deleteServiceAction(formData: FormData): Promise<CrudResult> {
  await requireAdmin();
  const rawId = formData.get("id");
  if (typeof rawId !== "string" || !rawId.trim()) {
    return { success: false, error: "Missing service id." };
  }
  const id = rawId.trim();
  const supabase = await createServerSupabaseAdminClient();
  const { error } = await supabase.from("services").delete().eq("id", id);

  if (error) {
    console.error("Delete service error:", error);
    return { success: false, error: "Failed to delete service. Please try again." };
  }

  revalidatePath("/admin/services");
  return { success: true };
}