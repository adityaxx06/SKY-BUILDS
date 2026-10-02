"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminInput } from "./AdminInput";
import { AdminSelect } from "./AdminSelect";
import { AdminTextarea } from "./AdminTextarea";

interface AdminProjectFormProps {
  mode: "create" | "edit";
  initialData?: {
    id: string;
    title: string;
    slug: string;
    category: string;
    short_description: string;
    description: string;
    year: string;
    services: string;
    technologies: string;
    hero_image: string;
    challenge: string;
    solution: string;
    result_summary: string;
    featured: string;
    display_order: string;
  };
}

const FEATURED_OPTIONS = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];

export function AdminProjectForm({ mode, initialData }: AdminProjectFormProps) {
  const isCreate = mode === "create";
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const validateForm = (formData: FormData): Record<string, string> => {
    const errs: Record<string, string> = {};
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const category = formData.get("category") as string;
    const year = formData.get("year") as string;
    const display_order = formData.get("display_order") as string;
    if (!title?.trim()) errs.title = "Title is required";
    if (!slug?.trim()) errs.slug = "Slug is required";
    if (!category?.trim()) errs.category = "Category is required";
    if (year && isNaN(Number(year))) errs.year = "Year must be a number";
    if (display_order && isNaN(Number(display_order))) errs.display_order = "Display order must be a number";
    return errs;
  };

  const handleSubmit = async (formData: FormData) => {
    setSubmitError(null);
    const errs = validateForm(formData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      setIsSaving(true);
      const response = await fetch(`/admin/projects/api`, { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setSubmitError(data.error || "Failed to save work");
        setIsSaving(false);
        return;
      }
      router.push(`/admin/projects/${data.id}`);
      router.refresh();
    } catch {
      setSubmitError("Failed to save work");
      setIsSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/projects" className="inline-flex items-center gap-2 text-sm font-medium mb-4 transition-colors hover:underline" style={{ color: "var(--primary)" }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Selected Work
          </Link>
          <h1 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold" style={{ color: "var(--text)" }}>
            {isCreate ? "Add Work" : "Edit Work"}
          </h1>
        </div>
      </div>

      <form action={handleSubmit} className="space-y-6" noValidate>
        {initialData && <input type="hidden" name="id" value={initialData.id} />}
        <div className="rounded-[18px] border p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdminInput label="Title" name="title" defaultValue={initialData?.title} error={errors.title} required placeholder="Work title" />
            <AdminInput label="Slug" name="slug" defaultValue={initialData?.slug} error={errors.slug} required placeholder="url-friendly-slug" />
            <AdminInput label="Category" name="category" defaultValue={initialData?.category} error={errors.category} required placeholder="e.g., SaaS · Web app" />
            <AdminInput label="Year" name="year" type="number" defaultValue={initialData?.year} error={errors.year} placeholder="2026" />
            <AdminInput label="Display Order" name="display_order" type="number" defaultValue={initialData?.display_order} error={errors.display_order} placeholder="1" />
            <AdminSelect name="featured" defaultValue={initialData?.featured || "false"} className="w-full">
              {FEATURED_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </AdminSelect>
          </div>

          <div className="mt-6">
            <h3 className="font-display text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>Descriptions</h3>
            <div className="space-y-4">
              <AdminTextarea label="Short Description" name="short_description" defaultValue={initialData?.short_description} rows={3} placeholder="Brief summary for cards/previews" />
              <AdminTextarea label="Full Description" name="description" defaultValue={initialData?.description} rows={5} placeholder="Full work description" />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-display text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>Challenge / Solution / Result</h3>
            <div className="space-y-4">
              <AdminTextarea label="Challenge" name="challenge" defaultValue={initialData?.challenge} rows={4} placeholder="What problem did this work solve?" />
              <AdminTextarea label="Solution" name="solution" defaultValue={initialData?.solution} rows={4} placeholder="How did you approach and solve it?" />
              <AdminTextarea label="Result Summary" name="result_summary" defaultValue={initialData?.result_summary} rows={3} placeholder="Key outcomes and results" />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-display text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>Technical Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AdminInput label="Services (comma-separated)" name="services" defaultValue={initialData?.services} placeholder="Web Design, UI/UX, Development" />
              <AdminInput label="Technologies (comma-separated)" name="technologies" defaultValue={initialData?.technologies} placeholder="React, Next.js, TypeScript, Tailwind" />
              <AdminInput label="Hero Image URL" name="hero_image" type="url" defaultValue={initialData?.hero_image} placeholder="https://example.com/hero.jpg" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-opacity disabled:cursor-wait"
              style={{ background: "var(--primary)", color: "var(--on-primary)", opacity: isSaving ? 0.7 : 1 }}
            >
              {isSaving ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-transparent border-t-[var(--on-primary)]" aria-hidden="true" />
                  Saving…
                </>
              ) : isCreate ? (
                "Add Work"
              ) : (
                "Save Changes"
              )}
            </button>
            <Link href="/admin/projects" className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-colors" style={{ background: "transparent", color: "var(--text-muted)", border: "1px solid var(--border)" }}>Cancel</Link>
            {submitError && <span className="text-sm font-medium" style={{ color: "var(--secondary)" }}>{submitError}</span>}
          </div>
        </div>
      </form>
    </motion.div>
  );
}