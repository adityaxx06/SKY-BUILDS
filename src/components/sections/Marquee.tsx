"use client";

import { useEffect, useRef } from "react";

const TECH_STACK = ["NEXT.JS", "REACT", "TYPESCRIPT", "TAILWIND CSS", "FRAMER MOTION", "SUPABASE"];

/**
 * Scroll-velocity-linked marquee: idles at a constant drift, speeds up
 * when scrolling down, reverses when scrolling up, eases back to idle.
 * Tripled item list gives enough slack for the modulo wrap to never
 * show a gap during a fast scroll kick.
 */
export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const idleSpeed = 0.35;
    const scrollGain = 0.12;
    const maxKick = 6;
    let offset = 0;
    let velocity = idleSpeed;
    let lastScrollY = window.scrollY;
    let paused = false;
    let raf = 0;

    const marqueeEl = track.parentElement;
    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);
    marqueeEl?.addEventListener("mouseenter", onEnter);
    marqueeEl?.addEventListener("mouseleave", onLeave);

    const onScroll = () => {
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      const kick = Math.max(-maxKick, Math.min(maxKick, delta * scrollGain));
      velocity = idleSpeed + kick;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const setWidth = track.scrollWidth / 3;
    const tick = () => {
      velocity += (idleSpeed - velocity) * 0.02;
      if (!paused) {
        offset -= velocity;
        if (offset <= -setWidth) offset += setWidth;
        if (offset > 0) offset -= setWidth;
        track.style.transform = `translateX(${offset}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      marqueeEl?.removeEventListener("mouseenter", onEnter);
      marqueeEl?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const items = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK];

  return (
    <section
      className="relative overflow-hidden border-y py-[1.65rem]"
      style={{ borderColor: "var(--border)", background: "var(--bg-2)" }}
    >
      <p className="sr-only">Technologies we work with: {TECH_STACK.join(", ")}.</p>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(90deg, var(--bg-2) 0%, transparent 8%, transparent 92%, var(--bg-2) 100%)",
        }}
      />
      <div ref={trackRef} aria-hidden className="flex w-max items-center will-change-transform">
        {items.map((name, i) => (
          <div key={`${name}-${i}`} className="flex items-center gap-3.5 px-9 whitespace-nowrap">
            <span className="font-display font-semibold" style={{ color: "var(--primary)" }}>
              [
            </span>
            <span className="font-display text-[1.35rem] font-medium" style={{ color: "var(--text-muted)" }}>
              {name}
            </span>
            <span className="font-display font-semibold" style={{ color: "var(--primary)" }}>
              ]
            </span>
            <span
              aria-hidden
              className="h-1 w-1 flex-shrink-0 rotate-45 rounded-[1px]"
              style={{ background: "var(--accent)" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
