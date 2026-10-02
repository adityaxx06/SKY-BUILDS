import { projects, Project } from "@/features/projects/project-data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { canonicalAlternates, openGraphPage } from "@/lib/seo/site";
import { ProjectBackNav, ProjectHero, ProjectMeta, ProjectOverview, ProjectFeatures, ProjectServices, ProjectNext } from "@/components/projects/detail";
import { NovaBrowserMockup, NovaDashboardMockup, NovaPanelMockup, NovaTypographyMockup } from "@/components/projects/nova-visuals";
import { AureliaBrowserMockup, AureliaDevicesMockup, AureliaPanelMockup, AureliaTypographyMockup } from "@/components/projects/aurelia-visuals";
import { PulseBrowserMockup, PulseDashboardMockup, PulsePanelMockup, PulseTypographyMockup } from "@/components/projects/pulse-visuals";

const MOCKUP_COMPONENTS: Record<string, Record<string, React.ComponentType>> = {
  nova: { browser: NovaBrowserMockup, dashboard: NovaDashboardMockup, panel: NovaPanelMockup, typography: NovaTypographyMockup },
  aurelia: { browser: AureliaBrowserMockup, devices: AureliaDevicesMockup, panel: AureliaPanelMockup, typography: AureliaTypographyMockup },
  pulse: { browser: PulseBrowserMockup, dashboard: PulseDashboardMockup, panel: PulsePanelMockup, typography: PulseTypographyMockup },
};

function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project Not Found — SKY BUILDS" };

  return {
    title: `${project.title} — ${project.category}`,
    description: project.description,
    ...openGraphPage(
      `${project.title} — ${project.category}`,
      project.description
    ),
    ...canonicalAlternates(`/projects/${project.slug}`),
  };
}

function ProjectVisualGallery({ project }: { project: Project }) {
  const mockups = MOCKUP_COMPONENTS[project.id] || {};

  return (
    <section aria-label="Project visual gallery" className="py-16 md:py-24">
      <div className="space-y-16">
        {project.gallery.map((item, index) => {
          const Mockup = mockups[item.type];
          if (!Mockup) return null;

          return (
            <div key={`${project.id}-${index}`} className="relative">
              <div className="overflow-hidden rounded-[24px] border shadow-2xl" style={{ borderColor: "var(--border)", background: "var(--surface-elevated)" }}>
                <Mockup />
              </div>
              {(item.title || item.description) && (
                <div className="mt-6 max-w-2xl">
                  {item.title && (
                    <h3 className="font-display text-lg font-semibold mb-1" style={{ color: "var(--text)" }}>
                      {item.title}
                    </h3>
                  )}
                  {item.description && (
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      {item.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const allProjects = [...projects].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <>
      <div className="min-h-screen pt-32 md:pt-40" style={{ background: "var(--bg)" }}>
        <ProjectBackNav />
        <ProjectHero project={project} />
        <ProjectMeta project={project} />
        <Container>
          <ProjectVisualGallery project={project} />
          <ProjectOverview project={project} />
          <ProjectFeatures project={project} />
          <ProjectServices project={project} />
          <ProjectNext currentProject={project} allProjects={allProjects} />
        </Container>
      </div>
    </>
  );
}