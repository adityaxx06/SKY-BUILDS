"use server";

import { createServerSupabaseAdminClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/admin";

// ============================================================
// TYPES
// ============================================================

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  short_description: string | null;
  description: string | null;
  year: number | null;
  services: string[] | null;
  technologies: string[] | null;
  hero_image: string | null;
  challenge: string | null;
  solution: string | null;
  result_summary: string | null;
  featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  icon: string | null;
  display_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_role: string | null;
  company: string | null;
  content: string;
  avatar_url: string | null;
  featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface CrudResult {
  success: boolean;
  error?: string;
  id?: string;
}

// ============================================================
// INPUT SANITIZERS (server-side hardening)
// ============================================================

/**
 * Strip characters that break PostgREST `or=` filter syntax (`,`, `(`, `)`)
 * or act as LIKE wildcards (`%`, `_`), and cap length. Admin search only.
 */
function sanitizeSearchTerm(term: string): string {
  return term
    .replace(/[,()%_\\'"]/g, "")
    .trim()
    .slice(0, 100);
}

const VALID_MESSAGE_SORT_COLUMNS = [
  "created_at",
  "name",
  "email",
  "project_type",
  "status",
] as const;

// ============================================================
// PROJECTS CRUD
// ============================================================

export async function getProjectsAdmin({
  page = 1,
  limit = 10,
  search,
  featured,
}: {
  page?: number;
  limit?: number;
  search?: string;
  featured?: boolean;
} = {}): Promise<{
  projects: Project[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}> {
  await requireAdmin();
  const supabase = await createServerSupabaseAdminClient();

  let query = supabase.from("projects").select("*", { count: "exact" });

  if (search && search.trim()) {
    const term = sanitizeSearchTerm(search);
    if (term) {
      query = query.or(`title.ilike.%${term}%,slug.ilike.%${term}%,category.ilike.%${term}%`);
    }
  }

  if (featured !== undefined) {
    query = query.eq("featured", featured);
  }

  query = query.order("display_order", { ascending: true }).order("created_at", { ascending: false });

  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error("Get projects error:", error);
    throw new Error("Failed to fetch projects");
  }

  return {
    projects: (data || []) as Project[],
    totalCount: count || 0,
    totalPages: Math.ceil((count || 0) / limit),
    currentPage: page,
  };
}

export async function getProjectAdmin(id: string): Promise<Project | null> {
  await requireAdmin();
  const supabase = await createServerSupabaseAdminClient();

  const { data, error } = await supabase.from("projects").select("*").eq("id", id).single();

  if (error) {
    if (error.code === "PGRST116") return null;
    console.error("Get project error:", error);
    throw new Error("Failed to fetch project");
  }

  return data as Project;
}

// ============================================================
// SERVICES CRUD
// ============================================================

export async function getServicesAdmin({
  page = 1,
  limit = 10,
  search,
  active,
}: {
  page?: number;
  limit?: number;
  search?: string;
  active?: boolean;
} = {}): Promise<{
  services: Service[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}> {
  await requireAdmin();
  const supabase = await createServerSupabaseAdminClient();

  let query = supabase.from("services").select("*", { count: "exact" });

  if (search && search.trim()) {
    const term = sanitizeSearchTerm(search);
    if (term) {
      query = query.or(`title.ilike.%${term}%,slug.ilike.%${term}%`);
    }
  }

  if (active !== undefined) {
    query = query.eq("active", active);
  }

  query = query.order("display_order", { ascending: true }).order("created_at", { ascending: false });

  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error("Get services error:", error);
    throw new Error("Failed to fetch services");
  }

  return {
    services: (data || []) as Service[],
    totalCount: count || 0,
    totalPages: Math.ceil((count || 0) / limit),
    currentPage: page,
  };
}

export async function getServiceAdmin(id: string): Promise<Service | null> {
  await requireAdmin();
  const supabase = await createServerSupabaseAdminClient();

  const { data, error } = await supabase.from("services").select("*").eq("id", id).single();

  if (error) {
    if (error.code === "PGRST116") return null;
    console.error("Get service error:", error);
    throw new Error("Failed to fetch service");
  }

  return data as Service;
}

// ============================================================
// TESTIMONIALS CRUD
// ============================================================

export async function getTestimonialsAdmin({
  page = 1,
  limit = 10,
  search,
  featured,
}: {
  page?: number;
  limit?: number;
  search?: string;
  featured?: boolean;
} = {}): Promise<{
  testimonials: Testimonial[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}> {
  await requireAdmin();
  const supabase = await createServerSupabaseAdminClient();

  let query = supabase.from("testimonials").select("*", { count: "exact" });

  if (search && search.trim()) {
    const term = sanitizeSearchTerm(search);
    if (term) {
      query = query.or(`client_name.ilike.%${term}%,company.ilike.%${term}%,content.ilike.%${term}%`);
    }
  }

  if (featured !== undefined) {
    query = query.eq("featured", featured);
  }

  query = query.order("display_order", { ascending: true }).order("created_at", { ascending: false });

  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error("Get testimonials error:", error);
    throw new Error("Failed to fetch testimonials");
  }

  return {
    testimonials: (data || []) as Testimonial[],
    totalCount: count || 0,
    totalPages: Math.ceil((count || 0) / limit),
    currentPage: page,
  };
}

export async function getTestimonialAdmin(id: string): Promise<Testimonial | null> {
  await requireAdmin();
  const supabase = await createServerSupabaseAdminClient();

  const { data, error } = await supabase.from("testimonials").select("*").eq("id", id).single();

  if (error) {
    if (error.code === "PGRST116") return null;
    console.error("Get testimonial error:", error);
    throw new Error("Failed to fetch testimonial");
  }

  return data as Testimonial;
}

// ============================================================
// DASHBOARD DATA
// ============================================================

export async function getDashboardData() {
  await requireAdmin();
  const supabase = await createServerSupabaseAdminClient();

  const [newMessagesResult, totalMessagesResult, projectsResult, servicesResult, testimonialsResult] =
    await Promise.all([
      supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("status", "new"),
      supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
      supabase.from("projects").select("id", { count: "exact", head: true }),
      supabase.from("services").select("id", { count: "exact", head: true }),
      supabase.from("testimonials").select("id", { count: "exact", head: true }),
    ]);

  const newMessages = newMessagesResult.count ?? 0;
  const totalMessages = totalMessagesResult.count ?? 0;
  const projectsCount = projectsResult.count ?? 0;
  const servicesCount = servicesResult.count ?? 0;
  const testimonialsCount = testimonialsResult.count ?? 0;

  // Get recent messages
  const recentResult = await supabase
    .from("contact_submissions")
    .select("id, name, email, project_type, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

type RecentMessageRow = {
  id: string;
  name: string;
  email: string;
  project_type: string;
  status: "new" | "read" | "in_progress" | "closed";
  created_at: string;
};

const recentMessages: RecentMessageRow[] = (recentResult.data || []).map((m: RecentMessageRow) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    project_type: m.project_type,
    status: m.status,
    created_at: m.created_at,
  }));

  return {
    newMessages,
    totalMessages,
    projectsCount,
    servicesCount,
    testimonialsCount,
    recentMessages,
  };
}

export async function getMessages(params?: { page?: number; limit?: number; search?: string; status?: string; sortBy?: string; sortOrder?: string }) {
  await requireAdmin();
  const supabase = await createServerSupabaseAdminClient();
  let query = supabase.from('contact_submissions').select('*', { count: 'exact' });
  if (params?.search) {
    const term = sanitizeSearchTerm(params.search);
    if (term) query = query.ilike('name', `%${term}%`);
  }
  if (params?.status && params.status !== 'all') query = query.eq('status', params.status);
  const sortBy = VALID_MESSAGE_SORT_COLUMNS.includes(params?.sortBy as (typeof VALID_MESSAGE_SORT_COLUMNS)[number])
    ? (params?.sortBy as (typeof VALID_MESSAGE_SORT_COLUMNS)[number])
    : 'created_at';
  const sortOrder = params?.sortOrder === 'asc' ? 'asc' : 'desc';
  query = query.order(sortBy, { ascending: sortOrder === 'asc' });
  const page = params?.page && params.page > 0 ? Math.floor(params.page) : 1;
  const limit = params?.limit && params.limit > 0 ? Math.min(Math.floor(params.limit), 100) : 10;
  query = query.range((page - 1) * limit, page * limit - 1);
  const { data, error, count } = await query;
  if (error) { console.error('Get messages error:', error); return { messages: [], totalPages: 0, currentPage: 1 }; }
  const totalPages = count ? Math.ceil(count / limit) : 1;
  return {
    messages: (data || []).map(m => ({ ...m, project_type: m.project_type || '', created_at: m.created_at || new Date().toISOString() })),
    totalPages,
    currentPage: page,
  };
}

export async function getMessageDetail(id: string) {
  await requireAdmin();
  const supabase = await createServerSupabaseAdminClient();
  const { data, error } = await supabase.from('contact_submissions').select('*').eq('id', id).single();
  if (error) { console.error('Get message detail error:', error); return null; }
  return data ? { ...data, project_type: data.project_type || '', created_at: data.created_at || new Date().toISOString() } : null;
}
