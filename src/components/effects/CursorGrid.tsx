"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Global cursor-reactive background grid (Phase 10.7).
 *
 * Two fixed layers, both `pointer-events: none` and negative z-index so
 * they always paint behind page content:
 *
 * - `.cg-base` — static faint full-viewport grid (all devices, both
 *   themes, reduced-motion safe).
 * - `.cg-lens` — eased cursor follower (fine pointers + no reduced
 *   motion only): a brighter grid patch with a soft accent glow and a
 *   radial falloff, moved with rAF-lerped `transform` only.
 *
 * No React state updates happen per pointer movement — coordinates live
 * in refs and are written straight to the lens element's transform.
 */
export function CursorGrid() {
  const [interactive, setInteractive] = useState(false);
  const lensRef = useRef<HTMLDivElement>(null);

  // Decide once on mount (never during render: SSR has no matchMedia,
  // and this must not differ between server and client HTML).
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (finePointer && !reducedMotion) setInteractive(true);
  }, []);

  useEffect(() => {
    if (!interactive) return;
    const lens = lensRef.current;
    if (!lens) return;

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
        lens.style.opacity = "1";
      }
    };
    const onLeave = () => {
      shown = false;
      lens.style.opacity = "0";
    };
    const tick = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      if (Math.abs(targetX - x) < 0.05) x = targetX;
      if (Math.abs(targetY - y) < 0.05) y = targetY;
      lens.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
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
  }, [interactive]);

  return (
    <>
      <div className="cg-base" aria-hidden="true" />
      {interactive && (
        <div ref={lensRef} className="cg-lens" aria-hidden="true">
          <div className="cg-lens-grid" />
          <div className="cg-lens-glow" />
        </div>
      )}
    </>
  );
}
