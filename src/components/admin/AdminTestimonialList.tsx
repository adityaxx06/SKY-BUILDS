"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdminStatusBadge } from "./AdminStatusBadge";
import { AdminSelect } from "./AdminSelect";
import { AdminInput } from "./AdminInput";
import { AdminPagination } from "./AdminPagination";
import Link from "next/link";

interface Testimonial {
  id: string;
  client_name: string;
  client_role: string | null;
  company: string | null;
  content: string;
  avatar_url: string | null;
  featured: boolean;
  display_order: number;
  created_at: string;
}

interface AdminTestimonialListProps {
  initialTestimonials: Testimonial[];
  initialTotalPages: number;
  initialPage: number;
  initialSearch: string;
  initialFeatured: boolean;
}

export function AdminTestimonialList({
  initialTestimonials,
  initialTotalPages,
  initialPage,
  initialSearch,
  initialFeatured,
}: AdminTestimonialListProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [featured, setFeatured] = useState(initialFeatured);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = async (newPage: number) => {
    setIsLoading(true);
    setError(null);
    const params = new URLSearchParams({
      page: newPage.toString(),
      limit: "10",
      search: search || "",
      featured: featured ? "true" : "false",
    });
    try {
      const response = await fetch(`/admin/testimonials/api?${params.toString()}`, { headers: { "Content-Type": "application/json" } });
      if (!response.ok) throw new Error("Failed to fetch testimonials");
      const data = await response.json();
      setTestimonials(data.testimonials);
      setTotalPages(data.totalPages);
      setPage(data.currentPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load testimonials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchTestimonials(1);
  };

  const handleFeaturedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "true";
    setFeatured(value);
    setPage(1);
    fetchTestimonials(1);
  };

  if (testimonials.length === 0 && !isLoading) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[18px] border p-10 text-center" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <svg className="mx-auto h-12 w-12 mb-4" style={{ color: "var(--text-muted)", opacity: 0.5 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <h3 className="font-display text-lg font-semibold mb-2" style={{ color: "var(--text)" }}>
          {search || featured ? "No testimonials match your filters" : "No testimonials yet"}
        </h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          {search || featured ? "Try adjusting your search or filters" : "Create your first testimonial to get started."}
        </p>
        {!search && !featured && (
          <Link href="/admin/testimonials/new" className="mt-4 inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-colors" style={{ background: "var(--primary)", color: "var(--on-primary)" }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Create Testimonial
          </Link>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[18px] border overflow-hidden" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <div className="border-b p-4 md:p-6" style={{ borderColor: "var(--border)" }}>
        <div className="flex flex-col sm:flex-row gap-4 md:items-center md:justify-between">
          <h2 className="font-display text-lg font-semibold" style={{ color: "var(--text)" }}>All Testimonials</h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <form onSubmit={handleSearch} className="flex-1">
              <AdminInput name="search" placeholder="Search client, company..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </form>
            <AdminSelect name="featured" value={featured ? "true" : "false"} onChange={handleFeaturedChange} className="w-full sm:w-40">
              <option value="false">All Testimonials</option>
              <option value="true">Featured Only</option>
            </AdminSelect>
          </div>
        </div>
      </div>
      {error && (
        <div className="border-b px-4 py-3" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "rgba(255,93,162,0.1)", border: "1px solid var(--secondary)", color: "var(--secondary)" }}>
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <p className="text-sm">{error}</p>
            <button onClick={() => fetchTestimonials(page)} className="ml-auto text-sm underline decoration-transparent underline-offset-2 hover:decoration-current" style={{ color: "var(--secondary)" }}>Retry</button>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="p-8"><div className="flex items-center justify-center gap-3"><div className="w-8 h-8 rounded-full border-3 border-transparent border-t-[var(--primary)] animate-spin" /> <span className="text-sm" style={{ color: "var(--text-muted)" }}>Loading testimonials...</span></div></div>
      )}
      {!isLoading && testimonials.length > 0 && (
        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {testimonials.map((testimonial) => (
            <Link key={testimonial.id} href={`/admin/testimonials/${testimonial.id}`} className="flex items-center gap-4 px-4 md:px-6 py-4 transition-colors hover:bg-[var(--surface-elevated)]">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <p className="font-medium truncate" style={{ color: "var(--text)" }}>{testimonial.client_name}</p>
                  {testimonial.featured && (
                    <AdminStatusBadge status="featured" size="sm" />
                  )}
                </div>
                <p className="text-sm truncate" style={{ color: "var(--text-muted)" }}>
                  {testimonial.company}{testimonial.client_role ? ` · ${testimonial.client_role}` : ""}
                </p>
              </div>
              <time className="text-[11px]" style={{ color: "var(--text-muted)" }} dateTime={testimonial.created_at}>
                {new Date(testimonial.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </time>
            </Link>
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <div className="border-t px-4 md:px-6 py-4" style={{ borderColor: "var(--border)" }}>
          <AdminPagination currentPage={page} totalPages={totalPages} baseUrl="/admin/testimonials" searchParams={{ search: search || "", featured: featured ? "true" : "false" }} />
        </div>
      )}
    </motion.div>
  );
}
