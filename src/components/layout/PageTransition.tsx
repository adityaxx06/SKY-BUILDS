"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { motionDuration, motionEase } from "@/lib/constants/design-tokens";

/**
 * Route-change transition: fade + slight rise, keyed on pathname.
 * Only one route exists today, so this has nothing to visibly
 * transition between yet — but ARCHITECTURE.md's Animation
 * Architecture section calls for this as a reusable pattern now, so
 * it's ready the moment Phase 6+ adds more routes. Uses the same
 * duration/easing tokens as Reveal, not new values.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: motionDuration.subtle, ease: motionEase }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
