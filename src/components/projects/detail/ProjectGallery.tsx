"use client";

import { motion } from "framer-motion";
import type { Project, ProjectGalleryItem } from "@/features/projects/project-data";
import { BrowserMockup, DevicesMockup, DashboardMockup } from "../mockups";

const MOCKUPS = {
  browser: BrowserMockup,
  devices: DevicesMockup,
  dashboard: DashboardMockup,
} as const;

interface GalleryItemProps {
  item: ProjectGalleryItem;
  index: number;
  theme: Project["visualTheme"];
}

function GalleryItem({ item, index, theme }: GalleryItemProps) {
  const isPanel = item.type === "panel";
  const isTypography = item.type === "typography";
  const Mockup = MOCKUPS[item.type as keyof typeof MOCKUPS];

  const themeStyles = {
    analytical: {
      border: "var(--primary)",
      bg: "rgba(91,120,255,0.1)",
    },
    editorial: {
      border: "var(--secondary)",
      bg: "rgba(255,93,162,0.1)",
    },
    energetic: {
      border: "var(--accent)",
      bg: "rgba(255,193,92,0.15)",
    },
  };

  const styles = themeStyles[theme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-[18px] border transition-all duration-500 hover:shadow-2xl" style={{ borderColor: "var(--border)", background: "var(--surface-elevated)" }}>
        {item.type === "browser" && (
          <div className="aspect-[4/3] w-full">
            <Mockup />
          </div>
        )}
        {item.type === "devices" && (
          <div className="aspect-[4/3] w-full">
            <Mockup />
          </div>
        )}
        {item.type === "dashboard" && (
          <div className="aspect-[4/3] w-full">
            <Mockup />
          </div>
        )}
        {isPanel && (
          <div className="aspect-[4/3] w-full flex items-center justify-center p-8">
            <div className="w-full max-w-[400px] h-full rounded-[12px] border flex items-center justify-center" style={{ borderColor: styles.border, background: styles.bg }}>
              <div className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: styles.bg, border: `2px solid ${styles.border}` }}>
                  <svg className="w-8 h-8" style={{ color: styles.border }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                </div>
                <p className="font-display text-lg font-semibold" style={{ color: "var(--text)" }}>{item.title}</p>
                <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>{item.description}</p>
              </div>
            </div>
          </div>
        )}
        {isTypography && (
          <div className="aspect-[4/3] w-full flex items-center justify-center p-8">
            <div className="w-full max-w-[500px] h-full rounded-[12px] border flex flex-col items-center justify-center gap-6 p-8" style={{ borderColor: styles.border, background: styles.bg }}>
              <div className="text-center">
                <p className="font-display text-3xl md:text-4xl font-bold" style={{ color: "var(--text)" }}>Bricolage Grotesque</p>
                <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>Display typeface — weights 300–700</p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: "var(--primary)", color: "var(--on-primary)" }}>Light 300</span>
                <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: "var(--secondary)", color: "var(--on-primary)" }}>Regular 400</span>
                <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: "var(--accent)", color: "#120e1f" }}>Medium 500</span>
                <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: "var(--success)", color: "#120e1f" }}>Bold 700</span>
              </div>
              <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, var(--border), transparent)" }} />
              <div className="text-center">
                <p className="font-display text-3xl md:text-4xl font-bold" style={{ color: "var(--text)" }}>General Sans</p>
                <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>Body/UI typeface — weights 400–700</p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}>Regular 400</span>
                <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}>Medium 500</span>
                <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}>Semi 600</span>
                <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}>Bold 700</span>
              </div>
            </div>
          </div>
        )}
        {(item.title || item.description) && (
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            {item.title && <p className="font-display text-lg font-semibold" style={{ color: "var(--text)" }}>{item.title}</p>}
            {item.description && <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>{item.description}</p>}
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface ProjectGalleryProps {
  project: Project;
}

export function ProjectGallery({ project }: ProjectGalleryProps) {
  return (
    <section aria-labelledby="gallery-heading" className="py-16 md:py-24">
      <div className="mb-10 md:mb-14">
        <h2 id="gallery-heading" className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold mb-3">
          Visual Showcase
        </h2>
        <p className="max-w-2xl" style={{ color: "var(--text-muted)" }}>
          A curated look at the {project.title} concept — from marketing pages to interface details.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {project.gallery.map((item, index) => (
          <GalleryItem key={`${project.slug}-${item.type}-${index}`} item={item} index={index} theme={project.visualTheme} />
        ))}
      </div>
    </section>
  );
}