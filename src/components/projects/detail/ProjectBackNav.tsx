import Link from "next/link";

export function ProjectBackNav() {
  return (
    <nav aria-label="Project navigation" className="mb-10 md:mb-14">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-[0.9375rem] font-medium text-[var(--text)] transition-all duration-300 hover:border-[var(--primary)] hover:text-[var(--primary)]"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>All Projects</span>
      </Link>
    </nav>
  );
}