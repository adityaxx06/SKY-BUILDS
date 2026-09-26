"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AdminInput } from "./AdminInput";
import { AdminSelect } from "./AdminSelect";
import { AdminTextarea } from "./AdminTextarea";
import { updateTestimonialAction } from "@/app/admin/(dashboard)/testimonials/actions";

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
  updated_at: string;
}

interface AdminTestimonialFormProps {
  mode: "create" | "edit";
  initialData?: Testimonial;
}

export function AdminTestimonialForm({ mode, initialData }: AdminTestimonialFormProps) {
  const isCreate = mode === "create";
  const [formData, setFormData] = useState({
    client_name: initialData?.client_name || "",
    client_role: initialData?.client_role || "",
    company: initialData?.company || "",
    content: initialData?.content || "",
    avatar_url: initialData?.avatar_url || "",
    display_order: initialData?.display_order?.toString() || "0",
    featured: initialData?.featured ? "true" : "false",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = (form: typeof formData): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!form.client_name.trim()) errs.client_name = "Client name is required";
    if (!form.content.trim()) errs.content = "Content is required";
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

    const fd = new FormData(e.currentTarget as HTMLFormElement);
    fd.set("client_name", formData.client_name);
    fd.set("client_role", formData.client_role);
    fd.set("company", formData.company);
    fd.set("content", formData.content);
    fd.set("avatar_url", formData.avatar_url);
    fd.set("display_order", formData.display_order);
    fd.set("featured", formData.featured);
    if (initialData) fd.set("id", initialData.id);

    try {
      const url = isCreate ? "/admin/testimonials/api" : `/admin/testimonials/api`;
      const response = await fetch(url, { method: "POST", body: fd });
      const data = await response.json();
      if (!response.ok || !data.success) { setSubmitError(data.error || "Failed to save testimonial"); return; }
      window.location.href = `/admin/testimonials/${data.id}`;
    } catch (err) {
      setSubmitError("Failed to save testimonial");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/testimonials" className="inline-flex items-center gap-2 text-sm font-medium mb-4 transition-colors hover:underline" style={{ color: "var(--primary)" }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Testimonials
          </Link>
          <h1 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold" style={{ color: "var(--text)" }}>
            {isCreate ? "New Testimonial" : "Edit Testimonial"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="rounded-[18px] border p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AdminInput label="Client Name" name="client_name" value={formData.client_name} onChange={(e) => handleChange("client_name", e.target.value)} error={errors.client_name} required placeholder="Full name" />
            <AdminInput label="Role" name="client_role" value={formData.client_role} onChange={(e) => handleChange("client_role", e.target.value)} placeholder="e.g., CEO" />
            <AdminInput label="Company" name="company" value={formData.company} onChange={(e) => handleChange("company", e.target.value)} placeholder="Company name" />
            <AdminInput label="Display Order" name="display_order" type="number" value={formData.display_order} onChange={(e) => handleChange("display_order", e.target.value)} error={errors.display_order} placeholder="1" />
            <AdminSelect name="featured" value={formData.featured} onChange={(e) => handleChange("featured", e.target.value)} className="w-full">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </AdminSelect>
          </div>

          <div className="mt-6 space-y-4">
            <AdminInput label="Avatar URL" name="avatar_url" value={formData.avatar_url} onChange={(e) => handleChange("avatar_url", e.target.value)} placeholder="https://example.com/avatar.jpg" />
            <AdminTextarea label="Content" name="content" value={formData.content} onChange={(e) => handleChange("content", e.target.value)} rows={5} placeholder="Testimonial text" required />
          </div>

          <div className="flex items-center gap-3 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
            <button type="submit" className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-colors" style={{ background: "var(--primary)", color: "var(--on-primary)" }}>
              {isCreate ? "Create Testimonial" : "Save Changes"}
            </button>
            <Link href="/admin/testimonials" className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-colors" style={{ background: "transparent", color: "var(--text-muted)", border: "1px solid var(--border)" }}>Cancel</Link>
            {submitError && <span className="text-sm font-medium" style={{ color: "var(--secondary)" }}>{submitError}</span>}
          </div>
        </div>
      </form>
    </motion.div>
  );
}

