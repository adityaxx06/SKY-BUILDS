import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

interface AdminPageAction {
  label: string;
  href: string;
}

interface AdminPageProps {
  title: string;
  description?: string;
  action?: AdminPageAction;
  children: React.ReactNode;
}

/**
 * Standard admin content shell: consistent measure, page heading,
 * and optional primary action. Replaces the per-page Container +
 * heading boilerplate (which also double-applied gutters inside the
 * already-padded dashboard <main>).
 */
export function AdminPage({ title, description, action, children }: AdminPageProps) {
  return (
    <div className="mx-auto w-full max-w-[1120px]">
      <Reveal>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h1
              className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold"
              style={{ color: "var(--text)" }}
            >
              {title}
            </h1>
            {description && (
              <p className="mt-2 text-[1.0625rem]" style={{ color: "var(--text-muted)" }}>
                {description}
              </p>
            )}
          </div>
          {action && (
            <Link
              href={action.href}
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full px-6 py-3 font-medium transition-opacity hover:opacity-90 sm:self-auto"
              style={{ background: "var(--primary)", color: "var(--on-primary)" }}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {action.label}
            </Link>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.1}>{children}</Reveal>
    </div>
  );
}
