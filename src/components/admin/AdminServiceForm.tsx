"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminInput } from "./AdminInput";
import { AdminTextarea } from "./AdminTextarea";

interface Service {
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

interface AdminServiceFormProps {
  mode: "create" | "edit";
  initialData?: Service;
}

export function AdminServiceForm({ mode, initialData }: AdminServiceFormProps) {
  const isCreate = mode === "create";
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    short_description: initialData?.short_description || "",
    description: initialData?.description || "",
    icon: initialData?.icon || "",
    display_order: initialData?.display_order?.toString() || "0",
    active: initialData?.active ? "true" : "false",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const validateForm = (form: typeof formData): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.slug.trim()) errs.slug = "Slug is required";
    if (form.display_order && isNaN(Number(form.display_order))) errs.display_order = "Display order must be a number";
    return errs;
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const next = { ...prev }; delete next[field]; return next; });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const errs = validateForm(formData);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    try {
      setIsSaving(true);
      const fd = new FormData(e.currentTarget as HTMLFormElement);
      const response = await fetch(`/admin/services/api`, { method: "POST", body: fd });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setSubmitError(data.error || "Failed to save service");
        setIsSaving(false);
        return;
      }
      router.push(`/admin/services/${data.id}`);
      router.refresh();
    } catch {
      setSubmitError("Failed to save service");
      setIsSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/services" className="inline-flex items-center gap-2 text-sm font-medium mb-4 transition-colors hover:underline" style={{ color: "var(--primary)" }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Services
          </Link>
          <h1 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold" style={{ color: "var(--text)" }}>
              {isCreate ? "Add Service" : "Edit Service"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {initialData && <input type="hidden" name="id" value={initialData.id} />}
        <div className="rounded-[18px] border p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdminInput label="Title" name="title" defaultValue={initialData?.title} error={errors.title} required placeholder="Service title" />
            <AdminInput label="Slug" name="slug" defaultValue={initialData?.slug} error={errors.slug} required placeholder="url-friendly-slug" />
            <AdminInput label="Display Order" name="display_order" type="number" defaultValue={initialData?.display_order} error={errors.display_order} placeholder="1" />
            <select name="active" defaultValue={initialData?.active ? "true" : "false"} onChange={(e) => handleChange("active", e.target.value)} className="w-full appearance-none px-4 py-3.5 pr-10 rounded-xl border transition-all duration-300 bg-[var(--surface-elevated)] text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50" style={{ background: "var(--surface-elevated)", borderColor: "var(--border)" }}>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          <div className="mt-6 space-y-4">
            <AdminInput label="Icon (emoji or class)" name="icon" defaultValue={initialData?.icon ?? ""} onChange={(e) => handleChange("icon", e.target.value)} placeholder="e.g., 🚀 or fa-cube" />
            <AdminTextarea label="Short Description" name="short_description" defaultValue={initialData?.short_description ?? ""} rows={3} placeholder="Brief summary" />
            <AdminTextarea label="Full Description" name="description" defaultValue={initialData?.description ?? ""} rows={5} placeholder="Full service description" />
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
                "Add Service"
              ) : (
                "Save Changes"
              )}
            </button>
            <Link href="/admin/services" className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-colors" style={{ background: "transparent", color: "var(--text-muted)", border: "1px solid var(--border)" }}>Cancel</Link>
            {submitError && <span className="text-sm font-medium" style={{ color: "var(--secondary)" }}>{submitError}</span>}
          </div>
        </div>
      </form>
    </motion.div>
  );
}

