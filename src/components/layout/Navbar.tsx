"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#process", label: "Process" },
  { href: "/contact", label: "Contact" },
] as const;

/** Returns the "#hash" part of an href, or null for plain routes. */
function hashOf(href: string): string | null {
  const i = href.indexOf("#");
  return i === -1 ? null : href.slice(i);
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy for the homepage section links. Only the homepage has
  // #about/#process targets; on other routes there is nothing to observe.
  useEffect(() => {
    if (pathname !== "/") {
      setActiveHash(null);
      return;
    }
    const sections = NAV_LINKS.map((l) => hashOf(l.href))
      .filter((h): h is string => h !== null)
      .map((h) => document.querySelector(h))
      .filter((el): el is Element => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveHash(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  // Close the mobile menu on navigation (covers hash-link taps that
  // stay on the same pathname) and on Escape.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (href: string): boolean => {
    const hash = hashOf(href);
    if (hash) return pathname === "/" && activeHash === hash;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4">
      <nav
        aria-label="Primary navigation"
        className="flex w-full max-w-[900px] items-center justify-between rounded-full border py-2.5 pr-2.5 pl-4 transition-[background,box-shadow] duration-500 md:pr-3 md:pl-6"
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
          className="font-display shrink-0 text-[1.15rem] font-semibold tracking-tight"
          style={{ color: "var(--text)" }}
        >
          SKY BUILDS
        </Link>

        <ul className="hidden items-center gap-1 text-[0.9375rem] md:flex" style={{ color: "var(--text-muted)" }}>
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className="block rounded-full px-3 py-1.5 transition-[background-color,color] duration-300 hover:text-[var(--text)] hover:bg-[color-mix(in_srgb,var(--text)_8%,transparent)]"
                  style={
                    active
                      ? {
                          color: "var(--text)",
                          background: "color-mix(in srgb, var(--text) 12%, transparent)",
                        }
                      : undefined
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link
            href="/contact"
            className="rounded-full px-4 py-2 text-sm font-medium transition-opacity duration-300 hover:opacity-90"
            style={{ background: "var(--primary)", color: "var(--on-primary)" }}
          >
            Start a project
          </Link>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--text)_8%,transparent)] md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          style={{ color: "var(--text)" }}
        >
          {menuOpen ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute top-[calc(100%+0.5rem)] w-[calc(100%-2rem)] max-w-[900px] rounded-2xl border p-4 md:hidden"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderColor: "var(--glass-border)",
            }}
          >
            <ul className="flex flex-col gap-1" style={{ color: "var(--text)" }}>
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-base transition-[background-color] duration-300"
                      style={
                        active
                          ? { background: "color-mix(in srgb, var(--text) 12%, transparent)" }
                          : undefined
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-3 flex items-center justify-between border-t pt-3" style={{ borderColor: "var(--border)" }}>
              <ThemeToggle />
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="rounded-full px-4 py-2 text-sm font-medium transition-opacity duration-300 hover:opacity-90"
                style={{ background: "var(--primary)", color: "var(--on-primary)" }}
              >
                Start a project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
