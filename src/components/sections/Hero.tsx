import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroVisual } from "./hero/HeroVisual";

/**
 * Enhanced Hero section with improved typography, scroll indicator,
 * and more engaging visual presentation.
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 scroll-mt-24">
      <div className="grid-bg opacity-50" aria-hidden />
      
      {/* Animated geometric background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="hero-shape hero-shape-1" />
        <div className="hero-shape hero-shape-2" />
        <div className="hero-shape hero-shape-3" />
      </div>

      <Container className="relative z-10 w-full grid grid-cols-1 items-start gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <div>
          {/* Availability status */}
          <div className="animate-rise-in inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-6" style={{ 
            borderColor: "var(--border)", 
            background: "var(--glass-bg)",
            animationDelay: "0s"
          }}>
            <span className="relative h-2 w-2 rounded-full" style={{ background: "var(--success)" }}>
              <span className="absolute inset-0 h-2 w-2 rounded-full animate-ping" style={{ background: "var(--success)", opacity: 0.5 }} />
            </span>
            <span className="text-[0.75rem] font-medium" style={{ color: "var(--text-muted)" }}>
              Available for new projects
            </span>
          </div>

          <h1 className="font-display max-w-[14ch] text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.02]">
            <span className="block overflow-hidden">
              <span className="animate-rise-in block font-light" style={{ animationDelay: "0.05s" }}>
                We craft digital
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="animate-rise-in block font-bold" style={{ animationDelay: "0.13s" }}>
                experiences that
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="grad-word animate-rise-in block font-bold"
                style={{ animationDelay: "0.21s" }}
              >
                convert.
              </span>
            </span>
          </h1>
          
          <p className="mt-6 max-w-[48ch] text-[1.125rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
            SKY BUILDS is a modern web development studio designing and
            building premium websites that drive growth for ambitious businesses.
          </p>
          
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="#cta" magnetic showArrow>
              Start a project
            </Button>
            <Button href="#work" variant="secondary">
              See our work
            </Button>
            <div className="ml-0 flex w-full items-center gap-3 text-[0.875rem] md:ml-4 md:w-auto" style={{ color: "var(--text-muted)" }}>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4" style={{ color: "var(--primary)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                2-week sprints
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4" style={{ color: "var(--accent)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Direct communication
              </span>
            </div>
          </div>
        </div>

        <HeroVisual />
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow" aria-hidden>
        <svg className="h-6 w-6" style={{ color: "var(--text-muted)", opacity: 0.6 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
