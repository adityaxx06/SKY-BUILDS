"use server";

import { createServerSupabaseAdminClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";
import { revalidatePath } from "next/cache";

export interface UpdateMessageStatusResult {
  success: boolean;
  error?: string;
}

const VALID_MESSAGE_STATUSES = ["new", "read", "in_progress", "closed"] as const;

export async function updateMessageStatusAction(
  messageId: string,
  status: "new" | "read" | "in_progress" | "closed"
): Promise<UpdateMessageStatusResult> {
  await requireAdmin();
  if (!messageId?.trim()) {
    return { success: false, error: "Missing message id." };
  }
  if (!VALID_MESSAGE_STATUSES.includes(status)) {
    return { success: false, error: "Invalid status value." };
  }
  const supabase = await createServerSupabaseAdminClient();

  const { error } = await supabase
    .from("contact_submissions")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", messageId.trim());

  if (error) {
    console.error("Update message status error:", error);
    return { success: false, error: "Failed to update status" };
  }

  revalidatePath("/admin/messages");
  revalidatePath(`/admin/messages/${messageId}`);

  return { success: true };
}