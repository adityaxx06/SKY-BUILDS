"use client";

import { useEffect, useState } from "react";

/**
 * Inline theme switch, meant to live inside the navbar (not floating —
 * the floating button in the design-exploration prototypes was review
 * scaffolding only, never an approved nav element).
 *
 * Persisted to localStorage; the actual pre-paint theme application
 * happens in a blocking inline script in layout.tsx's <head> so there
 * is no flash of the wrong theme on reload. This component's initial
 * state just needs to match whatever that script already set on
 * <html>, which it reads on mount.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // This is a genuine external-system sync (reading the DOM
    // attribute the pre-hydration blocking script already set from
    // localStorage), not the derived-state anti-pattern this rule
    // normally catches — there's no React state/props this could be
    // computed from instead.
    const current = document.documentElement.getAttribute("data-theme");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (current === "light" || current === "dark") setTheme(current);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("sky-builds-theme", next);
    } catch {
      // localStorage can throw in private-browsing/blocked-storage
      // contexts; the toggle still works for the current session.
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="flex h-8 w-8 items-center justify-center rounded-full border text-[13px] transition-colors"
      style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
    >
      {theme === "dark" ? "●" : "○"}
    </button>
  );
}
