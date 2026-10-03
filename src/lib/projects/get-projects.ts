import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  projects as staticProjects,
  type MockupType,
  type Project,
  type ProjectGalleryItem,
  type ProjectImage,
} from "@/features/projects/project-data";

/**
 * Single server-side data access layer for PUBLIC projects (Option A).
 *
 * Source priority:
 *   1. Supabase `projects` (featured rows only — the public visibility
 *      rule, mirroring the anon RLS policy).
 *   2. Static `project-data.ts` ONLY when the database read fails
 *      (build/offline safety). The static file is never the primary
 *      source once the migration/backfill is complete.
 *
 * Reads use the anon server client (RLS-enforced). The service-role key
 * is never touched here.
 */

const MOCKUP_TYPES = ["browser", "devices", "dashboard"] as const;
const VISUAL_THEMES = ["analytical", "editorial", "energetic"] as const;
const GALLERY_TYPES = [
  "browser",
  "devices",
  "dashboard",
  "panel",
  "typography",
] as const;

type DbRow = Record<string, unknown>;

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function asGallery(value: unknown): ProjectGalleryItem[] {
  if (!Array.isArray(value)) return [];
  const items: ProjectGalleryItem[] = [];
  for (const entry of value) {
    if (typeof entry !== "object" || entry === null) continue;
    const record = entry as Record<string, unknown>;
    if (
      typeof record.type !== "string" ||
      !(GALLERY_TYPES as readonly string[]).includes(record.type)
    ) {
      continue;
    }
    items.push({
      type: record.type as ProjectGalleryItem["type"],
      ...(typeof record.title === "string" && record.title.trim()
        ? { title: record.title.trim() }
        : {}),
      ...(typeof record.description === "string" && record.description.trim()
        ? { description: record.description.trim() }
        : {}),
    });
  }
  return items;
}

function asImages(value: unknown): ProjectImage[] {
  if (!Array.isArray(value)) return [];
  const images: ProjectImage[] = [];
  for (const entry of value) {
    if (typeof entry !== "object" || entry === null) continue;
    const record = entry as Record<string, unknown>;
    if (typeof record.url !== "string" || !record.url.trim()) continue;
    if (!isAllowedImageUrl(record.url.trim())) continue;
    images.push({
      url: record.url.trim(),
      alt: typeof record.alt === "string" ? record.alt.trim().slice(0, 200) : "",
    });
  }
  return images.slice(0, 20);
}

/**
 * Only Supabase Storage URLs are accepted as imagery. Manually typed
 * external URLs (pages, hotlinks, unconfigured hosts) would break
 * next/image remote optimization and can 500 the whole page — they are
 * ignored instead. Use the admin upload manager for cover/gallery art.
 */
function isAllowedImageUrl(url: string): boolean {
  if (!/^https:\/\/.{1,2000}$/.test(url)) return false;
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host.endsWith(".supabase.co") || host === "supabase.co";
  } catch {
    return false;
  }
}

/**
 * Default gallery composition for rows without stored gallery data.
 * Only mockup types with generic components are used, so every item
 * always renders (see the detail page's generic fallback set).
 */
function defaultGallery(mockup: MockupType): ProjectGalleryItem[] {
  if (mockup === "devices") {
    return [
      { type: "devices", title: "Overview" },
      { type: "dashboard", title: "Dashboard view" },
    ];
  }
  if (mockup === "dashboard") {
    return [
      { type: "dashboard", title: "Overview" },
      { type: "browser", title: "Marketing view" },
    ];
  }
  return [
    { type: "browser", title: "Overview" },
    { type: "dashboard", title: "Dashboard view" },
  ];
}

function mapRow(row: DbRow): Project | null {
  const slug = asText(row.slug);
  const title = asText(row.title);
  if (!slug || !title) return null;

  const mockup: MockupType = (MOCKUP_TYPES as readonly string[]).includes(
    asText(row.mockup_type)
  )
    ? (asText(row.mockup_type) as MockupType)
    : "browser";

  const visualTheme = (VISUAL_THEMES as readonly string[]).includes(
    asText(row.visual_theme)
  )
    ? (asText(row.visual_theme) as Project["visualTheme"])
    : "analytical";

  const description =
    asText(row.short_description) || asText(row.description) || "";
  const storedGallery = asGallery(row.gallery);
  const gallery = storedGallery.length > 0 ? storedGallery : defaultGallery(mockup);
  const images = asImages(row.images);
  const heroCandidate = asText(row.hero_image);
  const heroImage = heroCandidate && isAllowedImageUrl(heroCandidate) ? heroCandidate : "";

  return {
    id: asText(row.id) || slug,
    title,
    slug,
    category: asText(row.category) || "Concept",
    description,
    year:
      typeof row.year === "number" && Number.isFinite(row.year)
        ? row.year
        : new Date().getFullYear(),
    featured: row.featured === true,
    displayOrder:
      typeof row.display_order === "number" && Number.isFinite(row.display_order)
        ? row.display_order
        : 0,
    mockupType: mockup,
    overview:
      asText(row.overview) || asText(row.description) || description || "",
    challenge: asText(row.challenge) || "",
    solution: asText(row.solution) || "",
    features: asStringArray(row.features),
    gallery,
    gallerySource: storedGallery.length > 0 ? "stored" : "default",
    visualTheme,
    services: asStringArray(row.services),
    images,
    coverImage: heroImage || images[0]?.url || null,
  };
}

function sortProjects(list: Project[]): Project[] {
  return [...list].sort(
    (a, b) => a.displayOrder - b.displayOrder || a.title.localeCompare(b.title)
  );
}

export type ProjectSource = "database" | "fallback";

export interface PublishedProjects {
  projects: Project[];
  source: ProjectSource;
}

async function fetchFeaturedRows() {
  const supabase = await createServerSupabaseClient();
  return supabase
    .from("projects")
    .select("*")
    .eq("featured", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });
}

/** Published (featured) projects in display order. */
export async function getPublishedProjects(): Promise<PublishedProjects> {
  try {
    const { data, error } = await fetchFeaturedRows();
    if (error) throw error;
    const mapped = (data || [])
      .map((row) => mapRow(row as DbRow))
      .filter((project): project is Project => project !== null);
    return { projects: mapped, source: "database" };
  } catch (error) {
    console.error("Public projects read failed, using static fallback:", error);
    return { projects: sortProjects(staticProjects), source: "fallback" };
  }
}

/** Single published project by slug, or null. */
export async function getPublishedProjectBySlug(
  slug: string
): Promise<{ project: Project | null; source: ProjectSource }> {
  const clean = slug.trim();
  if (!clean) return { project: null, source: "database" };
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", clean)
      .eq("featured", true)
      .maybeSingle();
    if (error) throw error;
    if (!data) return { project: null, source: "database" };
    return { project: mapRow(data as DbRow), source: "database" };
  } catch (error) {
    console.error(
      "Public project read failed, using static fallback:",
      error
    );
    return {
      project: staticProjects.find((p) => p.slug === clean) || null,
      source: "fallback",
    };
  }
}
