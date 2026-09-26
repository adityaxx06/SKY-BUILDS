"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";

interface AdminPaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  searchParams?: Record<string, string>;
}

export function AdminPagination({ currentPage, totalPages, baseUrl, searchParams = {} }: AdminPaginationProps) {
  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${baseUrl}?${params.toString()}`;
  };

  const pages = [];
  const showPages = 5;
  let start = Math.max(1, currentPage - Math.floor(showPages / 2));
  const end = Math.min(totalPages, start + showPages - 1);

  if (end - start + 1 < showPages) {
    start = Math.max(1, end - showPages + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
      <Link
        href={createPageUrl(1)}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors",
          "hover:bg-[var(--surface-elevated)]",
          currentPage === 1 ? "opacity-40 cursor-not-allowed pointer-events-none" : ""
        )}
        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        aria-label="First page"
        aria-disabled={currentPage === 1}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </Link>

      <Link
        href={createPageUrl(currentPage - 1)}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors",
          "hover:bg-[var(--surface-elevated)]",
          currentPage === 1 ? "opacity-40 cursor-not-allowed pointer-events-none" : ""
        )}
        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        aria-label="Previous page"
        aria-disabled={currentPage === 1}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </Link>

      {start > 1 && (
        <>
          <Link
            href={createPageUrl(1)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors",
              "hover:bg-[var(--surface-elevated)]"
            )}
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
          >
            1
          </Link>
          {start > 2 && (
            <span className="flex h-10 w-10 items-center justify-center" style={{ color: "var(--text-muted)" }}>
              …
            </span>
          )}
        </>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={createPageUrl(page)}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors font-medium",
            "hover:bg-[var(--surface-elevated)]",
            currentPage === page
              ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]"
              : "border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)]"
          )}
          aria-label={`Page ${page}`}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </Link>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && (
            <span className="flex h-10 w-10 items-center justify-center" style={{ color: "var(--text-muted)" }}>
              …
            </span>
          )}
          <Link
            href={createPageUrl(totalPages)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors",
              "hover:bg-[var(--surface-elevated)]"
            )}
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
          >
            {totalPages}
          </Link>
        </>
      )}

      <Link
        href={createPageUrl(currentPage + 1)}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors",
          "hover:bg-[var(--surface-elevated)]",
          currentPage === totalPages ? "opacity-40 cursor-not-allowed pointer-events-none" : ""
        )}
        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        aria-label="Next page"
        aria-disabled={currentPage === totalPages}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>

      <Link
        href={createPageUrl(totalPages)}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors",
          "hover:bg-[var(--surface-elevated)]",
          currentPage === totalPages ? "opacity-40 cursor-not-allowed pointer-events-none" : ""
        )}
        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        aria-label="Last page"
        aria-disabled={currentPage === totalPages}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7m-8-14l7 7-7 7" />
        </svg>
      </Link>
    </nav>
  );
}