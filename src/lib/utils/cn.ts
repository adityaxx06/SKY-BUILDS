/**
 * Minimal classnames joiner — avoids adding clsx/tailwind-merge as a
 * dependency for something this small, per ARCHITECTURE.md's
 * dependency policy ("can the existing stack solve this?").
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
