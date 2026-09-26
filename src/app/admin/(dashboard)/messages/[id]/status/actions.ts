"use server";

import { createServerSupabaseAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface UpdateMessageStatusResult {
  success: boolean;
  error?: string;
}

export async function updateMessageStatus(
  id: string,
  status: "new" | "read" | "in_progress" | "closed"
): Promise<UpdateMessageStatusResult> {
  const supabase = await createServerSupabaseAdminClient();

  const { error } = await supabase
    .from("contact_submissions")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Update message status error:", error);
    return { success: false, error: "Failed to update status" };
  }

  // Revalidate the messages list and detail pages
  revalidatePath("/admin/messages");
  revalidatePath(`/admin/messages/${id}`);

  return { success: true };
}