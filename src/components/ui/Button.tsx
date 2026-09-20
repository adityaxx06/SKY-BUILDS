"use client";

import { useRef } from "react";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  magnetic?: boolean;
  showArrow?: boolean;
};

/**
 * Shared pill button. `magnetic` reproduces the prototype's hero CTA
 * behavior (nudges toward the cursor); only the hero's primary button
 * used this in the approved v5 reference, so it defaults to off.
 */
export function Button({
  href,
  children,
  variant = "primary",
  magnetic = false,
  showArrow = false,
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!magnetic || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.25;
    const y = (e.clientY - r.top - r.height / 2) * 0.35;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const isPrimary = variant === "primary";

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[1rem] font-medium transition-transform duration-300 will-change-transform"
      style={
        isPrimary
          ? {
              background: "var(--primary)",
              color: "var(--on-primary)",
              boxShadow: "0 12px 28px -10px rgba(var(--shadow-tint), 0.5)",
            }
          : {
              background: "transparent",
              color: "var(--text)",
              border: "1px solid var(--border)",
            }
      }
    >
      {children}
      {showArrow && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      )}
    </a>
  );
}
