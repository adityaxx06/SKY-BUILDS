"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdminStatusBadge } from "./AdminStatusBadge";
import { AdminConfirmDialog } from "./AdminConfirmDialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteProjectAction } from "@/app/admin/(dashboard)/projects/actions";

interface Project {
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
  images?: { url: string; alt?: string }[] | null;
}

interface AdminProjectDetailProps {
  project: Project;
}

export function AdminProjectDetail({ project }: AdminProjectDetailProps) {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setDeleteError(null);
    const fd = new FormData();
    fd.set("id", project.id);
    try {
      const result = await deleteProjectAction(fd);
      if (result.success) {
        setConfirmOpen(false);
        router.push("/admin/projects");
        router.refresh();
      } else {
        setDeleteError(result.error || "Failed to delete this work item.");
        setIsDeleting(false);
      }
    } catch {
        setDeleteError("Failed to delete this work item. Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 text-sm font-medium mb-4 transition-colors hover:underline"
            style={{ color: "var(--primary)" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Selected Work
          </Link>
          <h1 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold" style={{ color: "var(--text)" }}>
            {project.title}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {project.featured && <AdminStatusBadge status="featured" showIcon />}
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[18px] border p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Slug</p>
            <p className="mt-1 font-medium break-all" style={{ color: "var(--text)" }}>{project.slug}</p>
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Category</p>
            <p className="mt-1 font-medium" style={{ color: "var(--text)" }}>{project.category}</p>
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Display Order</p>
            <p className="mt-1 font-medium" style={{ color: "var(--text)" }}>{project.display_order}</p>
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Created</p>
            <p className="mt-1 font-medium" style={{ color: "var(--text)" }}>{formatDate(project.created_at)}</p>
          </div>
        </div>

        {(project.year || project.services?.length || project.technologies?.length || project.hero_image) && (
          <div className="rounded-[18px] border p-6 grid grid-cols-1 md:grid-cols-2 gap-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
            {project.year && (
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Year</p>
                <p className="mt-1 font-medium" style={{ color: "var(--text)" }}>{project.year}</p>
              </div>
            )}
            {project.hero_image && (
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Hero Image</p>
                <a className="mt-1 inline-block text-sm font-medium underline decoration-transparent underline-offset-2 transition-colors hover:decoration-current break-all" href={project.hero_image} target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>
                  {project.hero_image}
                </a>
              </div>
            )}
            {project.services?.length && (
              <div className="md:col-span-2">
                <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Services</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.services.map((s, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-sm" style={{ background: "rgba(var(--shadow-tint), 0.1)", color: "var(--primary)" }}>{s}</span>
                  ))}
                </div>
              </div>
            )}
            {project.technologies?.length && (
              <div className="md:col-span-2">
                <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Technologies</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.technologies.map((t, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-sm" style={{ background: "rgba(var(--accent), 0.1)", color: "var(--accent)" }}>{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {(project.short_description || project.description || project.challenge || project.solution || project.result_summary) && (
          <div className="space-y-6">
            {project.short_description && (
              <div className="rounded-[18px] border p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <h2 className="font-display text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>Short Description</h2>
                <p style={{ color: "var(--text-muted)" }}>{project.short_description}</p>
              </div>
            )}
            {project.description && (
              <div className="rounded-[18px] border p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <h2 className="font-display text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>Description</h2>
                <div style={{ color: "var(--text-muted)" }}><p className="whitespace-pre-wrap">{project.description}</p></div>
              </div>
            )}
            {project.challenge && (
              <div className="rounded-[18px] border p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <h2 className="font-display text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>Challenge</h2>
                <div style={{ color: "var(--text-muted)" }}><p className="whitespace-pre-wrap">{project.challenge}</p></div>
              </div>
            )}
            {project.solution && (
              <div className="rounded-[18px] border p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <h2 className="font-display text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>Solution</h2>
                <div style={{ color: "var(--text-muted)" }}><p className="whitespace-pre-wrap">{project.solution}</p></div>
              </div>
            )}
            {project.result_summary && (
              <div className="rounded-[18px] border p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <h2 className="font-display text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>Result Summary</h2>
                <div style={{ color: "var(--text-muted)" }}><p className="whitespace-pre-wrap">{project.result_summary}</p></div>
              </div>
            )}
            {project.images && project.images.length > 0 && (
              <div className="rounded-[18px] border p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <h2 className="font-display text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>
                  Images ({project.images.length})
                </h2>
                <ul className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {project.images.map((img, i) => (
                    <li key={`${img.url}-${i}`} className="relative aspect-square overflow-hidden rounded-xl border" style={{ borderColor: "var(--border)" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.url}
                        alt={img.alt || `${project.title} image ${i + 1}`}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                      {i === 0 && (
                        <span
                          className="absolute left-1.5 top-1.5 rounded-full px-2 py-0.5 text-[0.625rem] font-semibold"
                          style={{ background: "var(--primary)", color: "var(--on-primary)" }}
                        >
                          Cover
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
        <Link
          href={`/admin/projects/${project.id}/edit`}
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-colors"
          style={{ background: "var(--primary)", color: "var(--on-primary)" }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </Link>
        <button
          type="button"
          onClick={() => {
            setDeleteError(null);
            setConfirmOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-colors"
          style={{ background: "transparent", color: "var(--secondary)", border: "1px solid var(--secondary)" }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>
      <AdminConfirmDialog
        open={confirmOpen}
          title="Delete this work item?"
          description={`"${project.title}" will be permanently removed from the portfolio.`}
          confirmLabel="Delete work"
        isConfirming={isDeleting}
        error={deleteError}
        onConfirm={handleDelete}
        onCancel={() => {
          if (!isDeleting) setConfirmOpen(false);
        }}
      />
      </div>
    </motion.div>
  );
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
