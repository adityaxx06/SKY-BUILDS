import { getTestimonialsAdmin } from "@/app/admin/(dashboard)/actions";
import { createServerSupabaseAdminClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const search = searchParams.get("search") || undefined;
  const featuredParam = searchParams.get("featured");
  const featured = featuredParam === "true";

  try {
    const data = await getTestimonialsAdmin({ page, limit, search, featured });
    return NextResponse.json(data);
  } catch (error) {
    console.error("API get testimonials error:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
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
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
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
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  revalidatePath("/admin/testimonials");
  return NextResponse.json({ success: true, id: testimonial.id });
}
