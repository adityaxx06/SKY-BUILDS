import { getServicesAdmin } from "@/app/admin/(dashboard)/actions";
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
  const activeParam = searchParams.get("active");
  // Client sends "false" for the "All Services" view: treat anything but
  // explicit "true" as unfiltered.
  const active = activeParam === "true" ? true : undefined;

  try {
    const data = await getServicesAdmin({ page, limit, search, active });
    return NextResponse.json(data);
  } catch (error) {
    console.error("API get services error:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  if (user.role !== "admin") return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });

  const formData = await request.formData();
  const id = formData.get("id") as string;

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const short_description = formData.get("short_description") as string;
  const description = formData.get("description") as string;
  const icon = formData.get("icon") as string;
  const display_order = formData.get("display_order") as string;
  const active = formData.get("active") as string;

  if (!title?.trim()) return NextResponse.json({ success: false, error: "Title is required" }, { status: 400 });
  if (!slug?.trim()) return NextResponse.json({ success: false, error: "Slug is required" }, { status: 400 });
  if (display_order && isNaN(Number(display_order))) return NextResponse.json({ success: false, error: "Display order must be a number" }, { status: 400 });

  const supabase = await createServerSupabaseAdminClient();

  if (id) {
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
      return NextResponse.json({ success: false, error: toSafeMutationError(error, "Failed to update service. Please try again.") }, { status: 500 });
    }

    revalidatePath("/admin/services");
    revalidatePath(`/admin/services/${id}`);
    return NextResponse.json({ success: true, id });
  }

  const { data: service, error } = await supabase
    .from("services")
    .insert({
      title: title.trim(),
      slug: slug.trim(),
      short_description: short_description?.trim() || null,
      description: description?.trim() || null,
      icon: icon?.trim() || null,
      display_order: display_order ? Number(display_order) : 0,
      active: active === "true",
    })
    .select("id")
    .single();

  if (error) {
    console.error("Create service error:", error);
    return NextResponse.json({ success: false, error: toSafeMutationError(error, "Failed to create service. Please try again.") }, { status: 500 });
  }

  revalidatePath("/admin/services");
  return NextResponse.json({ success: true, id: service.id });
}
