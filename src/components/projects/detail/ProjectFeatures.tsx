import type { Project } from "@/features/projects/project-data";
import { Reveal } from "@/components/ui/Reveal";

export function ProjectOverview({ project }: { project: Project }) {
  return (
    <section aria-labelledby="overview-heading" className="py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div>
          <Reveal>
            <h2 id="overview-heading" className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold mb-6">
              Project Overview
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[1.125rem] leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
              {project.overview}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[1.125rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
              This is a concept project created to demonstrate SKY BUILDS&apos; design and development capabilities. It is not a real client engagement.
            </p>
          </Reveal>
        </div>
        <div className="space-y-6">
          <Reveal delay={0.15}>
            <div className="p-6 rounded-[18px] border" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
              <h3 className="font-display text-xl font-semibold mb-3" style={{ color: "var(--text)" }}>
                Challenge
              </h3>
              <p style={{ color: "var(--text-muted)" }}>{project.challenge}</p>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="p-6 rounded-[18px] border" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
              <h3 className="font-display text-xl font-semibold mb-3" style={{ color: "var(--text)" }}>
                Approach
              </h3>
              <p style={{ color: "var(--text-muted)" }}>{project.solution}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ProjectFeatures({ project }: { project: Project }) {
  return (
    <section aria-labelledby="features-heading" className="py-16 md:py-24">
      <Reveal>
        <h2 id="features-heading" className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold mb-10 text-center">
          Key Features
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.features.map((feature, i) => (
            <div
              key={feature}
              className="p-6 rounded-[18px] border transition-all duration-300 hover:-translate-y-1"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--primary)", color: "var(--on-primary)" }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-display text-sm font-semibold" style={{ color: "var(--text-muted)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="text-[1rem] leading-relaxed" style={{ color: "var(--text)" }}>
                {feature}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}