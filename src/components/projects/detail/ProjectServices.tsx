import type { Project } from "@/features/projects/project-data";
import { Reveal } from "@/components/ui/Reveal";

interface ProjectServicesProps {
  project: Project;
}

export function ProjectServices({ project }: ProjectServicesProps) {
  return (
    <section aria-labelledby="services-heading" className="py-16 md:py-24">
      <Reveal>
        <h2 id="services-heading" className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold mb-10 text-center">
          Services Applied
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {project.services.map((service) => (
            <span
              key={service}
              className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[0.9375rem] font-medium transition-all duration-300"
              style={{ borderColor: "var(--border)", background: "var(--surface)", color: "var(--text)" }}
            >
              {service}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}