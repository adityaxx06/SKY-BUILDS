"use client";

import { useEffect, useRef } from "react";

/**
 * Global cursor-reactive background grid (Phase 10.7).
 *
 * ONE full-page grid, revealed by the cursor — not a travelling block:
 *
 * - `.cg-base` — static, extremely faint full-viewport grid (all
 *   devices, both themes, reduced-motion safe).
 * - `.cg-reveal` — the same grid, brighter, fixed full-viewport, with a
 *   radial mask centered on the eased cursor position. Wherever the
 *   cursor goes, the grid *of that place* fades into view with a soft
 *   falloff; everywhere else stays quiet.
 * - `.cg-glow` — a soft accent glow following the same eased position,
 *   moved with rAF-lerped `transform` only.
 *
 * Both layers are `pointer-events: none` with negative z-index, so they
 * always paint behind page content.
 *
 * No React state is used at all — coordinates live in refs and are
 * written to CSS custom properties (mask position only), so pointer
 * movement never triggers a re-render.
 */
export function CursorGrid() {
  const revealRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reveal = revealRef.current;
    const glow = glowRef.current;
    if (!reveal || !glow) return;

    // Interactive layer only for fine pointers without reduced motion.
    // Otherwise the static base grid (rendered below) is all that shows.
    const eligible =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!eligible) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight * 0.3;
    let x = targetX;
    let y = targetY;
    let raf = 0;
    let shown = false;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!shown) {
        shown = true;
        reveal.style.opacity = "1";
        glow.style.opacity = "1";
      }
    };
    const onLeave = () => {
      shown = false;
      reveal.style.opacity = "0";
      glow.style.opacity = "0";
    };
    const tick = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      if (Math.abs(targetX - x) < 0.05) x = targetX;
      if (Math.abs(targetY - y) < 0.05) y = targetY;
      reveal.style.setProperty("--cg-x", `${x.toFixed(1)}px`);
      reveal.style.setProperty("--cg-y", `${y.toFixed(1)}px`);
      glow.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div className="cg-base" aria-hidden="true" />
      <div ref={revealRef} className="cg-reveal" aria-hidden="true" />
      <div ref={glowRef} className="cg-glow" aria-hidden="true" />
    </>
  );
}
