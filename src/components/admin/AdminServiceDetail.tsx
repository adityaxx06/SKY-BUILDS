"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AdminInput } from "./AdminInput";
import { AdminTextarea } from "./AdminTextarea";
import { updateServiceAction, deleteServiceAction } from "@/app/admin/(dashboard)/services/actions";

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

interface AdminServiceDetailProps {
  service: Service;
}

export function AdminServiceDetail({ service }: AdminServiceDetailProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link href="/admin/services" className="inline-flex items-center gap-2 text-sm font-medium mb-4 transition-colors hover:underline" style={{ color: "var(--primary)" }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Services
          </Link>
          <h1 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold" style={{ color: "var(--text)" }}>{service.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <a href={`/admin/services/${service.id}/edit`} className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-colors" style={{ background: "var(--primary)", color: "var(--on-primary)" }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            Edit
          </a>
          <form action={async (fd) => { await deleteServiceAction(fd); return; }}>
            <input type="hidden" name="id" value={service.id} />
            <button type="submit" className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-colors" style={{ background: "transparent", color: "var(--secondary)", border: "1px solid var(--secondary)" }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              Delete
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-[18px] border p-6 grid grid-cols-1 md:grid-cols-2 gap-4" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
          <div><p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Slug</p><p className="mt-1 font-medium break-all" style={{ color: "var(--text)" }}>{service.slug}</p></div>
          <div><p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Display Order</p><p className="mt-1 font-medium" style={{ color: "var(--text)" }}>{service.display_order}</p></div>
          <div><p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Status</p><span className="mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider" style={{ background: service.active ? "rgba(74,222,154,0.1)" : "rgba(148,139,174,0.1)", color: service.active ? "#4ADE9A" : "#948BAE" }}>{service.active ? "Active" : "Inactive"}</span></div>
          <div><p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Created</p><p className="mt-1 font-medium" style={{ color: "var(--text)" }}>{new Date(service.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p></div>
        </div>

        {(service.icon || service.short_description || service.description) && (
          <div className="space-y-6">
            {service.icon && (
              <div className="rounded-[18px] border p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <h2 className="font-display text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>Icon</h2>
                <p className="text-3xl" style={{ color: "var(--text)" }}>{service.icon}</p>
              </div>
            )}
            {service.short_description && (
              <div className="rounded-[18px] border p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <h2 className="font-display text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>Short Description</h2>
                <p style={{ color: "var(--text-muted)" }}>{service.short_description}</p>
              </div>
            )}
            {service.description && (
              <div className="rounded-[18px] border p-6" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
                <h2 className="font-display text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>Description</h2>
                <div style={{ color: "var(--text-muted)" }}><p className="whitespace-pre-wrap">{service.description}</p></div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

