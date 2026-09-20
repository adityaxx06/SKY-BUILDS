import type { Project } from "@/features/projects/project-data";
import { BrowserMockup, DevicesMockup, DashboardMockup } from "../mockups";

const MOCKUPS = {
  browser: BrowserMockup,
  devices: DevicesMockup,
  dashboard: DashboardMockup,
} as const;

interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const Mockup = MOCKUPS[project.mockupType];

  return (
    <div className="relative overflow-hidden rounded-[24px] border" style={{ borderColor: "var(--border)", background: "var(--surface-elevated)" }}>
      <div className="absolute inset-0 -z-10 opacity-20" aria-hidden>
        <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full blur-[100px]" style={{ background: "var(--primary)" }} />
        <div className="absolute bottom-0 left-0 h-[200px] w-[200px] rounded-full blur-[100px]" style={{ background: "var(--secondary)" }} />
      </div>
      <div className="relative p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.75rem] font-medium mb-4" style={{ borderColor: "var(--border)", background: "var(--glass-bg)", color: "var(--text-muted)" }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
            Concept / Demo Project
          </span>
          <p className="text-[0.875rem] font-medium mb-3" style={{ color: "var(--text-muted)" }}>
            {project.category} · {project.year}
          </p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] font-bold">
            {project.title}
          </h1>
        </div>
        <div className="w-full md:w-1/2 lg:w-[48%] flex justify-center">
          <div className="w-full max-w-[520px]">
            <Mockup />
          </div>
        </div>
      </div>
    </div>
  );
}