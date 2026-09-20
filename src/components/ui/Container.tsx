import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Shared horizontal max-width + padding wrapper. Every homepage
 * section previously duplicated "mx-auto max-w-[1320px] px-6
 * md:px-10" independently — this is the single place that value now
 * lives, per ARCHITECTURE.md's "don't duplicate components"
 * engineering-quality rule. Purely structural: no visual change.
 */
export function Container({
  children,
  className,
  as: Tag = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
}) {
  return (
    <Tag id={id} className={cn("mx-auto max-w-[1320px] px-6 md:px-10", className)}>
      {children}
    </Tag>
  );
}
