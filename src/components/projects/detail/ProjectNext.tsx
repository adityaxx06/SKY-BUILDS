import Link from "next/link";
import type { Project } from "@/features/projects/project-data";
import { BrowserMockup, DevicesMockup, DashboardMockup } from "../mockups";
import { Reveal } from "@/components/ui/Reveal";

const MOCKUPS = {
  browser: BrowserMockup,
  devices: DevicesMockup,
  dashboard: DashboardMockup,
} as const;

interface ProjectNextProps {
  currentProject: Project;
  allProjects: Project[];
}

export function ProjectNext({ currentProject, allProjects }: ProjectNextProps) {
  const sortedProjects = [...allProjects].sort((a, b) => a.displayOrder - b.displayOrder);
  const currentIndex = sortedProjects.findIndex((p) => p.id === currentProject.id);
  const nextIndex = (currentIndex + 1) % sortedProjects.length;
  const nextProject = sortedProjects[nextIndex];
  const Mockup = MOCKUPS[nextProject.mockupType];

  return (
    <section aria-labelledby="next-heading" className="py-16 md:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[24px] border p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-10" style={{ borderColor: "var(--border)", background: "var(--surface-elevated)" }}>
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 text-[0.875rem] font-medium mb-3" style={{ color: "var(--accent)" }}>
              Next Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8" />
              </svg>
            </span>
            <p className="text-sm font-medium mb-2" style={{ color: "var(--text-muted)" }}>
              {nextProject.category} · {nextProject.year}
            </p>
            <h2 id="next-heading" className="font-display text-[clamp(2rem,4vw,3rem)] font-bold mb-4">
              {nextProject.title}
            </h2>
            <p className="text-[1.125rem] mb-6" style={{ color: "var(--text-muted)" }}>
              {nextProject.description}
            </p>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)] px-6 py-3 text-[1rem] font-medium text-[var(--primary)] transition-all duration-300 hover:bg-[var(--primary)] hover:text-[var(--on-primary)]"
            >
              View Project
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8" />
              </svg>
            </Link>
          </div>
          <div className="w-full md:w-1/2 lg:w-[40%] flex justify-center relative">
            <div className="absolute inset-0 -z-10 opacity-15" aria-hidden>
              <div className="absolute top-0 right-0 h-[200px] w-[200px] rounded-full blur-[80px]" style={{ background: "var(--primary)" }} />
            </div>
            <div className="w-full max-w-[360px] aspect-[4/3]">
              <Mockup />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}