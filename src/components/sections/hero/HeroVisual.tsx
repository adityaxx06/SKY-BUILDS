import { FloatingCard } from "./FloatingCard";
import { HeroBrowserMockup } from "./HeroBrowserMockup";
import { HeroPhoneMockup } from "./HeroPhoneMockup";
import { OrbitLines } from "./OrbitLines";
import { DashboardMockup } from "@/components/projects/mockups";

const WAVE_DURATION = 6.5;

export function HeroVisual() {
  return (
    <div aria-hidden="true" className="group relative z-10 h-[300px] md:h-[400px] lg:h-[520px]">
      {/* Ambient glow orbs — depth layers */}
      <div
        className="animate-glow-drift absolute top-[5%] left-[5%] h-[250px] w-[250px] rounded-full opacity-40 blur-[80px] transition-opacity duration-700 group-hover:opacity-70 md:h-[350px] md:w-[350px]"
        style={{
          background:
            "radial-gradient(circle, rgba(var(--shadow-tint), 0.4), rgba(91,120,255,0.2) 50%, transparent 70%)",
        }}
      />
      <div
        className="animate-glow-drift absolute bottom-[10%] right-[5%] h-[200px] w-[200px] rounded-full opacity-30 blur-[80px] transition-opacity duration-700 group-hover:opacity-60 md:h-[280px] md:w-[280px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,93,162,0.35), rgba(255,93,162,0.15) 50%, transparent 70%)",
          animationDelay: "-8s",
        }}
      />
      <div
        className="animate-glow-drift absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 h-[180px] w-[180px] rounded-full opacity-20 blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,193,92,0.3), rgba(255,193,92,0.1) 50%, transparent 70%)",
          animationDelay: "-16s",
        }}
      />

      {/* Orbit lines — desktop only */}
      <div className="hidden lg:block">
        <OrbitLines />
      </div>

      {/* Floating particles */}
      <div className="hidden lg:block absolute inset-0" aria-hidden>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="hero-particle"
            style={{
              top: `${15 + i * 12}%`,
              left: `${10 + (i * 15) % 80}%`,
              animationDelay: `${i * 1}s`,
            }}
          />
        ))}
      </div>

      {/* 1. BIG CARD — Browser mockup (left, anchor) */}
      <FloatingCard
        duration={WAVE_DURATION}
        delay={0}
        floatRange={8}
        className="top-[5%] left-[5%] w-[260px] md:w-[300px] lg:w-[340px] lg:top-[8%] lg:left-[4%]"
      >
        <HeroBrowserMockup />
      </FloatingCard>

      {/* 2. BIG CARD — Phone mockup (right, leads wave) */}
      <div className="hidden md:block">
        <FloatingCard
          duration={WAVE_DURATION}
          delay={0.4}
          floatRange={16}
          rotateRange={5}
          baseRotate={-12}
          className="top-[-5%] right-[5%] w-[120px] md:w-[130px] lg:w-[150px]"
        >
          <HeroPhoneMockup />
        </FloatingCard>
      </div>

      {/* 3. SMALL CARD — Dashboard (bottom center, trails wave) */}
      <div className="hidden md:block">
        <FloatingCard
          duration={WAVE_DURATION}
          delay={1.8}
          floatRange={12}
          rotateRange={3}
          baseRotate={4}
          className="bottom-[3%] left-1/2 -translate-x-1/2 w-[160px] lg:w-[180px]"
        >
          <DashboardMockup />
        </FloatingCard>
      </div>
    </div>
  );
}