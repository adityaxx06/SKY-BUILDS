import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export interface AdminUser {
  id: string;
  email: string;
  role: string;
}

/**
 * Get the current authenticated user from Supabase Auth.
 * Returns null if not authenticated.
 */
export async function getCurrentUser(): Promise<AdminUser | null> {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  const role = (user.app_metadata?.role as string) || "user";

  return {
    id: user.id,
    email: user.email || "",
    role,
  };
}

/**
 * Verify the current user is authenticated AND has admin role.
 * Redirects to /admin/login if not authenticated.
 * Redirects to / (homepage) if authenticated but not admin.
 * Returns the admin user object if authorized.
 */
export async function requireAdmin(): Promise<AdminUser> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/admin/login");
  }

  if (user.role !== "admin") {
    redirect("/");
  }

  return user;
}

/**
 * Check if current user is admin (without redirecting).
 * Useful for conditional rendering in Server Components.
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === "admin";
}

/**
 * Sign out the current user.
 */
export async function signOut(): Promise<void> {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
}