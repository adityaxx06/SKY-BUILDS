import type { CSSProperties, ReactNode } from "react";

/**
 * Shared wrapper for every floating element in the hero visual. Three
 * separate layers, each on its own DOM node, so nothing fights over
 * `transform`:
 *
 *   1. outer div  — pure positioning (top/left/right/bottom via
 *      className). Never animated.
 *   2. wave div   — a dedicated CSS keyframe animation
 *      (`.hero-card-wave` in globals.css), parameterized per-instance
 *      via CSS custom properties (--hero-float-range etc). This is
 *      deliberately plain CSS, not Framer Motion — see globals.css's
 *      comment for why.
 *   3. inner div  — CSS-only hover lift (via the stage's `group` class)
 *
 * No hooks, no client-side JS at all: this is a Server Component.
 * Reduced motion is handled entirely in CSS (see the
 * @media (prefers-reduced-motion: reduce) block next to
 * .hero-card-wave in globals.css), so there's nothing to branch on
 * here.
 */

type HeroWaveVars = CSSProperties & {
  "--hero-float-range"?: string;
  "--hero-base-rotate"?: string;
  "--hero-mid-rotate"?: string;
  "--hero-wave-duration"?: string;
  "--hero-wave-delay"?: string;
};

export function FloatingCard({
  children,
  style,
  floatRange = 8,
  duration = 6.5,
  delay = 0,
  rotateRange,
  baseRotate = 0,
  className,
}: {
  children: ReactNode;
  /** Only for values that never vary by breakpoint — anything
   * responsive must go in className instead, since inline styles
   * always beat Tailwind's responsive classes regardless of
   * viewport, silently breaking any lg:/md: override placed here. */
  style?: CSSProperties;
  floatRange?: number;
  duration?: number;
  delay?: number;
  /** If set, the wave's 25%/75% keyframes rotate to baseRotate + rotateRange. */
  rotateRange?: number;
  /** Resting tilt in degrees at 0%/50%/100% of the wave cycle. */
  baseRotate?: number;
  className?: string;
}) {
  const waveVars: HeroWaveVars = {
    "--hero-float-range": `${floatRange}px`,
    "--hero-base-rotate": `${baseRotate}deg`,
    "--hero-mid-rotate": `${baseRotate + (rotateRange ?? 0)}deg`,
    "--hero-wave-duration": `${duration}s`,
    "--hero-wave-delay": `${delay}s`,
  };

  return (
    <div className={`absolute z-10 ${className ?? ""}`} style={style}>
      <div className="hero-card-wave" style={waveVars}>
        <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_30px_60px_-20px_rgba(var(--shadow-tint),0.3)]">
          {children}
        </div>
      </div>
    </div>
  );
}
