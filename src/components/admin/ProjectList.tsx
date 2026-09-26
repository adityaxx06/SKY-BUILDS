"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdminStatusBadge } from "./AdminStatusBadge";
import { AdminInput } from "./AdminInput";
import { AdminSelect } from "./AdminSelect";
import { AdminPagination } from "./AdminPagination";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  featured: boolean;
  display_order: number;
  created_at: string;
}

interface ProjectListProps {
  initialProjects: Project[];
  initialTotalPages: number;
  initialPage: number;
  initialSearch: string;
  initialFeatured: boolean;
}

export function ProjectList({
  initialProjects,
  initialTotalPages,
  initialPage,
  initialSearch,
  initialFeatured,
}: ProjectListProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [featured, setFeatured] = useState(initialFeatured);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async (newPage: number) => {
    setIsLoading(true);
    setError(null);

    const params = new URLSearchParams({
      page: newPage.toString(),
      limit: "10",
      search: search || "",
      featured: featured ? "true" : "false",
    });

    try {
      const response = await fetch(`/admin/projects/api?${params.toString()}`, {
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      setProjects(data.projects);
      setTotalPages(data.totalPages);
      setPage(data.currentPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProjects(1);
  };

  const handleFeaturedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "true";
    setFeatured(value);
    setPage(1);
    fetchProjects(1);
  };

  if (projects.length === 0 && !isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[18px] border p-10 text-center"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <svg className="mx-auto h-12 w-12 mb-4" style={{ color: "var(--text-muted)", opacity: 0.5 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2h14a2 2 0 012 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 11a2 2 0 012-2h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6z" />
        </svg>
        <h3 className="font-display text-lg font-semibold mb-2" style={{ color: "var(--text)" }}>
          {search || featured ? "No projects match your filters" : "No projects yet"}
        </h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          {search || featured
            ? "Try adjusting your search or filters"
            : "Create your first project to get started."}
        </p>
        {(search || featured) && (
          <button
            onClick={() => {
              setSearch("");
              setFeatured(false);
              fetchProjects(1);
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-colors"
            style={{ background: "var(--primary)", color: "var(--on-primary)" }}
          >
            Clear filters
          </button>
        )}
        {!search && !featured && (
          <a
            href="/admin/projects/new"
            className="mt-4 inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-colors"
            style={{ background: "var(--primary)", color: "var(--on-primary)" }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Project
          </a>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[18px] border overflow-hidden"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      {/* Header with search and filters */}
      <div className="border-b p-4 md:p-6" style={{ borderColor: "var(--border)" }}>
        <div className="flex flex-col sm:flex-row gap-4 md:items-center md:justify-between">
          <h2 className="font-display text-lg font-semibold" style={{ color: "var(--text)" }}>
            All Projects
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <form onSubmit={handleSearch} className="flex-1">
              <AdminInput
                name="search"
                placeholder="Search title, slug, category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
              />
            </form>

            <AdminSelect
              name="featured"
              value={featured ? "true" : "false"}
              onChange={(e) => {
                setFeatured(e.target.value === "true");
                fetchProjects(1);
              }}
              className="w-full sm:w-40"
            >
              <option value="false">All Projects</option>
              <option value="true">Featured Only</option>
            </AdminSelect>
          </div>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="border-b px-4 py-3" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "rgba(255,93,162,0.1)", border: "1px solid var(--secondary)", color: "var(--secondary)" }}>
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm">{error}</p>
            <button
              onClick={() => fetchProjects(page)}
              className="ml-auto text-sm underline decoration-transparent underline-offset-2 hover:decoration-current"
              style={{ color: "var(--secondary)" }}
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="p-8">
          <div className="flex items-center justify-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 rounded-full border-3 border-transparent border-t-[var(--primary)]"
            />
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>Loading projects...</span>
          </div>
        </div>
      )}

      {/* Project list */}
      {!isLoading && projects.length > 0 && (
        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/admin/projects/${project.id}`}
              className="flex items-center gap-4 px-4 md:px-6 py-4 transition-colors hover:bg-[var(--surface-elevated)]"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <p className="font-medium truncate" style={{ color: "var(--text)" }}>
                    {project.title}
                  </p>
                  <AdminStatusBadge status={project.featured ? "new" : "read"} size="sm" />
                </div>
                <p className="text-sm truncate" style={{ color: "var(--text-muted)" }}>
                  {project.category} · Order: {project.display_order}
                </p>
              </div>
              <time className="text-[11px]" style={{ color: "var(--text-muted)" }} dateTime={project.created_at}>
                {new Date(project.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </time>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t px-4 md:px-6 py-4" style={{ borderColor: "var(--border)" }}>
          <AdminPagination
            currentPage={page}
            totalPages={totalPages}
            baseUrl="/admin/projects"
            searchParams={{
              search: search || "",
              featured: featured ? "true" : "false",
            }}
          />
        </div>
      )}
    </motion.div>
  );
}