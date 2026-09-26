"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export interface LoginResult {
  success: boolean;
  error?: string;
}

export async function signInWithEmail(
  prevState: LoginResult | null,
  formData: FormData
): Promise<LoginResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }

  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  // Verify admin role after successful sign in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const role = (user?.app_metadata?.role as string) || "user";

  if (role !== "admin") {
    // Sign out non-admin user
    await supabase.auth.signOut();
    return { success: false, error: "Unauthorized: Admin access required" };
  }

  // Success - redirect will be handled by the form action
  redirect("/admin");
}

export async function signOutAction(): Promise<void> {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}