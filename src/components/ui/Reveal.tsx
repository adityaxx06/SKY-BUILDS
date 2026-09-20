"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { motionDuration, motionEase } from "@/lib/constants/design-tokens";

/**
 * Shared "medium" motion-tier wrapper: fade + rise on scroll into view,
 * once. Used by Services, Selected Work, Process, and CTA so the
 * scroll-reveal behavior stays identical everywhere instead of being
 * reimplemented per section. Respects prefers-reduced-motion via the
 * app-wide <MotionConfig reducedMotion="user"> in the root layout.
 *
 * Duration/easing come from lib/constants/design-tokens.ts rather than
 * being hardcoded here, so this can't silently drift from the values
 * documented in docs/DESIGN-SYSTEM.md.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: motionDuration.medium, delay, ease: motionEase }}
    >
      {children}
    </motion.div>
  );
}
