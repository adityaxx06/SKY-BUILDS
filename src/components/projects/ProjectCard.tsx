import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/features/projects/project-data";
import { BrowserMockup, DevicesMockup, DashboardMockup } from "./mockups";

const MOCKUPS = {
  browser: BrowserMockup,
  devices: DevicesMockup,
  dashboard: DashboardMockup,
} as const;

export function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  const Mockup = MOCKUPS[project.mockupType];

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`View the ${project.title} concept project — ${project.category}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[18px] border transition-transform duration-300"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <div
        className={`relative flex flex-1 items-center justify-center p-6 ${large ? "min-h-[456px]" : "min-h-[220px]"}`}
      >
        <span
          aria-hidden
          className="absolute top-5 right-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110"
          style={{
            background: "var(--glass-bg)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderColor: "var(--glass-border)",
            color: "var(--text)",
          }}
        >
          ↗
        </span>
        <div className="w-full transition-transform duration-500 group-hover:scale-[1.035] group-hover:-rotate-[0.4deg]">
          {project.coverImage ? (
            <span className="relative block w-full overflow-hidden rounded-xl aspect-[16/10]">
              <Image
                src={project.coverImage}
                alt={`${project.title} cover image`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1320px) 50vw, 640px"
                className="object-cover"
                loading="lazy"
              />
            </span>
          ) : (
            <Mockup />
          )}
        </div>
      </div>
      <div className="border-t px-5 py-4" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center justify-between">
          <span className="font-display text-[1.3rem] font-semibold">{project.title}</span>
          <span className="text-right text-[0.75rem]" style={{ color: "var(--text-muted)" }}>
            {project.category}
            <br />
            {project.year}
          </span>
        </div>
        <p
          className="overflow-hidden text-[0.875rem] transition-all duration-300 group-hover:mt-2 group-hover:max-h-24 group-hover:opacity-100"
          style={{ color: "var(--text-muted)", maxHeight: 0, opacity: 0 }}
        >
          {project.description}
        </p>
      </div>
    </Link>
  );
}
