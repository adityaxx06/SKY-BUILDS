"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Overview",
    items: [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
    ],
  },
  {
    title: "Content",
    items: [
  {
    href: "/admin/projects",
    label: "Projects",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h6v6H9z" />
      </svg>
    ),
  },
  {
    href: "/admin/services",
    label: "Services",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    href: "/admin/testimonials",
    label: "Testimonials",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 12h2M14 12h2" />
      </svg>
    ),
  },
    ],
  },
  {
    title: "Inbox",
    items: [
  {
    href: "/admin/messages",
    label: "Messages",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
    ],
  },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar({
  open = false,
  onClose,
}: {
  open?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col transition-transform duration-300 ease-in-out lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}
      style={{
        background: "var(--surface)",
        borderRight: "1px solid var(--border)",
      }}
      aria-label="Admin navigation"
    >
      <div className="flex h-full flex-col">
        {/* Brand */}
        <div className="flex h-16 items-center justify-between border-b px-5" style={{ borderColor: "var(--border)" }}>
          <Link href="/admin" className="flex items-center gap-2.5" onClick={onClose}>
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg font-display text-sm font-bold"
              style={{ background: "var(--primary)", color: "var(--on-primary)" }}
              aria-hidden="true"
            >
              S
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[15px] font-bold" style={{ color: "var(--text)" }}>
                Sky Builds
              </span>
              <span
                className="block text-[10px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: "var(--text-muted)" }}
              >
                Admin
              </span>
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="flex h-8 w-8 items-center justify-center rounded-lg lg:hidden"
            style={{ color: "var(--text-muted)" }}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-5" aria-label="Admin sections">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title} className="mb-6 last:mb-0">
              <p
                className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.12em]"
                style={{ color: "var(--text-muted)" }}
              >
                {section.title}
              </p>
              <ul className="space-y-1" role="list">
                {section.items.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        )}
                        style={{
                          color: active ? "var(--text)" : "var(--text-muted)",
                          background: active ? "color-mix(in srgb, var(--primary) 12%, transparent)" : "transparent",
                        }}
                        aria-current={active ? "page" : undefined}
                      >
                        <span
                          className="flex h-5 w-5 items-center justify-center"
                          style={{ color: active ? "var(--primary)" : "var(--text-muted)" }}
                        >
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                        {active && (
                          <span
                            className="ml-auto h-1.5 w-1.5 rounded-full"
                            style={{ background: "var(--primary)" }}
                            aria-hidden="true"
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t p-4" style={{ borderColor: "var(--border)" }}>
          <Link
            href="/"
            className="mb-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            View site
          </Link>
          <div className="flex items-center gap-3 rounded-xl px-3 py-2" style={{ background: "color-mix(in srgb, var(--primary) 8%, transparent)" }}>
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
              style={{ background: "var(--primary)", color: "var(--on-primary)" }}
              aria-hidden="true"
            >
              A
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium" style={{ color: "var(--text)" }}>
                Admin
              </p>
              <p className="truncate text-[11px]" style={{ color: "var(--text-muted)" }}>
                Site manager
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}