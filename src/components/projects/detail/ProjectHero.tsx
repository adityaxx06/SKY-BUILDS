import Image from "next/image";
import type { Project } from "@/features/projects/project-data";
import { BrowserMockup, DevicesMockup, DashboardMockup } from "../mockups";
import { Reveal } from "@/components/ui/Reveal";

const MOCKUPS = {
  browser: BrowserMockup,
  devices: DevicesMockup,
  dashboard: DashboardMockup,
} as const;

interface ProjectHeroProps {
  project: Project;
}

/**
 * Editorial case-study hero. Priority: uploaded cover photo, then the
 * existing mockup composition (bespoke per slug, generic otherwise).
 * Never renders a broken image: without a cover URL the mockup path
 * always produces a visual.
 */
export function ProjectHero({ project }: ProjectHeroProps) {
  const Mockup = MOCKUPS[project.mockupType];
  const cover = project.coverImage || project.images?.[0]?.url || null;

  return (
    <section aria-labelledby="project-title" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-25" aria-hidden>
        <div
          className="absolute -top-24 left-1/4 h-[380px] w-[380px] rounded-full blur-[120px]"
          style={{ background: "var(--primary)" }}
        />
        <div
          className="absolute top-24 right-[10%] h-[260px] w-[260px] rounded-full blur-[100px]"
          style={{ background: "var(--secondary)" }}
        />
      </div>

      <Reveal>
        <span
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.75rem] font-medium"
          style={{
            borderColor: "var(--border)",
            background: "var(--glass-bg)",
            color: "var(--text-muted)",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--accent)" }}
          />
          Concept / Demo Project
        </span>
      </Reveal>

      <Reveal delay={0.08}>
        <p
          className="mt-6 text-[0.875rem] font-medium tracking-wide"
          style={{ color: "var(--text-muted)" }}
        >
          {project.category} · {project.year}
        </p>
        <h1
          id="project-title"
          className="font-display mt-3 max-w-[16ch] text-[clamp(2.75rem,6vw,5rem)] font-bold leading-[1.02]"
        >
          {project.title}
        </h1>
      </Reveal>

      <Reveal delay={0.16}>
        <p
          className="mt-6 max-w-[62ch] text-[1.125rem] leading-relaxed md:text-[1.25rem]"
          style={{ color: "var(--text-muted)" }}
        >
          {project.description}
        </p>
      </Reveal>

      {project.services.length > 0 && (
        <Reveal delay={0.22}>
          <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="Project services">
            {project.services.map((service) => (
              <li
                key={service}
                className="rounded-full border px-4 py-1.5 text-[0.8125rem] font-medium"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                  color: "var(--text)",
                }}
              >
                {service}
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      <Reveal delay={0.28} className="mt-10 md:mt-14">
        <div
          className="relative overflow-hidden rounded-[24px] border"
          style={{ borderColor: "var(--border)", background: "var(--surface-elevated)" }}
        >
          {cover ? (
            <div className="relative aspect-[16/10] w-full md:aspect-[21/10]">
              <Image
                src={cover}
                alt={`${project.title} hero image`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1320px) 90vw, 1200px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="relative flex items-center justify-center p-8 md:p-14 lg:p-20">
              <div className="w-full max-w-[720px]">
                <Mockup />
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}
