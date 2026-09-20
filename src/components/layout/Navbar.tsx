"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Home", isExternal: false },
  { href: "/services", label: "Services", isExternal: false },
  { href: "/projects", label: "Work", isExternal: false },
  { href: "#about", label: "About", isExternal: false },
  { href: "#process", label: "Process", isExternal: false },
  { href: "/contact", label: "Contact", isExternal: false },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS
      .filter((l) => l.href.startsWith("#"))
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4">
      <nav
        className="flex w-full max-w-[900px] items-center justify-between rounded-full border px-4 py-2.5 transition-[background,box-shadow] duration-500 md:px-6"
        style={{
          background: "var(--glass-bg)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: "var(--glass-border)",
          boxShadow: scrolled ? "0 8px 30px -12px rgba(0,0,0,0.35)" : "none",
        }}
      >
        <Link
          href="/"
          className="font-display text-[1.15rem] font-semibold tracking-tight"
          style={{ color: "var(--text)" }}
        >
          SKY BUILDS
        </Link>

        <ul className="hidden items-center gap-6 text-[0.9375rem] md:flex" style={{ color: "var(--text-muted)" }}>
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="relative">
              <Link
                href={link.href}
                className="relative pb-1 transition-colors"
                style={link.href.startsWith("#") && activeId === link.href ? { color: "var(--text)" } : undefined}
                onClick={() => link.href.startsWith("#") || link.href === "/" ? setMenuOpen(false) : undefined}
              >
                {link.label}
                {link.href.startsWith("#") && (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-0.5 h-px origin-left transition-transform duration-300"
                    style={{
                      background: "var(--primary)",
                      transform: activeId === link.href ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link
            href="/contact"
            className="rounded-full px-4 py-2 text-sm font-medium"
            style={{ background: "var(--primary)", color: "var(--on-primary)" }}
            onClick={() => setMenuOpen(false)}
          >
            Start a project
          </Link>
        </div>

        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          style={{ color: "var(--text)" }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {menuOpen && (
        <div
          className="absolute top-[calc(100%+0.5rem)] w-[calc(100%-2rem)] max-w-[900px] rounded-2xl border p-4 md:hidden"
          style={{
            background: "var(--glass-bg)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderColor: "var(--glass-border)",
          }}
        >
          <ul className="flex flex-col gap-1" style={{ color: "var(--text)" }}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-base"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between border-t pt-3" style={{ borderColor: "var(--border)" }}>
            <ThemeToggle />
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="rounded-full px-4 py-2 text-sm font-medium"
              style={{ background: "var(--primary)", color: "var(--on-primary)" }}
            >
              Start a project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}