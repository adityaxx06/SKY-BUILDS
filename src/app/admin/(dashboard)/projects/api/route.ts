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
    const { getProjectsAdmin } = await import("@/app/admin/(dashboard)/actions");
    const data = await getProjectsAdmin({ page, limit, search, featured });
    return NextResponse.json(data);
  } catch (error) {
    console.error("API get projects error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const id = formData.get("id") as string;

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const category = formData.get("category") as string;
  const short_description = formData.get("short_description") as string;
  const description = formData.get("description") as string;
  const year = formData.get("year") as string;
  const services = formData.get("services") as string;
  const technologies = formData.get("technologies") as string;
  const hero_image = formData.get("hero_image") as string;
  const challenge = formData.get("challenge") as string;
  const solution = formData.get("solution") as string;
  const result_summary = formData.get("result_summary") as string;
  const featured = formData.get("featured") as string;
  const display_order = formData.get("display_order") as string;

  if (!title?.trim()) return NextResponse.json({ success: false, error: "Title is required" }, { status: 400 });
  if (!slug?.trim()) return NextResponse.json({ success: false, error: "Slug is required" }, { status: 400 });
  if (!category?.trim()) return NextResponse.json({ success: false, error: "Category is required" }, { status: 400 });
  if (year && isNaN(Number(year))) return NextResponse.json({ success: false, error: "Year must be a number" }, { status: 400 });
  if (display_order && isNaN(Number(display_order))) return NextResponse.json({ success: false, error: "Display order must be a number" }, { status: 400 });

  const supabase = await createServerSupabaseAdminClient();

  if (id) {
    const { error } = await supabase
      .from("projects")
      .update({
        title: title.trim(),
        slug: slug.trim(),
        category: category.trim(),
        short_description: short_description?.trim() || null,
        description: description?.trim() || null,
        year: year ? Number(year) : null,
        services: services ? services.split(",").map(s => s.trim()).filter(Boolean) : [],
        technologies: technologies ? technologies.split(",").map(t => t.trim()).filter(Boolean) : [],
        hero_image: hero_image?.trim() || null,
        challenge: challenge?.trim() || null,
        solution: solution?.trim() || null,
        result_summary: result_summary?.trim() || null,
        featured: featured === "true",
        display_order: display_order ? Number(display_order) : 0,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("Update project error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${id}`);
    return NextResponse.json({ success: true, id });
  }

  const { data: project, error } = await supabase
    .from("projects")
    .insert({
      title: title.trim(),
      slug: slug.trim(),
      category: category.trim(),
      short_description: short_description?.trim() || null,
      description: description?.trim() || null,
      year: year ? Number(year) : null,
      services: services ? services.split(",").map(s => s.trim()).filter(Boolean) : [],
      technologies: technologies ? technologies.split(",").map(t => t.trim()).filter(Boolean) : [],
      hero_image: hero_image?.trim() || null,
      challenge: challenge?.trim() || null,
      solution: solution?.trim() || null,
      result_summary: result_summary?.trim() || null,
      featured: featured === "true",
      display_order: display_order ? Number(display_order) : 0,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Create project error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  revalidatePath("/admin/projects");
  return NextResponse.json({ success: true, id: project.id });
}