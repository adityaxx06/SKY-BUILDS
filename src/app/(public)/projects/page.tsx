import { projects } from "@/features/projects/project-data";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Projects — SKY BUILDS",
  description: "Explore our concept projects — NOVA (SaaS analytics), AURELIA (real estate), and PULSE (fitness e-commerce). Each demonstrates our approach to design, development, and motion.",
};

export default function ProjectsPage() {
  const sortedProjects = [...projects].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <>
      <header className="relative pt-32 md:pt-40 lg:pt-48 pb-16 md:pb-20">
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
          <Reveal>
            <p className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold mb-6">
              Selected Work
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-2xl text-[1.125rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Three concept projects exploring different domains — analytics, real estate, and e-commerce.
              Each built to demonstrate our design system, component architecture, and motion language.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-sm font-medium" style={{ color: "var(--accent)" }}>
              Concept / Demo Projects — not real client engagements
            </p>
          </Reveal>
        </div>

        <div className="absolute inset-0 -z-10" aria-hidden>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20" style={{ background: "var(--primary)" }} />
        </div>
      </header>

      <main className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {sortedProjects.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.1}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block overflow-hidden rounded-[24px] border transition-all duration-500 hover:-translate-y-1"
                  style={{ borderColor: "var(--border)", background: "var(--surface)" }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div
                      className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                      style={{ background: project.visualTheme === "analytical" ? "linear-gradient(135deg, rgba(91,120,255,0.15), rgba(255,93,162,0.1))" : project.visualTheme === "editorial" ? "linear-gradient(135deg, rgba(255,93,162,0.1), rgba(255,193,92,0.1))" : "linear-gradient(135deg, rgba(255,93,162,0.15), rgba(255,193,92,0.15))" }}
                    />
                    <div className="absolute inset-0 opacity-5" style={{ background: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%235B78FF\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between p-4">
                      <span className="px-3 py-1.5 rounded-full border text-[0.7rem] font-medium uppercase tracking-wider" style={{ background: "var(--glass-bg)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderColor: "var(--glass-border)", color: "var(--accent)" }}>
                        {project.category}
                      </span>
                      <span className="px-3 py-1.5 rounded-full border text-[0.7rem] font-medium" style={{ background: "var(--glass-bg)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderColor: "var(--glass-border)", color: "var(--text-muted)" }}>
                        {project.year}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <h2 className="font-display text-xl md:text-2xl font-bold" style={{ color: "var(--text)" }}>
                      {project.title}
                    </h2>
                    <p className="text-[1rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.services.slice(0, 3).map((service) => (
                        <span key={service} className="px-3 py-1 rounded-full text-[0.7rem] font-medium uppercase tracking-wider" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                          {service}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                      <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>View Case Study</span>
                      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" style={{ color: "var(--primary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}