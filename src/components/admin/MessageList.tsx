"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AdminStatusBadge } from "./AdminStatusBadge";
import { AdminSelect } from "./AdminSelect";
import { AdminInput } from "./AdminInput";
import { AdminPagination } from "./AdminPagination";
import Link from "next/link";

interface Message {
  id: string;
  name: string;
  email: string;
  project_type: string;
  status: "new" | "read" | "in_progress" | "closed";
  created_at: string;
}

interface MessageListProps {
  initialMessages: Message[];
  initialTotalPages: number;
  initialPage: number;
  initialSearch: string;
  initialStatus: string;
  initialSortBy: string;
  initialSortOrder: string;
}

export function MessageList({
  initialMessages,
  initialTotalPages,
  initialPage,
  initialSearch,
  initialStatus,
  initialSortBy,
  initialSortOrder,
}: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [status, setStatus] = useState(initialStatus);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async (newPage: number) => {
    setIsLoading(true);
    setError(null);

    const params = new URLSearchParams({
      page: newPage.toString(),
      limit: "10",
      search: search || "",
      status: status || "all",
      sortBy: sortBy || "created_at",
      sortOrder: sortOrder || "desc",
    });

    try {
      const response = await fetch(`/admin/messages/api?${params.toString()}`, {
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      setMessages(data.messages);
      setTotalPages(data.totalPages);
      setPage(data.currentPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load messages");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchMessages(1);
  };

  const handleFilterChange = () => {
    setPage(1);
    fetchMessages(1);
  };

  const handleSortChange = (newSortBy: string) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("desc");
    }
    setPage(1);
    fetchMessages(1);
  };

  const STATUS_OPTIONS = [
    { value: "all", label: "All Statuses" },
    { value: "new", label: "New" },
    { value: "read", label: "Read" },
    { value: "in_progress", label: "In Progress" },
    { value: "closed", label: "Closed" },
  ];

  const SORT_OPTIONS = [
    { value: "created_at", label: "Date" },
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
    { value: "project_type", label: "Project Type" },
    { value: "status", label: "Status" },
  ];

  if (messages.length === 0 && !isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[18px] border p-10 text-center"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <svg className="mx-auto h-12 w-12 mb-4" style={{ color: "var(--text-muted)", opacity: 0.5 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <h3 className="font-display text-lg font-semibold mb-2" style={{ color: "var(--text)" }}>
          {search || status !== "all" ? "No messages match your filters" : "No inquiries yet"}
        </h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          {search || status !== "all"
            ? "Try adjusting your search or filters"
            : "Contact form submissions will appear here."}
        </p>
        {(search || status !== "all") && (
          <button
            onClick={() => {
              setSearch("");
              setStatus("all");
              fetchMessages(1);
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-colors"
            style={{ background: "var(--primary)", color: "var(--on-primary)" }}
          >
            Clear filters
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[18px] border overflow-hidden"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      {/* Header with search and filters */}
      <div className="border-b p-4 md:p-6" style={{ borderColor: "var(--border)" }}>
        <div className="flex flex-col sm:flex-row gap-4 md:items-center md:justify-between">
          <h2 className="font-display text-lg font-semibold" style={{ color: "var(--text)" }}>
            All Messages
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <form onSubmit={handleSearch} className="flex-1">
              <AdminInput
                name="search"
                placeholder="Search name, email, project..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
              />
            </form>

            <AdminSelect
              name="status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                handleFilterChange();
              }}
              className="w-full sm:w-40"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </AdminSelect>

            <AdminSelect
              name="sortBy"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full sm:w-40"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label} ({sortBy === opt.value && sortOrder === "asc" ? "↑" : sortBy === opt.value && sortOrder === "desc" ? "↓" : ""})
                </option>
              ))}
            </AdminSelect>
          </div>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="border-b px-4 py-3" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "rgba(255,93,162,0.1)", border: "1px solid var(--secondary)", color: "var(--secondary)" }}>
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm">{error}</p>
            <button
              onClick={() => fetchMessages(page)}
              className="ml-auto text-sm underline decoration-transparent underline-offset-2 hover:decoration-current"
              style={{ color: "var(--secondary)" }}
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="p-8">
          <div className="flex items-center justify-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 rounded-full border-3 border-transparent border-t-[var(--primary)]"
            />
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>Loading messages...</span>
          </div>
        </div>
      )}

      {/* Message list */}
      {!isLoading && messages.length > 0 && (
        <div className="divide-y" style={{ borderColor: "var(--border)" }}>
          {messages.map((message) => (
            <Link
              key={message.id}
              href={`/admin/messages/${message.id}`}
              className="flex items-center gap-4 px-4 md:px-6 py-4 transition-colors hover:bg-[var(--surface-elevated)]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-medium" style={{ background: "var(--primary)", color: "var(--on-primary)" }}>
                {message.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate" style={{ color: "var(--text)" }}>
                  {message.name}
                </p>
                <p className="text-sm truncate" style={{ color: "var(--text-muted)" }}>
                  {message.email} · {message.project_type}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <AdminStatusBadge status={message.status} size="sm" />
                <time className="text-[11px]" style={{ color: "var(--text-muted)" }} dateTime={message.created_at}>
                  {new Date(message.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                </time>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t px-4 md:px-6 py-4" style={{ borderColor: "var(--border)" }}>
          <AdminPagination
            currentPage={page}
            totalPages={totalPages}
            baseUrl="/admin/messages"
            searchParams={{
              search: search || "",
              status: status || "all",
              sortBy: sortBy || "created_at",
              sortOrder: sortOrder || "desc",
            }}
          />
        </div>
      )}
    </motion.div>
  );
}