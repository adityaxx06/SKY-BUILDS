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
  // Client sends "false" for the "All Projects" view: treat anything but
  // explicit "true" as unfiltered.
  const featured = featuredParam === "true" ? true : undefined;

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
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  if (user.role !== "admin") return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });

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
  const challenge = formData.get("challenge") as string;
  const solution = formData.get("solution") as string;
  const result_summary = formData.get("result_summary") as string;
  const featured = formData.get("featured") as string;
  const display_order = formData.get("display_order") as string;
  const overview = formData.get("overview") as string;
  const featuresRaw = formData.get("features") as string;
  const mockup_type = formData.get("mockup_type") as string;
  const visual_theme = formData.get("visual_theme") as string;

  if (!title?.trim()) return NextResponse.json({ success: false, error: "Title is required" }, { status: 400 });
  if (!slug?.trim()) return NextResponse.json({ success: false, error: "Slug is required" }, { status: 400 });
  if (!category?.trim()) return NextResponse.json({ success: false, error: "Category is required" }, { status: 400 });
  if (year && isNaN(Number(year))) return NextResponse.json({ success: false, error: "Year must be a number" }, { status: 400 });
  if (display_order && isNaN(Number(display_order))) return NextResponse.json({ success: false, error: "Display order must be a number" }, { status: 400 });

  const VALID_MOCKUPS = ["browser", "devices", "dashboard"];
  const VALID_THEMES = ["analytical", "editorial", "energetic"];
  if (mockup_type && !VALID_MOCKUPS.includes(mockup_type)) {
    return NextResponse.json({ success: false, error: "Invalid visual type" }, { status: 400 });
  }
  if (visual_theme && !VALID_THEMES.includes(visual_theme)) {
    return NextResponse.json({ success: false, error: "Invalid visual theme" }, { status: 400 });
  }
  const features = featuresRaw
    ? featuresRaw.split(/\r?\n/).map((f) => f.trim()).filter(Boolean).slice(0, 30)
    : [];
  if (features.some((f) => f.length > 300)) {
    return NextResponse.json({ success: false, error: "Each feature must be 300 characters or fewer" }, { status: 400 });
  }

  // Gallery images managed by AdminImageManager (JSON "images" hidden input).
  // Only https URLs are accepted; hero_image always mirrors the first image.
  let images: { url: string; alt: string }[] = [];
  const imagesRaw = formData.get("images") as string;
  if (imagesRaw) {
    try {
      const parsed: unknown = JSON.parse(imagesRaw);
      if (!Array.isArray(parsed)) throw new Error("invalid");
      images = parsed
        .filter(
          (entry): entry is { url: string; alt?: string } =>
            typeof entry === "object" &&
            entry !== null &&
            typeof (entry as { url?: unknown }).url === "string"
        )
        .map((entry) => ({
          url: (entry as { url: string }).url.trim(),
          alt:
            typeof entry.alt === "string" ? entry.alt.trim().slice(0, 200) : "",
        }))
        .filter((entry) => {
          if (!/^https:\/\/.{1,2000}$/.test(entry.url)) return false;
          try {
            const host = new URL(entry.url).hostname.toLowerCase();
            return host.endsWith(".supabase.co") || host === "supabase.co";
          } catch {
            return false;
          }
        })
        .slice(0, 20);
    } catch {
      return NextResponse.json({ success: false, error: "Invalid image data" }, { status: 400 });
    }
  }
  const hero_image = images[0]?.url || null;

  const supabase = await createServerSupabaseAdminClient();

  // Public routes render from Supabase now: revalidate every public
  // consumer after any mutation (admin paths keep existing behavior).
  const revalidatePublic = (slugs: (string | null | undefined)[]) => {
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/sitemap.xml");
    for (const s of new Set(slugs.filter(Boolean) as string[])) {
      revalidatePath(`/projects/${s}`);
    }
  };

  if (id) {
    const { data: existing } = await supabase
      .from("projects")
      .select("slug")
      .eq("id", id)
      .maybeSingle();
    const oldSlug = (existing as { slug?: string } | null)?.slug || null;

    const { error } = await supabase
      .from("projects")
      .update({
        title: title.trim(),
        slug: slug.trim(),
        category: category.trim(),
        short_description: short_description?.trim() || null,
        description: description?.trim() || null,
        overview: overview?.trim() || null,
        features,
        images,
        mockup_type: mockup_type || "browser",
        visual_theme: visual_theme || "analytical",
        year: year ? Number(year) : null,
        services: services ? services.split(",").map(s => s.trim()).filter(Boolean) : [],
        technologies: technologies ? technologies.split(",").map(t => t.trim()).filter(Boolean) : [],
        hero_image,
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
      return NextResponse.json({ success: false, error: toSafeMutationError(error, "Failed to update project. Please try again.") }, { status: 500 });
    }

    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${id}`);
    revalidatePublic([oldSlug, slug.trim()]);
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
      overview: overview?.trim() || null,
      features,
      mockup_type: mockup_type || "browser",
      visual_theme: visual_theme || "analytical",
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
    return NextResponse.json({ success: false, error: toSafeMutationError(error, "Failed to create project. Please try again.") }, { status: 500 });
  }

  revalidatePath("/admin/projects");
  revalidatePublic([slug.trim()]);
  return NextResponse.json({ success: true, id: project.id });
}