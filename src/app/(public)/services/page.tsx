import { Metadata } from "next";
import { services } from "@/features/services/service-data";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServiceExperience } from "@/components/services/ServiceExperience";
import { ProcessSteps } from "@/components/services/ProcessSteps";
import { CTA } from "@/components/sections/CTA";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Services — SKY BUILDS",
  description: "Six focused capabilities — website design & development, web applications, UI/UX design, website redesign, e-commerce, and design systems. End-to-end digital experiences.",
  openGraph: {
    title: "Services — SKY BUILDS",
    description: "Six focused capabilities — website design & development, web applications, UI/UX design, website redesign, e-commerce, and design systems.",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />

      <main className="min-h-screen" style={{ background: "var(--bg)" }}>
        <ServiceExperience services={services} />

        <section className="py-24" aria-labelledby="process-heading">
          <Container>
            <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <p id="process-heading" className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold mb-4">
                  How we work
                </p>
                <p className="text-[1.125rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  Every engagement follows our proven process — from discovery to launch and beyond.
                  No handoff gaps, no surprise scope creep.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ProcessSteps />
            </Reveal>
          </Container>
        </section>

        <CTA />
      </main>
    </>
  );
}