"use server";

import { createServerSupabaseAdminClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

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

export interface ProjectFormData {
  title: string;
  slug: string;
  category: string;
  short_description: string;
  description: string;
  year: number;
  services: string[];
  technologies: string[];
  hero_image: string;
  challenge: string;
  solution: string;
  result_summary: string;
  featured: boolean;
  display_order: number;
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

export interface ServiceFormData {
  title: string;
  slug: string;
  short_description: string;
  description: string;
  icon: string;
  display_order: number;
  active: boolean;
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

export interface TestimonialFormData {
  client_name: string;
  client_role: string;
  company: string;
  content: string;
  avatar_url: string;
  featured: boolean;
  display_order: number;
}

export interface CrudResult {
  success: boolean;
  error?: string;
  id?: string;
}

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
  const supabase = await createServerSupabaseAdminClient();

  let query = supabase.from("projects").select("*", { count: "exact" });

  if (search && search.trim()) {
    const term = search.trim();
    query = query.or(`title.ilike.%${term}%,slug.ilike.%${term}%,category.ilike.%${term}%`);
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
  const supabase = await createServerSupabaseAdminClient();

  const { data, error } = await supabase.from("projects").select("*").eq("id", id).single();

  if (error) {
    if (error.code === "PGRST116") return null;
    console.error("Get project error:", error);
    throw new Error("Failed to fetch project");
  }

  return data as Project;
}

export async function createProject(data: ProjectFormData): Promise<CrudResult> {
  const supabase = await createServerSupabaseAdminClient();

  const { data: project, error } = await supabase
    .from("projects")
    .insert({
      title: data.title,
      slug: data.slug,
      category: data.category,
      short_description: data.short_description || null,
      description: data.description || null,
      year: data.year || null,
      services: data.services || [],
      technologies: data.technologies || [],
      hero_image: data.hero_image || null,
      challenge: data.challenge || null,
      solution: data.solution || null,
      result_summary: data.result_summary || null,
      featured: data.featured,
      display_order: data.display_order,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Create project error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/projects");
  return { success: true, id: project.id };
}

export async function updateProject(id: string, data: Partial<ProjectFormData>): Promise<CrudResult> {
  const supabase = await createServerSupabaseAdminClient();

  const { error } = await supabase
    .from("projects")
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Update project error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${id}`);
  return { success: true };
}

export async function deleteProject(id: string): Promise<CrudResult> {
  const supabase = await createServerSupabaseAdminClient();

  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error("Delete project error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/projects");
  return { success: true };
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
  const supabase = await createServerSupabaseAdminClient();

  let query = supabase.from("services").select("*", { count: "exact" });

  if (search && search.trim()) {
    const term = search.trim();
    query = query.or(`title.ilike.%${term}%,slug.ilike.%${term}%`);
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
  const supabase = await createServerSupabaseAdminClient();

  const { data, error } = await supabase.from("services").select("*").eq("id", id).single();

  if (error) {
    if (error.code === "PGRST116") return null;
    console.error("Get service error:", error);
    throw new Error("Failed to fetch service");
  }

  return data as Service;
}

export async function createService(data: ServiceFormData): Promise<CrudResult> {
  const supabase = await createServerSupabaseAdminClient();

  const { data: service, error } = await supabase
    .from("services")
    .insert({
      title: data.title,
      slug: data.slug,
      short_description: data.short_description || null,
      description: data.description || null,
      icon: data.icon || null,
      display_order: data.display_order,
      active: data.active,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Create service error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/services");
  return { success: true, id: service.id };
}

export async function updateService(id: string, data: Partial<ServiceFormData>): Promise<CrudResult> {
  const supabase = await createServerSupabaseAdminClient();

  const { error } = await supabase
    .from("services")
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Update service error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/services");
  revalidatePath(`/admin/services/${id}`);
  return { success: true };
}

export async function deleteService(id: string): Promise<CrudResult> {
  const supabase = await createServerSupabaseAdminClient();

  const { error } = await supabase.from("services").delete().eq("id", id);

  if (error) {
    console.error("Delete service error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/services");
  return { success: true };
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
  const supabase = await createServerSupabaseAdminClient();

  let query = supabase.from("testimonials").select("*", { count: "exact" });

  if (search && search.trim()) {
    const term = search.trim();
    query = query.or(`client_name.ilike.%${term}%,company.ilike.%${term}%,content.ilike.%${term}%`);
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
  const supabase = await createServerSupabaseAdminClient();

  const { data, error } = await supabase.from("testimonials").select("*").eq("id", id).single();

  if (error) {
    if (error.code === "PGRST116") return null;
    console.error("Get testimonial error:", error);
    throw new Error("Failed to fetch testimonial");
  }

  return data as Testimonial;
}

export async function createTestimonial(data: TestimonialFormData): Promise<CrudResult> {
  const supabase = await createServerSupabaseAdminClient();

  const { data: testimonial, error } = await supabase
    .from("testimonials")
    .insert({
      client_name: data.client_name,
      client_role: data.client_role || null,
      company: data.company || null,
      content: data.content,
      avatar_url: data.avatar_url || null,
      featured: data.featured,
      display_order: data.display_order,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Create testimonial error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/testimonials");
  return { success: true, id: testimonial.id };
}

export async function updateTestimonial(id: string, data: Partial<TestimonialFormData>): Promise<CrudResult> {
  const supabase = await createServerSupabaseAdminClient();

  const { error } = await supabase
    .from("testimonials")
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Update testimonial error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/testimonials");
  revalidatePath(`/admin/testimonials/${id}`);
  return { success: true };
}

export async function deleteTestimonial(id: string): Promise<CrudResult> {
  const supabase = await createServerSupabaseAdminClient();

  const { error } = await supabase.from("testimonials").delete().eq("id", id);

  if (error) {
    console.error("Delete testimonial error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/testimonials");
  return { success: true };
}

// ============================================================
// DASHBOARD DATA
// ============================================================

export async function getDashboardData() {
  const supabase = await createServerSupabaseAdminClient();

  const [messagesResult, projectsResult, servicesResult] = await Promise.all([
    supabase.from("contact_submissions").select("*", { count: "exact" }).eq("status", "new"),
    supabase.from("projects").select("*", { count: "exact" }),
    supabase.from("services").select("*", { count: "exact" }),
  ]);

  const totalMessages = messagesResult.data?.length || 0;
  const newMessages = messagesResult.data?.filter((m: any) => m.status === "new").length || 0;
  const projectsCount = projectsResult.data?.length || 0;
  const servicesCount = servicesResult.data?.length || 0;

  // Get recent messages
  const recentResult = await supabase
    .from("contact_submissions")
    .select("id, name, email, project_type, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

const recentMessages = (recentResult.data || []).map((m: any) => ({
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
    recentMessages,
  };
}

export async function getMessages(params?: { page?: number; limit?: number; search?: string; status?: string; sortBy?: string; sortOrder?: string }) {
  const supabase = await createServerSupabaseAdminClient();
  let query = supabase.from('contact_submissions').select('*', { count: 'exact' });
  if (params?.search) query = query.ilike('name', `%${params.search}%`);
  if (params?.status && params.status !== 'all') query = query.eq('status', params.status);
  if (params?.sortBy) query = query.order(params.sortBy, { ascending: params?.sortOrder === 'asc' });
  else query = query.order('created_at', { ascending: false });
  const page = params?.page || 1;
  const limit = params?.limit || 10;
  if (params?.limit) query = query.range((page - 1) * limit, page * limit - 1);
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
  const supabase = await createServerSupabaseAdminClient();
  const { data, error } = await supabase.from('contact_submissions').select('*').eq('id', id).single();
  if (error) { console.error('Get message detail error:', error); return null; }
  return data ? { ...data, project_type: data.project_type || '', created_at: data.created_at || new Date().toISOString() } : null;
}
