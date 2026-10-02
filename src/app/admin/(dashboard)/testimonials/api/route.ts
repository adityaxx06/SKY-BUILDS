import { getTestimonialsAdmin } from "@/app/admin/(dashboard)/actions";
import { createServerSupabaseAdminClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth/admin";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * Map a Supabase mutation error to a user-safe message. Raw database
 * errors stay in server logs only — never in API responses.
 */
function toSafeMutationError(error: { code?: string } | null, fallback: string): string {
  if (error?.code === "23505") {
    return "An item with this slug already exists. Use a different slug.";
  }
  return fallback;
}

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const search = searchParams.get("search") || undefined;
  const featuredParam = searchParams.get("featured");
  // Client sends "false" for the "All Testimonials" view: treat anything but
  // explicit "true" as unfiltered.
  const featured = featuredParam === "true" ? true : undefined;

  try {
    const data = await getTestimonialsAdmin({ page, limit, search, featured });
    return NextResponse.json(data);
  } catch (error) {
    console.error("API get testimonials error:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  if (user.role !== "admin") return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });

  const formData = await request.formData();
  const id = formData.get("id") as string;

  const client_name = formData.get("client_name") as string;
  const client_role = formData.get("client_role") as string;
  const company = formData.get("company") as string;
  const content = formData.get("content") as string;
  const avatar_url = formData.get("avatar_url") as string;
  const display_order = formData.get("display_order") as string;
  const featured = formData.get("featured") as string;

  if (!client_name?.trim()) return NextResponse.json({ success: false, error: "Client name is required" }, { status: 400 });
  if (!content?.trim()) return NextResponse.json({ success: false, error: "Content is required" }, { status: 400 });
  if (display_order && isNaN(Number(display_order))) return NextResponse.json({ success: false, error: "Display order must be a number" }, { status: 400 });

  const supabase = await createServerSupabaseAdminClient();

  if (id) {
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
      return NextResponse.json({ success: false, error: toSafeMutationError(error, "Failed to update testimonial. Please try again.") }, { status: 500 });
    }

    revalidatePath("/admin/testimonials");
    revalidatePath(`/admin/testimonials/${id}`);
    return NextResponse.json({ success: true, id });
  }

  const { data: testimonial, error } = await supabase
    .from("testimonials")
    .insert({
      client_name: client_name.trim(),
      client_role: client_role?.trim() || null,
      company: company?.trim() || null,
      content: content.trim(),
      avatar_url: avatar_url?.trim() || null,
      featured: featured === "true",
      display_order: display_order ? Number(display_order) : 0,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Create testimonial error:", error);
    return NextResponse.json({ success: false, error: toSafeMutationError(error, "Failed to create testimonial. Please try again.") }, { status: 500 });
  }

  revalidatePath("/admin/testimonials");
  return NextResponse.json({ success: true, id: testimonial.id });
}
